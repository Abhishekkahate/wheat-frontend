'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Cpu, Database, Layers, Upload } from 'lucide-react';

export default function ProjectDetails() {
    return (
        <section id="details" className="py-20 px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-10 rounded-3xl"
                >
                    <h3 className="text-3xl font-bold mb-6 text-white">Project Overview</h3>
                    <p className="text-[var(--muted)] leading-relaxed mb-8 text-lg">
                        This project automates early detection of wheat diseases using computer vision. Farmers can upload a photo of a leaf and receive an instant diagnosis and recommended treatments with dosage and cost estimates.
                    </p>

                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="text-emerald-400" />
                        Key Benefits
                    </h4>
                    <ul className="space-y-4 text-[var(--muted)]">
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                            Faster diagnosis than traditional lab methods
                        </li>
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                            Lower cost due to targeted treatment application
                        </li>
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                            Easy access via smartphones for field use
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-10 rounded-3xl"
                >
                    <h3 className="text-3xl font-bold mb-6 text-white">Technical Summary</h3>
                    <p className="text-[var(--muted)] leading-relaxed mb-8">
                        Transfer-learning on MobileNetV2 with standard preprocessing and augmentations. Training done on Colab/GPU. Model exported as .pth and loaded by FastAPI for inference.
                    </p>

                    <h4 className="text-lg font-semibold text-white mb-4">Pipeline Architecture</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 grid place-items-center text-blue-400 group-hover:scale-110 transition-transform">
                                <Upload size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-white">1. Image Upload</div>
                                <div className="text-xs text-[var(--muted)]">Client-side validation</div>
                            </div>
                        </div>

                        <div className="w-0.5 h-4 bg-white/10 ml-9"></div>

                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 grid place-items-center text-purple-400 group-hover:scale-110 transition-transform">
                                <Layers size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-white">2. Preprocessing</div>
                                <div className="text-xs text-[var(--muted)]">Resize 256 → Center Crop 224</div>
                            </div>
                        </div>

                        <div className="w-0.5 h-4 bg-white/10 ml-9"></div>

                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 grid place-items-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <Cpu size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-white">3. Inference</div>
                                <div className="text-xs text-[var(--muted)]">MobileNetV2 Prediction</div>
                            </div>
                        </div>

                        <div className="w-0.5 h-4 bg-white/10 ml-9"></div>

                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 grid place-items-center text-amber-400 group-hover:scale-110 transition-transform">
                                <Database size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-white">4. Treatment Mapping</div>
                                <div className="text-xs text-[var(--muted)]">JSON Response</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
