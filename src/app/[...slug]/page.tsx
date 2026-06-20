import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--bg-main)]">
      <GraduationCap className="w-10 h-10 text-primary mb-6" />
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">
        Наскоро
      </p>
      <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none text-[var(--text-main)] text-center mb-6">
        Во изработка
      </h1>
      <p className="text-sm text-[var(--text-muted)] text-center max-w-sm mb-10">
        Оваа страница е во изработка. Следи не на социјалните мрежи за најнови информации.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 h-11 px-8 bg-primary text-dark font-display uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-colors rounded-sm"
      >
        Назад на почетна
      </Link>
    </main>
  )
}
