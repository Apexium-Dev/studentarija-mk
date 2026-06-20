'use client'

import { Bell } from 'lucide-react'
import type { Announcement } from '@/types/database'

interface Props {
  announcements: Announcement[]
}

export default function NotificationBar({ announcements }: Props) {
  return (
    <div className="w-full h-14 bg-[var(--bg-main)] border-b border-[var(--border-main)] flex items-center overflow-x-auto no-scrollbar">
      <div className="h-full px-6 bg-primary flex items-center gap-3 shrink-0 relative z-20">
        <Bell className="w-4 h-4 text-dark fill-dark" />
        <span className="text-[10px] font-black uppercase tracking-widest text-dark">НОВО</span>
      </div>

      <div className="flex items-center divide-x divide-[var(--border-main)] h-full">
        {announcements.length > 0 ? (
          announcements.map((item) => (
            <div key={item.id} className="px-8 min-w-[280px] flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--hover-bg)] rounded flex items-center justify-center text-lg">
                📣
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] truncate max-w-[150px]">
                  {item.type}
                </span>
                <span className="text-[11px] text-[var(--text-main)] font-bold truncate max-w-[150px]">
                  {item.title}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-8 text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest opacity-50">
            Следете ги најновите информации
          </div>
        )}
      </div>
    </div>
  )
}
