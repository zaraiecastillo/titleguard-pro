"use client";

import { motion } from "framer-motion";
import { FileUpload } from "@/components/FileUpload";
import Image from "next/image";

interface HeroSectionProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
}

export function HeroSection({ onFileSelect, isAnalyzing }: HeroSectionProps) {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="/bg-premium.png"
                    alt="Modern Skyscraper"
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        Title Intelligence Engine v1.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Real Estate
                        </span>{" "}
                        is Frictionless.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
                        Stop being the last person to know why your deal is dying. Get a professional
                        <span className="text-white font-semibold"> "Stoplight Report"</span> on Day 1 and turn every
                        "Closing Killer" into a closed commission.
                    </p>
                </motion.div>

                {/* Right: Interactive Drop Zone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full"
                >
                    <div className="glass-card p-8 rounded-3xl border-t border-white/20 relative overflow-hidden group">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Instant Risk Analysis</h3>
                            <p className="text-slate-400 mb-6 text-sm">Upload a Title Commitment, Deed, or Lien Doc.</p>

                            <div className="bg-slate-900/50 rounded-xl p-2 border border-slate-800/50">
                                <FileUpload onFileSelect={onFileSelect} isAnalyzing={isAnalyzing} />
                            </div>

                            <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-slate-500">
                                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div> Zero-Retention</span>
                                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div> Bank-Grade Encryption</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
