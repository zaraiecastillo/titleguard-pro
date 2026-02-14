"use client";

import { Check } from "lucide-react";

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-slate-950 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-slate-400">Choose the plan that fits your volume.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Trial */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col">
                        <h3 className="text-xl font-semibold text-slate-300">Trial</h3>
                        <div className="my-4">
                            <span className="text-4xl font-bold text-white">Free</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-8">Perfect for testing the waters.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-slate-300 text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> 1 Scan Included</li>
                            <li className="flex items-center text-slate-300 text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Basic Risk Report</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-colors">Start Free</button>
                    </div>

                    {/* Pro */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col border-emerald-500/50 relative overflow-hidden">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 left-0"></div>
                        <h3 className="text-xl font-semibold text-white">Pro Agent</h3>
                        <div className="my-4">
                            <span className="text-4xl font-bold text-white">$150</span>
                            <span className="text-slate-500">/mo</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-8">For high-volume realtors.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-white text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Unlimited Scans</li>
                            <li className="flex items-center text-white text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Priority Processing</li>
                            <li className="flex items-center text-white text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Full Curative Actions</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/40">Subscribe Now</button>
                    </div>

                    {/* Enterprise */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col">
                        <h3 className="text-xl font-semibold text-slate-300">Enterprise</h3>
                        <div className="my-4">
                            <span className="text-4xl font-bold text-white">Custom</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-8">White-label for brokerages.</p>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-slate-300 text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> API Access</li>
                            <li className="flex items-center text-slate-300 text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Custom Branding</li>
                            <li className="flex items-center text-slate-300 text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Dedicated Account Mgr</li>
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-colors">Contact Sales</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
