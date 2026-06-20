'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
  }

  return (
    <section className="bg-[var(--bg-main)] border-t border-[var(--border-main)] py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

        {/* Left */}
        <div className="flex-1 max-w-lg">
          <span className="font-display text-[10px] tracking-[0.25em] uppercase text-primary block mb-4">
            Newsletter
          </span>
          <h2 className="font-display uppercase text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-[var(--text-main)] mb-5">
            Биди информиран<br />пред сите.
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
            Добивај известувања за нови конкурси за стипендии директно на твојот е-маил.
          </p>
        </div>

        {/* Right — form */}
        <div className="w-full md:w-auto md:min-w-[480px]">
          {done ? (
            <p className="font-display uppercase tracking-widest text-primary text-sm">
              Благодариме! Ќе те известуваме.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex h-14">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Твојот @email.com"
                required
                className="flex-1 bg-transparent border border-[var(--border-main)] border-r-0 px-5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] outline-none focus:border-primary/50 transition-colors rounded-l-sm font-sans"
              />
              <button
                type="submit"
                className="px-8 bg-primary text-dark font-display uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors rounded-r-sm shrink-0"
              >
                ОК
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
