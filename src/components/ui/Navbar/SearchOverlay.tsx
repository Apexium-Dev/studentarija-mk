'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, ArrowRight } from 'lucide-react'
import { aktuelnoItems, navLinks } from './links'

const suggestions = [
  ...aktuelnoItems.slice(0, 5).map(i => ({ label: i.label, href: i.href })),
  ...navLinks.map(i => ({ label: i.label, href: i.href })),
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[61] w-full max-w-2xl px-4"
          >
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl shadow-2xl overflow-hidden">

              {/* Input row */}
              <div className="flex items-center gap-3 px-5 h-16 border-b border-[var(--border-main)]">
                <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Пребарувај..."
                  className="flex-1 bg-transparent text-[var(--text-main)] text-base font-bold placeholder:text-[var(--text-muted)] outline-none"
                />
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick links */}
              <div className="p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] px-2 mb-3">
                  Брзи линкови
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {suggestions.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      onClick={onClose}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--hover-bg)] transition-colors"
                    >
                      <span className="text-sm font-bold text-[var(--text-main)]">{s.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer hint */}
              <div className="flex items-center gap-4 px-5 py-3 border-t border-[var(--border-main)]">
                <span className="text-[10px] text-[var(--text-muted)]"><kbd className="font-mono bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-[10px]">ESC</kbd> за затвори</span>
                <span className="text-[10px] text-[var(--text-muted)]"><kbd className="font-mono bg-[var(--hover-bg)] px-1.5 py-0.5 rounded text-[10px]">↵</kbd> за пребарај</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
