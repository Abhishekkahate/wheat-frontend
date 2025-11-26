'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Zap, AlertTriangle, CheckCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getDiseaseDetails } from '@/data/disease_info';

interface Prediction {
    class: string;
    confidence: number;
}

interface TreatmentItem {
    ai: string;
    formulation?: string;
    phi_days?: string;
    dose_per_ha?: string;
    dose_min?: string;
    dose_max?: string;
    unit?: string;
    cost_estimate?: {
        cost_min_inr?: number;
        min_inr?: number;
        cost_max_inr?: number;
        max_inr?: number;
    };
    safety?: string;
}

interface Treatment {
    pathogen_type?: string;
    cost_estimate?: {
        min_inr: number;
        max_inr: number;
    };
    recommended: TreatmentItem[];
}

interface ApiResponse {
    predictions: Prediction[];
    treatment?: Treatment;
}

export default function ModelInterface() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (selectedFile: File) => {
        if (!selectedFile.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG)');
            return;
        }
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setResult(null);
        setError(null);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const predict = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('https://wheat-backend.onrender.com/predict', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`Server error: ${res.status} ${txt}`);
            }

            const data: ApiResponse = await res.json();
            setResult(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to predict');
        } finally {
            setLoading(false);
        }
    };

    const clear = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <section id="model" className="py-20 px-6 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 rounded-3xl"
                >
                    <h2 className="text-3xl font-bold mb-2 text-white">Model — Predict & Recommend</h2>
                    <p className="text-[var(--muted)] mb-8">
                        Upload image of a wheat leaf. The model predicts disease and returns suggested treatment with dosage and cost estimate.
                    </p>

                    <motion.div
                        animate={{
                            scale: dragActive ? 1.02 : 1,
                            borderColor: dragActive ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer bg-white/5 hover:bg-white/10`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        />
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 grid place-items-center text-3xl text-emerald-400 ${dragActive ? 'animate-bounce' : ''}`}>
                            <Upload size={32} />
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white text-lg">Drop or click to upload</div>
                            <div className="text-sm text-[var(--muted)] mt-1">Supported: JPG, PNG</div>
                        </div>
                    </motion.div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                            onClick={predict}
                            disabled={!file || loading}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#020617] font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-emerald-500/40 transition-all min-w-[140px] flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                            {loading ? 'Analyzing...' : 'Predict'}
                        </button>
                        <button
                            onClick={clear}
                            className="px-8 py-3 rounded-xl glass-btn text-[var(--muted)] hover:text-white font-medium flex items-center gap-2"
                        >
                            <X size={20} />
                            Clear
                        </button>
                        <div className="ml-auto text-xs text-[var(--muted)] hidden sm:block bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            Backend: <span className="text-emerald-400">wheat-backend.onrender.com</span>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-3"
                            >
                                <AlertTriangle size={20} />
                                Error: {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {result?.treatment && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-10"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <CheckCircle className="text-emerald-400" />
                                            Suggested Treatment
                                        </h3>
                                        <div className="text-sm text-emerald-400 mt-1 ml-8">{result.treatment.pathogen_type}</div>
                                    </div>
                                    {result.treatment.cost_estimate && (
                                        <div className="text-right bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20">
                                            <div className="text-xs text-amber-200/80 uppercase tracking-wider font-semibold">Est. Cost/ha</div>
                                            <div className="font-mono font-bold text-amber-400 text-lg">
                                                ₹{result.treatment.cost_estimate.min_inr} - ₹{result.treatment.cost_estimate.max_inr}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {result.treatment.recommended.map((rec, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all hover:bg-white/10"
                                        >
                                            <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                                                <div>
                                                    <div className="font-bold text-white text-xl flex items-center gap-2">
                                                        {rec.ai}
                                                        <span className="text-sm font-normal px-2 py-0.5 rounded bg-white/10 text-[var(--muted)]">{rec.formulation}</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
                                                    PHI: {rec.phi_days || 'N/A'}
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6 text-sm">
                                                <div className="bg-black/20 p-3 rounded-lg">
                                                    <div className="text-[var(--muted)] text-xs mb-1 uppercase tracking-wider">Dosage</div>
                                                    <div className="text-white font-medium">
                                                        {rec.dose_per_ha || (rec.dose_min ? `${rec.dose_min} - ${rec.dose_max} ${rec.unit}` : 'Refer label')}
                                                    </div>
                                                </div>
                                                {(rec.cost_estimate?.cost_min_inr || rec.cost_estimate?.min_inr) && (
                                                    <div className="bg-black/20 p-3 rounded-lg">
                                                        <div className="text-[var(--muted)] text-xs mb-1 uppercase tracking-wider">Cost Estimate</div>
                                                        <div className="text-amber-300 font-mono font-medium">
                                                            ₹{rec.cost_estimate.cost_min_inr || rec.cost_estimate.min_inr} - ₹{rec.cost_estimate.cost_max_inr || rec.cost_estimate.max_inr}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {rec.safety && (
                                                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-red-300 flex items-center gap-2">
                                                    <AlertTriangle size={14} />
                                                    Safety: {rec.safety}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 text-xs text-[var(--muted)] text-center opacity-60 bg-white/5 p-3 rounded-lg">
                                    Disclaimer: Consult local agronomist before applying any treatment.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-6 rounded-3xl h-fit sticky top-24"
                >
                    <div className="font-bold text-white mb-4 flex items-center gap-2">
                        <ImageIcon size={18} />
                        Preview
                    </div>
                    <div className="w-full aspect-square bg-black/40 rounded-2xl overflow-hidden grid place-items-center border border-white/5 relative group">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Preview"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                unoptimized
                            />
                        ) : (
                            <div className="text-[var(--muted)] flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-white/5 grid place-items-center">
                                    <ImageIcon size={32} className="opacity-50" />
                                </div>
                                <span>No image selected</span>
                            </div>
                        )}

                        {loading && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center flex-col gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-emerald-500/30 rounded-full"></div>
                                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                                </div>
                                <div className="text-emerald-400 font-bold text-sm animate-pulse">Analyzing Leaf...</div>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {result?.predictions && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-6 space-y-5"
                            >
                                <div className="font-bold text-white border-b border-white/5 pb-2">Analysis Results</div>
                                {result.predictions.length > 0 ? (
                                    <>
                                        {result.predictions.map((p, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-white font-medium">{p.class}</span>
                                                    <span className="text-emerald-400 font-mono font-bold">{(p.confidence * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.max(5, p.confidence * 100)}%` }}
                                                        transition={{ duration: 1, delay: 0.2 }}
                                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}

                                        {(() => {
                                            const topPrediction = result.predictions[0];
                                            const details = topPrediction ? getDiseaseDetails(topPrediction.class) : null;

                                            if (details) return (
                                                <div className="mt-6 pt-6 border-t border-white/5">
                                                    <h4 className="text-white font-bold mb-2">Disease Info</h4>
                                                    <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                                                        {details.description}
                                                    </p>

                                                    <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Symptoms</h5>
                                                    <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1 mb-4">
                                                        {details.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                                                    </ul>

                                                    <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Prevention</h5>
                                                    <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1">
                                                        {details.prevention.map((p, i) => <li key={i}>{p}</li>)}
                                                    </ul>
                                                </div>
                                            );
                                            return null;
                                        })()}
                                    </>
                                ) : (
                                    <div className="text-sm text-[var(--muted)]">No predictions returned</div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.aside>
            </div>
        </section>
    );
}
