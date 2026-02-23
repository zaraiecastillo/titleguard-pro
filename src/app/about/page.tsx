"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen relative overflow-hidden pt-24 pb-32">
            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">The Genesis</span>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                            Born from <span className="text-[#D4AF37] italic">Experience</span>.<br />Built for <span className="text-white italic">Certainty</span>.
                        </h1>
                    </motion.div>
                </div>

                {/* Founder's Letter */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="glass-card border border-white/10 bg-[#050505]/60 p-8 md:p-16 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10 prose prose-invert prose-lg max-w-none font-serif text-slate-300 leading-relaxed">
                        <p>
                            To my fellow Real Estate Professionals,
                        </p>
                        <p>
                            We've all been there. You've nurtured the client, negotiated the deal, navigated the inspections, and finally have a clear path to closing. You are counting the commission.
                        </p>
                        <p>
                            Then, on Day 28, the title commitment arrives. "Unreleased mechanics lien." "Unknown heir in the chain of title." "Boundary dispute." Panic sets in. The closing is delayed, the client is furious, and the deal is in jeopardy.
                        </p>
                        <p>
                            I built TitleGuard AI because I was tired of operating in the dark. I was tired of the reactive, archaic way the industry handles title research. It shouldn't take a month to discover a problem that could have been resolved on Day 1.
                        </p>
                        <p>
                            TitleGuard AI isn't just a software tool; it's a paradigm shift. We use institutional-grade reasoning engines to instantly parse, cross-reference, and risk-weight title documentation the moment a contract is signed. We give you back your time, your sanity, and your deals.
                        </p>

                        <div className="mt-16 pt-8 border-t border-white/10 text-center">
                            <h3 className="text-2xl text-[#D4AF37] font-serif mb-2">Our Mission Statement</h3>
                            <p className="font-sans text-base md:text-lg tracking-wide text-[#D4AF37]">
                                "To eliminate the friction of real estate transactions through proactive intelligence."
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
