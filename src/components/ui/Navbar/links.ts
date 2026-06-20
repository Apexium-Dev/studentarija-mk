export interface NavLink {
  label: string
  href: string
}

export interface DropdownItem {
  label: string
  href: string
}

export const aktuelnoItems: DropdownItem[] = [
  { label: 'Стипендии',              href: '/stipendii' },
  { label: 'ЈСП',                    href: '/jsp' },
  { label: 'Уписи 2025/26',         href: '/upisi-2025-26' },
  { label: 'Придружи се',            href: '/pridruzi-se' },
  { label: 'Продолжување стипендија', href: '/prodolzuvanje-stipendija' },
  { label: 'Бруцоши',               href: '/brucosi' },
  { label: 'Студентски домови',      href: '/studentski-domovi' },
  { label: 'Студентски оброк',       href: '/page/subvencioniran-obrok' },
]

export const navLinks: NavLink[] = [
  { label: 'Настани',  href: '/events' },
  { label: 'Новости',  href: '/novosti' },
  { label: 'Партнери', href: '/partneri' },
  { label: 'FAQ',      href: '/faq' },
  { label: 'За нас',   href: '/za-nas' },
]
