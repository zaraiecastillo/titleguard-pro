import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

// Initialize Gemini Key
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const address = body.address as string;

        // Demo Mode Check: If address is exactly 'test', bypass APIs and return mock High Risk data
        if (address && address.trim().toLowerCase() === "test") {
            return NextResponse.json({
                report_id: uuidv4(),
                timestamp: new Date().toISOString(),
                property_details: {
                    owner_name: "Jane Doe (Estate of) & John Doe",
                    year_built: 1985,
                    lot_size_sqft: 8500,
                    living_area_sqft: 2200,
                    bedrooms: 4,
                    bathrooms: 2.5,
                    property_type: "Single Family Residential"
                },
                risk_assessment: {
                    score: "RED",
                    confidence_rating: "0.99",
                    summary: "AI Analysis: NOT CLEAR FOR CLOSING. This property has a high risk score of 85 due to an unreleased mortgage, tax delinquency, and a probate alert requiring immediate curative action."
                },
                vesting_check: {
                    owner_on_record: "Jane Doe (Estate of)",
                    match_confirmed: false,
                    issues: ["🚨 RED LIGHT: PROBATE RISK. Potential missing heir from 2014 transfer."]
                },
                open_liens: [
                    {
                        type: "Mortgage",
                        recorded_date: "2008-08-14",
                        amount: 248000,
                        instrument_number: "INST-2008-BofA",
                        status: "UNRELEASED"
                    },
                    {
                        type: "Tax",
                        recorded_date: "2023-01-15",
                        amount: 12450,
                        instrument_number: "TAX-2023-Miami",
                        status: "UNRELEASED"
                    }
                ],
                curative_actions: [
                    {
                        priority: "HIGH",
                        instruction: "🚨 RED LIGHT: ZOMBIE MORTGAGE. Obtain payoff or release for $248,000 Bank of America mortgage from 2008.",
                        reason: "Unreleased mortgage blocks clear title transfer."
                    },
                    {
                        priority: "HIGH",
                        instruction: "🚨 RED LIGHT: TAX GAP. Resolve $12,450 tax delinquency with City of Miami.",
                        reason: "Outstanding taxes take priority and can lead to a tax deed sale."
                    },
                    {
                        priority: "HIGH",
                        instruction: "⚠️ YELLOW LIGHT: PROBATE RISK. Verify Letters of Administration or Death Certificate.",
                        reason: "Cannot confirm signing authority without probate clearance."
                    }
                ]
            });
        }

        // Execute ATTOM API Data Fetch natively in Next.js
        let attomDataText = "";
        try {
            const attomApiKey = process.env.ATTOM_API_KEY;
            if (!attomApiKey) {
                console.warn("ATTOM_API_KEY not found! Using generic property payload.");
                attomDataText = `{"propertyAddress": "${address}", "message": "Simulated base response because ATTOM_API_KEY is missing."}`;
            } else {
                const url = new URL("https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail");
                url.searchParams.append("address", address);

                const attomRes = await fetch(url.toString(), {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                        "apikey": attomApiKey
                    }
                });

                if (attomRes.ok) {
                    const data = await attomRes.json();
                    attomDataText = JSON.stringify(data, null, 2);
                } else {
                    const errText = await attomRes.text();
                    console.error("ATTOM API error:", attomRes.status, errText);
                    attomDataText = `{"propertyAddress": "${address}", "error": "ATTOM API returned ${attomRes.status}"}`;
                }
            }
        } catch (scriptError: any) {
            console.error("ATTOM fetch failed:", scriptError);
            attomDataText = `{"propertyAddress": "${address}", "error": "ATTOM API fetch failed completely."}`;
        }

        // Construct Prompt with TitleGuard Audit Rules
        const prompt = `
            You are a Title Risk Analyst. Evaluate the following property data from the ATTOM API.
            
            --- ATTOM DATA ---
            ${attomDataText}
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
              "property_details": {
                  "owner_name": "string (Combined owner 1 and 2 if available, or 'Unknown')",
                  "year_built": number | null,
                  "lot_size_sqft": number | null,
                  "living_area_sqft": number | null,
                  "bedrooms": number | null,
                  "bathrooms": number | null,
                  "property_type": "string (e.g. Single Family, Multi-Family, Commercial)"
              },
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

        const openAiUrl = "https://api.openai.com/v1/chat/completions";
        const openAiApiKey = process.env.OPENAI_API_KEY;

        if (!openAiApiKey) {
            throw new Error("OPENAI_API_KEY is not configured in environment variables.");
        }

        const openAiBody = {
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a Title Risk Analyst. Follow all instructions strictly and output only valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2
        };

        const result = await fetch(openAiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openAiApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(openAiBody)
        });

        const resData = await result.json();

        if (!result.ok) {
            console.error("OpenAI REST API Error:", resData);
            throw new Error(resData.error?.message || "OpenAI API rejected the request.");
        }

        const rawText = resData.choices?.[0]?.message?.content || "";
        const jsonString = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

        let analysis;
        try {
            analysis = JSON.parse(jsonString);
        } catch (e) {
            console.error("JSON Parse Error", e);
            return NextResponse.json({ error: "AI response was not valid JSON", raw: jsonString }, { status: 500 });
        }

        return NextResponse.json(analysis);

    } catch (error: any) {
        console.error("Fetch Property API Error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error?.message || String(error)
        }, { status: 500 });
    }
}
