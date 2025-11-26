'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Smartphone } from 'lucide-react';

export default function Hero() {
    const scrollToModel = () => {
        document.getElementById('model')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToDetails = () => {
        document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="home" className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-[90vh] flex items-center">
            <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center w-full">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="relative z-10"
                >
                    <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live on Render
                    </motion.div>

                    <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                        Detect wheat diseases <br />
                        <span className="gradient-text">instantly</span>
                    </motion.h1>

                    <motion.p variants={item} className="mt-6 text-lg text-[var(--muted)] leading-relaxed max-w-xl">
                        Empowering farmers with AI-driven diagnostics. Upload a leaf photo and get immediate treatment recommendations, dosage guides, and cost estimates.
                    </motion.p>

                    <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
                        <button
                            onClick={scrollToModel}
                            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[#020617] font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all flex items-center gap-2"
                        >
                            Try the Model
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                        <button
                            onClick={scrollToDetails}
                            className="px-8 py-4 rounded-xl glass-btn text-[var(--muted)] hover:text-white font-medium"
                        >
                            Learn More
                        </button>
                    </motion.div>

                    <motion.div variants={item} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-white/5 grid place-items-center text-emerald-400 mb-2">
                                <Zap size={20} />
                            </div>
                            <h4 className="font-semibold text-white">Fast Inference</h4>
                            <div className="text-sm text-[var(--muted)]">Optimized for edge & low latency</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-white/5 grid place-items-center text-amber-400 mb-2">
                                <ShieldCheck size={20} />
                            </div>
                            <h4 className="font-semibold text-white">Practical Advice</h4>
                            <div className="text-sm text-[var(--muted)]">Dosage & cost estimates included</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-white/5 grid place-items-center text-blue-400 mb-2">
                                <Smartphone size={20} />
                            </div>
                            <h4 className="font-semibold text-white">Mobile Ready</h4>
                            <div className="text-sm text-[var(--muted)]">Lightweight MobileNetV2 model</div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.aside
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="glass-panel p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="font-bold text-xl border-b border-white/5 pb-4 flex items-center justify-between">
                        <span>System Status</span>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">OPERATIONAL</span>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-[var(--muted)] text-sm">Model Architecture</span>
                            <span className="font-mono text-emerald-400 text-sm">MobileNetV2</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-[var(--muted)] text-sm">Training Accuracy</span>
                            <span className="font-mono text-amber-400 text-sm">94.2%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-[var(--muted)] text-sm">Backend Latency</span>
                            <span className="font-mono text-blue-400 text-sm">~120ms</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-[var(--muted)] text-sm">Supported Classes</span>
                            <span className="font-mono text-purple-400 text-sm">45+</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6">
                        <button
                            onClick={scrollToModel}
                            className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
                        >
                            Start Diagnosis
                            <span className="group-hover:translate-y-1 transition-transform">↓</span>
                        </button>
                    </div>
                </motion.aside>
            </div>
        </section>
    );
}
