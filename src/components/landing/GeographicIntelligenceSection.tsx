"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const states = [
    {
        abbr: "NJ",
        name: "New Jersey",
        description: "Marital Rights & Tidelands Detection."
    },
    {
        abbr: "NY",
        name: "New York",
        description: "CEMA Tax Savings & LLC Transparency Compliance."
    },
    {
        abbr: "FL",
        name: "Florida",
        description: "Statute 159 Municipal Lien & FinCEN Reporting."
    },
    {
        abbr: "TX",
        name: "Texas",
        description: "Homestead Joinder & Mineral Estate Logic."
    },
    {
        abbr: "CA",
        name: "California",
        description: "AI-Photo Disclosure & Wildfire Zone Compliance."
    }
];

export function GeographicIntelligenceSection() {
    return (
        <section className="py-24 px-6 md:px-12 relative z-20 bg-[#050505] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.25em] mb-4 block">
                        Jurisdictional Logic
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                        Strategic Geographic Intelligence
                    </h2>
                    <p className="text-slate-400 font-sans max-w-2xl mx-auto">
                        Real estate risk is highly localized. TitleGuard automatically detects the subject property's state and applies precision-engineered, jurisdiction-specific compliance triggers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                    {states.map((state, index) => (
                        <motion.div
                            key={state.abbr}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm hover:border-[#D4AF37]/50 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl font-serif text-[#D4AF37]">{state.abbr}</span>
                            </div>
                            <div className="relative z-10">
                                <MapPin className="w-6 h-6 text-[#D4AF37] mb-4" />
                                <h3 className="text-white font-serif text-xl mb-2">{state.name}</h3>
                                <p className="text-slate-400 font-sans text-sm leading-relaxed">
                                    {state.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center text-center space-y-8">
                    <p className="text-slate-500 font-serif italic text-sm">
                        *Phase 2 Expansion (15 additional jurisdictions) currently in deployment for Q3 2026.
                    </p>
                    <Link href="/intelligence">
                        <button className="group relative px-8 py-3 bg-[#D4AF37] text-black font-sans text-xs uppercase tracking-widest overflow-hidden hover:bg-[#F3E5AB] transition-colors flex items-center justify-center">
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
