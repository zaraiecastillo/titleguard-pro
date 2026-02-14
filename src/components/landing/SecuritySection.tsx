"use client";

import { Shield, Lock, Database, Trash2 } from "lucide-react";

export function SecuritySection() {
    return (
        <section id="security" className="py-24 bg-slate-950 relative border-t border-slate-800/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Your Data Exists Only <br />
                            <span className="text-slate-500">For 60 Seconds.</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            We built TitleGuard with a radical security philosophy:
                            <span className="text-white font-semibold"> Zero Retention.</span> <br />
                            We don't store your PDFs. We don't save your client's PII.
                            Once the analysis is done, the data ceases to exist.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex items-start">
                                <Database className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
                                <div>
                                    <h4 className="text-white font-semibold">RAM-Only Processing</h4>
                                    <p className="text-xs text-slate-500 mt-1">Files are analyzed in volatile memory and never touch a hard drive.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Trash2 className="w-6 h-6 text-rose-500 mr-3 mt-1" />
                                <div>
                                    <h4 className="text-white font-semibold">Instant Purge</h4>
                                    <p className="text-xs text-slate-500 mt-1">All data is cryptographically shredded immediately after report generation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full opacity-20"></div>
                        <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 relative z-10">
                            <div className="flex justify-center mb-6">
                                <Shield className="w-16 h-16 text-emerald-500" />
                            </div>
                            <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-xs text-emerald-400 mb-4 border border-emerald-500/10">
                                <p>{">"} Uploading PDF...</p>
                                <p>{">"} Initializing PII Scrubber...</p>
                                <p>{">"} Redacting SSN: ***-**-****...</p>
                                <p>{">"} Analysis Complete.</p>
                                <p className="text-rose-500">{">"} PURGING MEMORY... DONE.</p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                    <Lock className="w-3 h-3 mr-1" /> SOC-2 Compliant Architecture
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
