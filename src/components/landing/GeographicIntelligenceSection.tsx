"use client";

import { motion } from "framer-motion";
import { Map, ShieldCheck, FileSearch, Target } from "lucide-react";

export function GeographicIntelligenceSection() {
    return (
        <section className="py-24 px-6 md:px-12 relative z-20 bg-[#050505] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.25em] mb-4 block">
                        2026 Baseline
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                        Geographic Intelligence
                    </h2>
                    <p className="text-slate-400 font-sans max-w-2xl mx-auto text-lg">
                        Precision-engineered for the current legal landscape. No black boxes—just clear, jurisdictional intelligence.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Current Status Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card border border-white/10 p-10 rounded-sm relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] pointer-events-none" />

                        <div className="w-12 h-12 rounded-full bg-[#1A1612] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D4AF37] transition-colors relative z-10">
                            <Map className="text-[#D4AF37] w-6 h-6" />
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-6 relative z-10">Current Status</h3>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <h4 className="text-[#D4AF37] text-sm uppercase tracking-widest font-sans mb-2">Active Markets</h4>
                                <p className="text-white font-serif text-lg">NJ, NY, FL, TX, CA</p>
                            </div>

                            <div>
                                <h4 className="text-[#D4AF37] text-sm uppercase tracking-widest font-sans mb-2">The Core Logic</h4>
                                <p className="text-slate-400 font-sans text-sm leading-relaxed">
                                    We have manually integrated high-impact 2026 mandates into our engine, including the March 1st FinCEN RRE Rule (Federal), the NY LLC Transparency Act, and Texas SB 1968.
                                </p>
                            </div>

                            <div className="bg-black/40 border border-[#D4AF37]/20 p-4 rounded-sm">
                                <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest font-sans mb-2 flex items-center">
                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                    Transparency Note
                                </h4>
                                <p className="text-slate-300 font-sans text-xs leading-relaxed italic">
                                    Our current engine utilizes a static legal knowledge base curated by our founding team. It is current as of February 2026 and provides a high-accuracy 'Early Warning' for these high-volume jurisdictions.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Vision (Roadmap) Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card border border-white/10 p-10 rounded-sm relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#1A1612] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D4AF37] transition-colors relative z-10">
                            <Target className="text-[#D4AF37] w-6 h-6" />
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-6 relative z-10">The Vision</h3>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <h4 className="text-white text-lg font-serif mb-3 flex items-center">
                                    <FileSearch className="w-5 h-5 mr-3 text-[#D4AF37]" />
                                    Project Sentinel
                                </h4>
                                <p className="text-slate-400 font-sans text-sm leading-relaxed pl-8 border-l border-white/10 ml-2">
                                    Following our initial seed round, we will transition from manual curation to an Automated Compliance Sync, utilizing RAG-architecture to monitor legislative feeds across all 50 states.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Callout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center max-w-3xl mx-auto pt-8 border-t border-white/5"
                >
                    <p className="text-slate-500 font-mono text-[11px] leading-relaxed uppercase tracking-wider">
                        Transparency is our policy. TitleGuard PRO provides risk detection based on specific 2026 statutes, intended to augment—not replace—professional legal counsel.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
