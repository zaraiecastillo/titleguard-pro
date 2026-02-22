"use client";

import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "How does TitleGuard AI differ from a standard title search?",
            a: "Traditional searches are reactive. We are proactive. We use a reasoning engine to identify 'Deal-Killers' on Day 1, long before the title company finishes their formal report."
        },
        {
            q: "Is my data secure?",
            a: "Yes. We use a Zero-Retention protocol. Your files are processed in RAM and purged instantly after the report is generated."
        },
        {
            q: "Does this replace the title company?",
            a: "No. TitleGuard AI is a pre-underwriting intelligence tool designed for Realtors and Brokerages. It allows you to cure defects before the official title work halts the transaction."
        },
        {
            q: "What types of documents can I upload?",
            a: "We currently support standard PDF uploads of Title Commitments, Property Profiles, and historical O&E reports."
        }
    ];

    return (
        <main className="min-h-screen relative overflow-hidden pt-24 pb-32">
            <Navbar />

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-16">
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

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass-card border border-white/10 bg-[#050505]/40 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="font-serif text-lg text-white pr-8">{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-2 border-t border-white/5 mx-6 mt-2">
                                            <p className="font-sans text-slate-400 text-sm leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
