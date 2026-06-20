'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'motion/react'
import { motion } from 'motion/react'
import { Instagram, Music2, Facebook, Linkedin } from 'lucide-react'
import Link from 'next/link'

const socials = [
  { label: 'INSTAGRAM', icon: Instagram,  href: 'https://instagram.com' },
  { label: 'TIKTOK',    icon: Music2,      href: 'https://tiktok.com' },
  { label: 'FACEBOOK',  icon: Facebook,    href: 'https://facebook.com' },
  { label: 'LINKEDIN',  icon: Linkedin,    href: 'https://linkedin.com' },
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
    <section ref={ref} className="bg-black py-24 px-6 text-center">

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-display text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4"
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
        className="font-display text-[10px] tracking-[0.25em] uppercase text-white/40 mb-8"
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
          className="font-display uppercase leading-none text-white"
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
        className="font-display text-[10px] tracking-[0.3em] uppercase text-white/40 mb-14"
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
            className="group flex items-center gap-2.5 h-12 px-6 bg-[#111111] hover:bg-[#1a1a1a] border border-white/8 hover:border-white/20 rounded-xl transition-all"
          >
            <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            <span className="font-display text-[11px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
              {label}
            </span>
          </Link>
        ))}
      </motion.div>

    </section>
  )
}
