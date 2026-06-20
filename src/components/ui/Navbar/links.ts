export interface NavLink {
  label: string
  href: string
}

export interface DropdownItem {
  label: string
  href: string
}

export const aktuelnoItems: DropdownItem[] = [
  { label: 'Стипендии',              href: '/scholarships' },
  { label: 'ЈСП',                    href: '/public-transport' },
  { label: 'Уписи 2025/26',         href: '/enrollment-2025-26' },
  { label: 'Придружи се',            href: '/join' },
  { label: 'Продолжување стипендија', href: '/scholarship-renewal' },
  { label: 'Бруцоши',               href: '/freshmen' },
  { label: 'Студентски домови',      href: '/student-dorms' },
  { label: 'Студентски оброк',       href: '/student-meal' },
]

export const navLinks: NavLink[] = [
  { label: 'Настани',  href: '/events' },
  { label: 'Новости',  href: '/news' },
  { label: 'Партнери', href: '/partners' },
  { label: 'FAQ',      href: '/faq' },
  { label: 'За нас',   href: '/about' },
]
