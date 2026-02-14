"use client";

import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { RiskGauge, RiskScore } from "./RiskGauge";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle, FileText, Loader2, ShieldCheck, ClipboardList, Hammer } from "lucide-react";

// Update Schema to match Backend
interface AnalysisResult {
    report_id: string;
    timestamp: string;
    risk_assessment: {
        score: RiskScore;
        confidence_rating: string;
        summary: string;
    };
    vesting_check: {
        owner_on_record: string;
        match_confirmed: boolean;
        issues: string[];
    };
    open_liens: Array<{
        type: string;
        recorded_date: string;
        amount: number;
        instrument_number: string;
        status: string;
    }>;
    curative_actions: Array<{
        priority: "HIGH" | "MEDIUM";
        instruction: string;
        reason: string;
    }>;
}

export function Dashboard() {
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (file: File) => {
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/analyze", { method: "POST", body: formData });
            if (!response.ok) throw new Error("Analysis failed");
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError("Failed to analyze document. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12 font-sans">
            <header className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Title Guard AI
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Instant Title Curative Analysis. Deep Think Powered.
                </p>
            </header>

            <main className="max-w-6xl mx-auto space-y-12">
                <section>
                    <FileUpload onFileSelect={handleFileUpload} isAnalyzing={loading} />
                </section>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                        <span className="ml-4 text-emerald-500 font-medium">Running Python PII Scrubber & Gemini Deep Think...</span>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center py-4 text-red-400 bg-red-900/20 rounded-lg max-w-xl mx-auto">
                        <AlertTriangle className="mr-2" /> {error}
                    </div>
                )}

                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* Column 1: Risk & Vesting */}
                        <div className="space-y-6 lg:col-span-1">
                            <RiskGauge score={result.risk_assessment.score} confidence={result.risk_assessment.confidence_rating} />

                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-2">Analysis Summary</h3>
                                <p className="text-white font-medium">{result.risk_assessment.summary}</p>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                                <h3 className="text-xl font-semibold text-slate-200 flex items-center">
                                    <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" /> Vesting Check
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Owner on Record:</span>
                                        <span className="text-white font-mono">{result.vesting_check.owner_on_record}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Match Confirmed:</span>
                                        <span className={result.vesting_check.match_confirmed ? "text-emerald-400" : "text-red-400"}>
                                            {result.vesting_check.match_confirmed ? "YES" : "NO"}
                                        </span>
                                    </div>
                                    {result.vesting_check.issues.length > 0 && (
                                        <div className="mt-2 p-2 bg-red-950/30 rounded border border-red-900/50 text-sm text-red-300">
                                            {result.vesting_check.issues.map((issue, i) => (
                                                <p key={i}>• {issue}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Open Liens */}
                        <div className="space-y-6 lg:col-span-1">
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-full">
                                <h3 className="text-xl font-semibold text-slate-200 flex items-center mb-4">
                                    <ClipboardList className="w-5 h-5 mr-2 text-blue-400" /> Open Liens / Encumbrances
                                </h3>
                                {result.open_liens.length > 0 ? (
                                    <div className="space-y-4">
                                        {result.open_liens.map((lien, i) => (
                                            <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded uppercase font-bold">{lien.type}</span>
                                                    <span className={lien.status === "UNRELEASED" ? "text-red-400 text-xs font-bold" : "text-yellow-400 text-xs"}>{lien.status}</span>
                                                </div>
                                                <div className="text-sm text-slate-300 space-y-1">
                                                    <div className="flex justify-between">
                                                        <span>Amount:</span>
                                                        <span className="text-white">${lien.amount?.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Recorded:</span>
                                                        <span>{lien.recorded_date}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Inst #:</span>
                                                        <span className="font-mono">{lien.instrument_number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                                        <Check className="w-12 h-12 mb-2 opacity-20" />
                                        <p>No active liens found.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Column 3: Curative Actions */}
                        <div className="space-y-6 lg:col-span-1">
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-full">
                                <h3 className="text-xl font-semibold text-slate-200 flex items-center mb-4">
                                    <Hammer className="w-5 h-5 mr-2 text-orange-400" /> Curative Actions
                                </h3>
                                {result.curative_actions.length > 0 ? (
                                    <div className="space-y-4">
                                        {result.curative_actions.map((action, i) => (
                                            <div key={i} className="p-4 bg-slate-800 rounded-xl border-l-4 border-orange-500">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-orange-400 font-bold text-sm">Action Required</span>
                                                    {action.priority === "HIGH" && (
                                                        <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">HIGH PRIORITY</span>
                                                    )}
                                                </div>
                                                <p className="text-white font-medium mb-1">{action.instruction}</p>
                                                <p className="text-sm text-slate-400 italic">"{action.reason}"</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                                        <Check className="w-12 h-12 mb-2 opacity-20" />
                                        <p>No curative actions needed.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </motion.div>
                )}
            </main>
        </div>
    );
}
