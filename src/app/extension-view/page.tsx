"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck, AlertTriangle, ExternalLink, Activity } from "lucide-react";
import { UpgradeModal } from "@/components/UpgradeModal";

type AnalysisResult = {
    risk_assessment: {
        score: "GREEN" | "YELLOW" | "RED";
        summary: string;
    };
    curative_actions: Array<{
        priority: "HIGH" | "MEDIUM";
        instruction: string;
    }>;
};

export default function ExtensionView() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <ExtensionViewContent />
        </Suspense>
    );
}

function ExtensionViewContent() {
    const searchParams = useSearchParams();
    const address = searchParams.get("address");
    const pdfUrl = searchParams.get("pdfUrl");

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    useEffect(() => {
        const analyzeTarget = async () => {
            if (!address && !pdfUrl) {
                // Wait for params or show default state if extension hasn't sent data yet
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            // 1. Gatekeeper Check
            try {
                const tierRes = await fetch("/api/user/tier");
                const { tier } = await tierRes.json();

                if (tier !== "pro" && tier !== "one_time") {
                    setIsUpgradeModalOpen(true);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Failed to check user tier", err);
            }

            // 2. Proceed with Analysis
            const formData = new FormData();
            if (address) formData.append("address", address);
            if (pdfUrl) formData.append("pdfUrl", pdfUrl);

            try {
                const response = await fetch("/api/analyze", { method: "POST", body: formData });
                if (!response.ok) throw new Error("Analysis failed");
                const data = await response.json();
                setResult(data);
            } catch (err) {
                setError("Failed to analyze property data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        analyzeTarget();
    }, [address, pdfUrl]);

    const getScoreColor = (score: string) => {
        switch (score) {
            case 'GREEN': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
            case 'YELLOW': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
            case 'RED': return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
            default: return 'text-slate-400 bg-slate-800/50 border-slate-700';
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] font-sans text-slate-300 p-4">
            {/* Narrow Container for Side Panel */}
            <div className="max-w-[350px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
                    <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg font-serif text-white tracking-wide">
                        TitleGuard <span className="text-[#D4AF37]">AI</span>
                    </span>
                </div>

                {/* Content */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className="text-xs font-mono text-slate-400 animate-pulse text-center">
                            Analyzing Title Intel...<br />
                            <span className="text-[10px] text-slate-500">{address || 'Extracted Document'}</span>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-rose-950/30 border border-rose-900 rounded-sm text-rose-300 text-sm flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {!loading && !error && !result && (
                    <div className="text-center py-12">
                        <Activity className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                        <p className="text-sm text-slate-400">Awaiting property data from extension...</p>
                    </div>
                )}

                {!loading && result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Target Info */}
                        {address && (
                            <div className="text-xs font-mono text-slate-500 border-l-2 border-[#D4AF37] pl-2">
                                TARGET: {address}
                            </div>
                        )}

                        {/* Stoplight Score */}
                        <div className={`p-4 rounded-sm border ${getScoreColor(result.risk_assessment.score)} relative overflow-hidden`}>
                            <h3 className="text-xs uppercase tracking-widest mb-2 font-bold opacity-80">Risk Assessment</h3>
                            <div className="text-2xl font-serif text-white mb-2">{result.risk_assessment.score}</div>
                            <p className="text-sm leading-relaxed opacity-90">{result.risk_assessment.summary}</p>

                            {/* Subtle Glow Background */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-current opacity-10 blur-xl"></div>
                        </div>

                        {/* Action Items */}
                        {result.curative_actions.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest border-b border-white/5 pb-2">Required Actions ({result.curative_actions.length})</h3>
                                <ul className="space-y-3">
                                    {result.curative_actions.map((action, idx) => (
                                        <li key={idx} className="bg-white/[0.03] border border-white/5 p-3 rounded-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold tracking-wider uppercase text-white px-2 py-0.5 rounded-sm bg-black/50 border border-white/10">
                                                    Action 0{idx + 1}
                                                </span>
                                                <span className={`text-[10px] uppercase font-bold tracking-wider ${action.priority === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`}>
                                                    {action.priority} Priority
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                {action.instruction}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Main CTA */}
                        <div className="pt-4 border-t border-white/10">
                            <a
                                href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full group flex items-center justify-center space-x-2 bg-[#D4AF37] text-black hover:bg-white transition-colors duration-300 py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-widest"
                            >
                                <span>Open Full Report in TitleGuard Pro</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                )}
            </div>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                title="Premium Feature"
                description="The Chrome Extension overlay requires an active Pro Membership or One-Time pass. Upgrade to unlock intelligence everywhere."
            />
        </main>
    );
}
