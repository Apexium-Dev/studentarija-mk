'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aktuelnoItems } from './links'

export default function AktuelnoDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          'flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-colors',
          open
            ? 'bg-primary text-dark'
            : 'border border-[var(--border-main)] text-[var(--text-main)] hover:border-primary/40'
        )}
      >
        Актуелно
        <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-3 w-[520px] bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-1 shadow-2xl z-50"
          >
            {aktuelnoItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-sm font-bold text-[var(--text-main)] hover:text-primary transition-colors border-b border-[var(--border-main)] last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
