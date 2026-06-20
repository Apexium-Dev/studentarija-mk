'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'motion/react'
import { motion } from 'motion/react'
import Link from 'next/link'

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function TkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const socials = [
  { label: 'INSTAGRAM', icon: IgIcon, href: 'https://instagram.com' },
  { label: 'TIKTOK',    icon: TkIcon, href: 'https://tiktok.com' },
  { label: 'FACEBOOK',  icon: FbIcon, href: 'https://facebook.com' },
  { label: 'LINKEDIN',  icon: LiIcon, href: 'https://linkedin.com' },
]

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = Math.ceil(to / 60)
    const t = setInterval(() => {
      n = Math.min(n + step, to)
      setCount(n)
      if (n >= to) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView, to])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function CommunitySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[var(--bg-main)] py-24 px-6 text-center border-t border-[var(--border-main)]">

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-display text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4"
      >
        ПРИДРУЖИ СЕ НА
      </motion.p>

      {/* ЗАЕДНИЦАТА */}
      <div className="overflow-hidden mb-10">
        <motion.h2
          initial={{ y: 80 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="font-display italic uppercase leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            background: 'linear-gradient(90deg, #f472b6 0%, #a855f7 50%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ЗАЕДНИЦАТА
        </motion.h2>
      </div>

      {/* Sub label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="font-display text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-8"
      >
        НАЈГОЛЕМАТА СТУДЕНТСКА МРЕЖА НА{' '}
        <span
          className="italic"
          style={{
            background: 'linear-gradient(90deg, #f472b6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          INSTAGRAM
        </span>
      </motion.p>

      {/* Counter row */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center gap-4 mb-6 flex-wrap"
      >
        <span
          className="font-display italic leading-none text-black px-6 py-2"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            background: '#ffc107',
          }}
        >
          <Counter to={60000} suffix="+" />
        </span>
        <span
          className="font-display uppercase leading-none text-[var(--text-main)]"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        >
          СТУДЕНТИ
        </span>
      </motion.div>

      {/* ВО МАКЕДОНИЈА */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="font-display text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-14"
      >
        ВО МАКЕДОНИЈА
      </motion.p>

      {/* Social buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        {socials.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 h-12 px-6 bg-[var(--bg-secondary)] hover:bg-[var(--hover-bg)] border border-[var(--border-main)] hover:border-primary/30 rounded-xl transition-all"
          >
            <span className="text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors flex items-center">
              <Icon />
            </span>
            <span className="font-display text-[11px] tracking-widest uppercase text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
              {label}
            </span>
          </Link>
        ))}
      </motion.div>

    </section>
  )
}
