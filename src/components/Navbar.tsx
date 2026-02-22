"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const links = [
        { name: "Intelligence", href: "/intelligence" },
        { name: "Solution", href: "/solution" },
        { name: "Pricing", href: "/pricing" },
        { name: "Security", href: "/security" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-lg bg-black/40 border-b border-white/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Logo (Z-Index higher than overlay) */}
                    <Link
                        href="/"
                        className="relative z-[110] flex items-center space-x-3 group cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="relative">
                            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-lg rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xl font-serif text-white tracking-wide">
                            TitleGuard <span className="text-[#D4AF37]">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm text-slate-400 hover:text-[#D4AF37] transition-colors lowercase font-sans tracking-wide"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button className="px-5 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-colors rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            Get Access
                        </button>
                    </div>

                    {/* Mobile Hamburger (Z-Index higher than overlay) */}
                    <div className="md:hidden relative z-[110]">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#D4AF37] p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-center items-center"
                    >
                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-[url('/bg-hero.png')] opacity-10 bg-cover bg-center pointer-events-none" />
                        <div className="absolute w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

                        <div className="flex flex-col space-y-8 text-center relative z-10 w-full px-6">
                            {links.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-serif text-white hover:text-[#D4AF37] transition-colors block py-2"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="pt-8"
                            >
                                <button className="w-full max-w-xs py-4 bg-[#D4AF37] text-black text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                    Get Access
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
