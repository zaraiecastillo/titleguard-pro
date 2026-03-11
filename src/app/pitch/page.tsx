"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, X, ShieldCheck, Search, Activity, Lock, Maximize, Database, Ghost } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// We convert slides to a function so it can receive `activeStep` for intra-slide animations.
const getSlides = (activeStep: number) => [
    // Slide 1: Hook
    {
        id: "hook",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <ShieldCheck className="w-24 h-24 text-[#D4AF37] mb-8" />
                <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                    TitleGuard <span className="text-[#D4AF37] italic">AI</span>
                </h1>
                <p className="text-[#D4AF37] text-sm md:text-base font-sans uppercase tracking-[0.3em] mb-8">
                    The AI-Powered Early Warning System For Real Estate
                </p>
                <p className="text-xl md:text-3xl text-slate-300 font-sans leading-relaxed">
                    Turning every red light into a closed commission.
                </p>
            </div>
        )
    },
    // Slide 2: The Problem
    {
        id: "problem",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-rose-500 text-sm font-sans uppercase tracking-[0.2em] mb-4 block">The Problem</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-12">The 28-Day Disaster</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left">
                    <div className="glass-card p-8 border-l-4 border-rose-500/50">
                        <h3 className="text-2xl font-serif text-white mb-4">The Analog Wait</h3>
                        <p className="text-slate-400 font-sans leading-relaxed text-lg">
                            Real estate professionals wait weeks for manual Title Commitments. The system is inherently reactive.
                        </p>
                    </div>
                    <div className="glass-card p-8 border-l-4 border-rose-500/50">
                        <h3 className="text-2xl font-serif text-white mb-4">The Discovery</h3>
                        <p className="text-slate-400 font-sans leading-relaxed text-lg">
                            By the time a defect (zombie mortgage, unrecorded lien) is found on Day 28, the deal is delayed, buyers panic, and commissions are lost.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    // Slide 3: The Solution
    {
        id: "solution",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-emerald-500 text-sm font-sans uppercase tracking-[0.2em] mb-4 block">The Solution</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">Day 1 Certainty</h2>
                <div className="w-24 h-24 rounded-full border border-emerald-500/30 flex items-center justify-center mb-8 glass-card bg-emerald-500/10">
                    <ShieldCheck className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl text-[#D4AF37] font-serif italic mb-6">Proactive Clarity.</h3>
                <p className="text-xl md:text-2xl text-slate-300 font-sans max-w-3xl leading-relaxed">
                    TitleGuard AI analyzes live, public property records the moment a deal is signed, delivering a deterministic "Stoplight Report" on Day 1.
                </p>
            </div>
        )
    },
    // Slide 4: Demo
    {
        id: "demo",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-6xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">The Engine</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">No Uploads. No Waiting.</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <div className="glass-card p-8 flex flex-col items-center text-center">
                        <Search className="w-10 h-10 text-[#D4AF37] mb-6" />
                        <h3 className="text-xl font-serif text-white mb-4">1. Live Input</h3>
                        <p className="text-slate-400 text-sm font-sans">Enter an address. We tap directly into live public property records nationwide.</p>
                    </div>
                    <div className="glass-card p-8 flex flex-col items-center text-center relative">
                        <Database className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-xl font-serif text-white mb-4">2. AI Reasoning</h3>
                        <p className="text-slate-400 text-sm font-sans">Our AI maps entities and liens against statutory code to isolate deal-killers.</p>
                    </div>
                    <div className="glass-card p-8 flex flex-col items-center text-center">
                        <Activity className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-xl font-serif text-white mb-4">3. Stoplight Output</h3>
                        <p className="text-slate-400 text-sm font-sans">Instantly receive a clear Red, Yellow, or Green risk profile to act upon.</p>
                    </div>
                </div>
            </div>
        )
    },
    // Slide 5: Why Now
    {
        id: "market-timing",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">Market Timing</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">Why Now?</h2>
                <div className="glass-card p-12 max-w-4xl text-left border-l border-[#D4AF37]/30">
                    <h3 className="text-3xl text-white font-serif mb-6 leading-tight">The real estate transaction is digitizing, <br className="hidden md:block" />but <span className="text-[#D4AF37] italic">title remains analog</span>.</h3>
                    <p className="text-slate-300 text-xl font-sans leading-relaxed">
                        With severe new federal compliance laws (FinCEN 2026 mandates) and tightening broker margins, relying on post-signing manual title discovery is no longer viable. Brokerages absolutely <strong>need</strong> upfront certainty.
                    </p>
                </div>
            </div>
        )
    },
    // Slide 6: Market Size (Animated)
    {
        id: "tam",
        maxSteps: 3, // 0 = empty, 1 = TAM, 2 = SAM, 3 = SOM
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">The Opportunity</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-16">Market Size</h2>
                
                <div className="relative w-full max-w-3xl aspect-square md:aspect-[2/1] flex items-center justify-center">
                    {/* Concentric Circles Visualization */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: activeStep >= 1 ? 1 : 0, scale: activeStep >= 1 ? 1 : 0.9 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute w-[100%] aspect-square md:aspect-auto md:w-full md:h-full border border-white/5 rounded-full flex items-center justify-center"
                    >
                        <div className="absolute top-4 text-xs font-sans tracking-widest text-slate-500 uppercase">TAM: Total US Real Estate</div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: activeStep >= 2 ? 1 : 0, scale: activeStep >= 2 ? 1 : 0.8 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            className="w-[70%] aspect-square border border-white/10 rounded-full flex items-center justify-center bg-[#D4AF37]/5"
                        >
                            <div className="absolute top-[20%] text-xs font-sans tracking-widest text-[#D4AF37]/70 uppercase">SAM: Tech Brokerages & Agencies</div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: activeStep >= 3 ? 1 : 0, scale: activeStep >= 3 ? 1 : 0.5 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                                className="w-[40%] aspect-square border border-[#D4AF37]/40 rounded-full flex items-center justify-center bg-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                            >
                                <div className="text-center">
                                    <div className="text-xs font-sans tracking-widest text-white font-bold uppercase mb-1">SOM</div>
                                    <div className="text-[10px] text-slate-300">NY, NJ, FL, TX, CA</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        )
    },
    // Slide 7: Business Model
    {
        id: "business-model",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">Unit Economics</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-12">The Business Model</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    {[
                        { tier: "The Trial", price: "Free", text: "5 Audits / Seat" },
                        { tier: "The Professional", price: "$250 /mo", text: "50 Audits / Seat" },
                        { tier: "The Syndicate", price: "$900 /mo", text: "15-Seat Dashboard" },
                        { tier: "The Institution", price: "API", text: "Transactional Scale" }
                    ].map((item, i) => (
                        <div key={i} className={`glass-card p-6 border-t ${i === 1 ? 'border-[#D4AF37]' : 'border-white/10'} flex flex-col items-center justify-center h-48`}>
                            <h4 className="text-sm font-sans text-[#D4AF37] uppercase tracking-widest mb-4">{item.tier}</h4>
                            <div className="text-2xl font-serif text-white mb-2">{item.price}</div>
                            <p className="text-xs text-slate-400 font-sans">{item.text}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-slate-400 font-sans">
                    <Lock className="inline-block w-4 h-4 mr-2 text-[#D4AF37]" />
                    Built strictly on recurring SaaS and "Privacy-as-Infrastructure" compliance moats.
                </div>
            </div>
        )
    },
    // Slide 8: Roadmap
    {
        id: "roadmap",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">Vision</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-16">The Roadmap to Automated Curing</h2>
                
                <div className="flex flex-col md:flex-row items-start justify-between w-full relative">
                    <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                    
                    <div className="flex-1 px-4 mb-8 md:mb-0 relative text-left md:text-center">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 mx-auto mb-6 shadow-[0_0_15px_rgba(16,185,129,0.5)] hidden md:block" />
                        <h3 className="text-xl font-serif text-white mb-2">Phase 1: Live</h3>
                        <p className="text-sm text-emerald-500 font-sans tracking-widest uppercase mb-4">Direct-to-Agent</p>
                        <p className="text-slate-400 text-sm font-sans leading-relaxed">The current AI web platform and Day 1 immediate address search integration.</p>
                    </div>
                    
                    <div className="flex-1 px-4 mb-8 md:mb-0 relative text-left md:text-center">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF37] mx-auto mb-6 shadow-[0_0_15px_rgba(212,175,55,0.5)] hidden md:block" />
                        <h3 className="text-xl font-serif text-white mb-2">Phase 2: Ambient Layer</h3>
                        <p className="text-sm text-[#D4AF37] font-sans tracking-widest uppercase mb-4">API / CRM Extension</p>
                        <p className="text-slate-400 text-sm font-sans leading-relaxed">A Chrome Extension living directly inside broker CRMs for frictionless, zero-click analysis.</p>
                    </div>
                    
                    <div className="flex-1 px-4 relative text-left md:text-center">
                        <div className="w-4 h-4 rounded-full bg-white/20 mx-auto mb-6 hidden md:block" />
                        <h3 className="text-xl font-serif text-white mb-2">Phase 3: Post-Funding</h3>
                        <p className="text-sm text-slate-300 font-sans tracking-widest uppercase mb-4">Automated Curing</p>
                        <p className="text-slate-400 text-sm font-sans leading-relaxed">Moving from just *identifying* the risk to automatically generating the curative paperwork and filings.</p>
                    </div>
                </div>
            </div>
        )
    },
    // Slide 9: Team
    {
        id: "team",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">Founder-Market Fit</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-12">The Architect</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-12 text-left bg-black/40 glass-card p-1">
                    <div className="w-full md:w-1/3 aspect-[4/5] relative glass-card p-1 border-[#D4AF37] bg-black">
                        {/* We use a fallback div to ensure presentation works even if image is missing */}
                        <div className="w-full h-full bg-slate-900 absolute inset-0 -z-10" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src="/zaraie-founder.jpg" 
                            alt="Zaraie Castillo"
                            className="w-full h-full object-cover filter grayscale contrast-125 block"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    <div className="flex-1 p-8 md:p-12">
                        <h3 className="text-3xl font-serif text-[#D4AF37] italic mb-2">Zaraie Castillo</h3>
                        <p className="text-sm font-sans text-white uppercase tracking-widest mb-8 pb-4 border-b border-white/10">Founder & CEO</p>
                        <p className="text-slate-300 font-sans text-lg mb-6 leading-relaxed">
                            "I grew up in the New Jersey real estate market at Gonsosa Development & Florostone Realty. I watched my family lose deals on Week 4 because a hidden title defect blindsided them."
                        </p>
                        <p className="text-slate-400 font-sans text-lg leading-relaxed">
                            "I am building the intelligence layer that the previous generation lacked."
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    // Slide 10: Ask
    {
        id: "ask",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-6xl mx-auto px-6">
                <span className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-4 block">The Traction & The Ask</span>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-12">Funding Growth</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left">
                    <div className="">
                        <div className="mb-10">
                            <h3 className="text-xl text-[#D4AF37] font-sans tracking-widest uppercase mb-4">What We Have</h3>
                            <ul className="text-slate-300 font-sans text-lg space-y-3">
                                <li className="flex items-center"><ShieldCheck className="w-5 h-5 text-emerald-500 mr-3" /> Minimum Viable Product Live</li>
                                <li className="flex items-center"><ShieldCheck className="w-5 h-5 text-emerald-500 mr-3" /> Active OpenAI Reasoning Engine Pipeline</li>
                                <li className="flex items-center"><ShieldCheck className="w-5 h-5 text-emerald-500 mr-3" /> Stripe Monetization Architecture Deployed</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl text-white font-sans tracking-widest uppercase mb-4">The Round</h3>
                            <div className="text-4xl md:text-5xl font-serif text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                                $750k - $1M <span className="text-2xl text-slate-400 block mt-2 font-sans tracking-widest uppercase">Pre-Seed</span>
                            </div>
                            
                            <ul className="space-y-4 font-sans text-sm text-slate-400 border-t border-white/10 pt-6">
                                <li><strong className="text-white block mb-1">1. Proprietary Data Contracts</strong>Securing DataTree/Trace API access for "bank-grade", legally defensible audits.</li>
                                <li><strong className="text-white block mb-1">2. Engineering Scale</strong>Hiring engineers to automate the curative documentation pipeline.</li>
                                <li><strong className="text-white block mb-1">3. GTM Marketing</strong>Capturing the aggressive initial broker network in our launch states.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="glass-card p-10 flex flex-col items-center justify-center text-center bg-black/50">
                        <h3 className="text-2xl font-serif text-white mb-4">Join The Exclusive Beta</h3>
                        <p className="text-slate-400 font-sans mb-8">Scan the code below or join our waitlist to be first in line.</p>
                        
                        <div className="w-48 h-48 bg-white p-2 rounded-sm mb-8 flex items-center justify-center relative overflow-hidden group">
                            {/* Placeholder for QR Code - In production this would be next/image pointing to a real QR */}
                            <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center">
                                <span className="text-black font-mono font-bold text-center leading-tight">SCAN<br/>ME</span>
                            </div>
                            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <Link href="/waitlist" className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all">
                            Or Visit /Waitlist
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
];

export default function PitchDeck() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = getSlides(currentStep);
    
    // Explicit return type to fix TypeScript error implicitly assuming ReactNode
    const maxStepsForCurrentSlide = (slides[currentSlide] as { maxSteps?: number }).maxSteps || 0;

    const paginate = useCallback((newDirection: number) => {
        const nextSlide = currentSlide + newDirection;
        if (nextSlide >= 0 && nextSlide < slides.length) {
            setDirection(newDirection);
            setCurrentSlide(nextSlide);
            setCurrentStep(0); // Reset intra-slide steps when changing slides
        }
    }, [currentSlide, slides.length]);

    // Keyboard navigation with intra-slide step support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "Space" || e.key === "Enter") {
                if (currentStep < maxStepsForCurrentSlide) {
                    setCurrentStep(prev => prev + 1);
                } else {
                    paginate(1);
                }
            } else if (e.key === "ArrowLeft") {
                if (currentStep > 0) {
                    setCurrentStep(prev => prev - 1);
                } else {
                    paginate(-1); // Go back to previous slide, ideally to its maxStep (but simpler to just go to 0 for now)
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [paginate, currentStep, maxStepsForCurrentSlide]);

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    return (
        <main className="w-screen h-screen overflow-hidden bg-[#050505] relative text-white selection:bg-[#D4AF37] selection:text-black">
            
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.03),transparent_50%)]" />
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            </div>

            {/* Top Toolbar */}
            <div className="absolute top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-slate-300">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-serif italic tracking-wide">TitleGuard <span className="text-[#D4AF37]">AI</span></span>
                </div>
                <div className="flex items-center space-x-6">
                    <span className="font-mono text-xs opacity-50 tracking-widest">{String(currentSlide + 1).padStart(2, '0')} / {slides.length}</span>
                    <Link href="/" className="hover:text-white transition-colors" title="Exit Presentation">
                        <X className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Slide Container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                        }}
                        className="absolute w-full h-full"
                    >
                        {slides[currentSlide].content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Navigation Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-6">
                <button 
                    onClick={() => paginate(-1)}
                    disabled={currentSlide === 0}
                    className="p-3 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                
                {/* Progress Indicators */}
                <div className="flex space-x-2">
                    {slides.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentSlide ? 1 : -1);
                                setCurrentSlide(idx);
                            }}
                            className={`h-1 transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button 
                    onClick={() => {
                        if (currentStep < maxStepsForCurrentSlide) {
                            setCurrentStep(prev => prev + 1);
                        } else {
                            paginate(1);
                        }
                    }}
                    disabled={currentSlide === slides.length - 1 && currentStep === maxStepsForCurrentSlide}
                    className="p-3 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
            
        </main>
    );
}
