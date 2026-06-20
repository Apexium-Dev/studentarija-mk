'use client'

import { useEffect, useState } from 'react'
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

export default function DailyCard() {
  const [msg, setMsg] = useState<DailyMessage>(FALLBACK)

  useEffect(() => {
    supabase
      .from('daily_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => { if (data) setMsg(data) })
  }, [])

  const { body, highlight } = splitQuote(msg.message)
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="relative w-[300px] xl:w-[320px] h-[400px] xl:h-[420px]">

      {/* Floating blobs */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-400/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-10 w-32 h-32 rounded-full bg-blue-600/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-8 w-20 h-20 rounded-full bg-violet-600/40 blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -left-6 w-16 h-16 rounded-full bg-orange-500/30 blur-2xl pointer-events-none" />

      {/* Decorative ring top-right */}
      <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full border-4 border-amber-400/70 pointer-events-none z-20"
        style={{ boxShadow: '0 0 20px rgba(251,191,36,0.4)' }} />
      <div className="absolute -bottom-4 -left-4 w-9 h-9 rounded-full border-[3px] border-blue-400/60 pointer-events-none z-20" />

      {/* Glass card */}
      <div
        className="absolute inset-0 rounded-3xl flex flex-col p-7 z-10 overflow-hidden"
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
          <div className="h-px w-12 bg-white/30" />
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[1.35rem] xl:text-[1.5rem] font-bold leading-snug text-white">
            &ldquo;{body}{' '}
            <em className="not-italic font-black" style={{ color: '#ffc107' }}>
              {highlight}
            </em>
            &rdquo;
          </p>
        </div>

        {/* Author */}
        <p className="text-sm text-white/50 font-medium mt-4 mb-6">
          — {msg.author ?? 'Студентарија'}
        </p>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
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
        </div>
      </div>
    </div>
  )
}
