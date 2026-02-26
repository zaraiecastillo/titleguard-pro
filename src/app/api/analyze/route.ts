import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "mock-key");

// Use a reasoning model if available to match "Deep Think" request
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const PROJECT_BRIEF_PATH = path.join(process.cwd(), "PROJECT_BRIEF.md");
const PII_SCRUBBER_PATH = path.join(process.cwd(), "scripts/pii_scrubber.py");

async function scrubPII(text: string): Promise<string> {
    try {
        const tempInputPath = path.join(process.cwd(), `temp_input_${Date.now()}.txt`);
        fs.writeFileSync(tempInputPath, text);

        // Invoke Python Script
        const { stdout } = await execAsync(`python3 "${PII_SCRUBBER_PATH}" "${tempInputPath}"`);

        // Cleanup
        try { fs.unlinkSync(tempInputPath); } catch (e) { }

        return stdout.trim();
    } catch (error) {
        console.error("PII Scrubbing Failed:", error);
        return text; // Fallback
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const pdfUrl = formData.get("pdfUrl") as string | null;
        const address = formData.get("address") as string | null;

        if (!file && !pdfUrl && !address) {
            return NextResponse.json({ error: "No file, pdfUrl, or address provided" }, { status: 400 });
        }

        let text = "";

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            try {
                text = await extractTextFromPDF(buffer);
            } catch (e) {
                console.error("PDF Parse Error:", e);
                return NextResponse.json({ error: "Failed to parse PDF text." }, { status: 400 });
            }
        } else if (pdfUrl) {
            try {
                const response = await fetch(pdfUrl);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                text = await extractTextFromPDF(buffer);
            } catch (e) {
                console.error("URL Fetch/Parse Error:", e);
                return NextResponse.json({ error: "Failed to fetch or parse PDF from URL." }, { status: 400 });
            }
        } else if (address) {
            text = `Simulated request for property address: ${address}. Please generate a realistic Stoplight Report demonstrating an analysis of this property's title situation based on generic but plausible data for this address.`;
        }

        // 1. PII Scrubbing (Python Skill)
        const scrubbedText = await scrubPII(text);

        // Read Project Brief
        let projectBrief = "";
        try {
            projectBrief = fs.readFileSync(PROJECT_BRIEF_PATH, "utf-8");
        } catch (e) {
            console.error("Project Brief Read Error:", e);
            return NextResponse.json({ error: "Configuration missing PROJECT_BRIEF.md" }, { status: 500 });
        }

        // Construct Prompt
        const prompt = `
      You are a Senior Title Underwriter. Your analysis for "Closing Killers" must be adversarial—assume there is a hidden lien or a name mismatch unless you can prove otherwise.
      
      Analyze the provided document (which has been PII-scrubbed) against the Project Brief rules.
      
      --- PROJECT BRIEF ---
      ${projectBrief}
      ---------------------
      
      --- DOCUMENT TEXT ---
      ${scrubbedText.slice(0, 30000)}
      ---------------------

      2. Geographic Detection & Logic Clusters:
      Automatically identify the property state from the 'Legal Description' or 'Schedule A' header.
      Apply these state-specific knowledge base triggers if the property is in one of the Big Four states:
      - TEXAS (Homestead Logic): Trigger: If 'Marital Status' is listed as 'Single' or 'Unmarried' on a primary residence. Action Step (Yellow Light): "Texas Constitution Article XVI, Section 50 requires spousal joinder for all homestead sales. Verify if the seller is married; if so, the non-owning spouse must sign the Warranty Deed to waive homestead rights."
      - CALIFORNIA (Priority Assessment): Trigger: Detect 'PACE', 'HERO', or 'UCC-1 Solar' in Schedule B Exceptions. Action Step (Red Light): "California PACE liens are superior to mortgage deeds of trust. Curative: These assessments must be paid off at closing or specifically subordinated by the lender to prevent title rejection."
      - FLORIDA (Unrecorded Risk): Trigger: Standard Florida Title Commitment header detection. Action Step (Yellow Light): "Florida Statute 159 Warning: Standard title searches do not uncover unrecorded municipal utility liens or code violations. Curative: Order a Municipal Lien Search (MLS) to avoid post-closing liability for unpaid city services."
      - NEW YORK (Judicial Timeline): Trigger: Detect 'Lis Pendens' or 'Notice of Pendency' in the Requirements section. Action Step (Red Light): "New York is a Judicial Foreclosure state (RPAPL § 1301). A Lis Pendens indicates active litigation. Curative: This requires a court-ordered release. Estimated curative timeline: 6–9 months. High risk of deal collapse."

      Output ONLY valid JSON matching this exact schema:
      {
        "report_id": "string (uuid)",
        "timestamp": "iso8601",
        "risk_assessment": {
            "score": "GREEN" | "YELLOW" | "RED",
            "confidence_rating": "0.00-1.00",
            "summary": "Short 1-sentence summary."
        },
        "vesting_check": {
            "owner_on_record": "string",
            "match_confirmed": boolean,
            "issues": ["string of specific discrepancy"]
        },
        "open_liens": [
            {
            "type": "Mortgage" | "Tax" | "Judgment" | "Mechanic",
            "recorded_date": "YYYY-MM-DD",
            "amount": number,
            "instrument_number": "string",
            "status": "UNRELEASED" | "POTENTIALLY_CLEARED"
            }
        ],
        "curative_actions": [
            {
            "priority": "HIGH" | "MEDIUM",
            "instruction": "E.g., Request death certificate for co-owner.",
            "reason": "Why this blocks the closing."
            }
        ],
        "geographic_intelligence": {
            "state": "string (e.g., TX, CA, FL, NY)",
            "action_step": "string (The Action Step text above, or standard message)",
            "risk_level": "RED" | "YELLOW" | "GREEN"
        }
      }
    `;

        // Call Gemini
        if (!apiKey) {
            // Mock Response
            return NextResponse.json({
                report_id: "mock-report-" + Date.now(),
                timestamp: new Date().toISOString(),
                risk_assessment: {
                    score: "YELLOW",
                    confidence_rating: "0.85",
                    summary: "Caution advised due to potential unreleased mortgage from 2018."
                },
                vesting_check: {
                    owner_on_record: "John Doe (Mock)",
                    match_confirmed: true,
                    issues: []
                },
                open_liens: [
                    {
                        type: "Mortgage",
                        recorded_date: "2018-01-01",
                        amount: 250000,
                        instrument_number: "INS-2018-001",
                        status: "UNRELEASED"
                    }
                ],
                curative_actions: [
                    {
                        priority: "HIGH",
                        instruction: "Obtain payoff/release for 2018 Mortgage.",
                        reason: "Active lien on property must be cleared before closing."
                    }
                ],
                geographic_intelligence: {
                    state: "FL",
                    action_step: "Florida Statute 159 Warning: Standard title searches do not uncover unrecorded municipal utility liens or code violations. Curative: Order a Municipal Lien Search (MLS) to avoid post-closing liability for unpaid city services.",
                    risk_level: "YELLOW"
                }
            });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonString = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

        let analysis;
        try {
            analysis = JSON.parse(jsonString);
        } catch (e) {
            console.error("JSON Parse Error", e);
            return NextResponse.json({ error: "AI response was not valid JSON", raw: jsonString }, { status: 500 });
        }

        return NextResponse.json(analysis);

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
