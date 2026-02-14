"use client";

import { motion } from "framer-motion";
import { RiskGauge, RiskScore } from "@/components/RiskGauge";
import { ShieldCheck, ClipboardList, Hammer, Check, X } from "lucide-react";

// Types matching API response
export interface AnalysisResult {
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

interface AnalysisReportProps {
    result: AnalysisResult;
}

export function AnalysisReport({ result }: AnalysisReportProps) {
    return (
        <section id="report" className="py-12 px-6 bg-slate-950 relative z-20 -mt-24">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto glass-card rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-500/30"
            >
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold text-white">Title Intelligence Report</h2>
                    <div className="text-right">
                        <p className="text-slate-400 text-sm">Report ID: <span className="font-mono text-emerald-400">{result.report_id.slice(0, 8)}...</span></p>
                        <p className="text-slate-500 text-xs">{new Date(result.timestamp).toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: Risk & Vesting */}
                    <div className="space-y-6 lg:col-span-1">
                        <RiskGauge score={result.risk_assessment.score} confidence={result.risk_assessment.confidence_rating} />

                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Analysis Summary</h3>
                            <p className="text-white font-medium leading-relaxed">{result.risk_assessment.summary}</p>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                            <h3 className="text-lg font-semibold text-slate-200 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" /> Vesting Check
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Owner on Record:</span>
                                    <span className="text-white font-mono text-right">{result.vesting_check.owner_on_record}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Match Confirmed:</span>
                                    <span className={result.vesting_check.match_confirmed ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                                        {result.vesting_check.match_confirmed ? "YES" : "NO"}
                                    </span>
                                </div>
                                {result.vesting_check.issues.length > 0 && (
                                    <div className="mt-2 p-3 bg-rose-950/30 rounded border border-rose-900/50 text-rose-300">
                                        {result.vesting_check.issues.map((issue, i) => (
                                            <p key={i} className="flex items-start"><X className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" /> {issue}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Open Liens */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-full">
                            <h3 className="text-lg font-semibold text-slate-200 flex items-center mb-4">
                                <ClipboardList className="w-5 h-5 mr-2 text-cyan-400" /> Open Liens / Encumbrances
                            </h3>
                            {result.open_liens.length > 0 ? (
                                <div className="space-y-4">
                                    {result.open_liens.map((lien, i) => (
                                        <div key={i} className="p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="px-2 py-1 bg-cyan-950/50 text-cyan-300 text-xs rounded uppercase font-bold border border-cyan-900">{lien.type}</span>
                                                <span className={lien.status === "UNRELEASED" ? "text-rose-400 text-xs font-bold bg-rose-950/30 px-2 py-1 rounded" : "text-amber-400 text-xs"}>{lien.status}</span>
                                            </div>
                                            <div className="text-sm text-slate-300 space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Amount:</span>
                                                    <span className="text-white font-mono">${lien.amount?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Recorded:</span>
                                                    <span>{lien.recorded_date}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Inst #:</span>
                                                    <span className="font-mono text-slate-400">{lien.instrument_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-slate-500 bg-slate-800/50 rounded-xl">
                                    <Check className="w-12 h-12 mb-2 opacity-20" />
                                    <p>No active liens found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Column 3: Curative Actions */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-full">
                            <h3 className="text-lg font-semibold text-slate-200 flex items-center mb-4">
                                <Hammer className="w-5 h-5 mr-2 text-amber-400" /> Curative Actions
                            </h3>
                            {result.curative_actions.length > 0 ? (
                                <div className="space-y-4">
                                    {result.curative_actions.map((action, i) => (
                                        <div key={i} className="p-4 bg-slate-800 rounded-xl border-l-4 border-amber-500">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-amber-400 font-bold text-xs uppercase tracking-wide">Action Required</span>
                                                {action.priority === "HIGH" && (
                                                    <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold shadow-lg shadow-rose-900/50">HIGH PRIORITY</span>
                                                )}
                                            </div>
                                            <p className="text-white font-medium mb-2 text-sm">{action.instruction}</p>
                                            <p className="text-xs text-slate-400 italic bg-white/5 p-2 rounded">"{action.reason}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-slate-500 bg-slate-800/50 rounded-xl">
                                    <Check className="w-12 h-12 mb-2 opacity-20" />
                                    <p>No curative actions needed.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
