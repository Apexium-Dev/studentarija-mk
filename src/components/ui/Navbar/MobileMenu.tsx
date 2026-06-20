'use client'

import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { navLinks, aktuelnoItems } from './links'

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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-[var(--bg-main)] flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border-main)] shrink-0">
            <span className="font-black text-lg tracking-tighter uppercase">
              Студентарија<span className="text-primary">.мк</span>
            </span>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-[var(--border-main)] rounded-xl text-[var(--text-muted)] hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 mt-2 divide-y divide-[var(--border-main)]">
            {navLinks.map((link, i) => (
              <motion.div key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>
                <Link href={link.href} onClick={onClose} className="flex items-center justify-between py-4 text-xl font-black uppercase tracking-tight text-[var(--text-main)] hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {aktuelnoItems.map((item, i) => (
              <motion.div key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 + 0.3 }}>
                <Link href={item.href} onClick={onClose} className="flex items-center py-3 text-sm font-bold text-[var(--text-muted)] hover:text-primary transition-colors">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto px-6 pb-10 pt-6">
            <Link href="/login" onClick={onClose} className="w-full h-14 bg-primary flex items-center justify-center font-black uppercase tracking-widest text-dark text-sm">
              Влез
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
