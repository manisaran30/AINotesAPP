export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          summary: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          summary?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          summary?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          display_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
        }
      }
    }
  }
}

export type Note = Database['public']['Tables']['notes']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']