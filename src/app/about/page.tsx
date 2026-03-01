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
                            A Legacy of Real Estate.<br />A Future of Intelligence.
                        </h1>
                    </motion.div>
                </div>

                {/* Founder's Letter & Portrait Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Founder Landscape Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="lg:col-span-5 relative group"
                    >
                        <div className="relative overflow-hidden rounded-sm glass-card border border-white/10 p-2 bg-[#050505]/60 z-10 w-full h-[600px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/AI_RealEstate_Founder.max-1000x1000.jpg"
                                alt="Founder Portrait"
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                            {/* Caption overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4">
                                    <p className="text-[#D4AF37] font-serif text-lg m-0">Zaraie Castillo</p>
                                    <p className="text-slate-400 font-sans text-[10px] uppercase tracking-widest mt-1">Founder & Lead Architect</p>
                                </div>
                            </div>
                        </div>
                        {/* Gold Glow */}
                        <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-20 -z-10 rounded-full mix-blend-screen transform translate-x-4 translate-y-4" />
                    </motion.div>

                    {/* Narrative Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="lg:col-span-7 glass-card border border-white/10 bg-[#050505]/60 p-8 md:p-12 relative overflow-hidden h-full"
                    >
                        <div className="relative z-10 prose prose-invert prose-lg max-w-none font-sans text-slate-300 leading-relaxed space-y-6">

                            <div>
                                <h3 className="text-xl text-[#D4AF37] font-serif mb-4 italic">The Kitchen Table</h3>
                                <p className="text-base text-slate-300">
                                    I didn't just study real estate; I grew up in it. Watching my family at Gonsosa Development and Florostone Realty navigate the complex NJ market, I saw firsthand how a single title defect could derail months of hard work. I realized the industry wasn't lacking data—it was lacking proactive clarity.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <h3 className="text-xl text-[#D4AF37] font-serif mb-4 italic">The Mission</h3>
                                <p className="text-base text-slate-300">
                                    As a student at the intersection of AI and commerce, I built TitleGuard to solve the "28-Day Disaster." My goal is to transform the hard-earned wisdom of the previous generation into a scalable, agentic tool that secures deals for the next one.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <h3 className="text-xl text-[#D4AF37] font-serif mb-4 italic">The Philosophy</h3>
                                <p className="text-base text-slate-300">
                                    TitleGuard isn't just a project; it's a commitment to my family's industry. We provide institutional-grade reasoning so that brokerages can focus on building communities, not chasing curative paperwork.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
