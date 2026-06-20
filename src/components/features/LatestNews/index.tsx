'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'
import { news, categoryColors } from './news'

function Counter({ to }: { to: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = duration / to
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= to) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [inView, to])

  return (
    <span ref={ref}>
      {String(count).padStart(2, '0')}
    </span>
  )
}

const DOUBLED = [...news, ...news]

export default function LatestNews() {
  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)] overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">

        {/* Top row — label + count + CTA */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Актуелно
            </span>
          </div>

          <Link
            href="/news"
            className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-primary transition-colors"
          >
            Види ги сите
            <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main heading */}
        <div className="relative">
          {/* Counter watermark */}
          <span className="absolute -top-4 right-0 font-display text-[clamp(6rem,18vw,16rem)] leading-none text-[var(--border-main)] select-none pointer-events-none">
            <Counter to={news.length} />
          </span>

          {/* Line 1 */}
          <div className="flex items-center gap-6 mb-1">
            <span className="font-display text-[clamp(3rem,7vw,7.5rem)] uppercase leading-none tracking-tight text-[var(--text-main)]">
              Последни
            </span>
            {/* Yellow extending line */}
            <motion.div
              className="h-[6px] bg-primary flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Line 2 */}
          <span className="font-display text-[clamp(3rem,7vw,7.5rem)] uppercase leading-none tracking-tight text-primary italic">
            Вести
          </span>
        </div>
      </div>

      {/* Infinite scroll track */}
      <div className="overflow-hidden pb-20">
        <div className="news-scroll flex gap-5" style={{ width: 'max-content' }}>
          {DOUBLED.map((item, i) => (
            <motion.div
              key={`${item.id}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % news.length) * 0.04, duration: 0.4 }}
              style={{ width: 300 }}
            >
              <Link
                href={item.href}
                className="group flex flex-col rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)] hover:border-primary/25 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={cn('absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 rounded', categoryColors[item.category] ?? 'text-primary')}>
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col">
                  <h3 className="text-sm font-black text-[var(--text-main)] leading-snug tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      {item.date}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
