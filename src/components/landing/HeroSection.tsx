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
            {/* Background removed - handled globally in layout.tsx */}

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Left: Cinematic Copy */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="lg:col-span-7 space-y-8"
                >
                    <div className="inline-flex items-center space-x-3">
                        <div className="h-[1px] w-12 bg-[#D4AF37]/50"></div>
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em]">Imperial Alpha v1.0</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9]">
                        The Future of <br />
                        <span className="italic text-[#D4AF37] font-light">Real Estate</span> <br />
                        is Frictionless.
                    </h1>

                    <p className="text-lg font-sans text-slate-400 max-w-md leading-relaxed border-l border-white/10 pl-6">
                        Where elegance meets insight. Get a curated
                        <span className="text-white"> "Stoplight Report"</span> on Day 1 and orchestrate a seamless closing experience.
                    </p>

                    <div className="flex items-center space-x-6 pt-4">
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif text-white">60s</span>
                            <span className="text-xs text-[#D4AF37] uppercase tracking-widest">Analysis Time</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif text-white">100%</span>
                            <span className="text-xs text-[#D4AF37] uppercase tracking-widest">Zero-Retention</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Gold Glass Drop Zone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="lg:col-span-5 w-full"
                >
                    <div className="glass-gold p-1 rounded-sm relative group">
                        {/* Light Sweep Animation Container */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
                            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-all duration-1000 group-hover:animate-[shimmer_1.5s_infinite]" />
                        </div>

                        <div className="bg-[#0a0a0a]/90 p-8 border border-white/5 relative z-10 backdrop-blur-md">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-serif text-white italic">Instant Analysis</h3>
                                    <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">Upload Title Commitment</p>
                                </div>
                                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
                            </div>

                            <div className="bg-[#050505] border border-[#D4AF37]/20 p-2 transition-all duration-500 group-hover:border-[#D4AF37]/50">
                                <FileUpload onFileSelect={onFileSelect} isAnalyzing={isAnalyzing} />
                            </div>

                            <div className="mt-6 flex justify-between items-center text-xs text-slate-500 font-sans">
                                <span>Encrypted Stream</span>
                                <span className="flex items-center text-[#D4AF37]"><div className="w-1.5 h-1.5 bg-[#D4AF37] mr-2"></div> Standby</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
