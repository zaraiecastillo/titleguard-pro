"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Check, Zap, Star, Shield, Briefcase, CreditCard, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to use the publishable key set in Vercel Environment Variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PricingPage() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (tierName: string, priceId?: string) => {
        if (!priceId) {
            if (tierName === "The Entry") {
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
    const tiers = [
        {
            name: "The Entry",
            price: "$0",
            period: "/mo",
            desc: "1 Monthly Scan (Web Only).",
            features: ["1 Scan / Month", "Web Dashboard Only", "Basic Stoplight Report"],
            cta: "Start Scanning",
            icon: Star,
            highlight: false
        },
        {
            name: "Per-Transaction",
            price: "$49",
            period: "/scan",
            desc: "1 Full Audit (Web + Extension Access for 24 hours).",
            features: ["Single High-Fidelity Scan", "Web + Chrome Extension", "24-Hour Data Retention"],
            cta: "Secure My Deal",
            icon: CreditCard,
            highlight: false,
            priceId: "price_1T4D9X0K6xSYeASO1w2thYki"
        },
        {
            name: "The Power-User",
            price: "$150",
            period: "/mo",
            desc: "Unlimited Scans + Full Chrome Extension Integration.",
            features: ["Unlimited Web Scans", "Full Extension Access", "Advanced 'Heirship' Logic", "Dashboard Analytics"],
            cta: "Scale My Volume",
            icon: Zap,
            highlight: true,
            badge: "Best Value",
            priceId: "price_1T4DAi0K6xSYeASOZRKLkpkW"
        },
        {
            name: "Enterprise & Institutional",
            price: "Custom",
            period: "",
            desc: "For Title Firms and Large-Scale Brokerages.",
            features: [
                "Fleet-Wide Extension Deployment",
                "Custom AI Calibration",
                "White-Label Integration",
                "API & CRM Sync"
            ],
            cta: "Contact Concierge",
            icon: Briefcase,
            highlight: false
        }
    ];

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
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`
                                relative p-8 flex flex-col h-full
                                glass-card transition-all duration-300
                                ${tier.highlight
                                    ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_30px_rgba(212,175,55,0.1)] scale-105 z-10'
                                    : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                                }
                            `}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                                    {tier.badge}
                                </div>
                            )}

                            <div className="mb-6">
                                <tier.icon className={`w-8 h-8 mb-4 ${tier.highlight ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                                <h3 className={`text-sm font-sans uppercase tracking-widest ${tier.highlight ? 'text-white' : 'text-slate-300'}`}>
                                    {tier.name}
                                </h3>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline">
                                    <span className={`text-4xl font-serif ${tier.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>
                                        {tier.price}
                                    </span>
                                    {tier.period && <span className="text-slate-500 text-sm ml-2">{tier.period}</span>}
                                </div>
                                <p className="text-slate-500 text-xs mt-2 font-sans">{tier.desc}</p>
                            </div>

                            <div className="flex-1 mb-8">
                                <ul className="space-y-4">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-sm">
                                            <Check className={`w-4 h-4 mr-3 mt-0.5 ${tier.highlight ? 'text-[#D4AF37]' : 'text-slate-600'}`} />
                                            <span className="text-slate-300 font-sans">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => handleCheckout(tier.name, tier.priceId)}
                                disabled={loadingTier === tier.name}
                                className={`
                                w-full py-4 text-xs flex items-center justify-center font-bold uppercase tracking-[0.2em] transition-all
                                ${tier.highlight
                                        ? 'bg-[#D4AF37] text-black hover:bg-[#b5952f] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                        : 'border border-white/10 text-white hover:bg-white/5 hover:border-white/20'
                                    }
                                ${loadingTier === tier.name ? 'opacity-70 cursor-not-allowed' : ''}
                            `}>
                                {loadingTier === tier.name ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                ) : null}
                                {tier.cta}
                            </button>

                            {/* Sub-note for Enterprise Tier */}
                            {tier.name === "Enterprise & Institutional" && (
                                <p className="text-[10px] text-slate-500 mt-4 text-center px-2">
                                    Bulk licensing and API documentation available upon request.
                                </p>
                            )}
                        </motion.div>
                    ))}
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
