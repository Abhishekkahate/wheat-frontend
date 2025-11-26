'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, User } from 'lucide-react';

export default function Team() {
    const team = [
        { name: 'Abhishek Kahate', role: 'ML & Backend', desc: 'Role: model training, API', color: 'from-blue-500 to-cyan-500' },
        { name: 'Tanhvi Shanware', role: 'Frontend & UX', desc: 'Role: UI, deployment', color: 'from-purple-500 to-pink-500' },
        { name: 'Krish Giri', role: 'Data & Testing', desc: 'Role: dataset curation', color: 'from-amber-500 to-orange-500' },
    ];

    return (
        <section id="team" className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-10 text-white text-center"
            >
                Meet the Team
            </motion.h3>

            <div className="flex flex-wrap justify-center gap-8">
                {team.map((member, idx) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-6 rounded-2xl w-full sm:w-80 group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-6 grid place-items-center shadow-lg`}>
                            <User size={32} className="text-white" />
                        </div>

                        <div className="text-center">
                            <h5 className="font-bold text-xl text-white mb-1">{member.name}</h5>
                            <div className="text-emerald-400 text-sm font-medium mb-3">{member.role}</div>
                            <div className="text-[var(--muted)] text-sm opacity-80 mb-6">{member.desc}</div>

                            <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                                    <Github size={18} />
                                </button>
                                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                                    <Linkedin size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
