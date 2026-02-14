"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
}

export function FileUpload({ onFileSelect, isAnalyzing }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles?.length > 0) {
                const selected = acceptedFiles[0];
                setFile(selected);
                onFileSelect(selected);
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        disabled: isAnalyzing,
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div
                {...getRootProps()}
                className={twMerge(
                    "relative group border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out cursor-pointer",
                    isDragActive
                        ? "border-emerald-500 bg-emerald-500/10 scale-[1.02]"
                        : "border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800/50",
                    isAnalyzing && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="upload-prompt"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center"
                            >
                                <div className="p-4 rounded-full bg-slate-800 ring-1 ring-slate-700 group-hover:ring-slate-500 transition-all">
                                    <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-emerald-400" />
                                </div>
                                <div className="mt-4 space-y-2">
                                    <p className="text-lg font-medium text-slate-200">
                                        {isDragActive ? "Drop text-based PDF here" : "Click or drag PDF analysis"}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Supports text-based PDFs (scans not yet supported)
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file-selected"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center space-x-4 bg-slate-800 px-6 py-4 rounded-xl border border-slate-700 w-full relative"
                            >
                                <div className="p-3 bg-emerald-500/20 rounded-lg">
                                    <FileText className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>

                                {!isAnalyzing && (
                                    <button
                                        onClick={removeFile}
                                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-slate-400 hover:text-red-400" />
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
