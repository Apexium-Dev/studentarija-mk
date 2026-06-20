'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { slides } from './slides'
import DailyCard from './DailyCard'

const INTERVAL = 6000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = slides[current]

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated background gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/45" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between gap-8 py-20">

        {/* Left: Heading + description */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Lines */}
              <div className="mb-8">
                {slide.lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block leading-none"
                  >
                    <span
                      className="font-display text-[clamp(3.5rem,9vw,9rem)] uppercase leading-[0.88] tracking-tight"
                      style={
                        line.style === 'primary'
                          ? { color: '#ffc107' }
                          : line.style === 'outline'
                          ? { color: 'transparent', WebkitTextStroke: '2px white' }
                          : { color: 'white' }
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 text-sm font-medium max-w-sm leading-relaxed border-l-2 border-[#ffc107] pl-4"
              >
                {slide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-12">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === current ? 'bg-[#ffc107] w-10' : 'bg-white/20 w-5 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Daily card */}
        <div className="hidden lg:block shrink-0">
          <DailyCard />
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  )
}
