export interface HeroLine {
  text: string
  style: 'white' | 'primary' | 'outline'
}

export interface HeroSlide {
  lines: HeroLine[]
  description: string
  bg: string
}

export const slides: HeroSlide[] = [
  {
    lines: [
      { text: 'SPRING',   style: 'white' },
      { text: 'STUDENT',  style: 'primary' },
      { text: 'ESCAPE',   style: 'outline' },
    ],
    description: 'Ошче сега ви викаме да си го закажете 16 мај за фоф Берово затоа шо ќе е пројако!',
    bg: 'from-zinc-950 via-zinc-900 to-zinc-950',
  },
  {
    lines: [
      { text: 'ПРЕКРАСНА', style: 'white' },
      { text: 'ДРУЖБА',    style: 'primary' },
      { text: 'НА ПЛАТО',  style: 'outline' },
    ],
    description: 'Фала ви на сите кои го поддржавте овој настан — @ukim_skopje @vibeon.mk @sparkassemk',
    bg: 'from-stone-950 via-neutral-900 to-stone-950',
  },
  {
    lines: [
      { text: 'СТУДЕНТ',   style: 'white' },
      { text: 'ЖИВОТ',     style: 'primary' },
      { text: '2025',      style: 'outline' },
    ],
    description: 'Сè на едно место — стипендии, домови, настани, огласи и уште многу повеќе.',
    bg: 'from-neutral-950 via-zinc-900 to-neutral-950',
  },
]
