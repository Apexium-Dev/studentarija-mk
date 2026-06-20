'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import { categories } from './categories'
import NotificationBar from './NotificationBar'
import type { Announcement } from '@/types/database'

export default function QuickNav() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    async function fetchAnnouncements() {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3)
      if (error) throw new Error(error.message)
      if (data) setAnnouncements(data)
    }

    fetchAnnouncements()

    const channel = supabase
      .channel('quicknav_announcements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, fetchAnnouncements)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <section ref={containerRef} className="bg-[var(--bg-main)] overflow-hidden relative border-b border-[var(--border-main)] py-20">

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-30 transition duration-300 md:block hidden"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,193,7,0.04), transparent 80%)`,
        }}
      />

      {/* Marquee background */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none -translate-y-1/2 select-none z-0">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="text-[25vw] font-black whitespace-nowrap leading-none tracking-tighter text-primary/[0.05]"
        >
          СТИПЕНДИИ • ДОМОВИ • ОГЛАСИ • НАСТАНИ • СТИПЕНДИИ • ДОМОВИ • ОГЛАСИ • НАСТАНИ •
        </motion.div>
      </div>

      <NotificationBar announcements={announcements} />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-48 relative">

        {/* Heading */}
        <div className="relative mb-32 md:mb-52">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-14"
          >
            <div className="h-[4px] w-24 bg-primary" />
            <div className="bg-primary px-3 py-1">
              <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-dark whitespace-nowrap">
                БРЗА НАВИГАЦИЈА
              </span>
            </div>
          </motion.div>

          <h2 className="flex flex-col text-[18vw] md:text-[14vw] font-head font-black leading-[0.74] tracking-[-0.07em] uppercase text-dark-main relative z-10">
            <div className="flex items-baseline">
              {['Ш', 'Т', 'О'].map((l, i) => (
                <motion.span key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}>
                  {l}
                </motion.span>
              ))}
            </div>
            <div className="flex items-center">
              {['Б', 'А', 'Р', 'А', 'Ш'].map((l, i) => (
                <motion.span key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}>
                  {l}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring', damping: 12 }}
                className="relative inline-flex items-center justify-center w-[1.1em] h-[1.1em] bg-primary text-dark rounded-full ml-[0.05em]"
              >
                ?
              </motion.span>
            </div>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 + 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <Link
                href={cat.link}
                className={cn(
                  'group relative p-6 md:p-8 rounded-[2rem] flex flex-col items-center text-center justify-center overflow-hidden transition-all duration-500 h-full min-h-[220px] md:min-h-[250px]',
                  'bg-[var(--bg-secondary)] border border-[var(--border-main)]',
                  'hover:border-white/8 hover:bg-white/[0.03] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]'
                )}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    'w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border',
                    cat.color
                  )}>
                    <cat.icon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-head font-black tracking-tighter uppercase mb-2 transition-colors duration-300 group-hover:text-primary">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] md:text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider leading-relaxed line-clamp-2 max-w-[180px]">
                    {cat.desc}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>

                <div className="absolute -bottom-6 -right-6 text-8xl opacity-[0.02] font-black group-hover:opacity-[0.04] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none">
                  {cat.emoji}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
