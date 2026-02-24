"use client";

import { Navbar } from "@/components/Navbar";
import { XCircle, CheckCircle, Calendar, Clock, AlertTriangle, ArrowRight, Puzzle, ShieldCheck, Chrome } from "lucide-react";
import { motion } from "framer-motion";

export default function SolutionPage() {
    return (
        <main className="min-h-screen relative overflow-hidden pt-24">
            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">The Paradigm Shift</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                            From <span className="text-rose-500 italic">Panic</span> to <span className="text-emerald-500 italic">Power</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto border-l border-[#D4AF37]/30 pl-6 text-left">
                            Why the old way is costing you deals, and how TitleGuard secures them.
                        </p>
                    </motion.div>
                </div>

                {/* Section 1: The Problem (Rose) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    <div className="order-2 lg:order-1 relative">
                        {/* Visual: Fractured Red Card */}
                        <div className="glass-card border-rose-500/20 bg-rose-950/20 p-8 relative overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
                            <div className="flex flex-col items-center justify-center py-12">
                                <Calendar className="w-24 h-24 text-rose-500/50 mb-4" />
                                <div className="text-rose-500 font-serif text-6xl relative z-10">
                                    28<span className="text-lg align-top">th</span>
                                </div>
                                <div className="text-rose-400/60 text-sm uppercase tracking-widest mt-2">Day of Disaster</div>
                            </div>
                            {/* Cracks/Noise Overlay */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay"></div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <XCircle className="w-5 h-5 text-rose-500" />
                            <span className="text-rose-500 text-xs font-sans uppercase tracking-[0.2em]">The Industry Standard</span>
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-6">The 28-Day <span className="text-rose-500">Disaster</span>.</h2>
                        <h3 className="text-xl text-slate-300 mb-6 italic">Stop Losing Deals to Last-Minute Title Defects.</h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-sans border-l-2 border-rose-500/20 pl-6">
                            The industry standard is to discover title issues 28 days into a transaction, days before closing.
                            This means <span className="text-rose-400">lost commissions</span>, embarrassed clients, and wasted time.
                            You are currently working blind.
                        </p>
                    </div>
                </motion.div>

                {/* Section 2: The Solution (Emerald) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    <div>
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-emerald-500 text-xs font-sans uppercase tracking-[0.2em]">The TitleGuard Way</span>
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-6">The Day 1 <span className="text-emerald-500">Advantage</span>.</h2>
                        <h3 className="text-xl text-slate-300 mb-6 italic">Turn Every Red Light Into a Closed Commission.</h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-sans border-l-2 border-emerald-500/20 pl-6">
                            TitleGuard AI transforms your workflow from reactive to proactive. By analyzing title commitments on <span className="text-emerald-400">Day 1</span>,
                            we identify closing-killers immediately, giving you the time to curate the solution before the deal is compromised.
                        </p>
                    </div>
                    <div className="relative">
                        {/* Visual: Glowing Green Card */}
                        <div className="glass-card border-emerald-500/20 bg-emerald-950/20 p-8 relative overflow-hidden transform rotate-[2deg] hover:rotate-0 transition-transform duration-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/10 to-transparent pointer-events-none" />

                            <div className="space-y-4 relative z-10">
                                {[
                                    "Instant Title Analysis", "Risk Assessment Complete", "Curative Plan Generated"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 p-3 bg-emerald-500/10 rounded-sm border border-emerald-500/10">
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                        <span className="text-emerald-100 font-sans text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <div className="text-emerald-400 font-serif text-5xl">Day 1</div>
                                <div className="text-emerald-500/60 text-sm uppercase tracking-widest mt-2">Deal Secured</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Section 3: Integration (Chrome Extension) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    <div className="order-2 lg:order-1 relative">
                        {/* Visual: MLS Page graphic with extension */}
                        <div className="glass-card border-[#D4AF37]/20 bg-[#050505]/80 p-6 relative overflow-hidden h-72 flex flex-col justify-center">
                            {/* Abstract MLS UI Background */}
                            <div className="absolute inset-8 border border-white/5 bg-white/[0.02] rounded-md flex flex-col p-4 pointer-events-none">
                                {/* Fake Nav */}
                                <div className="h-4 border-b border-white/10 flex items-center space-x-2 pb-2 mb-4 w-full">
                                    <div className="w-16 h-1.5 bg-slate-700/50 rounded-full" />
                                    <div className="w-10 h-1.5 bg-slate-700/50 rounded-full" />
                                </div>
                                {/* Fake Content Grid */}
                                <div className="flex-1 grid grid-cols-3 gap-4">
                                    <div className="col-span-2 space-y-2">
                                        <div className="w-full h-20 bg-slate-800/30 rounded-sm" />
                                        <div className="w-3/4 h-3 bg-slate-800/30 rounded-full" />
                                        <div className="w-1/2 h-3 bg-slate-800/30 rounded-full" />
                                    </div>
                                    <div className="col-span-1 border border-white/5 bg-slate-900/30 rounded-sm p-2 flex flex-col space-y-2">
                                        <div className="w-full h-8 bg-slate-800/50 rounded-sm" />
                                        <div className="w-full h-2 bg-slate-800/30 rounded-full" />
                                        <div className="w-3/4 h-2 bg-slate-800/30 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* The Gold Shield Extension Overlay */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                className="absolute top-10 right-10 z-20"
                            >
                                <div className="relative group cursor-pointer">
                                    <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-40 group-hover:opacity-70 transition-opacity rounded-full" />
                                    <div className="relative bg-[#0a0a0a] border border-[#D4AF37] p-3 rounded-lg shadow-2xl flex items-center justify-center transform group-hover:-translate-y-1 transition-transform">
                                        <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <Puzzle className="w-5 h-5 text-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em]">Ecosystem Integration</span>
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-6">Intelligence <span className="text-[#D4AF37] italic">Everywhere</span> You Work.</h2>
                        <h3 className="text-xl text-slate-300 mb-6 italic">Seamless Chrome Extension</h3>
                        <p className="text-slate-400 text-lg leading-relaxed font-sans border-l-2 border-[#D4AF37]/20 pl-6">
                            Whether you are in our professional dashboard or browsing the MLS, TitleGuard AI is with you.
                            Our Chrome Extension overlays our &apos;Stoplight&apos; intelligence directly onto your existing workflow.
                        </p>
                    </div>
                </motion.div>

                {/* Section 4: The Impact (Comparison Table) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif text-white">The ROI of Frictionless Real Estate</h2>
                    </div>

                    <div className="glass-card border border-white/10 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-transparent to-emerald-500" />

                        <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-6 text-xs uppercase tracking-widest font-bold text-slate-400">
                            <div>Metric</div>
                            <div className="text-rose-400">Old Way</div>
                            <div className="text-emerald-400">TitleGuard AI</div>
                        </div>

                        {[
                            { metric: "Title Search Time", old: "45-60 Hours", new: "60 Seconds", icon: Clock },
                            { metric: "Issue Discovery", old: "Day 28 (Disaster)", new: "Day 1 (Solution)", icon: AlertTriangle },
                            { metric: "Deal Status", old: "Reactive / Chaotic", new: "Proactive / Managed", icon: CheckCircle },
                        ].map((row, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                                <div className="text-white font-serif flex items-center">
                                    <row.icon className="w-4 h-4 text-[#D4AF37] mr-3 opacity-70" />
                                    {row.metric}
                                </div>
                                <div className="text-rose-400/80 font-sans text-sm">{row.old}</div>
                                <div className="text-emerald-400 font-sans font-bold text-sm shadow-emerald-500/20">{row.new}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <div className="text-center">
                    <button className="px-8 py-4 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        Start Your Free Trial
                    </button>
                    <p className="mt-4 text-slate-500 text-xs">No credit card required for first scan.</p>
                </div>

            </div>
        </main>
    );
}
