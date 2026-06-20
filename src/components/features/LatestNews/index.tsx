'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { news, categoryColors } from './news'

const CARD_WIDTH = 320
const GAP = 20

export default function LatestNews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, news.length - 1))
    setActiveIndex(clamped)
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + GAP),
      behavior: 'smooth',
    })
  }, [])

  const prev = () => scrollTo(activeIndex - 1)
  const next = () => scrollTo(activeIndex + 1)

  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)] overflow-hidden">

      {/* Header row */}
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

        {/* Right: nav + CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-primary/40 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={activeIndex === news.length - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-primary/40 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <Link
            href="/news"
            className="group flex items-center gap-2 h-10 px-5 border border-[var(--border-main)] hover:border-primary/40 hover:bg-[var(--hover-bg)] transition-all text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            Види ги сите
            <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Carousel track */}
      <div className="pl-6 max-w-7xl mx-auto">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-20 pr-6"
          style={{ scrollSnapType: 'x mandatory' }}
          onScroll={(e) => {
            const el = e.currentTarget
            const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP))
            setActiveIndex(idx)
          }}
        >
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ scrollSnapAlign: 'start', minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
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
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={cn('absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 rounded', categoryColors[item.category] ?? 'text-primary')}>
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-black text-[var(--text-main)] leading-snug tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
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

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 pb-10">
        {news.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              'rounded-full transition-all duration-300',
              i === activeIndex ? 'w-6 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-[var(--border-main)] hover:bg-[var(--text-muted)]'
            )}
          />
        ))}
      </div>

    </section>
  )
}
