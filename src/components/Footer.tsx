"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, ArrowRight, Chrome } from "lucide-react";

export function Footer() {
    const pathname = usePathname();

    if (pathname === "/extension-view") return null;

    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-12 pb-6 relative overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* Column 1: Brand */}
                    <div className="space-y-6 lg:pr-8">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                            <span className="text-xl font-serif text-white tracking-wide">
                                TitleGuard <span className="text-[#D4AF37]">AI</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed font-sans pb-4">
                            Eliminating title friction at the source. The proactive intelligence engine for modern real estate transactions.
                        </p>
                        <a href="#" className="inline-flex items-center space-x-2 bg-white/[0.03] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-3 py-2 rounded-sm transition-all group w-fit">
                            <Chrome className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] group-hover:text-white">Chrome Web Store</span>
                        </a>
                    </div>

                    {/* Column 2: Platform */}
                    <div className="space-y-6">
                        <h4 className="text-[#D4AF37] text-xs font-sans uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="/intelligence" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">Intelligence Engine</Link></li>
                            <li><Link href="/solution" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">The Solution</Link></li>
                            <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">Pricing Tiers</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="space-y-6">
                        <h4 className="text-[#D4AF37] text-xs font-sans uppercase tracking-widest">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">About Us</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">Contact the Vault</Link></li>
                            <li><Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">Security Protocol</Link></li>
                            <li><Link href="/faq" className="text-slate-400 hover:text-white transition-colors text-sm font-sans">Knowledge Base</Link></li>
                        </ul>
                        <div className="pt-2">
                            <a href="mailto:concierge@titleguard-pro.ai" className="text-[#D4AF37] hover:text-white transition-colors text-sm font-sans">concierge@titleguard-pro.ai</a>
                        </div>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-[#D4AF37] text-xs font-sans uppercase tracking-widest">The Briefing</h4>
                        <p className="text-slate-400 text-sm leading-relaxed font-sans">
                            Receive institutional-grade insights on title curative strategies once a month.
                        </p>
                        <form className="relative group mt-4">
                            <input
                                type="email"
                                placeholder="Email Address..."
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 pr-12 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors placeholder:text-slate-600"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#D4AF37] transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-xs font-sans">
                        &copy; {new Date().getFullYear()} TitleGuard PRO AI. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors text-xs font-sans">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 hover:text-white transition-colors text-xs font-sans">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
