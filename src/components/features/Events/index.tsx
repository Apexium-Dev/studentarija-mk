'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import EventCalendar from './EventCalendar'
import { events } from './events'

export default function EventsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedCity, setSelectedCity] = useState('СКОПЈЕ')

  const upcoming = events
    .filter(e => e.city === selectedCity)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4)

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--bg-main)] border-t border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-6 h-[2px] bg-primary" />
              <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">Календар</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 60 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="flex items-baseline gap-4 flex-wrap"
              >
                <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none uppercase text-[var(--text-main)]">
                  Претстојни
                </h2>
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-primary" />
                  <h2 className="relative font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none uppercase italic text-dark px-3">
                    Настани
                  </h2>
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/events" className="group hidden md:flex items-center gap-2 text-[11px] font-display tracking-widest uppercase text-[var(--text-muted)] hover:text-primary transition-colors">
              Сите настани
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Event list */}
          <div className="flex-1 flex flex-col gap-3">
            {upcoming.length === 0 ? (
              <p className="text-[var(--text-muted)] font-display text-sm tracking-widest uppercase">
                Нема настани за овој град
              </p>
            ) : upcoming.map((event, i) => {
              const d = new Date(event.date)
              const day = d.getDate()
              const month = d.toLocaleString('mk-MK', { month: 'short' }).toUpperCase()
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={event.href}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border-main)] hover:border-primary/40 hover:bg-[var(--hover-bg)] transition-all"
                  >
                    {/* Date pill */}
                    <div className="shrink-0 w-12 flex flex-col items-center bg-primary/10 rounded-lg py-2 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all">
                      <span className="font-display text-lg leading-none text-primary group-hover:text-dark transition-colors">{day}</span>
                      <span className="font-display text-[9px] text-primary/70 group-hover:text-dark/70 transition-colors tracking-wider">{month}</span>
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm uppercase tracking-wide text-[var(--text-main)] group-hover:text-primary transition-colors line-clamp-1">
                        {event.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] font-display tracking-widest mt-0.5">{event.city}</p>
                    </div>

                    <ArrowUpRight className="w-4 h-4 shrink-0 text-[var(--text-muted)] group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <EventCalendar onCityChange={setSelectedCity} />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
