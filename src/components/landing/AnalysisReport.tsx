"use client";

import { motion } from "framer-motion";
import { RiskGauge, RiskScore } from "@/components/RiskGauge";
import { ShieldCheck, ClipboardList, Hammer, Check, X, MapPin } from "lucide-react";

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
    geographic_intelligence?: {
        state: string;
        action_step: string;
        risk_level: "RED" | "YELLOW" | "GREEN";
    };
}

interface AnalysisReportProps {
    result: AnalysisResult;
}

export function AnalysisReport({ result }: AnalysisReportProps) {
    return (
        <section id="report" className="py-24 px-6 md:px-12 relative z-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-[#D4AF37]/20 pb-8">
                    <div>
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.25em] mb-2 block">Intelligence Stream</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Preliminary Risk Assessment</h2>
                    </div>
                    <div className="text-right mt-6 md:mt-0 font-sans">
                        <p className="text-slate-500 text-xs uppercase tracking-widest">Report ID</p>
                        <p className="text-white font-mono text-sm">{result.report_id.slice(0, 8)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Column 1: Risk Gauge & Summary (Width 4) */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-[#0a0a0a] border border-white/5 p-8 relative">
                            <div className="absolute top-0 right-0 p-4">
                                <RiskGauge score={result.risk_assessment.score} confidence={result.risk_assessment.confidence_rating} />
                            </div>
                            <h3 className="text-xl font-serif text-white mb-6">Executive Summary</h3>
                            <p className="text-slate-400 font-sans leading-relaxed text-sm">{result.risk_assessment.summary}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-serif text-white flex items-center">
                                <ShieldCheck className="w-4 h-4 mr-3 text-[#D4AF37]" /> Vesting Verification
                            </h3>
                            <div className="border-t border-white/10 pt-4 space-y-3 font-sans text-sm">
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-500 group-hover:text-white transition-colors">Owner on Record</span>
                                    <span className="text-white font-mono">{result.vesting_check.owner_on_record}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-500 group-hover:text-white transition-colors">Match Confirmed</span>
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${result.vesting_check.match_confirmed ? "bg-emerald-400 shadow-[0_0_12px_#34d399]" : "bg-rose-500 shadow-[0_0_12px_#f43f5e]"}`}></div>
                                        <span className="text-white tracking-widest text-xs">{result.vesting_check.match_confirmed ? "MATCH" : "MISMATCH"}</span>
                                    </div>
                                </div>
                                {result.vesting_check.issues.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        {result.vesting_check.issues.map((issue, i) => (
                                            <p key={i} className="text-rose-400 text-xs flex items-center mt-1"><span className="w-1 h-1 bg-rose-500 rounded-full mr-2"></span> {issue}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Liens (Width 4) */}
                    <div className="lg:col-span-4 border-l border-white/5 pl-0 lg:pl-12">
                        <h3 className="text-lg font-serif text-white mb-8 flex items-center">
                            <ClipboardList className="w-4 h-4 mr-3 text-slate-500" /> Encumbrances
                        </h3>
                        {result.open_liens.length > 0 ? (
                            <div className="space-y-8">
                                {result.open_liens.map((lien, i) => (
                                    <div key={i} className="group cursor-default">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-white font-serif text-lg group-hover:text-[#D4AF37] transition-colors">{lien.type}</span>
                                            <div className={`w-2 h-2 rounded-full ${lien.status === "UNRELEASED" ? "bg-rose-500 shadow-[0_0_12px_#f43f5e]" : "bg-amber-500 shadow-[0_0_12px_#f59e0b]"}`}></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-500 border-l border-white/10 pl-4 transition-all group-hover:border-[#D4AF37]">
                                            <div className="space-y-1">
                                                <p>Amount</p>
                                                <p className="text-slate-300 font-mono">${lien.amount?.toLocaleString()}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p>Recorded</p>
                                                <p className="text-slate-300">{lien.recorded_date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-32 flex items-center text-slate-600 text-sm italic font-serif">No active liens detected.</div>
                        )}
                    </div>

                    {/* Column 3: Curative (Width 4) */}
                    <div className="lg:col-span-4 border-l border-white/5 pl-0 lg:pl-12">
                        <h3 className="text-lg font-serif text-white mb-8 flex items-center">
                            <Hammer className="w-4 h-4 mr-3 text-slate-500" /> Curative Strategy
                        </h3>
                        {result.curative_actions.length > 0 ? (
                            <div className="space-y-8">
                                {result.curative_actions.map((action, i) => (
                                    <div key={i} className="relative">
                                        {action.priority === "HIGH" && (
                                            <span className="absolute -left-4 top-2 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_12px_#f43f5e]"></span>
                                        )}
                                        <p className="text-white text-sm font-medium mb-2 leading-relaxed">{action.instruction}</p>
                                        <p className="text-slate-500 text-xs italic font-serif pl-4 border-l border-white/5">"{action.reason}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-32 flex items-center text-slate-600 text-sm italic font-serif">Clean title. No action required.</div>
                        )}
                    </div>
                </div>

                {/* Optional Column 4: Geographic Intelligence (Full Width below) */}
                {result.geographic_intelligence && (
                    <div className="mt-12 w-full glass-card border border-white/10 p-8 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
                        {/* Status Glow Background */}
                        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none ${result.geographic_intelligence.risk_level === 'RED' ? 'bg-rose-500' :
                            result.geographic_intelligence.risk_level === 'YELLOW' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} />

                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 relative z-10">
                            <MapPin className={`w-8 h-8 ${result.geographic_intelligence.risk_level === 'RED' ? 'text-rose-500' :
                                result.geographic_intelligence.risk_level === 'YELLOW' ? 'text-amber-500' : 'text-emerald-500'
                                }`} />
                        </div>

                        <div className="relative z-10 flex-1">
                            <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.25em] mb-2 block">
                                {result.geographic_intelligence.state === "NJ" || result.geographic_intelligence.state === "New Jersey"
                                    ? "Garden State Compliance Alerts"
                                    : result.geographic_intelligence.state === "NY" || result.geographic_intelligence.state === "New York"
                                        ? "Empire State Intelligence Alerts"
                                        : result.geographic_intelligence.state === "FL" || result.geographic_intelligence.state === "Florida"
                                            ? "Sunshine State Risk Alerts"
                                            : result.geographic_intelligence.state === "TX" || result.geographic_intelligence.state === "Texas"
                                                ? "Lone Star State Strategic Alerts"
                                                : result.geographic_intelligence.state === "CA" || result.geographic_intelligence.state === "California"
                                                    ? "Golden State Compliance Alerts"
                                                    : "Geographic Intelligence Report"}
                            </span>
                            <h3 className="text-2xl font-serif text-white mb-4">
                                State Detection: <span className="text-[#D4AF37]">{result.geographic_intelligence.state}</span>
                            </h3>
                            <div className="bg-[#050505] border border-white/10 p-6 rounded-sm">
                                <div className="flex items-start">
                                    <div className="mt-1 mr-4">
                                        {result.geographic_intelligence.risk_level === 'RED' && (
                                            <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e] animate-pulse" />
                                        )}
                                        {result.geographic_intelligence.risk_level === 'YELLOW' && (
                                            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]" />
                                        )}
                                        {result.geographic_intelligence.risk_level === 'GREEN' && (
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" />
                                        )}
                                    </div>
                                    <p className="text-slate-300 font-sans text-sm leading-relaxed">
                                        {result.geographic_intelligence.action_step}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
}
