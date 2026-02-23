"use client";

import { Navbar } from "@/components/Navbar";
import { Upload, Cpu, FileCheck, ScanLine, Database, Scale, ArrowRight, ShieldAlert, Check, TriangleAlert, CircleX } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function IntelligencePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scanLineTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const steps = [
        {
            icon: ScanLine,
            title: "Optical Extraction",
            subtitle: "High-Fidelity Ingestion",
            description: "We do not simply 'read' the PDF. Our engine performs pixel-perfect OCR to map the legal description, schedule B exceptions, and requirement chains into a structured JSON data model.",
        },
        {
            icon: Scale,
            title: "Logical Cross-Referencing",
            subtitle: "Probate & Heirship Logic",
            description: "The Reasoning Engine validates the Grantee on the last recorded deed against current vesting requirements. It cross-references local probate statutes to identify silent breakages in the chain of title.",
        },
        {
            icon: ShieldAlert,
            title: "Risk Stratification",
            subtitle: "Proprietary Weighting",
            description: "Every identified encumbrance is assigned a risk weight based on Underwriter guidelines. We calculate the mathematical probability of a curative action being required to insure.",
        }
    ];

    const pipeline = [
        { label: "Raw PDF Input", icon: Upload },
        { label: "Entity Mapping", icon: Database },
        { label: "Statutory Check", icon: Scale },
        { label: "Stoplight Output", icon: FileCheck },
    ];

    return (
        <main ref={containerRef} className="min-h-screen relative overflow-hidden pt-24">
            <Navbar />

            {/* Intelligent Scanning Beam */}
            <motion.div
                style={{ top: scanLineTop }}
                className="fixed left-0 w-full h-[2px] bg-[#D4AF37] z-50 shadow-[0_0_20px_#D4AF37] opacity-50 pointer-events-none"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">The Mechanism</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                            The Reasoning <span className="text-[#D4AF37] italic">Engine</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto border-l border-[#D4AF37]/30 pl-6 text-left">
                            Beyond keyword search. A deterministic audit of title risk using statutory logic and entity mapping.
                        </p>
                    </motion.div>
                </div>

                {/* Technical Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="glass-card p-8 group hover:border-[#D4AF37]/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <step.icon size={64} className="text-[#D4AF37]" />
                            </div>

                            <div className="w-12 h-12 rounded-full bg-[#1A1612] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all relative z-10">
                                <step.icon className="text-[#D4AF37]" size={24} />
                            </div>

                            <h3 className="text-2xl font-serif text-white mb-1 relative z-10">
                                {step.title}
                            </h3>
                            <h4 className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4 font-sans relative z-10">{step.subtitle}</h4>

                            <p className="text-slate-400 font-sans leading-relaxed relative z-10 text-sm">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mb-24"
                >
                    <div className="flex items-center space-x-4 mb-12 justify-center">
                        <div className="h-[1px] w-12 bg-[#D4AF37]/50"></div>
                        <h2 className="text-3xl font-serif text-white text-center">System Architecture</h2>
                        <div className="h-[1px] w-12 bg-[#D4AF37]/50"></div>
                    </div>


                    <div className="glass-card border border-[#D4AF37]/10 p-12 relative overflow-hidden">
                        {/* Background Grid for Diagram */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                            {pipeline.map((node, i) => (
                                <div key={i} className="flex flex-col md:flex-row items-center">
                                    {/* Node */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 glass-gold rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)] relative group">
                                            <div className="absolute inset-0 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
                                            <node.icon className="text-white w-8 h-8" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest mb-1">Step 0{i + 1}</div>
                                            <div className="text-white font-serif text-lg">{node.label}</div>
                                        </div>
                                    </div>

                                    {/* Connector */}
                                    {i < pipeline.length - 1 && (
                                        <div className="hidden md:flex items-center px-4">
                                            <div className="h-[1px] w-16 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 relative">
                                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 bg-[#D4AF37] rounded-full animate-[ping_1.5s_infinite]" />
                                                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 bg-[#D4AF37] rounded-full" />
                                            </div>
                                        </div>
                                    )}
                                    {/* Mobile Connector */}
                                    {i < pipeline.length - 1 && (
                                        <div className="md:hidden h-12 w-[1px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 my-4"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Stoplight Interactive Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 relative z-10"
                >
                    <div className="text-center mb-16">
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">Risk Analysis</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">The Anatomy of <span className="text-[#D4AF37] italic">Clarity</span></h2>
                    </div>

                    <div className="glass-card backdrop-blur-xl bg-black/40 border border-white/5 p-1 rounded-sm overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            {[
                                {
                                    title: "Verified & Clear",
                                    icon: Check,
                                    color: "text-emerald-500",
                                    bgHover: "hover:bg-emerald-500/5",
                                    borderColor: "group-hover:border-emerald-500/50 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]",
                                    desc: "No title clouds detected. The transaction is cleared for final underwriting."
                                },
                                {
                                    title: "Actionable Curative",
                                    icon: TriangleAlert,
                                    color: "text-amber-500",
                                    bgHover: "hover:bg-amber-500/5",
                                    borderColor: "group-hover:border-amber-500/50 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]",
                                    desc: "Minor discrepancies found (e.g., missing signature, name variance). Requires curative action to proceed."
                                },
                                {
                                    title: "Critical Deal-Killer",
                                    icon: CircleX,
                                    color: "text-rose-500",
                                    bgHover: "hover:bg-rose-500/5",
                                    borderColor: "group-hover:border-rose-500/50 group-hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]",
                                    desc: "Major title defect detected (e.g., unreleased mortgage, probate requirement). Immediate intervention required."
                                }
                            ].map((item, i) => (
                                <div key={i} className={`p-10 transition-all duration-500 ${item.bgHover} group relative`}>
                                    <div className={`w-16 h-16 rounded-full bg-[#1A1612] border border-white/10 flex items-center justify-center mb-8 mx-auto transition-colors ${item.borderColor}`}>
                                        <item.icon className={`w-8 h-8 ${item.color}`} />
                                    </div>
                                    <h3 className={`text-2xl font-serif text-white text-center mb-4 group-hover:scale-105 transition-transform duration-300`}>{item.title}</h3>
                                    <p className="text-slate-400 text-center font-sans text-sm leading-relaxed max-w-xs mx-auto group-hover:text-slate-300 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Technical Footnote */}
                <div className="text-center max-w-3xl mx-auto border-t border-white/5 pt-12">
                    <p className="text-slate-500 font-mono text-xs leading-relaxed">
                        * The Reasoning Engine operates on a deterministic model. Unlike generative LLMs which may hallucinate facts,
                        TitleGuard's resolution layer is strictly bound by the <span className="text-[#D4AF37]">statutory framework</span> of the subject property's jurisdiction.
                    </p>
                </div>

            </div>
        </main>
    );
}
