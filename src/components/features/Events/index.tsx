'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import EventCalendar from './EventCalendar'

export default function EventsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Left heading */}
        <div className="flex-1 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[2px] bg-primary block" />
            <span className="bg-primary text-dark font-display text-[10px] px-3 py-1 tracking-[0.2em] uppercase">
              КАЛЕНДАР
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none uppercase text-[var(--text-main)]"
            >
              ПРЕТСТОЈНИ
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-1">
            <motion.div
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="relative inline-block"
            >
              <span className="absolute inset-0 bg-primary" />
              <h2 className="relative font-display text-[clamp(3.5rem,9vw,8rem)] leading-none uppercase italic text-dark px-4">
                НАСТАНИ
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <EventCalendar />
        </motion.div>

      </div>
    </section>
  )
}
