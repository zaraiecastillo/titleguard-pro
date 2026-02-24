"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    tierNeeded?: "one_time" | "pro";
    title?: string;
    description?: string;
}

export function UpgradeModal({
    isOpen,
    onClose,
    title = "Upgrade Required",
    description = "This feature requires a premium intelligence tier. Upgrade your account to unlock full access."
}: UpgradeModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 shadow-2xl overflow-hidden"
                >
                    {/* Top Gold Gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                            <Lock className="w-6 h-6 text-[#D4AF37]" />
                        </div>

                        <h2 className="text-2xl font-serif text-white mb-2">{title}</h2>
                        <p className="text-sm text-slate-400 font-sans mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="space-y-3">
                            <Link href="/pricing" onClick={onClose} className="w-full flex items-center justify-center bg-[#D4AF37] text-black hover:bg-white transition-colors py-3 px-4 font-bold text-xs uppercase tracking-widest group">
                                <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                Upgrade to Pro
                            </Link>

                            <button onClick={onClose} className="w-full flex items-center justify-center border border-white/10 text-white hover:bg-white/5 transition-colors py-3 px-4 font-bold text-xs uppercase tracking-widest">
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#D4AF37] rounded-full opacity-10 blur-3xl pointer-events-none" />
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
