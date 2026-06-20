export interface HeroLine {
  text: string
  style: 'white' | 'primary' | 'dim'
}

export interface HeroSlide {
  lines: HeroLine[]
  description: string
  bg: string
  image: string
}

export const slides: HeroSlide[] = [
  {
    lines: [
      { text: 'SPRING',   style: 'white' },
      { text: 'STUDENT',  style: 'primary' },
      { text: 'ESCAPE',   style: 'dim' },
    ],
    description: 'Резервирај место за студентскиот излет до Берово на 16 мај — незаборавно искуство те чека!',
    bg: 'from-zinc-950 via-zinc-900 to-zinc-950',
    image: 'https://picsum.photos/seed/student1/1600/900',
  },
  {
    lines: [
      { text: 'ПРЕКРАСНА', style: 'white' },
      { text: 'ДРУЖБА',    style: 'primary' },
      { text: 'НА ПЛАТО',  style: 'dim' },
    ],
    description: 'Благодариме на сите кои го поддржаа овој настан — @ukim_skopje @vibeon.mk @sparkassemk',
    bg: 'from-stone-950 via-neutral-900 to-stone-950',
    image: 'https://picsum.photos/seed/campus2/1600/900',
  },
  {
    lines: [
      { text: 'СТУДЕНТ',   style: 'white' },
      { text: 'ЖИВОТ',     style: 'primary' },
      { text: '2025',      style: 'dim' },
    ],
    description: 'Сè на едно место — стипендии, домови, настани, огласи и уште многу повеќе.',
    bg: 'from-neutral-950 via-zinc-900 to-neutral-950',
    image: 'https://picsum.photos/seed/university3/1600/900',
  },
]
