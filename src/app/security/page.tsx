"use client";

import { Navbar } from "@/components/Navbar";
import { Shield, Lock, Server, FileX, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityPage() {
    return (
        <main className="min-h-screen relative overflow-hidden pt-24">
            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            {/* Animated Pulse Effect behind shield */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-20"
                            />
                            <ShieldCheck className="w-24 h-24 text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        Security & <span className="text-[#D4AF37] italic">Data Sovereignty</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-slate-400 text-xl font-sans max-w-2xl mx-auto"
                    >
                        Institutional-Grade Protection for Every Transaction.
                    </motion.p>
                </div>

                {/* Section 1: Zero-Retention Protocol */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    <div>
                        <div className="inline-flex items-center space-x-3 mb-6">
                            <div className="h-[1px] w-12 bg-[#D4AF37]/50"></div>
                            <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em]">Zero Trace Protocol</span>
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-6">Privacy-First Data Handling</h2>
                        <p className="text-slate-300 text-lg leading-relaxed font-sans">
                            We minimize data liability. Uploaded Title Commitments are held in encrypted temporary storage only for the duration of the analysis. Once your Stoplight Report is generated, you have the power to manually purge the source file from our secure cloud.
                        </p>
                    </div>
                    {/* Visual representation of data purging */}
                    <div className="glass-card p-1 rounded-sm border border-white/5 relative overflow-hidden">
                        <div className="bg-[#050505]/80 p-8 backdrop-blur-md relative z-10">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                                <span className="text-xs font-mono text-slate-500">SESSION_ID: 0x8F...A2</span>
                                <span className="text-xs font-mono text-emerald-500">ACTIVE</span>
                            </div>
                            <div className="space-y-2 font-mono text-xs">
                                <div className="flex justify-between text-slate-400">
                                    <span>Ingesting Title Commitment...</span>
                                    <span>DONE</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Analyzing Vesting...</span>
                                    <span>DONE</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Generating Report...</span>
                                    <span>DONE</span>
                                </div>
                                <div className="flex justify-between text-rose-500 mt-4 pt-4 border-t border-white/5 animate-pulse">
                                    <span>INITIATNG PURGE SEQUENCE...</span>
                                    <span>WIPING...</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent pointer-events-none" />
                    </div>
                </motion.div>

                {/* Section 2: Privacy-as-Infrastructure (3-Column Grid) */}
                <div className="mb-24">
                    <h2 className="text-3xl font-serif text-white mb-12 text-center">Privacy-as-Infrastructure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Lock,
                                title: "Bank-Grade Encryption in Transit",
                                desc: "Bank-Grade Encryption. All data in transit is protected by the highest global financial standards."
                            },
                            {
                                icon: Server,
                                title: "Statutory Logic Isolation",
                                desc: "Your data is never used to train our models. Each session is treated as an isolated event, ensuring that sensitive property data from one transaction never influences the intelligence of another."
                            },
                            {
                                icon: Shield,
                                title: "Designed for Compliance",
                                desc: "TitleGuard PRO is built with the rigorous confidentiality standards of legal and financial institutions in mind. We are currently architecting our systems to meet SOC2 Type I standards as we scale toward enterprise-wide deployment."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="glass-card p-8 border-t border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors group"
                            >
                                <item.icon className="w-10 h-10 text-[#D4AF37] mb-6 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all" />
                                <h3 className="text-xl font-serif text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-sans">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 3: The Quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-gold p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden mb-24"
                >
                    <div className="relative z-10">
                        <FileX className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 opacity-80" />
                        <h3 className="text-2xl md:text-3xl font-serif text-white leading-relaxed italic">
                            "Our AI sees the risk, reports the reality, and then forgets the file.
                            We provide the intelligence without the liability of data storage."
                        </h3>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />
                </motion.div>

                {/* Section 4: Founder's Privacy Pledge */}
                <div className="text-center max-w-4xl mx-auto border-t border-white/5 pt-16 mb-24">
                    <h3 className="text-[#D4AF37] text-sm font-sans uppercase tracking-[0.2em] mb-6">Founder's Privacy Pledge</h3>
                    <div className="bg-black/30 border border-[#D4AF37]/20 p-8 rounded-sm text-left">
                        <p className="text-slate-300 font-sans italic leading-relaxed md:text-lg">
                            "As a startup in the pitching phase, we prioritize your data sovereignty above all else. We do not store, sell, or train on your title data. Our goal is to provide the intelligence you need without the liability of long-term data storage."
                        </p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="text-center pb-12">
                    <button className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                        Contact Security Team
                    </button>
                </div>

            </div>
        </main>
    );
}
