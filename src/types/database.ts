export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Row, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Insert>
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          city: string | null
          category: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Row, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Insert>
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          type: string | null
          created_by: string | null
          published: boolean
          created_at: string
        }
        Insert: Omit<Row, 'id' | 'created_at'>
        Update: Partial<Insert>
      }
      daily_messages: {
        Row: {
          id: string
          message: string
          author: string | null
          created_at: string
        }
        Insert: Omit<Row, 'id' | 'created_at'>
        Update: Partial<Insert>
      }
    }
  }
}

export type Post = Database['public']['Tables']['posts']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type Announcement = Database['public']['Tables']['announcements']['Row']
export type DailyMessage = Database['public']['Tables']['daily_messages']['Row']
