import {
  GraduationCap, Home, Bus, Utensils,
  Briefcase, Calendar, FileText, HelpCircle,
  Sparkles, RefreshCcw,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Category {
  id: string
  title: string
  desc: string
  icon: LucideIcon
  emoji: string
  color: string
  link: string
}

export const categories: Category[] = [
  {
    id: 'stipendii',
    title: 'Стипендии',
    desc: 'Државни, приватни и странски стипендии за сите студенти.',
    icon: GraduationCap,
    emoji: '🎓',
    color: 'bg-sky-500/8 text-sky-300/80 border-sky-500/10',
    link: '/stipendii',
  },
  {
    id: 'domovi',
    title: 'Домови',
    desc: 'Аплицирање, резултати и услови во студентските домови.',
    icon: Home,
    emoji: '🏠',
    color: 'bg-amber-500/8 text-amber-300/80 border-amber-500/10',
    link: '/studentski-domovi',
  },
  {
    id: 'jsp',
    title: 'Градски превоз',
    desc: 'Бесплатен превоз и студентски картички.',
    icon: Bus,
    emoji: '🚌',
    color: 'bg-teal-500/8 text-teal-300/80 border-teal-500/10',
    link: '/jsp',
  },
  {
    id: 'obrok',
    title: 'Оброк',
    desc: 'Дневен износ и објекти за субвенциониран оброк.',
    icon: Utensils,
    emoji: '🍽️',
    color: 'bg-emerald-500/8 text-emerald-300/80 border-emerald-500/10',
    link: '/page/subvencioniran-obrok',
  },
  {
    id: 'rabota',
    title: 'Пракси',
    desc: 'Најнови огласи за пракса и почетни кариери за студенти.',
    icon: Briefcase,
    emoji: '💼',
    color: 'bg-violet-500/8 text-violet-300/80 border-violet-500/10',
    link: '/oglasi',
  },
  {
    id: 'nastani',
    title: 'Настани',
    desc: 'Хакатони, конференции и студентски собири.',
    icon: Calendar,
    emoji: '📅',
    color: 'bg-rose-500/8 text-rose-300/80 border-rose-500/10',
    link: '/events',
  },
  {
    id: 'dokumenti',
    title: 'Водичи',
    desc: 'Потребни обрасци и административни совети.',
    icon: FileText,
    emoji: '📄',
    color: 'bg-slate-500/8 text-slate-300/80 border-slate-500/10',
    link: '/page/dokumenti',
  },
  {
    id: 'faq',
    title: 'FAQ',
    desc: 'Најчесто поставувани прашања и брзи одговори.',
    icon: HelpCircle,
    emoji: '❓',
    color: 'bg-orange-500/8 text-orange-300/80 border-orange-500/10',
    link: '/faq',
  },
  {
    id: 'brucosi',
    title: 'Брукоши',
    desc: 'Водич за нови студенти и студентски живот.',
    icon: Sparkles,
    emoji: '✨',
    color: 'bg-yellow-500/8 text-yellow-300/80 border-yellow-500/10',
    link: '/brucosi',
  },
  {
    id: 'upisi',
    title: 'Уписи',
    desc: 'Сè за упис на факултет во новата академска година.',
    icon: GraduationCap,
    emoji: '📑',
    color: 'bg-indigo-500/8 text-indigo-300/80 border-indigo-500/10',
    link: '/upisi-2025-26',
  },
  {
    id: 'prodolzuvanje',
    title: 'Продолжи Стипендија',
    desc: 'Информации за продолжување на твојата стипендија.',
    icon: RefreshCcw,
    emoji: '🔄',
    color: 'bg-cyan-500/8 text-cyan-300/80 border-cyan-500/10',
    link: '/prodolzuvanje-stipendija',
  },
]
