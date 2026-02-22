"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen relative overflow-hidden pt-24 pb-32">
            <Navbar />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Header & Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">Reach Out</span>
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                                Contact the <span className="text-[#D4AF37] italic">Vault</span>.
                            </h1>
                            <p className="text-slate-400 text-lg border-l border-[#D4AF37]/30 pl-6 mb-12">
                                For enterprise inquiries, API access, or general support, our concierge team is on standby.
                            </p>

                            <div className="flex items-center space-x-4 p-6 glass-card border border-white/10 bg-white/[0.02]">
                                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <div className="text-xs font-sans uppercase tracking-widest text-slate-500 mb-1">Direct Line</div>
                                    <a href="mailto:concierge@titleguard-pro.ai" className="font-serif text-white text-lg hover:text-[#D4AF37] transition-colors">
                                        concierge@titleguard-pro.ai
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-card border border-white/10 bg-[#050505]/60 p-8 relative"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Firm Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                        placeholder="Douglas Elliman"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Role</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-slate-300 font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none">
                                    <option>Broker / Owner</option>
                                    <option>Real Estate Agent</option>
                                    <option>Title Professional</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                                    placeholder="How can we help secure your pipeline?"
                                ></textarea>
                            </div>

                            <button className="w-full flex items-center justify-center space-x-2 py-4 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-8">
                                <span>Send Transmission</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
