import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LatestNews() {
  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)]">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-14 flex items-end justify-between gap-8">

        {/* Left: label + heading */}
        <div>
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="bg-primary text-dark text-[11px] font-black uppercase tracking-[0.3em] px-3 py-1">
              Актуелно
            </span>
          </div>

          {/* Heading */}
          <div>
            {/* Line 1 — yellow block */}
            <div className="inline-block bg-primary px-4 py-1 mb-1">
              <span className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] uppercase leading-none tracking-tight text-dark">
                Последни
              </span>
            </div>

            {/* Line 2 — white italic */}
            <div className="block">
              <span className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] uppercase leading-none tracking-tight text-[var(--text-main)] italic">
                Вести
              </span>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <Link
          href="/news"
          className="shrink-0 group flex flex-col items-center justify-center gap-1 w-28 h-28 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-main)] hover:border-primary/30 hover:bg-[var(--hover-bg)] transition-all duration-300"
        >
          <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-main)] text-center leading-snug">
            Види ги<br />сите
          </span>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* News cards placeholder */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)] h-56 flex items-end p-5 relative overflow-hidden group hover:border-primary/20 transition-colors"
          >
            {/* Placeholder shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--hover-bg)] to-[var(--bg-secondary)]" />
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">
                Вести
              </span>
              <p className="text-sm font-bold text-[var(--text-muted)]">
                Содржината наскоро...
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
