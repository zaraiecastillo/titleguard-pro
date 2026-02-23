import { Navbar } from "@/components/Navbar";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-slate-300 pt-32 pb-32">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-16 border-b border-white/10 pb-8">
                    <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.2em] mb-4 block">Legal & Compliance</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 font-sans text-sm tracking-wide">Last Updated: October 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-slate max-w-none font-sans text-base leading-relaxed space-y-8">

                    <section>
                        <h2 className="text-2xl font-serif text-white mb-4">1. Scope of Intelligence</h2>
                        <p>
                            TitleGuard PRO AI ("Company", "we", "us", or "our") operates as a secure, pre-underwriting intelligence platform tailored exclusively for real estate professionals and institutional brokerages. We prioritize the absolute confidentiality of your transaction files and client data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">2. The Zero-Retention Protocol</h2>
                        <p>
                            TitleGuard AI operates on a strict <strong>Zero-Retention Protocol</strong>.
                            All documents uploaded to our platform—including Title Commitments, Deeds, Mortgages, and Tax Records—are processed entirely in volatile memory (RAM).
                        </p>
                        <p>
                            Once the actionable intelligence report is generated and delivered to your session, all source files, extracted text, and personally identifiable information (PII) are immediately and permanently purged from our computational environment. We do not store, archive, or train our models on your clients' sensitive transaction data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-white mb-4">3. Data Security & Encryption</h2>
                        <p>
                            In transit and during the ephemeral processing phase, your data is protected by institutional-grade AES-256 encryption. Every analysis is executed within isolated, single-use compute sandboxes to ensure cross-tenant data contamination is mathematically impossible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-white mb-4">4. Third-Party Interactions</h2>
                        <p>
                            We utilize highly restricted, enterprise-grade APIs (such as Google Gemini Pro) to power our reasoning engines. These API agreements stringently prohibit the use of our transmission data for public model training. Your data remains your data until it is purged.
                        </p>
                    </section>
                </div>

                {/* Footer Contact */}
                <div className="mt-24 pt-8 border-t border-white/10">
                    <p className="text-sm font-sans text-slate-400">
                        For legal inquiries or audit requests, please contact our Legal Department via the Vault: <br />
                        <a href="mailto:concierge@titleguard-pro.ai" className="text-[#D4AF37] hover:text-white transition-colors tracking-wide mt-2 inline-block">concierge@titleguard-pro.ai</a>
                    </p>
                </div>
            </div>
        </main>
    );
}
