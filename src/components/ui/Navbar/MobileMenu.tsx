'use client'

import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { navLinks } from './links'

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-40 bg-[var(--bg-main)] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border-main)]">
            <span className="font-black text-lg tracking-tighter uppercase text-[var(--text-main)]">
              Студентарија<span className="text-primary">.мк</span>
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-[var(--border-main)] rounded-xl text-[var(--text-muted)] hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col divide-y divide-[var(--border-main)] px-6 mt-4">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-5 text-2xl font-black uppercase tracking-tighter text-[var(--text-main)] hover:text-primary transition-colors"
                >
                  {link.label}
                  <span className="text-primary text-sm font-mono opacity-40">0{i + 1}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto px-6 pb-10">
            <Link
              href="/brucosi"
              onClick={onClose}
              className="w-full h-14 bg-primary flex items-center justify-center font-black uppercase tracking-widest text-dark text-sm"
            >
              За Брукоши →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
