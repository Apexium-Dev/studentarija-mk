import { sponsors } from './sponsors'

function SponsorCard({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 shrink-0 group cursor-pointer">
      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-sm opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="w-full h-full object-contain p-2"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className="font-display text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors text-center">
        {sponsor.name}
      </span>
    </div>
  )
}

export default function SponsorsSection() {
  return (
    <section className="py-16 bg-[var(--bg-main)] border-t border-[var(--border-main)] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center gap-4">
        <span className="w-6 h-[2px] bg-primary shrink-0" />
        <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
          Партнери &amp; Спонзори
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-main), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-main), transparent)' }} />

        <div className="flex items-start sponsor-track">
          {[...sponsors, ...sponsors].map((s, i) => (
            <SponsorCard key={i} sponsor={s} />
          ))}
        </div>
      </div>

    </section>
  )
}
