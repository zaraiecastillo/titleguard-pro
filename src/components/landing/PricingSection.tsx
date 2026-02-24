"use client";

import { Check } from "lucide-react";

export function PricingSection() {
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
                        <button className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest">Start Free</button>
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
                        <button className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest">Secure My Deal</button>
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
                        <button className="w-full py-3 bg-[#D4AF37] text-black hover:bg-[#B4942B] transition-colors text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]">Scale My Volume</button>
                    </div>

                    {/* Tier 4: Enterprise */}
                    <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col hover:border-white/10 transition-colors">
                        <h3 className="text-sm font-sans uppercase tracking-widest text-slate-300 mb-6">The Institutional</h3>
                        <div className="mb-2">
                            <span className="text-3xl font-serif text-white">Custom</span>
                        </div>
                        <p className="text-slate-500 text-xs mb-8 font-sans">White-label. API. Custom Risk.</p>
                        <ul className="space-y-3 mb-8 flex-1 font-sans">
                            <li className="flex items-center text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3" /> White-label Reports</li>
                            <li className="flex items-center text-slate-400 text-sm"><Check className="w-3 h-3 text-slate-600 mr-3" /> API Integration</li>
                        </ul>
                        <button className="w-full py-3 border border-white/20 text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest">Talk to Enterprise</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
