export interface CalendarEvent {
  id: number
  title: string
  date: string // 'YYYY-MM-DD'
  city: string
  href: string
}

export const cities = ['СКОПЈЕ', 'КИЧЕВО', 'ПРИЛЕП', 'СВЕТИ НИКОЛЕ']

export const EN_MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

export const MK_DAYS = ['П', 'В', 'С', 'Ч', 'П', 'С', 'Н']

export const events: CalendarEvent[] = [
  { id: 1,  title: 'Хакатон на ФИНКИ',              date: '2026-06-14', city: 'СКОПЈЕ',      href: '/events/finki-hackathon' },
  { id: 2,  title: 'Студентски излет — Берово',      date: '2026-06-20', city: 'СКОПЈЕ',      href: '/events/spring-escape' },
  { id: 3,  title: 'Отворен ден на УКИМ',            date: '2026-06-22', city: 'СКОПЈЕ',      href: '/events/ukim-open-day' },
  { id: 4,  title: 'Работилница за CV',              date: '2026-06-27', city: 'СКОПЈЕ',      href: '/events/cv-workshop' },
  { id: 5,  title: 'Предавање за Erasmus+',          date: '2026-06-18', city: 'ПРИЛЕП',      href: '/events/erasmus-info' },
  { id: 6,  title: 'Студентска конференција',        date: '2026-06-25', city: 'КИЧЕВО',      href: '/events/konferencija' },
  { id: 7,  title: 'Инфо ден за стипендии',          date: '2026-06-17', city: 'СВЕТИ НИКОЛЕ', href: '/events/stipendii-info' },
  { id: 8,  title: 'Предавање — кариера по ФИНКИ',  date: '2026-07-03', city: 'СКОПЈЕ',      href: '/events/karijera-finki' },
  { id: 9,  title: 'Летна школа за програмирање',   date: '2026-07-07', city: 'ПРИЛЕП',      href: '/events/letna-skola' },
]
