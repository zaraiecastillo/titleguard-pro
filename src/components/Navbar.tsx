"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
                    <div className="relative">
                        <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                        <div className="absolute inset-0 bg-[#D4AF37]/20 blur-lg rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xl font-serif text-white tracking-wide">
                        TitleGuard <span className="text-[#D4AF37]">AI</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Intelligence", "Solution", "Pricing", "Security"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm text-slate-400 hover:text-[#D4AF37] transition-colors lowercase font-sans tracking-wide"
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="px-5 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-colors rounded-sm">
                        Get Access
                    </button>
                </div>
            </div>
        </nav>
    );
}
