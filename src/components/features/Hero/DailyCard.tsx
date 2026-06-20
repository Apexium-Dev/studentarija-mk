'use client'

import { useEffect, useState } from 'react'
import { Zap, X } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { DailyMessage } from '@/types/database'

const MOOD_TAG = 'ДЕН ЗА ФАКУЛТЕТ И КАФЕ'

const FALLBACK: DailyMessage = {
  id: '0',
  message: 'Единствената личност со која треба да се споредуваш си ти од вчера.',
  author: 'Студентарија',
  created_at: new Date().toISOString(),
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

  return (
    <div className="bg-white text-black rounded-3xl p-6 rotate-1 shadow-2xl w-[300px] xl:w-[340px] select-none">

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[9px] tracking-[0.28em] font-black text-zinc-400 uppercase">
            Порака на денот
          </p>
          <div className="h-[3px] w-7 bg-[#ffc107] mt-1.5" />
        </div>
        <p className="text-[9px] font-black text-zinc-400 text-right uppercase leading-snug tracking-wide">
          {weekday}<br />{date}
        </p>
      </div>

      {/* Mood tag */}
      <div className="mt-4 mb-5">
        <span className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
          <Zap className="w-3 h-3 fill-white" />
          {MOOD_TAG}
        </span>
      </div>

      {/* Quote */}
      <div className="mb-5 min-h-[120px]">
        <p
          className="font-black text-lg uppercase leading-relaxed tracking-tight"
          style={{ lineHeight: 2 }}
        >
          <span
            style={{
              background: '#ffc107',
              padding: '1px 8px',
              boxDecorationBreak: 'clone',
              WebkitBoxDecorationBreak: 'clone',
            }}
          >
            {msg.message}
          </span>
        </p>
      </div>

      {/* Divider */}
      <hr className="border-zinc-100 mb-3" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <span className="text-[9px] font-black bg-[#ffc107] px-2 py-1 uppercase tracking-wider">
            #СТУДЕНТАРИЈА
          </span>
          <span className="text-[9px] font-black border border-zinc-200 px-2 py-1 uppercase tracking-wider text-zinc-500">
            Порака на денот
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`rounded-full transition-all ${i === 0 ? 'w-2 h-2 bg-zinc-800' : 'w-1.5 h-1.5 bg-zinc-300'}`}
            />
          ))}
          <X className="w-3.5 h-3.5 text-zinc-300 ml-1" />
        </div>
      </div>
    </div>
  )
}
