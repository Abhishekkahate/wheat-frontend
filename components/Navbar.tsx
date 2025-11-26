'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sprout } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Model', href: '#model' },
    { name: 'Project', href: '#details' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-3' : 'py-6'}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 grid place-items-center text-[#020617] shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <Sprout size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight group-hover:text-emerald-400 transition-colors">Wheat Detector</div>
            <div className="text-xs text-[var(--muted)]">AI for Agriculture</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/5 transition-all text-sm font-medium relative group"
            >
              {link.name}
              <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-emerald-500 -translate-x-1/2 group-hover:w-1/2 transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--muted)] hover:text-white text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
