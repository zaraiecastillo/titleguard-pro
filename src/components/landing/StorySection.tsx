"use client";

import { motion } from "framer-motion";
import { Clock, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function StorySection() {
    return (
        <section id="problem" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">The "Dead Grandfather" Risk</h2>
                    <p className="text-slate-400 text-lg font-sans leading-relaxed">
                        In the old way, you find out about the missing heir (the "dead grandfather" on the deed)
                        <span className="text-rose-500 font-medium"> 28 days</span> into the transaction.
                        With TitleGuard, you know on <span className="text-[#D4AF37] font-medium">Day 1</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Old Way */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-sm border border-white/5 bg-white/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#1A1612] flex items-center justify-center mr-4 border border-white/5">
                                <Clock className="w-6 h-6 text-slate-500" />
                            </div>
                            <h3 className="text-2xl font-serif text-slate-300">The Old Way</h3>
                        </div>
                        <ul className="space-y-6 font-sans">
                            <li className="flex items-start">
                                <span className="text-rose-500 mr-4 font-serif text-lg">01.</span>
                                <div>
                                    <span className="text-slate-400 block text-xs uppercase tracking-widest mb-1">Manual Search</span>
                                    <span className="text-white">45+ Hours of waiting</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-rose-500 mr-4 font-serif text-lg">02.</span>
                                <div>
                                    <span className="text-slate-400 block text-xs uppercase tracking-widest mb-1">Risk Factor</span>
                                    <span className="text-white">1-in-8 deals delayed</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-rose-500 mr-4 font-serif text-lg">03.</span>
                                <div>
                                    <span className="text-slate-400 block text-xs uppercase tracking-widest mb-1">Format</span>
                                    <span className="text-white">Static PDFs</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* TitleGuard New Way */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-sm border border-[#D4AF37]/30 bg-[#0a0a0a]/80 backdrop-blur-md relative"
                    >
                        <div className="absolute -top-3 -right-3 bg-[#D4AF37] text-black font-sans font-bold px-4 py-1 text-[10px] uppercase tracking-widest shadow-[0_0_15px_#D4AF37]">
                            Imperial Standard
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mr-4 border border-[#D4AF37]/20">
                                <Zap className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <h3 className="text-2xl font-serif text-white">TitleGuard AI</h3>
                        </div>
                        <ul className="space-y-6 font-sans">
                            <li className="flex items-start">
                                <span className="text-[#D4AF37] mr-4 font-serif text-lg">01.</span>
                                <div>
                                    <span className="text-slate-500 block text-xs uppercase tracking-widest mb-1">AI Analysis</span>
                                    <span className="text-white">60 Seconds</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#D4AF37] mr-4 font-serif text-lg">02.</span>
                                <div>
                                    <span className="text-slate-500 block text-xs uppercase tracking-widest mb-1">Deliverable</span>
                                    <span className="text-white">Instant "Stoplight Report"</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#D4AF37] mr-4 font-serif text-lg">03.</span>
                                <div>
                                    <span className="text-slate-500 block text-xs uppercase tracking-widest mb-1">Security</span>
                                    <span className="text-white">Zero-Retention Architecture</span>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
