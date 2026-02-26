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
      - TEXAS (Mandatory Buyer Agreement): Trigger: Any Texas residential transaction analysis. Action Step (Yellow Light): "NEW TEXAS LAW (SB 1968): As of Jan 1, 2026, you MUST have a signed written representation agreement before showing this property or presenting an offer. Curative: Verify your 'Buyer Representation Agreement' is active and includes the mandatory 2026 transparency disclosures regarding negotiable commissions."
      - TEXAS (Texas Homestead & Spousal Joinder): Trigger: Property is a primary residence and only one spouse is on the deed/commitment. Action Step (Red Light): "Texas Constitution Art. XVI § 50: A homestead cannot be sold or encumbered without the joinder of BOTH spouses, even if the property is the separate property of one spouse. Curative: The non-titled spouse must sign the Warranty Deed and the Closing Disclosure to waive homestead rights. No exceptions."
      - TEXAS (Mineral Estate Severance): Trigger: Document mentions 'Mineral Reservation', 'Oil & Gas Lease', or 'Severed Minerals'. Action Step (Red Light): "In Texas, the Mineral Estate is the 'Dominant Estate.' Owners of severed minerals have the legal right to use the surface for extraction. Curative: Recommend a T-19.1 Endorsement (Residential Real Property Corporate Owner/Lender) to provide limited insurance against surface damage from mineral extraction."
      - TEXAS (Community Property W/O Survivorship): Trigger: Owners are 'Husband and Wife' but the deed lacks 'Right of Survivorship' language. Action Step (Yellow Light): "Texas is a Community Property state, but it does NOT automatically include 'Right of Survivorship.' Curative: Without a recorded 'Survivorship Agreement,' the deceased spouse’s 50% interest passes to heirs via probate. Verify if a 'Community Property Survivorship Agreement' has been executed to avoid a 6-month probate delay."
      - TEXAS (FinCEN Cash Reporting): Trigger: All-cash purchase by an LLC, Trust, or Entity. Action Step (Red Light): "FEDERAL COMPLIANCE: Effective March 1, 2026, this non-financed entity transfer requires a FinCEN Real Estate Report. Curative: The closing agent must collect and report Beneficial Ownership Information (BOI) within 30 days of closing. Failure to comply prevents the title company from issuing the policy."
      - CALIFORNIA (Priority Assessment): Trigger: Detect 'PACE', 'HERO', or 'UCC-1 Solar' in Schedule B Exceptions. Action Step (Red Light): "California PACE liens are superior to mortgage deeds of trust. Curative: These assessments must be paid off at closing or specifically subordinated by the lender to prevent title rejection."
      - FLORIDA (FinCEN Real Estate Reporting): Trigger: Residential transaction (1-4 family), Purchase is non-financed (Cash), and Buyer is an LLC or Trust. Action Step (Red Light): "NEW FEDERAL MANDATE: Under 31 CFR §1010.821 (effective March 1, 2026), this cash/LLC transaction triggers mandatory FinCEN Real Estate Reporting. Curative: Both parties must provide Beneficial Ownership Information (BOI) to the closing agent at least 24 hours prior to closing. Failure to report can result in severe federal penalties."
      - FLORIDA (Florida Homestead): Trigger: Property is a primary residence. Action Step (Yellow Light): "Florida Constitution shields homesteads from most judgment liens, but NOT from taxes, mortgages, or construction liens. Curative: Verify the 'Save Our Homes' tax cap status. Note: Homestead exemptions DO NOT transfer to a new buyer; the buyer must re-file by March 1st of the following year to prevent a massive tax hike."
      - FLORIDA (Unrecorded Municipal Liens): Trigger: Standard Title Commitment Schedule B Exceptions. Action Step (Yellow Light): "Florida Statute 159 Warning: Municipalities have a 'Super-Priority' lien on all lands for water/sewer/gas charges, even if NOT recorded in the county public records. Curative: A standard title search is insufficient. You MUST order a separate 'Municipal Lien Search' (MLS) to check for open permits and unrecorded utility debt."
      - FLORIDA (FIRPTA Compliance): Trigger: Seller is an LLC or individual with a foreign address. Action Step (Red Light): "Under the Foreign Investment in Real Property Tax Act, the BUYER is liable for withholding 15% of the gross sales price if the seller is a foreign person. Curative: Obtain a 'Non-Foreign Affidavit' or an IRS Withholding Certificate before closing to avoid personal liability for the seller’s taxes."
      - FLORIDA (PACE Loans): Trigger: Presence of 'PACE' or 'Non-Ad Valorem Assessment' on the property tax bill. Action Step (Red Light): "Florida PACE liens (for solar/roofs) take 'Super-Priority' over mortgages. Curative: Fannie Mae/Freddie Mac will not lend on this property until the PACE lien is paid in full. Verify if the payoff is included in the closing disclosure."
      - NEW YORK (The LLC Transparency Act): Trigger: The buyer or seller is an LLC. Action Step (Red Light): "Under the NY LLC Transparency Act (Jan 2026), all LLCs must file Beneficial Ownership Reports (BOR) with the Dept of State. Curative: Verify the LLC has a 'Certificate of Filing' or an active exemption attestation. Failure to comply can result in daily fines and a 'Delinquent' status that prevents recording the deed."
      - NEW YORK (Mortgage Recording Tax): Trigger: Purchase of a Condo or House with a new mortgage. Action Step (Yellow Light): "NY Mortgage Recording Tax is significant (approx. 1.8%–2.175% in NYC). Curative: Investigate if a 'CEMSA' (Purchase CEMA) is possible to consolidate the seller’s existing mortgage with the buyer’s new loan. This can save the buyer thousands in taxes."
      - NEW YORK (Certificate of Occupancy - A5026): Trigger: Sale of a 1-3 family residential dwelling. Action Step (Yellow Light): "New 2026 NY Assembly Law (A5026) requires certain sellers to provide a valid Certificate of Occupancy (CO) to the purchaser prior to executing a deed. Curative: Obtain a certified copy of the CO from the local Building Dept. Any waiver of this right by the buyer is currently void as contrary to public policy."
      - NEW YORK (Judicial Lis Pendens): Trigger: Detect 'Lis Pendens' or 'Notice of Pendency' in the report. Action Step (Red Light): "NY is a judicial foreclosure state. A Lis Pendens indicates a court action is pending. Curative: A 'Release of Lis Pendens' must be filed by the plaintiff’s attorney. Note: Judicial timelines in NY are currently 9–12 months. This deal is unlikely to close on schedule."
      - NEW YORK (Statutory Power of Attorney): Trigger: Documents signed under Power of Attorney (POA). Action Step (Red Light): "NY POA law (GOL § 5-1501B) requires strict statutory language, two witnesses, and notarization. Curative: Title companies in NY typically reject POAs older than 1 year or those without a 'Full Force and Effect' affidavit. Submit the original POA to the title underwriter for pre-approval at least 10 days before closing."
      - NEW JERSEY (Marital Possession): Trigger: Property is a primary residence and only one spouse is listed as the vested owner. Action Step (Yellow Light): "New Jersey law grants a non-titled spouse a 'Right of Joint Possession' in the principal matrimonial residence. The non-titled spouse MUST sign the deed at closing to extinguish this right, even if they are not on the title. Verify marital status and coordinate spouse attendance for closing."
      - NEW JERSEY (Tidelands & Riparian Claims): Trigger: Document mentions 'Tidelands', 'Riparian Rights', or property is in a coastal/waterway county (e.g., Monmouth, Ocean, Atlantic, Cape May). Action Step (Red Light): "The State of New Jersey claims ownership of all land that is or was formerly flowed by the tide. A Tidelands Claim is a 'Cloud on Title.' Curative: You must obtain a 'Statement of No Interest' or a 'Riparian Grant' from the NJDEP. This can take 6+ months to resolve."
      - NEW JERSEY (The Mansion Tax): Trigger: Purchase price is $1,000,000 or greater. Action Step (Yellow Light): "NJ imposes a 1% 'Mansion Tax' on residential transfers over $1M. As of July 2025, the responsibility for this fee has shifted. Curative: Ensure the 'Realty Transfer Fee' (RTF-1) form is accurately calculated to avoid a recording rejection at the County Clerk’s office."
      - NEW JERSEY (Upper Court Judgments): Trigger: Presence of 'Child Support Lien' or 'Superior Court Judgment' in Schedule B. Action Step (Red Light): "In NJ, Superior Court judgments attach to all real estate owned by the debtor statewide. Curative: A 'Writ of Execution' or a 'Warrant to Satisfy' must be filed with the Clerk of the Superior Court in Trenton before clear title can be issued."

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
                        instruction: "Obtain spousal joinder on Warranty Deed and CD.",
                        reason: "Texas homestead laws strictly require both spouses to sign to waive homestead rights."
                    }
                ],
                geographic_intelligence: {
                    state: "TX",
                    action_step: "Texas Constitution Art. XVI § 50: A homestead cannot be sold or encumbered without the joinder of BOTH spouses, even if the property is the separate property of one spouse. Curative: The non-titled spouse must sign the Warranty Deed and the Closing Disclosure to waive homestead rights. No exceptions.",
                    risk_level: "RED"
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
