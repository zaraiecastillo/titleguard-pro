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
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let text = "";
        try {
            text = await extractTextFromPDF(buffer);
        } catch (e) {
            console.error("PDF Parse Error:", e);
            return NextResponse.json({ error: "Failed to parse PDF text." }, { status: 400 });
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
        ]
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
                ]
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
