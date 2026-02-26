"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Scale, ShieldAlert, FileWarning, Briefcase } from "lucide-react";

export function JurisdictionalLogicTabs() {
    const tabs = [
        { id: "nj", name: "New Jersey", icon: Map },
        { id: "ny", name: "New York", icon: Scale },
        { id: "fl", name: "Florida", icon: Briefcase },
        { id: "tx", name: "Texas", icon: ShieldAlert },
        { id: "ca", name: "California", icon: FileWarning },
    ];

    const content = {
        nj: {
            title: "New Jersey Logic Cluster",
            highlights: [
                {
                    title: "Marital Possession (N.J.S.A. 3B:28-3)",
                    desc: "State law grants a non-titled spouse a 'Right of Joint Possession' in the principal matrimonial residence. TitleGuard detects single-owner primary residences and triggers an immediate curative flag to secure spousal joinder at closing."
                },
                {
                    title: "Tidelands & Riparian Claims",
                    desc: "The State of New Jersey claims ownership of all land present or formerly flowed by the tide. Our engine cross-references property descriptions against NJDEP databases, flagging coastal/waterway claims that can cause 6+ months of curative delay."
                }
            ]
        },
        ny: {
            title: "Empire State Engine",
            highlights: [
                {
                    title: "The LLC Transparency Act (2026)",
                    desc: "Enforcing the new January 2026 mandate requiring Beneficial Ownership Reports (BOR) for all LLCs. TitleGuard verifies 'Certificate of Filing' status to prevent deed recording rejections and daily fines."
                },
                {
                    title: "Judicial Foreclosure Timelines & CEMA",
                    desc: "The AI identifies active 'Lis Pendens' or 'Notice of Pendency' filings, calculating New York's 9-12 month judicial foreclosure timelines to protect closing dates. It also flags new mortgages for CEMA consolidation to save buyers thousands in Mortgage Recording Taxes."
                }
            ]
        },
        fl: {
            title: "Sunshine State Compliance",
            highlights: [
                {
                    title: "FinCEN Residential Rule (2026)",
                    desc: "The Intelligence Engine detects cash/non-financed entity purchases to enforce the strict March 2026 FinCEN federal mandates, ensuring Beneficial Ownership Information (BOI) is collected within the 30-day requirement to avoid severe federal penalties."
                },
                {
                    title: "Statute 159 Unrecorded Municipal Liens",
                    desc: "Standard title searches miss unrecorded city utility debt. TitleGuard flags Florida Schedule B exceptions to mandate separate Municipal Lien Searches (MLS), preventing post-closing 'Super-Priority' liability for unpaid city services."
                }
            ]
        },
        tx: {
            title: "Lone Star State Precision",
            highlights: [
                {
                    title: "Mandatory Buyer Agreement (SB 1968)",
                    desc: "Cross-referencing the Jan 1, 2026 requirement for signed representation agreements prior to presenting offers, complete with mandatory transparency disclosures regarding negotiable commissions."
                },
                {
                    title: "Dominant Mineral Estate Severance",
                    desc: "In Texas, the Mineral Estate dominates. TitleGuard detects severed minerals and oil/gas leases, immediately recommending the crucial T-19.1 Endorsement to provide limited insurance against destructive surface extraction."
                }
            ]
        },
        ca: {
            title: "California Regulatory Engine",
            highlights: [
                {
                    title: "AI-Photo Disclosure (AB 945)",
                    desc: "Automated analysis of listing materials to detect digitally altered or AI-staged photos, triggering the mandatory 2026 disclaimer to maintain Consumer Legal Remedies Act compliance."
                },
                {
                    title: "AB 1050 Density-Bonus Catalyst",
                    desc: "The AI detects outdated CC&Rs or restrictive covenants in Schedule B, alerting developers to expedited 2026 processes to strip unenforceable density restrictions, unlocking massive property value uplift."
                }
            ]
        }
    };

    const [activeTab, setActiveTab] = useState("nj");

    return (
        <div className="w-full max-w-5xl mx-auto my-32">
            <div className="text-center mb-16">
                <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">State-Specific Precision</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white">Jurisdictional Logic <span className="text-[#D4AF37] italic">Clusters</span></h2>
            </div>

            <div className="glass-card border border-white/5 p-2 rounded-lg flex flex-col md:flex-row gap-8">
                {/* Tabs Sidebar */}
                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:w-64 flex-shrink-0 pb-4 md:pb-0 hide-scrollbar">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-3 px-6 py-4 rounded-md transition-all duration-300 whitespace-nowrap ${isActive
                                    ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <tab.icon className={`w-5 h-5 ${isActive ? "text-[#D4AF37]" : "text-slate-500"}`} />
                                <span className="font-serif text-lg tracking-wide">{tab.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#050505] border border-white/5 rounded-md p-8 min-h-[400px] relative overflow-hidden">
                    {/* Background glow for current active tab */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10"
                        >
                            <h3 className="text-3xl font-serif text-white mb-8 border-b border-white/10 pb-6">
                                {content[activeTab as keyof typeof content].title}
                            </h3>

                            <div className="space-y-10">
                                {content[activeTab as keyof typeof content].highlights.map((highlight, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-xl font-serif text-[#D4AF37] mb-3 flex items-center">
                                            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3 shadow-[0_0_8px_#D4AF37]" />
                                            {highlight.title}
                                        </h4>
                                        <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base pl-4 border-l border-white/10 ml-[3px]">
                                            {highlight.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Technical Note Footer */}
            <div className="mt-12 text-center max-w-2xl mx-auto bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-sm p-6">
                <p className="text-slate-400 font-mono text-xs leading-relaxed">
                    Our logic engine is updated weekly to reflect 2026 legislative sessions, ensuring TitleGuard remains the most current Risk Intelligence layer in the industry.
                </p>
            </div>
        </div>
    );
}
