"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Map, Scale, FileWarning, Briefcase, Info } from "lucide-react";

export function JurisdictionalLogicTabs() {
    return (
        <div className="w-full max-w-5xl mx-auto my-32 px-6">
            {/* Header Section */}
            <div className="text-center mb-16">
                <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">
                    Inside the Engine
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    Current Knowledge <span className="text-[#D4AF37] italic">Base</span>
                </h2>
                <p className="text-slate-400 font-sans max-w-3xl mx-auto leading-relaxed">
                    We believe in full transparency for our institutional partners. Our AI currently operates on a targeted knowledge base of the 20% of legal defects that cause 80% of closing delays. Here is exactly what we have deployed:
                </p>
            </div>

            {/* Deployment Table (Stylized Grid) */}
            <div className="glass-card border border-white/5 rounded-lg overflow-hidden mb-12">
                <div className="grid grid-cols-1 divide-y divide-white/10">

                    {/* Federal Row */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/[0.02] transition-colors group">
                        <div className="md:w-1/4 flex-shrink-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                                <h3 className="text-xl font-serif text-white">FEDERAL</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                                    Active
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-800 text-slate-300 border border-slate-700 tracking-wider uppercase">
                                    Static Statutory Curation
                                </span>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base border-l-2 border-[#D4AF37]/30 pl-4 group-hover:border-[#D4AF37] transition-colors">
                                Full detection for the March 1, 2026 FinCEN Residential Real Estate Rule for non-financed entity purchases.
                            </p>
                        </div>
                    </div>

                    {/* New Jersey Row */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/[0.02] transition-colors group">
                        <div className="md:w-1/4 flex-shrink-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <Map className="w-5 h-5 text-[#D4AF37]" />
                                <h3 className="text-xl font-serif text-white">NEW JERSEY</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                                    Active
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-800 text-slate-300 border border-slate-700 tracking-wider uppercase">
                                    Static Statutory Curation
                                </span>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base border-l-2 border-[#D4AF37]/30 pl-4 group-hover:border-[#D4AF37] transition-colors">
                                N.J.S.A. 3B:28-3 Spousal Possession rights and NJDEP Tidelands/Riparian claim detection.
                            </p>
                        </div>
                    </div>

                    {/* New York Row */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/[0.02] transition-colors group">
                        <div className="md:w-1/4 flex-shrink-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <Scale className="w-5 h-5 text-[#D4AF37]" />
                                <h3 className="text-xl font-serif text-white">NEW YORK</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                                    Active
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-800 text-slate-300 border border-slate-700 tracking-wider uppercase">
                                    Static Statutory Curation
                                </span>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base border-l-2 border-[#D4AF37]/30 pl-4 group-hover:border-[#D4AF37] transition-colors">
                                NY LLC Transparency Act (Jan 2026) compliance and CEMA Tax Savings opportunity alerts.
                            </p>
                        </div>
                    </div>

                    {/* Texas Row */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/[0.02] transition-colors group">
                        <div className="md:w-1/4 flex-shrink-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <Briefcase className="w-5 h-5 text-[#D4AF37]" />
                                <h3 className="text-xl font-serif text-white">TEXAS</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                                    Active
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-800 text-slate-300 border border-slate-700 tracking-wider uppercase">
                                    Static Statutory Curation
                                </span>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base border-l-2 border-[#D4AF37]/30 pl-4 group-hover:border-[#D4AF37] transition-colors">
                                SB 1968 Buyer Representation mandatory agreement checks and Texas Homestead joinder logic.
                            </p>
                        </div>
                    </div>

                    {/* California Row */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:bg-white/[0.02] transition-colors group">
                        <div className="md:w-1/4 flex-shrink-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <FileWarning className="w-5 h-5 text-[#D4AF37]" />
                                <h3 className="text-xl font-serif text-white">CALIFORNIA</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                                    Active
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-800 text-slate-300 border border-slate-700 tracking-wider uppercase">
                                    Static Statutory Curation
                                </span>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base border-l-2 border-[#D4AF37]/30 pl-4 group-hover:border-[#D4AF37] transition-colors">
                                AB 945 AI-Photo disclosure mandates and PACE/Solar Lien priority assessment.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* The Roadmap Disclaimer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-md p-6 md:p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Info className="w-32 h-32 text-[#D4AF37]" />
                </div>

                <h4 className="text-[#D4AF37] font-serif text-xl mb-4 relative z-10 flex items-center">
                    <Info className="w-5 h-5 mr-3" />
                    The Roadmap Disclaimer
                </h4>

                <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed relative z-10 max-w-4xl">
                    TitleGuard PRO is a High-Fidelity Early Warning System. All logic is manually verified against 2026 legislative sessions. As we scale, we plan to transition to an automated statutory sync (Project Sentinel). Until then, we provide the most accurate manual logic-layer available for the Big 5 markets.
                </p>
            </motion.div>
        </div>
    );
}
