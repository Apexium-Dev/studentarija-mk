'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { news, categoryColors } from './news'

const DOUBLED = [...news, ...news]

export default function LatestNews() {
  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)] overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 flex items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="bg-primary text-dark text-[11px] font-black uppercase tracking-[0.3em] px-3 py-1">
              Актуелно
            </span>
          </div>
          <div>
            <div className="inline-block bg-primary px-4 py-1 mb-1">
              <span className="font-display text-[clamp(2.4rem,4.5vw,5rem)] uppercase leading-none tracking-tight text-dark">
                Последни
              </span>
            </div>
            <div className="block">
              <span className="font-display text-[clamp(2.4rem,4.5vw,5rem)] uppercase leading-none tracking-tight text-[var(--text-main)] italic">
                Вести
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/news"
          className="shrink-0 group flex items-center gap-2 h-10 px-5 border border-[var(--border-main)] hover:border-primary/40 hover:bg-[var(--hover-bg)] transition-all text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)]"
        >
          Види ги сите
          <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Infinite scroll track — left edge matches header content */}
      <div
        className="news-scroll-wrapper pb-20 overflow-hidden"
        style={{ paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))' }}
      >
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
