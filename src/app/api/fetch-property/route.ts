import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "mock-key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const address = body.address as string;

        if (!address) {
            return NextResponse.json({ error: "No address provided" }, { status: 400 });
        }

        // --- PITCH DEMO INTERCEPTION: GOLDEN PATH ---
        const isPitchDemo =
            (address && address.toLowerCase().includes("1600 pennsylvania"));

        if (isPitchDemo) {
            // Artificial delay for dramatic effect during pitch
            await new Promise(resolve => setTimeout(resolve, 3000));

            return NextResponse.json({
                report_id: "DEMO-" + uuidv4().split('-')[0].toUpperCase(),
                timestamp: new Date().toISOString(),
                risk_assessment: {
                    score: "RED",
                    confidence_rating: "0.99",
                    summary: "Critical defects identified. An unreleased mortgage from 1995 creates a severe cloud on title, blocking the Clear to Close process."
                },
                vesting_check: {
                    owner_on_record: "Tony Stark",
                    match_confirmed: false, // The prompt requested a mismatch check, so let's trigger it for the demo
                    issues: ["🚨 RED LIGHT: OWNER MISMATCH. The legal owner on record does not match the seller provided. Investigation required."]
                },
                open_liens: [
                    {
                        type: "Institutional Mortgage",
                        recorded_date: "1995-10-14",
                        amount: 15000000,
                        instrument_number: "INST-1995-44820",
                        status: "UNRELEASED"
                    }
                ],
                curative_actions: [
                    {
                        priority: "HIGH",
                        instruction: "🚨 RED LIGHT: ZOMBIE MORTGAGE. Obtain and record a 'Satisfaction of Mortgage' from the original 1995 institutional lender or their successor.",
                        reason: "The 1995 mortgage holds a super-priority senior position. No new lender will fund this transaction until this lien is permanently purged."
                    }
                ],
                geographic_intelligence: {
                    state: "DC",
                    action_step: "DISTRICT COMPLIANCE ALERTS: Washington D.C. Recorder of Deeds requires wet-ink signatures for historic lien releases. Expect a minimum 14-day manual processing delay. Curative action must begin immediately.",
                    risk_level: "RED"
                }
            });
        }
        // --------------------------------------------

        // Simulate ATTOM API Data Fetch
        const simulatedAttomData = JSON.stringify({
            propertyAddress: address,
            ownerName: "John Doe",
            ownerType: "Individual",
            taxYear: 2024,
            mortgages: [
                { recordedDate: "2018-05-10", amount: 450000, status: "Open" }
            ]
        }, null, 2);

        // Construct Prompt with TitleGuard Audit Rules
        const prompt = `
            You are a Title Risk Analyst. Evaluate the following simulated property data from the ATTOM API.
            
            --- ATTOM DATA ---
            ${simulatedAttomData}
            ------------------

            TitleGuard Day 1 Audit Protocol:
            Immediately run this 3-step audit before summarizing:

            1. Owner Mismatch (RED FLAG): Compare the owner1 / owner2 names from the API to the hypothetical 'Seller' name the user might have mentioned. If they do not match exactly, output: "🚨 RED LIGHT: OWNER MISMATCH. The legal owner on record does not match the seller provided. Investigation required." (Assume a generic match if no seller is provided, unless testing).

            2. Corporate Entity (YELLOW FLAG): If any owner name contains "LLC", "Corp", "Inc", or "Trust", output: "⚠️ YELLOW LIGHT: CORPORATE ENTITY. Property is owned by an entity. Request Operating Agreements/Trust Docs immediately to verify signing authority."

            3. Tax Delinquency (RED FLAG): Check the taxYear. If the last recorded tax year is earlier than 2024, output: "🚨 RED LIGHT: TAX GAP. Taxes may be delinquent or records are severely outdated. Verification with the County Treasurer is mandatory."

            4. Zombie Mortgages (RED FLAG): Scan the mortgages or liens array. If an open mortgage exists from more than 10 years ago with no corresponding 'Release' or 'Satisfaction' entry, output: '🚨 RED LIGHT: ZOMBIE MORTGAGE. An old mortgage remains unreleased. This will halt closing until a payoff or release is secured.'

            5. Probate/Deceased Owner (RED FLAG): If the ownership type is 'Estate of' or if the tax billing address is different from the property address for an individual owner, output: '⚠️ YELLOW LIGHT: PROBATE RISK. Property may be part of an estate. Verify if Letters of Administration or a Death Certificate is on file.'

            Output ONLY valid JSON matching this exact schema:
            {
              "report_id": "string (uuid)",
              "timestamp": "iso8601",
              "risk_assessment": {
                  "score": "GREEN" | "YELLOW" | "RED",
                  "confidence_rating": "0.00-1.00",
                  "summary": "Short 1-sentence summary based on the red/yellow flags found."
              },
              "vesting_check": {
                  "owner_on_record": "string",
                  "match_confirmed": boolean,
                  "issues": ["string of specific discrepancy, e.g. 🚨 RED LIGHT: OWNER MISMATCH..."]
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
                  "instruction": "Actionable item including the flag text (e.g. 🚨 RED LIGHT: ZOMBIE MORTGAGE...)",
                  "reason": "Why this blocks the closing."
                  }
              ]
            }
        `;

        if (!apiKey) {
            // Mock Response if no API key
            return NextResponse.json({
                report_id: "mock-search-" + Date.now(),
                timestamp: new Date().toISOString(),
                risk_assessment: {
                    score: "GREEN",
                    confidence_rating: "0.90",
                    summary: "Standard property search returned normal results. No severe flags detected."
                },
                vesting_check: {
                    owner_on_record: "John Doe",
                    match_confirmed: true,
                    issues: []
                },
                open_liens: [
                    {
                        type: "Mortgage",
                        recorded_date: "2018-05-10",
                        amount: 450000,
                        instrument_number: "SIM-2018",
                        status: "UNRELEASED"
                    }
                ],
                curative_actions: []
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
        console.error("Fetch Property API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
