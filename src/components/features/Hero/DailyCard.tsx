'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { supabase } from '@/lib/supabase/client'
import type { DailyMessage } from '@/types/database'

const FALLBACK: DailyMessage = {
  id: '0',
  message: 'Единствената личност со која треба да се споредуваш си ти од вчера.',
  author: 'Студентарија',
  created_at: new Date().toISOString(),
}

function splitQuote(text: string): { body: string; highlight: string } {
  const words = text.trimEnd().replace(/\.$/, '').split(' ')
  const cut = Math.max(1, Math.ceil(words.length * 0.65))
  return {
    body: words.slice(0, cut).join(' '),
    highlight: words.slice(cut).join(' ') + '.',
  }
}

const blobs = [
  { className: 'w-28 h-28 bg-amber-400/60',   style: { top: '-2.5rem', right: '-2.5rem' }, x: [0, 12, -8, 0],  y: [0, -10, 6, 0],  duration: 8  },
  { className: 'w-32 h-32 bg-blue-600/50',    style: { bottom: '-2rem', left: '-2.5rem'  }, x: [0, -10, 8, 0],  y: [0, 8, -12, 0],  duration: 10 },
  { className: 'w-20 h-20 bg-violet-600/40',  style: { top: '40%',     right: '-2rem'   }, x: [0, 8, -6, 0],   y: [0, -6, 10, 0],  duration: 7  },
  { className: 'w-16 h-16 bg-orange-500/30',  style: { top: '25%',     left: '-1.5rem'  }, x: [0, -6, 10, 0],  y: [0, 10, -4, 0],  duration: 9  },
]

export default function DailyCard() {
  const [msg, setMsg] = useState<DailyMessage>(FALLBACK)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    supabase
      .from('daily_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => { if (data) setMsg(data) })

    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const { body, highlight } = splitQuote(msg.message)
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="relative w-[300px] xl:w-[320px] h-[400px] xl:h-[420px]">

      {/* Animated blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl pointer-events-none ${blob.className}`}
          style={blob.style}
          animate={{ x: blob.x, y: blob.y, scale: [1, 1.12, 0.92, 1] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Rotating rings */}
      <motion.div
        className="absolute -top-6 -right-6 w-14 h-14 rounded-full border-4 border-amber-400/70 pointer-events-none z-20"
        style={{ boxShadow: '0 0 20px rgba(251,191,36,0.4)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-9 h-9 rounded-full border-[3px] border-blue-400/60 pointer-events-none z-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating card */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-20 overflow-hidden"
          initial={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          />
        </motion.div>

        {/* Glass card */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col p-7 overflow-hidden"
          style={{
            background: 'rgba(15, 15, 20, 0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className="h-px bg-white/30"
              initial={{ width: 0 }}
              animate={{ width: visible ? 48 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Quote — staggered word reveal */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[1.35rem] xl:text-[1.5rem] font-bold leading-snug text-white">
              &ldquo;
              {body.split(' ').map((word, i) => (
                <motion.span
                  key={`b-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
              <motion.em
                className="not-italic font-black"
                style={{ color: '#ffc107' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + body.split(' ').length * 0.05 + 0.1, type: 'spring', damping: 12 }}
              >
                {highlight}
              </motion.em>
              &rdquo;
            </p>
          </div>

          {/* Author */}
          <motion.p
            className="text-sm text-white/50 font-medium mt-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            — {msg.author ?? 'Студентарија'}
          </motion.p>

          {/* Bottom */}
          <motion.div
            className="flex items-center justify-between border-t border-white/[0.07] pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
              {dateStr}
            </p>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map(i => (
                <span
                  key={i}
                  className={`rounded-full transition-all ${i === 0 ? 'w-4 h-1.5 bg-[#ffc107]' : 'w-1.5 h-1.5 bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
