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
    const step = 1200 / to
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= to) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [inView, to])

  return <span ref={ref}>{String(count).padStart(2, '0')}</span>
}

const featured = news[0]
const list = news.slice(1, 6)
const bottom = news.slice(6)

export default function LatestNews() {
  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="relative">
            <span className="absolute -top-3 right-0 font-display text-[clamp(4rem,12vw,10rem)] leading-none text-[var(--border-main)] select-none pointer-events-none">
              <Counter to={news.length} />
            </span>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4">
              Актуелно
            </p>
            <div className="flex items-center gap-5">
              <span className="font-display text-[clamp(2.2rem,5vw,5rem)] uppercase leading-none tracking-tight text-[var(--text-main)]">
                Последни
              </span>
              <motion.div
                className="h-[5px] w-16 bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="font-display text-[clamp(2.2rem,5vw,5rem)] uppercase leading-none tracking-tight text-primary italic">
                Вести
              </span>
            </div>
          </div>

          <Link
            href="/news"
            className="group hidden md:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-primary transition-colors"
          >
            Види ги сите <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main grid: featured left + list right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

          {/* Featured article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Link href={featured.href} className="group block relative rounded-2xl overflow-hidden h-[420px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className={cn('text-[10px] font-black uppercase tracking-widest mb-3', categoryColors[featured.category] ?? 'text-primary')}>
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-white/60 line-clamp-2 mb-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{featured.date}</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Прочитај <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Numbered list */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-[var(--border-main)]">
            {list.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link href={item.href} className="group flex items-start gap-4 py-4 hover:bg-[var(--hover-bg)] px-3 -mx-3 rounded-xl transition-colors">
                  <span className="font-display text-3xl leading-none text-[var(--border-main)] group-hover:text-primary/30 transition-colors shrink-0 w-10 mt-0.5">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={cn('text-[9px] font-black uppercase tracking-widest block mb-1.5', categoryColors[item.category] ?? 'text-primary')}>
                      {item.category}
                    </span>
                    <h3 className="text-sm font-black text-[var(--text-main)] leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{item.date}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-primary mt-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bottom.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link href={item.href} className="group flex flex-col rounded-2xl overflow-hidden border border-[var(--border-main)] hover:border-primary/25 transition-all">
                <div className="relative h-36 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={cn('absolute top-2 left-2 text-[9px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded', categoryColors[item.category] ?? 'text-primary')}>
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-xs font-black text-[var(--text-main)] line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{item.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* See all card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: bottom.length * 0.07 }}
          >
            <Link href="/news" className="group flex flex-col items-center justify-center h-full min-h-[160px] rounded-2xl border border-dashed border-[var(--border-main)] hover:border-primary/40 hover:bg-[var(--hover-bg)] transition-all gap-3">
              <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors text-center">
                Види ги<br />сите вести
              </span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
