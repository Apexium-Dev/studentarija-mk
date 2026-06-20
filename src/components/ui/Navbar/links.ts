export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Вести', href: '/vesti' },
  { label: 'Настани', href: '/events' },
  { label: 'Стипендии', href: '/stipendii' },
  { label: 'Огласи', href: '/oglasi' },
  { label: 'FAQ', href: '/faq' },
]
