"use client";

import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function FAQPage() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const faqCategories = [
        {
            title: "Product & Accuracy",
            items: [
                {
                    id: "prod-1",
                    q: "How does TitleGuard AI differ from a standard title search?",
                    a: "Traditional title searches are reactive and occur late in the transaction (Day 28). TitleGuard AI is proactive, allowing you to audit the title commitment on Day 1. We don’t just find data; we use a reasoning engine to identify curative issues that human eyes often overlook in the first pass."
                },
                {
                    id: "prod-2",
                    q: "Does this replace the Title Underwriter?",
                    a: "No. TitleGuard AI is a curative accelerator. We empower the Listing Agent and Title Officer to fix \"Closing-Killers\" (like unreleased liens or probate errors) weeks before the underwriter ever sees the file, ensuring a \"Clear to Close\" on the first attempt."
                }
            ]
        },
        {
            title: "Security & Compliance",
            items: [
                {
                    id: "sec-1",
                    q: "Is my clients' sensitive data stored?",
                    a: "No. We utilize a Zero-Retention Protocol. All files are processed in volatile RAM and are permanently purged the moment your report is generated. We provide the intelligence without the data liability."
                },
                {
                    id: "sec-2",
                    q: "Is TitleGuard AI SOC2 compliant?",
                    a: "Our architecture is built to align with institutional-grade security standards, including AES-256 encryption and isolated compute sandboxes for every individual scan."
                }
            ]
        },
        {
            title: "The \"Stoplight\" Logic",
            items: [
                {
                    id: "logic-1",
                    q: "What qualifies as a \"Red\" vs. \"Yellow\" alert?",
                    a: "Red indicates a critical defect (e.g., a \"Dead Grandfather\" probate issue or an active tax lien) that will stop the closing. Yellow indicates a curative requirement (e.g., a missing signature or a name variance) that needs a simple fix to keep the deal on track."
                }
            ]
        },
        {
            title: "Business & ROI",
            items: [
                {
                    id: "roi-1",
                    q: "Can I white-label these reports for my firm?",
                    a: "Yes. Under our Institutional (Custom) tier, we offer full white-labeling, allowing you to present the Stoplight Report under your own brand to increase your firm's perceived value."
                },
                {
                    id: "roi-2",
                    q: "Is there a limit on how many PDFs I can upload?",
                    a: "For Pro users, uploads are unlimited. For One-Time users, it is a single high-fidelity audit per purchase."
                }
            ]
        }
    ];

    // Filter logic
    const filteredCategories = faqCategories.map(category => {
        const filteredItems = category.items.filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...category, items: filteredItems };
    }).filter(category => category.items.length > 0);

    return (
        <main className="min-h-screen relative overflow-hidden pt-24 pb-32">
            <Navbar />

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">Knowledge Base</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            Frequently Asked <span className="text-[#D4AF37] italic">Questions</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-12 relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for answers about Data Security, Pricing, or Reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white font-sans text-sm md:text-base focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-slate-600 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    />
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-12">
                    {filteredCategories.length === 0 ? (
                        <div className="text-center text-slate-500 font-sans py-12">
                            No answers found for "{searchQuery}". Please try adjusting your search or contact our Vault support.
                        </div>
                    ) : (
                        filteredCategories.map((category, catIndex) => (
                            <div key={`cat-${catIndex}`} className="space-y-4">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (catIndex * 0.1), duration: 0.5 }}
                                    className="text-xl font-serif text-[#D4AF37] border-b border-white/5 pb-2 mb-4"
                                >
                                    {category.title}
                                </motion.h2>

                                {category.items.map((faq, index) => (
                                    <motion.div
                                        key={faq.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                                        className="glass-card border border-white/10 bg-[#050505]/40 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                            className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                                        >
                                            <span className="font-serif text-base md:text-lg text-white pr-8 leading-snug">{faq.q}</span>
                                            <motion.div
                                                animate={{ rotate: openId === faq.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex-shrink-0"
                                            >
                                                <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {openId === faq.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 pb-6 pt-2 border-t border-white/5 mx-6 mt-2">
                                                        <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
