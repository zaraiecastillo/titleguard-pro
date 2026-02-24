"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_live_51T4CruP65pwDtpGf4IZpDQtQDomhC1a6NA5LGv5iOubHD1GbbTST0nPitnfc6xlLqHjrMUq0l7h1r9aCSy71b9CC00auk4vIv4");

export function PricingSection() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (tierName: string, priceId?: string) => {
        if (!priceId) {
            if (tierName === "The Entry") window.location.href = "/dashboard";
            else if (tierName === "Enterprise & Institutional") window.location.href = "/contact";
            return;
        }

        try {
            setLoadingTier(tierName);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                // @ts-ignore
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
        <section id="pricing" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em]">Membership</span>
                    <h2 className="text-4xl font-serif text-white mt-4 mb-4">Transparent Pricing</h2>
                    <p className="text-slate-400 font-sans">Choose the tier that fits your volume.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Tier 1: Entry */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">The Entry</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">$0</span>
                            <span className="text-slate-500 text-sm ml-2">/mo</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">1 Monthly Scan (Web Only).</p>
                        <ul className="space-y-3 mb-8 flex-1 font-sans">
                            <li className="flex items-center text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3" /> 1 Scan / Month</li>
                            <li className="flex items-center text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3" /> Web Dashboard Only</li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("The Entry")}
                            className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest"
                        >
                            Start Free
                        </button>
                    </div>

                    {/* Tier 2: Transaction */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">Per-Transaction</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">$49</span>
                            <span className="text-slate-500 text-sm ml-2">/scan</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">1 Full Audit (Web + Extension for 24h).</p>
                        <ul className="space-y-3 mb-8 flex-1 font-sans">
                            <li className="flex items-center text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3" /> Web + Chrome Extension</li>
                            <li className="flex items-center text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3" /> 24-Hour Retention</li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("Per-Transaction", "price_1T4D9X0K6xSYeASO1w2thYki")}
                            disabled={loadingTier === "Per-Transaction"}
                            className="w-full flex justify-center py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest disabled:opacity-50"
                        >
                            {loadingTier === "Per-Transaction" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Secure My Deal
                        </button>
                    </div>

                    {/* Tier 3: Pro (Highlighted) */}
                    <div className="p-8 border border-[#D4AF37] bg-[#D4AF37]/5 flex flex-col relative scale-105 z-10 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">Best Value</div>
                        <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-6">The Power-User</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-[#D4AF37]">$150</span>
                            <span className="text-slate-500 text-sm ml-2">/mo</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">Unlimited Scans + Chrome integration.</p>
                        <ul className="space-y-3 mb-8 flex-1 font-sans">
                            <li className="flex items-center text-white text-sm"><Check className="w-3 h-3 text-[#D4AF37] mr-3" /> Unlimited Web Scans</li>
                            <li className="flex items-center text-white text-sm"><Check className="w-3 h-3 text-[#D4AF37] mr-3" /> Full Extension Access</li>
                            <li className="flex items-center text-white text-sm"><Check className="w-3 h-3 text-[#D4AF37] mr-3" /> Advanced Logic</li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("The Power-User", "price_1T4DAi0K6xSYeASOZRKLkpkW")}
                            disabled={loadingTier === "The Power-User"}
                            className="w-full flex justify-center py-3 bg-[#D4AF37] text-black hover:bg-[#B4942B] transition-colors text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
                        >
                            {loadingTier === "The Power-User" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Scale My Volume
                        </button>
                    </div>

                    {/* Tier 4: Enterprise */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">Enterprise & Institutional</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">Custom</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">For Title Firms and Large-Scale Brokerages.</p>
                        <ul className="space-y-3 mb-8 flex-1 font-sans">
                            <li className="flex items-start text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3 mt-1 flex-shrink-0" /> <span className="leading-tight">Fleet-Wide Extension</span></li>
                            <li className="flex items-start text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3 mt-1 flex-shrink-0" /> <span className="leading-tight">Custom AI Calibration</span></li>
                            <li className="flex items-start text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3 mt-1 flex-shrink-0" /> <span className="leading-tight">White-Label Integration</span></li>
                            <li className="flex items-start text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3 mt-1 flex-shrink-0" /> <span className="leading-tight">API & CRM Sync</span></li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("Enterprise & Institutional")}
                            className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest"
                        >
                            Request a Demo
                        </button>
                        <p className="text-[10px] text-slate-500 mt-4 text-center">
                            Bulk licensing & API docs upon request.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
