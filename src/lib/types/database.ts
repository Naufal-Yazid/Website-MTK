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
      admins: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'super_admin' | 'admin'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          role?: 'super_admin' | 'admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: 'super_admin' | 'admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          full_name: string
          whatsapp_number: string
          selected_project: string | null
          selected_type: string | null
          message: string | null
          status: 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal'
          wa_clicked: boolean
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          whatsapp_number: string
          selected_project?: string | null
          selected_type?: string | null
          message?: string | null
          status?: 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal'
          wa_clicked?: boolean
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          whatsapp_number?: string
          selected_project?: string | null
          selected_type?: string | null
          message?: string | null
          status?: 'baru' | 'diproses' | 'sudah_dihubungi' | 'batal'
          wa_clicked?: boolean
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          wa_number: string | null
          wa_greeting_template: string | null
          company_email: string | null
          company_phone: string | null
          company_address: string | null
          instagram_url: string | null
          tiktok_url: string | null
          facebook_url: string | null
          youtube_url: string | null
          ga_measurement_id: string | null
          meta_pixel_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          wa_number?: string | null
          wa_greeting_template?: string | null
          company_email?: string | null
          company_phone?: string | null
          company_address?: string | null
          instagram_url?: string | null
          tiktok_url?: string | null
          facebook_url?: string | null
          youtube_url?: string | null
          ga_measurement_id?: string | null
          meta_pixel_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          wa_number?: string | null
          wa_greeting_template?: string | null
          company_email?: string | null
          company_phone?: string | null
          company_address?: string | null
          instagram_url?: string | null
          tiktok_url?: string | null
          facebook_url?: string | null
          youtube_url?: string | null
          ga_measurement_id?: string | null
          meta_pixel_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'site_settings_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'admins'
            referencedColumns: ['id']
          },
        ]
      }
      wa_click_logs: {
        Row: {
          id: string
          inquiry_id: string
          admin_id: string
          clicked_at: string
        }
        Insert: {
          id?: string
          inquiry_id: string
          admin_id: string
          clicked_at?: string
        }
        Update: {
          id?: string
          inquiry_id?: string
          admin_id?: string
          clicked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'wa_click_logs_admin_id_fkey'
            columns: ['admin_id']
            isOneToOne: false
            referencedRelation: 'admins'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'wa_click_logs_inquiry_id_fkey'
            columns: ['inquiry_id']
            isOneToOne: false
            referencedRelation: 'inquiries'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
