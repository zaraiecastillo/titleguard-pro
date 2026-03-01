"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileUpload } from "@/components/FileUpload";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Chrome, Loader2, Shield } from "lucide-react";
import { UpgradeModal } from "@/components/UpgradeModal";

interface HeroSectionProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
}

export function HeroSection({ onFileSelect, isAnalyzing }: HeroSectionProps) {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [isCheckingTier, setIsCheckingTier] = useState(false);
    const [highlightPulse, setHighlightPulse] = useState(false);

    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === "#demo") {
                setHighlightPulse(true);
                setTimeout(() => setHighlightPulse(false), 3000); // 3-second glow pulse
            }
        };

        checkHash();
        window.addEventListener("hashchange", checkHash);
        return () => window.removeEventListener("hashchange", checkHash);
    }, []);

    const handleFileSelect = async (file: File) => {
        setIsCheckingTier(true);
        try {
            const res = await fetch("/api/user/tier");
            const data = await res.json();

            if (data.tier === "pro" || data.tier === "one_time") {
                onFileSelect(file);
            } else {
                setIsUpgradeModalOpen(true);
            }
        } catch (error) {
            console.error("Failed to check user tier:", error);
            // Default open modal if DB check fails
            setIsUpgradeModalOpen(true);
        } finally {
            setIsCheckingTier(false);
        }
    };

    return (
        <section id="demo" className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden">
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
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em]">The AI-Powered Early Warning System For Real Estate</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9]">
                        The Future of <br />
                        <span className="italic text-[#D4AF37] font-light">Real Estate</span> <br />
                        is Frictionless.
                    </h1>

                    <p className="text-lg font-sans text-slate-400 max-w-md leading-relaxed border-l border-white/10 pl-6">
                        Where elegance meets insight. Our AI-powered early warning system flags title defects on Day 1, allowing you to orchestrate a seamless closing experience.
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
                        <div className="h-8 w-[1px] bg-white/10"></div>
                        <div className="flex flex-col">
                            <Shield className="w-7 h-7 text-white mb-1 stroke-1" />
                            <span className="text-xs text-[#D4AF37] uppercase tracking-widest">Proactive Risk Detection</span>
                        </div>
                    </div>

                    {/* Partnership Narrative */}
                    <div className="flex items-center space-x-3 pt-6 border-t border-white/5 w-fit">
                        <Handshake className="w-5 h-5 text-[#D4AF37] stroke-[1.5]" />
                        <span className="font-sans italic text-sm tracking-wide text-slate-300">The AI partner for the modern real estate firm.</span>
                    </div>

                    {/* Chrome Web Store Badge */}
                    <div className="pt-2">
                        <Link href="/solution#current-delivery" className="inline-flex flex-col space-y-1 bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 px-4 py-2.5 rounded-sm transition-all group backdrop-blur-sm">
                            <div className="flex items-center space-x-3">
                                <Chrome className="w-5 h-5 text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
                                <span className="text-xs font-sans text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest font-semibold flex items-center">
                                    Extension Roadmap
                                </span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-sans tracking-wide pl-8 group-hover:text-slate-400 transition-colors">
                                Ambient Analysis Integration (In Development)
                            </span>
                        </Link>
                    </div>
                </motion.div>

                {/* Right: Gold Glass Drop Zone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="lg:col-span-5 w-full"
                >
                    <div className={`glass-gold p-1 rounded-sm relative group transition-all duration-1000 ${highlightPulse ? 'ring-4 ring-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.7)] scale-[1.02]' : ''
                        }`}>
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

                            <div className="bg-[#050505] border border-[#D4AF37]/20 p-2 transition-all duration-500 group-hover:border-[#D4AF37]/50 relative">
                                {isCheckingTier && (
                                    <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
                                    </div>
                                )}
                                <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing || isCheckingTier} />
                            </div>

                            <div className="mt-6 flex justify-between items-center text-xs text-slate-500 font-sans">
                                <span>Encrypted Stream</span>
                                <span className="flex items-center text-[#D4AF37]"><div className="w-1.5 h-1.5 bg-[#D4AF37] mr-2"></div> Standby</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                title="Premium Intelligence Required"
                description="Secure PDF uploading and analysis require an active Pro Membership or a One-Time pass. Upgrade your account to unlock."
            />
        </section>
    );
}
