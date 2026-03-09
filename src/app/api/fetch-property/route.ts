import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

// Initialize Gemini Key
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const address = body.address as string;

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

        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
        let responseJson: any = null;
        let fetchSuccess = false;

        for (const modelName of modelsToTry) {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
            const geminiBody = {
                contents: [{ parts: [{ text: prompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }
                ],
                generationConfig: {
                    temperature: 0.2
                }
            };

            const result = await fetch(geminiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(geminiBody)
            });

            const resData = await result.json();

            if (result.ok) {
                responseJson = resData;
                fetchSuccess = true;
                break;
            } else if (resData.error && resData.error.code === 404) {
                console.warn(`[Fallback] Model ${modelName} not found or restricted. Trying next...`);
                continue;
            } else {
                console.error(`Gemini REST API Error on ${modelName}:`, resData);
                throw new Error(resData.error?.message || `Gemini API rejected request on ${modelName}`);
            }
        }

        if (!fetchSuccess || !responseJson) {
            throw new Error("All Gemini model fallbacks failed. Your API key may lack generative access.");
        }

        const rawText = responseJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
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
