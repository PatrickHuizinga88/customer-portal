export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      backend_settings: {
        Row: {
          base_url: string | null
          company_id: number | null
          created_at: string
          id: number
        }
        Insert: {
          base_url?: string | null
          company_id?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          base_url?: string | null
          company_id?: number | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "backend_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      branding: {
        Row: {
          accent_color: string | null
          body_font: string | null
          border_radius: number | null
          button_radius: number | null
          company_id: number | null
          created_at: string
          heading_font: string | null
          id: number
          primary_color: string | null
        }
        Insert: {
          accent_color?: string | null
          body_font?: string | null
          border_radius?: number | null
          button_radius?: number | null
          company_id?: number | null
          created_at?: string
          heading_font?: string | null
          id?: number
          primary_color?: string | null
        }
        Update: {
          accent_color?: string | null
          body_font?: string | null
          border_radius?: number | null
          button_radius?: number | null
          company_id?: number | null
          created_at?: string
          heading_font?: string | null
          id?: number
          primary_color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branding_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          accent_color: string
          body_font: string
          border_radius: number
          button_radius: number
          company_name: string
          created_at: string
          heading_font: string
          id: number
          logo_url: string | null
          primary_color: string
          user_id: string | null
        }
        Insert: {
          accent_color: string
          body_font: string
          border_radius: number
          button_radius: number
          company_name: string
          created_at?: string
          heading_font: string
          id?: number
          logo_url?: string | null
          primary_color: string
          user_id?: string | null
        }
        Update: {
          accent_color?: string
          body_font?: string
          border_radius?: number
          button_radius?: number
          company_name?: string
          created_at?: string
          heading_font?: string
          id?: number
          logo_url?: string | null
          primary_color?: string
          user_id?: string | null
        }
        Relationships: []
      }
      portals: {
        Row: {
          company_id: number
          comparison_url: string
          created_at: string
          id: number
          product_name: string
          questions_url: string
          type: Database["public"]["Enums"]["portal_type"]
          user_id: string
        }
        Insert: {
          company_id: number
          comparison_url: string
          created_at?: string
          id?: number
          product_name: string
          questions_url: string
          type: Database["public"]["Enums"]["portal_type"]
          user_id: string
        }
        Update: {
          company_id?: number
          comparison_url?: string
          created_at?: string
          id?: number
          product_name?: string
          questions_url?: string
          type?: Database["public"]["Enums"]["portal_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      support_settings: {
        Row: {
          address: string | null
          company_id: number | null
          created_at: string
          email: string | null
          id: number
          opening_hours: Json[] | null
          phone: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          company_id?: number | null
          created_at?: string
          email?: string | null
          id?: number
          opening_hours?: Json[] | null
          phone?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          company_id?: number | null
          created_at?: string
          email?: string | null
          id?: number
          opening_hours?: Json[] | null
          phone?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
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
      portal_type: "PRIVATE" | "BUSINESS"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
