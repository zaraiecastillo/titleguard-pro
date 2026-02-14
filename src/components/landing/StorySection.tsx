"use client";

import { motion } from "framer-motion";
import { Clock, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function StorySection() {
    return (
        <section id="problem" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The "Dead Grandfather" Risk</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        In the old way, you find out about the missing heir (the "dead grandfather" on the deed)
                        <span className="text-rose-500 font-bold"> 28 days</span> into the transaction.
                        With TitleGuard, you know on <span className="text-emerald-500 font-bold">Day 1</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Old Way */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mr-4">
                                <Clock className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-300">The Old Way</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <XCircle className="w-5 h-5 text-rose-500 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-400">Manual Search: <span className="text-white">45+ Hours</span></span>
                            </li>
                            <li className="flex items-start">
                                <XCircle className="w-5 h-5 text-rose-500 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-400">1-in-8 deals delayed by "Late Discovery"</span>
                            </li>
                            <li className="flex items-start">
                                <XCircle className="w-5 h-5 text-rose-500 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-400">Static PDFs that no one reads</span>
                            </li>
                            <li className="flex items-start">
                                <XCircle className="w-5 h-5 text-rose-500 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-400">Reactive Curative (Fire Drilling)</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* TitleGuard New Way */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900/50 backdrop-blur-md relative"
                    >
                        <div className="absolute -top-4 -right-4 bg-emerald-500 text-slate-950 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                            Game Changer
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                                <Zap className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">TitleGuard AI</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-300">AI Analysis: <span className="text-white font-bold">60 Seconds</span></span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-300">Instant "Stoplight Report"</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-300">Proactive Curative Instructions</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-slate-300">Zero-Retention Security</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
