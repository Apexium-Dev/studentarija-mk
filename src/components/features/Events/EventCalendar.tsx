'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { events, cities, EN_MONTHS, MK_DAYS } from './events'

const TODAY = new Date(2026, 5, 20)

export default function EventCalendar() {
  const [cur, setCur] = useState({ year: 2026, month: 5 })
  const [selectedCity, setSelectedCity] = useState('СКОПЈЕ')
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const prevMonth = () => setCur(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 })
  const nextMonth = () => setCur(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 })

  const daysInMonth = new Date(cur.year, cur.month + 1, 0).getDate()
  const startOffset = (new Date(cur.year, cur.month, 1).getDay() + 6) % 7

  const eventDays = new Set(
    events
      .filter(e => {
        const d = new Date(e.date)
        return d.getFullYear() === cur.year && d.getMonth() === cur.month && e.city === selectedCity
      })
      .map(e => new Date(e.date).getDate())
  )

  const isToday = (day: number) =>
    day === TODAY.getDate() && cur.month === TODAY.getMonth() && cur.year === TODAY.getFullYear()

  const cells = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="w-full lg:w-[420px] bg-[var(--bg-secondary)] rounded-3xl p-6 flex flex-col gap-5 shrink-0">

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <span className="font-display text-xl uppercase">
          {EN_MONTHS[cur.month]} <span className="text-primary">{cur.year}</span>
        </span>
        <div className="flex gap-1">
          {[{ fn: prevMonth, Icon: ChevronLeft }, { fn: nextMonth, Icon: ChevronRight }].map(({ fn, Icon }, i) => (
            <button key={i} onClick={fn}
              className="w-8 h-8 rounded-full border border-[var(--border-main)] flex items-center justify-center text-[var(--text-muted)] hover:text-primary hover:border-primary transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center">
        {MK_DAYS.map((d, i) => (
          <span key={i} className="text-[11px] font-display text-[var(--text-muted)] py-1">{d}</span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center">
            {day !== null && (
              <button
                onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                className={[
                  'relative w-9 h-9 rounded-full text-sm font-display transition-all flex flex-col items-center justify-center gap-0',
                  isToday(day)
                    ? 'bg-primary text-dark'
                    : selectedDate === day
                    ? 'bg-primary/20 border border-primary text-primary'
                    : 'text-[var(--text-main)] hover:bg-[var(--hover-bg)]',
                ].join(' ')}
              >
                {day}
                {eventDays.has(day) && (
                  <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isToday(day) ? 'bg-dark' : 'bg-primary'}`} />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="border-t border-[var(--border-main)] pt-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span className="text-[10px] font-display tracking-[0.2em] uppercase text-[var(--text-muted)]">ИЗБЕРИ ДАТУМ</span>
      </div>

      {/* City tabs */}
      <div className="flex gap-2 flex-wrap">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={[
              'relative px-3 py-2 font-display text-[10px] uppercase tracking-widest border rounded-lg transition-colors',
              selectedCity === city
                ? 'border-primary/50 text-[var(--text-main)]'
                : 'border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-primary/30',
            ].join(' ')}
          >
            {city}
            {selectedCity === city && (
              <motion.div
                layoutId="city-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>

    </div>
  )
}
