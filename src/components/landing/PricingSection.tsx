"use client";

import { useState } from "react";
import { Check, Loader2, TriangleAlert, Info } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export function PricingSection() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (tierName: string, priceId?: string) => {
        if (!priceId) {
            if (tierName === "The Trial") window.location.href = "/#demo";
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

                    {/* Tier 1: The Trial */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">The Trial</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">$0</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">1 Manual PDF Scan. Experience the 2026 Statutory Logic firsthand with a full Stoplight Report for one property.</p>

                        <ul className="space-y-3 mb-8 flex-1 font-sans border-t border-white/5 pt-6">
                            <li className="flex items-start text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                                <span>Web-Based PDF Analysis</span>
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

                        <button
                            onClick={() => handleCheckout("The Trial")}
                            className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest"
                        >
                            Claim My Free Scan
                        </button>
                    </div>

                    {/* Tier 2: Single Audit */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">The Single Audit</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">$49</span>
                            <span className="text-slate-500 text-sm ml-2">/scan</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">Transactional Access. No commitment. 1 Full PDF Analysis with 24-hour cloud report retention.</p>

                        <ul className="space-y-3 mb-8 flex-1 font-sans border-t border-white/5 pt-6">
                            <li className="flex items-start text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                                <span>Web-Based PDF Analysis</span>
                            </li>
                            <li className="flex items-start text-slate-400 text-sm">
                                <Check className="w-4 h-4 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span>24-hour cloud report retention</span>
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

                        <button
                            onClick={() => handleCheckout("The Single Audit", "price_1T4D9X0K6xSYeASO1w2thYki")}
                            disabled={loadingTier === "The Single Audit"}
                            className="w-full flex justify-center py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest disabled:opacity-50"
                        >
                            {loadingTier === "The Single Audit" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Purchase One-Time Audit
                        </button>
                    </div>

                    {/* Tier 3: Professional (Highlighted) */}
                    <div className="p-8 border border-[#D4AF37] bg-[#D4AF37]/5 flex flex-col relative scale-105 z-10 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">Best Value</div>
                        <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-6">The Professional</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-[#D4AF37]">$150</span>
                            <span className="text-slate-500 text-sm ml-2">/mo</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">Unlimited PDF Analysis. Full Web Dashboard access for NJ, NY, FL, TX, & CA. Priority access to the Chrome Extension Beta waitlist.</p>

                        <ul className="space-y-3 mb-8 flex-1 font-sans border-t border-white/5 pt-6">
                            <li className="flex items-start text-white text-sm">
                                <Check className="w-4 h-4 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                                <span>Unlimited Web-Based PDF Analysis</span>
                            </li>
                            <li className="flex items-start text-white text-sm">
                                <Check className="w-4 h-4 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                                <span>Instant 2026 Statutory Audit</span>
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

                        <button
                            onClick={() => handleCheckout("The Professional", "price_1T4DAi0K6xSYeASOZRKLkpkW")}
                            disabled={loadingTier === "The Professional"}
                            className="w-full flex justify-center py-3 bg-[#D4AF37] text-black hover:bg-[#B4942B] transition-colors text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
                        >
                            {loadingTier === "The Professional" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Go Unlimited
                        </button>
                    </div>

                    {/* Tier 4: Enterprise */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">Enterprise & Institutional</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">Custom</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">Fleet-wide licensing. Bulk batch processing, API access, and partnership for the Q4 2026 Ambient Intelligence rollout.</p>

                        <ul className="space-y-3 mb-8 flex-1 font-sans border-t border-white/5 pt-6">
                            <li className="flex items-start text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Bulk Web-Based PDF Analysis</span>
                            </li>
                            <li className="flex items-start text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-slate-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span>API & CRM Sync Access</span>
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

                        <button
                            onClick={() => handleCheckout("Enterprise & Institutional")}
                            className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest"
                        >
                            Contact Concierge
                        </button>
                    </div>
                </div>

                {/* Global Footnote */}
                <div className="text-center max-w-3xl mx-auto pt-16 mt-8 border-t border-white/5">
                    <p className="text-slate-500 font-mono text-[11px] leading-relaxed uppercase tracking-wider">
                        TitleGuard PRO is an Early Warning System. Our 2026 logic is currently active for NJ, NY, FL, TX, and CA. We are currently raising seed capital to automate our statutory sync and release our ambient browser integration.
                    </p>
                </div>

            </div>
        </section>
    );
}
