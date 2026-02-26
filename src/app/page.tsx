"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StorySection } from "@/components/landing/StorySection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { GeographicIntelligenceSection } from "@/components/landing/GeographicIntelligenceSection";
import { AnalysisReport, AnalysisResult } from "@/components/landing/AnalysisReport";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      setResult(data);
      // Determine scroll target: Report if success, or top if error
      setTimeout(() => {
        document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError("Failed to analyze document. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <HeroSection onFileSelect={handleFileUpload} isAnalyzing={loading} />

      {/* Loading State Overlay or Inline */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-4" />
          <h3 className="text-2xl text-white font-bold animate-pulse">Analyzing Title Data...</h3>
          <p className="text-slate-400">Deep Think Agent is reviewing liens & vesting.</p>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto my-8 p-4 bg-rose-950/50 border border-rose-900 rounded-xl flex items-center text-rose-200">
          <AlertTriangle className="mr-3 flex-shrink-0" /> {error}
        </div>
      )}

      {result && <AnalysisReport result={result} />}

      <StorySection />

      <GeographicIntelligenceSection />

      <PricingSection />

      <SecuritySection />

    </main>
  );
}
