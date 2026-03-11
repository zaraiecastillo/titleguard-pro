"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Search, Ghost, Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WaitlistPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) return;

        setStatus("loading");
        
        // Simulate an API network request for the waitlist submission
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1200);
    };

    return (
        <main className="min-h-screen relative overflow-hidden pt-24 pb-32">
            <Navbar />

            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">Early Access Beta</span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                            The 21-Day Title Search is Dead.<br />
                            <span className="text-[#D4AF37] italic">Get the 60-Second Audit.</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
                            Join the exclusive waitlist to secure priority access.
                            Early adopters receive their first 5 property audits entirely on the house.
                        </p>
                    </motion.div>
                </div>

                {/* Email Capture Form Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-xl mx-auto mb-24"
                >
                    <div className="glass-card p-2 rounded-sm border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md relative overflow-hidden group">
                        {status === "success" ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-8 text-center"
                            >
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-serif text-white mb-2">You're on the list.</h3>
                                <p className="text-slate-400 font-sans text-sm">Keep an eye on your inbox for early access coordinates.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 relative z-10">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your work email address..."
                                    className="flex-1 bg-transparent border border-white/10 px-6 py-4 text-white font-sans focus:outline-none focus:border-[#D4AF37]/50 transition-colors placeholder:text-slate-600 rounded-sm"
                                    required
                                    disabled={status === "loading"}
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#F3E5AB] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                                >
                                    {status === "loading" ? "Joining..." : (
                                        <>
                                            Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                    </div>
                </motion.div>

                {/* 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Search,
                            title: "Lien Detection",
                            desc: "Instantly surface hidden municipal, PACE, and tax liens that don't appear in standard county records."
                        },
                        {
                            icon: Ghost,
                            title: "Zombie Mortgages",
                            desc: "Identify unreleased legacy mortgages from decades ago that threaten to destroy closing timelines."
                        },
                        {
                            icon: Activity,
                            title: "Stoplight Risk",
                            desc: "Our AI translates dense statutory code into a binary Red, Yellow, or Green deterministic risk profile."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                            className="glass-card p-10 border-t border-white/10 hover:border-[#D4AF37]/50 transition-colors group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <feature.icon className="w-10 h-10 text-[#D4AF37] mb-6 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all" />
                                <h3 className="text-xl font-serif text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-sans">{feature.desc}</p>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-6xl font-serif text-[#D4AF37]">
                                0{i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}
