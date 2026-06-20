'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { DailyMessage } from '@/types/database'

const MOOD_TAG = 'ДЕН ЗА ФАКУЛТЕТ И КАФЕ'

const FALLBACK: DailyMessage = {
  id: '0',
  message: 'Единствената личност со која треба да се споредуваш си ти од вчера.',
  author: 'Студентарија',
  created_at: new Date().toISOString(),
}

function splitIntoLines(text: string, wordsPerLine = 3): string[] {
  const words = text.toUpperCase().split(' ')
  const lines: string[] = []
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '))
  }
  return lines
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

  const now = new Date()
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()
  const lines = splitIntoLines(msg.message)

  return (
    <div className="relative w-[300px] xl:w-[330px]">
      {/* Tape strip */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-zinc-200/80 z-10 rounded-sm shadow-sm" />

      {/* Card */}
      <div className="bg-white text-black rounded-3xl pt-8 pb-5 px-6 rotate-1 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">

        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-zinc-100 pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-zinc-100 pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[9px] tracking-[0.3em] font-black text-zinc-400 uppercase">
              Порака на денот
            </p>
            <div className="h-[3px] w-8 bg-[#ffc107] mt-1.5 rounded-full" />
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider leading-tight">
              {weekday}
            </p>
            <p className="text-[9px] font-black text-zinc-300 uppercase tracking-wider">
              {date}
            </p>
          </div>
        </div>

        {/* Mood tag */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-white" />
            {MOOD_TAG}
          </span>
        </div>

        {/* Quote — per-line yellow highlight */}
        <div className="mb-6 flex flex-col items-center gap-[6px]">
          {lines.map((line, i) => (
            <span
              key={i}
              className="font-display text-xl xl:text-2xl uppercase tracking-tight px-3 py-[3px] inline-block text-center"
              style={{ background: '#ffc107', color: '#0a0a0a' }}
            >
              {line}
            </span>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-zinc-100 mb-4" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            <span className="text-[9px] font-black bg-[#ffc107] text-black px-2 py-1 uppercase tracking-wider">
              #СТУДЕНТАРИЈА
            </span>
            <span className="text-[9px] font-black border border-zinc-200 px-2 py-1 uppercase tracking-wider text-zinc-400">
              Порака на денот
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`rounded-full ${i === 0 ? 'w-2 h-2 bg-zinc-800' : 'w-1.5 h-1.5 bg-zinc-200'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
