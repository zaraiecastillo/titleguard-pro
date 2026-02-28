"use client";

import { Shield, Lock, Database, Trash2 } from "lucide-react";

export function SecuritySection() {
    return (
        <section id="security" className="py-24 relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-3">
                            <div className="h-[1px] w-8 bg-[#D4AF37]/50"></div>
                            <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em]">Zero Trace Protocol</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-white">
                            Your Data Exists Only <br />
                            <span className="text-slate-500 italic">For the Analysis.</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-sans">
                            We built TitleGuard with a radical privacy philosophy:
                            <span className="text-white"> Zero Permanent Retention.</span> <br />
                            We do not store your PDFs long-term or save your client’s PII.
                            Once the report is generated and you choose to purge, the data ceases to exist in our active environment.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans">
                            <div className="flex items-start">
                                <Database className="w-5 h-5 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white text-sm uppercase tracking-wider">Volatile Session Logic</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Files are analyzed in a temporary, encrypted session state and are never used to train our AI models.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Trash2 className="w-5 h-5 text-rose-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white text-sm uppercase tracking-wider">User-Controlled Purge</h4>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">All data can be cryptographically deleted from our temporary workspace immediately after your report is finalized.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="glass-card p-1 rounded-sm border border-white/5 relative z-10">
                            <div className="bg-[#050505] p-8">
                                <div className="flex justify-center mb-6">
                                    <Shield className="w-12 h-12 text-[#D4AF37]" />
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 p-4 font-mono text-xs text-[#D4AF37] mb-4">
                                    <p>{">"} Uploading PDF...</p>
                                    <p>{">"} Initializing Privacy Filter...</p>
                                    <p>{">"} Redacting SSN: ***-**-****...</p>
                                    <p>{">"} Analysis Complete.</p>
                                    <p className="text-rose-500">{">"} PURGING MEMORY... DONE.</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex items-center px-3 py-1 text-slate-500 text-[10px] uppercase tracking-widest border border-white/10">
                                        <Lock className="w-3 h-3 mr-2" /> Privacy-First Architecture
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Global Footer Note */}
                <div className="text-center max-w-2xl mx-auto pt-16 mt-8 border-t border-white/5">
                    <p className="text-slate-500 font-mono text-[11px] leading-relaxed uppercase tracking-wider">
                        Our infrastructure is designed following SOC-2 and bank-grade principles as we scale toward formal certification.
                    </p>
                </div>
            </div>
        </section>
    );
}
