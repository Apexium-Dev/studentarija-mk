import { sponsors } from './sponsors'

function SponsorCard({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <div className="flex items-center gap-5 bg-[var(--bg-secondary)] border border-[var(--border-main)] px-8 py-5 rounded-2xl cursor-pointer hover:border-primary/30 transition-all group whitespace-nowrap shrink-0">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-md group-hover:scale-110 transition-transform shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="w-full h-full object-contain p-1.5"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-base uppercase tracking-tight text-[var(--text-main)]">
          {sponsor.name}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--text-muted)] max-w-[220px] whitespace-normal leading-relaxed">
          {sponsor.description}
        </span>
      </div>
    </div>
  )
}

export default function SponsorsSection() {
  return (
    <section className="py-16 bg-[var(--bg-main)] border-t border-[var(--border-main)] overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center gap-4">
        <span className="w-6 h-[2px] bg-primary shrink-0" />
        <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
          Партнери &amp; Спонзори
        </span>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-main), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-main), transparent)' }} />

        <div className="flex sponsor-track">
          {/* Duplicate for seamless loop */}
          {[...sponsors, ...sponsors].map((s, i) => (
            <div key={i} className="px-2">
              <SponsorCard sponsor={s} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
