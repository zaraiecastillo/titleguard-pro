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
            title: "Trust & Security",
            items: [
                {
                    id: "sec-1",
                    q: "Is my client's data used to train your AI?",
                    a: "No. We utilize Statutory Logic Isolation. Your data is processed in a private session and is never used to train our models or shared with third parties. Once your analysis is done, you have the power to purge the file instantly."
                },
                {
                    id: "sec-2",
                    q: "Is TitleGuard SOC2 Compliant?",
                    a: "We are Designed for Compliance. We are currently architecting our systems to meet SOC2 Type I standards as we move toward institutional scale. Today, we utilize bank-grade AES-256 encryption for all data in transit."
                }
            ]
        },
        {
            title: "Product & Abilities",
            items: [
                {
                    id: "prod-1",
                    q: "Can you read handwritten or blurry title documents?",
                    a: "To ensure 100% accuracy, our Reasoning Engine is currently optimized for search-enabled PDFs. This allows us to perform a deterministic audit of the text rather than 'guessing' at unreadable scans."
                },
                {
                    id: "prod-2",
                    q: "Does this replace my Title Officer or Underwriter?",
                    a: "Not at all. TitleGuard is a 'Co-Pilot.' We provide the Day 1 Certainty by flagging risks the moment a commitment is issued, giving your human team weeks of lead time to solve curative issues."
                }
            ]
        },
        {
            title: "The Roadmap",
            items: [
                {
                    id: "road-1",
                    q: "When will the Chrome Extension be available?",
                    a: "We are currently in the provisioning phase for our 'Ambient Intelligence' layer. The Chrome Extension is scheduled for a Q4 2026 release. Current users have full access to our high-fidelity Web Dashboard today."
                },
                {
                    id: "road-2",
                    q: "How often is the Statutory Database updated?",
                    a: "We currently perform Static Statutory Curation. Our database is manually updated by our team to reflect major laws, such as the March 2026 FinCEN rules. We are raising capital to automate this sync into a real-time 'Legal Sentinel'."
                }
            ]
        },
        {
            title: "The Founder",
            items: [
                {
                    id: "fnd-1",
                    q: "What inspired TitleGuard AI?",
                    a: "TitleGuard was born from a legacy of real estate experience. Inspired by my family’s work at Gonsosa Development and Florostone Realty, I built this to solve the '28-Day Disaster' using the AI logic I am currently studying in my university coursework."
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
