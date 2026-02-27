"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Check, Zap, Star, Briefcase, CreditCard, Loader2, TriangleAlert, Info } from "lucide-react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to use the publishable key set in Vercel Environment Variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PricingPage() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (tierName: string, priceId?: string) => {
        if (!priceId) {
            if (tierName === "The Trial") {
                window.location.href = "/#demo";
            } else if (tierName === "Enterprise & Institutional") {
                window.location.href = "/contact";
            }
            return;
        }

        try {
            setLoadingTier(tierName);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Checkout Error: ${errorData.error || response.statusText}`);
                console.error("Failed to create checkout session", errorData);
                return;
            }

            const { sessionId } = await response.json();
            const stripe = await stripePromise;

            if (stripe) {
                // @ts-ignore - Stripe type definition mismatch in current SDK version
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) console.error("Stripe Checkout Error:", error);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        } finally {
            setLoadingTier(null);
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden pt-24">
            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">Membership</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                            The <span className="text-[#D4AF37] italic">Golden</span> Tier
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto border-l border-[#D4AF37]/30 pl-6 text-left">
                            Select the level of intelligence required for your volume.
                        </p>
                    </motion.div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Tier 1: The Trial */}
                    <motion.div
                        id="free-tier"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="relative p-8 flex flex-col h-full glass-card transition-all duration-300 border-white/5 hover:border-white/20 hover:bg-white/[0.02] scroll-mt-24"
                    >
                        <div className="mb-6">
                            <Star className="w-8 h-8 mb-4 text-slate-400" />
                            <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300">The Trial</h3>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-serif text-white">$0</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2 font-sans">
                                1 Manual PDF Scan. Experience the 2026 Statutory Logic firsthand with a full Stoplight Report for one property.
                            </p>
                        </div>
                        <div className="flex-1 mb-8">
                            <ul className="space-y-4">
                                <li className="flex items-start text-sm">
                                    <Check className="w-4 h-4 mr-3 mt-0.5 text-slate-600 flex-shrink-0" />
                                    <span className="text-slate-300 font-sans">Web-Based PDF Analysis</span>
                                </li>
                                <li className="flex items-start pt-4 mt-2 border-t border-white/5">
                                    <div className="bg-black/40 border border-white/10 p-3 rounded-sm w-full">
                                        <h4 className="text-slate-400 text-[10px] uppercase tracking-widest font-sans mb-1 flex items-center">
                                            <Info className="w-3 h-3 mr-1.5" />
                                            OCR Note
                                        </h4>
                                        <p className="text-slate-500 font-sans text-[11px] leading-relaxed italic">
                                            Optimized for search-enabled PDFs. Handwritten scan support coming in Phase 3.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleCheckout("The Trial")}
                            className="w-full py-4 text-xs flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                        >
                            Claim My Free Scan
                        </button>
                    </motion.div>

                    {/* Tier 2: The Single Audit */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative p-8 flex flex-col h-full glass-card transition-all duration-300 border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                    >
                        <div className="mb-6">
                            <CreditCard className="w-8 h-8 mb-4 text-slate-400" />
                            <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300">The Single Audit</h3>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-serif text-white">$49</span>
                                <span className="text-slate-500 text-sm ml-2">/scan</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2 font-sans">
                                Transactional Access. No commitment. 1 Full PDF Analysis with 24-hour cloud report retention.
                            </p>
                        </div>
                        <div className="flex-1 mb-8">
                            <ul className="space-y-4">
                                <li className="flex items-start text-sm">
                                    <Check className="w-4 h-4 mr-3 mt-0.5 text-slate-600 flex-shrink-0" />
                                    <span className="text-slate-300 font-sans">Web-Based PDF Analysis</span>
                                </li>
                                <li className="flex items-start text-sm">
                                    <Check className="w-4 h-4 mr-3 mt-0.5 text-slate-600 flex-shrink-0" />
                                    <span className="text-slate-300 font-sans">24-hour cloud report retention</span>
                                </li>
                                <li className="flex items-start pt-4 mt-2 border-t border-white/5">
                                    <div className="bg-black/40 border border-white/10 p-3 rounded-sm w-full">
                                        <h4 className="text-slate-400 text-[10px] uppercase tracking-widest font-sans mb-1 flex items-center">
                                            <Info className="w-3 h-3 mr-1.5" />
                                            OCR Note
                                        </h4>
                                        <p className="text-slate-500 font-sans text-[11px] leading-relaxed italic">
                                            Optimized for search-enabled PDFs. Handwritten scan support coming in Phase 3.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleCheckout("The Single Audit", "price_1T4D9X0K6xSYeASO1w2thYki")}
                            disabled={loadingTier === "The Single Audit"}
                            className="w-full py-4 text-xs flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all border border-white/10 text-white hover:bg-white/5 hover:border-white/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loadingTier === "The Single Audit" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Purchase One-Time Audit
                        </button>
                    </motion.div>

                    {/* Tier 3: The Professional */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative p-8 flex flex-col h-full glass-card transition-all duration-300 border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_30px_rgba(212,175,55,0.1)] scale-105 z-10"
                    >
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                            Best Value
                        </div>
                        <div className="mb-6">
                            <Zap className="w-8 h-8 mb-4 text-[#D4AF37]" />
                            <h3 className="text-sm font-sans uppercase tracking-widest text-white">The Professional</h3>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-serif text-[#D4AF37]">$150</span>
                                <span className="text-slate-500 text-sm ml-2">/mo</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2 font-sans">
                                Unlimited PDF Analysis. Full Web Dashboard access for NJ, NY, FL, TX, & CA. Priority access to the Chrome Extension Beta waitlist.
                            </p>
                        </div>
                        <div className="flex-1 mb-8">
                            <ul className="space-y-4">
                                <li className="flex items-start text-sm">
                                    <Check className="w-4 h-4 mr-3 mt-0.5 text-[#D4AF37] flex-shrink-0" />
                                    <span className="text-slate-300 font-sans">Unlimited Web-Based PDF Analysis</span>
                                </li>
                                <li className="flex items-start pt-4 mt-2 border-t border-white/5">
                                    <div className="bg-black/40 border border-[#D4AF37]/20 p-3 rounded-sm w-full">
                                        <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans mb-1 flex items-center">
                                            <TriangleAlert className="w-3 h-3 mr-1.5" />
                                            Roadmap Access
                                        </h4>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed italic">
                                            Waitlist Access: Ambient Intelligence (Chrome Extension) is in provisioning for Q4 2026.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleCheckout("The Professional", "price_1T4DAi0K6xSYeASOZRKLkpkW")}
                            disabled={loadingTier === "The Professional"}
                            className="w-full py-4 text-xs flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all bg-[#D4AF37] text-black hover:bg-[#b5952f] shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loadingTier === "The Professional" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Go Unlimited
                        </button>
                    </motion.div>

                    {/* Tier 4: Enterprise */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="relative p-8 flex flex-col h-full glass-card transition-all duration-300 border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                    >
                        <div className="mb-6">
                            <Briefcase className="w-8 h-8 mb-4 text-slate-400" />
                            <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300">Enterprise & Institutional</h3>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-serif text-white">Custom</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-2 font-sans">
                                Fleet-wide licensing. Bulk batch processing, API access, and partnership for the Q4 2026 Ambient Intelligence rollout.
                            </p>
                        </div>
                        <div className="flex-1 mb-8">
                            <ul className="space-y-4">
                                <li className="flex items-start text-sm">
                                    <Check className="w-4 h-4 mr-3 mt-0.5 text-slate-600 flex-shrink-0" />
                                    <span className="text-slate-300 font-sans">Bulk Web-Based PDF Analysis</span>
                                </li>
                                <li className="flex items-start text-sm">
                                    <Check className="w-4 h-4 mr-3 mt-0.5 text-slate-600 flex-shrink-0" />
                                    <span className="text-slate-300 font-sans">API & CRM Sync Access</span>
                                </li>
                                <li className="flex items-start pt-4 mt-2 border-t border-white/5">
                                    <div className="bg-black/40 border border-[#D4AF37]/20 p-3 rounded-sm w-full">
                                        <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans mb-1 flex items-center">
                                            <TriangleAlert className="w-3 h-3 mr-1.5" />
                                            Roadmap Access
                                        </h4>
                                        <p className="text-slate-400 font-sans text-[11px] leading-relaxed italic">
                                            Waitlist Access: Ambient Intelligence (Chrome Extension) is in provisioning for Q4 2026.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleCheckout("Enterprise & Institutional")}
                            className="w-full py-4 text-xs flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                        >
                            Contact Concierge
                        </button>
                        <p className="text-[10px] text-slate-500 mt-4 text-center px-2">
                            Bulk licensing and API documentation available upon request.
                        </p>
                    </motion.div>

                </div>

                {/* Global Footnote */}
                <div className="text-center max-w-3xl mx-auto pt-16 mt-8 border-t border-white/5">
                    <p className="text-slate-500 font-mono text-[11px] leading-relaxed uppercase tracking-wider">
                        TitleGuard PRO is an Early Warning System. Our 2026 logic is currently active for NJ, NY, FL, TX, and CA. We are currently raising seed capital to automate our statutory sync and release our ambient browser integration.
                    </p>
                </div>

                {/* FAQ / Trust Indicator */}
                <div className="mt-24 text-center border-t border-white/5 pt-12">
                    <p className="text-slate-500 font-mono text-xs">
                        TRUSTED BY TOP BROKERAGES FOR OVER $500M IN CLOSED VOLUME
                    </p>
                </div>

            </div>
        </main>
    );
}
