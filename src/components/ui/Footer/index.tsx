import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

const cols = [
  {
    heading: 'Платформа',
    links: [
      { label: 'Вести',          href: '/news' },
      { label: 'Настани',        href: '/events' },
      { label: 'Стипендии',      href: '/scholarships' },
      { label: 'Студентски домови', href: '/student-dorms' },
      { label: 'За нас',         href: '/about' },
    ],
  },
  {
    heading: 'Актуелно',
    links: [
      { label: 'Уписи',          href: '/enrollment' },
      { label: 'Пракси',         href: '/internships' },
      { label: 'Студентски оброк', href: '/student-meal' },
      { label: 'Студентски превоз', href: '/student-transport' },
      { label: 'Бруцоши',        href: '/freshmen' },
    ],
  },
  {
    heading: 'Следи не',
    links: [
      { label: 'Instagram',      href: 'https://instagram.com' },
      { label: 'TikTok',         href: 'https://tiktok.com' },
      { label: 'Facebook',       href: 'https://facebook.com' },
      { label: 'LinkedIn',       href: 'https://linkedin.com' },
    ],
  },
]

function IgIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
}
function TkIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
}
function FbIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
}
function LiIcon() {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
}

const socials = [
  { icon: IgIcon, href: 'https://instagram.com',  label: 'Instagram' },
  { icon: TkIcon, href: 'https://tiktok.com',     label: 'TikTok' },
  { icon: FbIcon, href: 'https://facebook.com',   label: 'Facebook' },
  { icon: LiIcon, href: 'https://linkedin.com',   label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] overflow-hidden border-t border-[var(--border-main)]">

      {/* Top grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand col */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="font-display text-xl uppercase text-[var(--text-main)]">
              Студентарија<span className="text-primary">.мк</span>
            </span>
          </Link>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[220px]">
            Најголемата студентска платформа во Македонија.
          </p>
          <div className="flex items-center gap-3 mt-auto">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-[var(--border-main)] flex items-center justify-center text-[var(--text-muted)] hover:text-primary hover:border-primary/40 transition-all"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {cols.map(col => (
          <div key={col.heading} className="flex flex-col gap-4">
            <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
              {col.heading}
            </span>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border-main)]" />

      {/* Big display text */}
      <div className="px-4 pt-6 pb-0 overflow-hidden select-none pointer-events-none">
        <p
          className="font-display uppercase leading-none text-[var(--text-main)] opacity-[0.04] whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 15vw, 14rem)' }}
        >
          СТУДЕНТАРИЈА.МК
        </p>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-[var(--text-muted)] font-display tracking-wider uppercase">
          © 2026 Студентарија.мк — Сите права задржани
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-display uppercase tracking-wider">Приватност</Link>
          <Link href="/terms"   className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-display uppercase tracking-wider">Услови</Link>
        </div>
      </div>

    </footer>
  )
}
