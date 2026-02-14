"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 flex items-center justify-between px-6 md:px-12"
        >
            <div className="flex items-center space-x-2">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold tracking-tight text-white">TitleGuard <span className="text-emerald-500">AI</span></span>
            </div>

            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
                <Link href="#intelligence" className="hover:text-emerald-400 transition-colors">The Intelligence</Link>
                <Link href="#problem" className="hover:text-emerald-400 transition-colors">The Problem</Link>
                <Link href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link>
                <Link href="#security" className="hover:text-emerald-400 transition-colors">Security</Link>
            </div>

            <button className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/20">
                Get Started
            </button>
        </motion.nav>
    );
}
