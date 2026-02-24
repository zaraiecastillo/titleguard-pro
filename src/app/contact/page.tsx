"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        agents: "",
        requirements: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to send");
            setStatus("success");
            setFormData({ name: "", company: "", agents: "", requirements: "" });
        } catch (error) {
            console.error("Contact error:", error);
            setStatus("error");
            alert("Failed to send transmission. Please email us directly.");
        }
    };
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
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Firm / Company Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                        placeholder="Douglas Elliman"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Number of Agents</label>
                                <select
                                    required
                                    value={formData.agents}
                                    onChange={e => setFormData({ ...formData, agents: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-slate-300 font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none"
                                >
                                    <option value="" disabled>Select fleet size</option>
                                    <option value="1-10">1 - 10</option>
                                    <option value="11-50">11 - 50</option>
                                    <option value="51-200">51 - 200</option>
                                    <option value="200+">200+</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-sans uppercase tracking-widest text-slate-400">Special Requirements</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.requirements}
                                    onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                                    placeholder="Describe your API integration needs, volume logic, or white-labeling..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={`w-full flex items-center justify-center space-x-2 py-4 text-black text-xs font-bold uppercase tracking-[0.2em] transition-all
                                    ${status === "success" ? 'bg-emerald-500' : 'bg-[#D4AF37] hover:bg-[#b5952f] shadow-[0_0_20px_rgba(212,175,55,0.3)]'}
                                    disabled:opacity-80
                                `}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Transmitting...</span>
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Received</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Contact Concierge</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
