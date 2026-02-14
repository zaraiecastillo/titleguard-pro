"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { clsx } from "clsx";

export type RiskScore = "GREEN" | "YELLOW" | "RED";

interface RiskGaugeProps {
    score: RiskScore;
    confidence?: string;
}

export function RiskGauge({ score, confidence }: RiskGaugeProps) {
    const getRiskConfig = (s: RiskScore) => {
        switch (s) {
            case "GREEN":
                return {
                    color: "text-emerald-500",
                    bg: "bg-emerald-500",
                    border: "border-emerald-500",
                    icon: CheckCircle,
                    label: "Clear Title",
                    rotate: 0,
                };
            case "YELLOW":
                return {
                    color: "text-yellow-500",
                    bg: "bg-yellow-500",
                    border: "border-yellow-500",
                    icon: AlertTriangle,
                    label: "Caution",
                    rotate: 90,
                };
            case "RED":
                return {
                    color: "text-red-500",
                    bg: "bg-red-500",
                    border: "border-red-500",
                    icon: AlertOctagon,
                    label: "High Risk",
                    rotate: 180,
                };
            default:
                return {
                    color: "text-slate-500",
                    bg: "bg-slate-500",
                    border: "border-slate-500",
                    icon: CheckCircle,
                    label: "Unknown",
                    rotate: 0,
                };
        }
    };

    const config = getRiskConfig(score);
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-sm mx-auto">
            <div className="relative w-48 h-24 overflow-hidden mb-4">
                {/* Gauge Body */}
                <div className="absolute top-0 left-0 w-full h-48 rounded-full border-[12px] border-slate-800 box-border"></div>

                {/* Gauge Needle/Fill */}
                <motion.div
                    className={`absolute top-0 left-0 w-full h-48 rounded-full border-[12px] border-transparent border-t-${config.color.split('-')[1]}-${config.color.split('-')[2]} box-border`}
                    initial={{ rotate: -180 }}
                    animate={{ rotate: config.rotate - 180 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    style={{ transformOrigin: "50% 50%" }}
                />
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 mt-[-2rem] mb-2"
            >
                <Icon className={clsx("w-8 h-8", config.color)} />
                <h2 className={clsx("text-2xl font-bold tracking-tight", config.color)}>
                    {config.label}
                </h2>
            </motion.div>

            {confidence && (
                <p className="text-xs text-slate-500">Confidence: {(parseFloat(confidence) * 100).toFixed(0)}%</p>
            )}
        </div>
    );
}
