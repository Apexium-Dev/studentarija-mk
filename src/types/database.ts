type PostRow = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_url: string | null
  category: string | null
  author_id: string | null
  published: boolean
  created_at: string
  updated_at: string
}

type EventRow = {
  id: string
  title: string
  description: string | null
  cover_url: string | null
  start_date: string
  end_date: string
  location: string | null
  city: string | null
  category: string | null
  created_by: string | null
  published: boolean
  created_at: string
  updated_at: string
}

type AnnouncementRow = {
  id: string
  title: string
  content: string
  type: string
  external_url: string | null
  deadline: string | null
  created_by: string | null
  published: boolean
  created_at: string
  updated_at: string
}

type DailyMessageRow = {
  id: string
  message: string
  author: string | null
  active: boolean
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: PostRow
        Insert: Omit<PostRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<PostRow, 'id' | 'created_at' | 'updated_at'>>
      }
      events: {
        Row: EventRow
        Insert: Omit<EventRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<EventRow, 'id' | 'created_at' | 'updated_at'>>
      }
      announcements: {
        Row: AnnouncementRow
        Insert: Omit<AnnouncementRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AnnouncementRow, 'id' | 'created_at' | 'updated_at'>>
      }
      daily_messages: {
        Row: DailyMessageRow
        Insert: Omit<DailyMessageRow, 'id' | 'created_at'>
        Update: Partial<Omit<DailyMessageRow, 'id' | 'created_at'>>
      }
    }
  }
}

export type Post = PostRow
export type Event = EventRow
export type Announcement = AnnouncementRow
export type DailyMessage = DailyMessageRow
