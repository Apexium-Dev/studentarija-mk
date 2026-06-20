export interface NewsItem {
  id: number
  category: string
  title: string
  excerpt: string
  date: string
  href: string
  image: string
}

export const news: NewsItem[] = [
  { id: 1,  category: 'Стипендии', title: 'Отворени пријави за државни стипендии 2025/26',          excerpt: 'Министерството за образование ги отвори пријавите за државни стипендии за новата академска година.', date: '20 јун 2025', href: '/news/stipendii-2025',     image: 'https://picsum.photos/seed/news1/640/360' },
  { id: 2,  category: 'Домови',    title: 'Резултати од конкурсот за студентски домови',             excerpt: 'Објавени се резултатите од конкурсот за сместување во студентски домови за учебната 2025/26.',      date: '18 јун 2025', href: '/news/domovi-rezultati',  image: 'https://picsum.photos/seed/news2/640/360' },
  { id: 3,  category: 'Превоз',    title: 'ЈСП воведува нова линија за студентски населби',          excerpt: 'Нова автобуска линија која поврзува три студентски населби со центарот на градот.',                  date: '17 јун 2025', href: '/news/jsp-nova-linija',   image: 'https://picsum.photos/seed/news3/640/360' },
  { id: 4,  category: 'Настани',   title: 'Хакатон на ФИНКИ — пријавувањето е отворено',            excerpt: 'ФИНКИ организира 48-часовен хакатон за студенти. Наградниот фонд изнесува 150.000 денари.',         date: '15 јун 2025', href: '/news/finki-hackathon',   image: 'https://picsum.photos/seed/news4/640/360' },
  { id: 5,  category: 'Уписи',     title: 'Уписи 2025/26 — рокови и потребни документи',            excerpt: 'Комплетен водич за упис на државните универзитети во Македонија за новата академска година.',       date: '14 јун 2025', href: '/news/upisi-2025',        image: 'https://picsum.photos/seed/news5/640/360' },
  { id: 6,  category: 'Оброк',     title: 'Зголемен износ на субвенциониран оброк',                  excerpt: 'Владата одлучи да го зголеми дневниот износ за субвенциониран студентски оброк на 120 денари.',    date: '12 јун 2025', href: '/news/obrok-zgolemuvanje', image: 'https://picsum.photos/seed/news6/640/360' },
  { id: 7,  category: 'Пракси',    title: 'Sparkasse Bank отвори 20 места за студентска пракса',     excerpt: 'Sparkasse Bank МК бара студенти од економски и технички факултети за летна студентска пракса.',    date: '11 јун 2025', href: '/news/sparkasse-praksa',  image: 'https://picsum.photos/seed/news7/640/360' },
  { id: 8,  category: 'Стипендии', title: 'Erasmus+ стипендии за 2025/26 — сè уште има места',      excerpt: 'Неколку партнерски универзитети сè уште имаат слободни Erasmus+ места за мобилност.',              date: '10 јун 2025', href: '/news/erasmus-mesta',     image: 'https://picsum.photos/seed/news8/640/360' },
  { id: 9,  category: 'Бруцоши',   title: 'Водич за бруцоши — сè што треба да знаеш',               excerpt: 'Подготвивме комплетен водич за новите студенти: факултети, индекс, студентска карта и повеќе.',    date: '8 јун 2025',  href: '/news/vodic-brucosi',     image: 'https://picsum.photos/seed/news9/640/360' },
  { id: 10, category: 'Настани',   title: 'Spring Student Escape — Берово, 16 мај',                  excerpt: 'Студентарија организира еднодневен излет до Берово за сите студенти. Пријавувањето е затворено.',  date: '5 јун 2025',  href: '/news/spring-escape',     image: 'https://picsum.photos/seed/news10/640/360' },
]

export const categoryColors: Record<string, string> = {
  'Стипендии': 'text-blue-400',
  'Домови':    'text-orange-400',
  'Превоз':    'text-cyan-400',
  'Настани':   'text-rose-400',
  'Уписи':     'text-indigo-400',
  'Оброк':     'text-emerald-400',
  'Пракси':    'text-amber-400',
  'Бруцоши':   'text-yellow-400',
}
