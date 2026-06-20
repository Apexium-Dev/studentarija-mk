'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'
import { news, categoryColors } from './news'

function Counter({ to }: { to: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let n = 0
    const t = setInterval(() => { n++; setCount(n); if (n >= to) clearInterval(t) }, 1200 / to)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{String(count).padStart(2, '0')}</span>
}

export default function LatestNews() {
  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div className="relative">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Актуелно</p>
            <div className="flex items-center gap-4">
              <span className="font-display text-[clamp(2.2rem,5vw,5rem)] uppercase leading-none text-[var(--text-main)]">Последни</span>
              <motion.div className="h-[4px] w-12 bg-primary" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ transformOrigin: 'left' }} />
              <span className="font-display text-[clamp(2.2rem,5vw,5rem)] uppercase leading-none text-primary italic">Вести</span>
            </div>
          </div>
          <span className="font-display text-[5rem] leading-none text-[var(--border-main)] select-none hidden md:block">
            <Counter to={news.length} />
          </span>
        </div>

        {/* News rows */}
        <div className="flex flex-col">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={item.href}
                className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_180px_1fr_auto_120px] items-center gap-4 md:gap-6 py-5 border-b border-[var(--border-main)] hover:border-primary/20 transition-all"
              >
                {/* Index */}
                <span className="font-display text-2xl text-[var(--border-main)] group-hover:text-primary/40 transition-colors leading-none w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Thumbnail */}
                <div className="relative h-16 rounded-xl overflow-hidden shrink-0 hidden md:block">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="180px" />
                </div>

                {/* Title + excerpt */}
                <div className="min-w-0">
                  <span className={cn('text-[9px] font-black uppercase tracking-widest block mb-1', categoryColors[item.category] ?? 'text-primary')}>
                    {item.category}
                  </span>
                  <h3 className="text-sm font-black text-[var(--text-main)] group-hover:text-primary transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5 hidden md:block">
                    {item.excerpt}
                  </p>
                </div>

                {/* Date */}
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider shrink-0 hidden md:block">
                  {item.date}
                </span>

                {/* Arrow */}
                <div className="flex justify-end shrink-0">
                  <span className="w-8 h-8 rounded-full border border-[var(--border-main)] flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-dark transition-colors" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/news" className="group flex items-center gap-3 h-12 px-8 border border-[var(--border-main)] hover:border-primary hover:bg-primary transition-all text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-dark">
            Види ги сите вести
            <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-dark transition-colors" />
          </Link>
        </div>

      </div>
    </section>
  )
}
