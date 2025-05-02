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
      companies: {
        Row: {
          company_name: string
          company_website: string
          country: string
          created_at: string
          created_by: string | null
          id: string
          zip_code: string
        }
        Insert: {
          company_name: string
          company_website: string
          country: string
          created_at?: string
          created_by?: string | null
          id?: string
          zip_code: string
        }
        Update: {
          company_name?: string
          company_website?: string
          country?: string
          created_at?: string
          created_by?: string | null
          id?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_documents: {
        Row: {
          created_at: string
          document_url: string
          fund_id: string
          id: string
        }
        Insert: {
          created_at?: string
          document_url: string
          fund_id?: string
          id?: string
        }
        Update: {
          created_at?: string
          document_url?: string
          fund_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fund_documents_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_managers: {
        Row: {
          aum: number | null
          created_at: string
          description: string | null
          founded_date: string | null
          id: string
          is_active: boolean
          logo: string | null
          name: string
          slug: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          aum?: number | null
          created_at?: string
          description?: string | null
          founded_date?: string | null
          id?: string
          is_active?: boolean
          logo?: string | null
          name: string
          slug?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          aum?: number | null
          created_at?: string
          description?: string | null
          founded_date?: string | null
          id?: string
          is_active?: boolean
          logo?: string | null
          name?: string
          slug?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      funds: {
        Row: {
          created_at: string
          description: string | null
          document_due_date: string | null
          fund_manager_id: string | null
          fund_type: string
          id: string
          is_active: boolean
          minimum_investment: number | null
          name: string
          objective: string | null
          strategy: string | null
          substrategy: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_due_date?: string | null
          fund_manager_id?: string | null
          fund_type: string
          id?: string
          is_active?: boolean
          minimum_investment?: number | null
          name: string
          objective?: string | null
          strategy?: string | null
          substrategy?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          document_due_date?: string | null
          fund_manager_id?: string | null
          fund_type?: string
          id?: string
          is_active?: boolean
          minimum_investment?: number | null
          name?: string
          objective?: string | null
          strategy?: string | null
          substrategy?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "funds_fund_manager_id_fkey"
            columns: ["fund_manager_id"]
            isOneToOne: false
            referencedRelation: "fund_managers"
            referencedColumns: ["id"]
          },
        ]
      }
      highlights: {
        Row: {
          fund_id: string | null
          highlight: string | null
          id: string
        }
        Insert: {
          fund_id?: string | null
          highlight?: string | null
          id?: string
        }
        Update: {
          fund_id?: string | null
          highlight?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlights_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      how_it_works: {
        Row: {
          content: string | null
          fund_id: string | null
          id: string
          title: string | null
        }
        Insert: {
          content?: string | null
          fund_id?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          content?: string | null
          fund_id?: string | null
          id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "how_it_works_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      insights: {
        Row: {
          fund_id: string
          id: string
          image_url: string | null
          link: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          fund_id: string
          id?: string
          image_url?: string | null
          link?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          fund_id?: string
          id?: string
          image_url?: string | null
          link?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insights_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_objectives: {
        Row: {
          fund_id: string | null
          id: string
          objective: string | null
        }
        Insert: {
          fund_id?: string | null
          id?: string
          objective?: string | null
        }
        Update: {
          fund_id?: string | null
          id?: string
          objective?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investment_objectives_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_investments: {
        Row: {
          category: string | null
          fund_id: string | null
          fund_name: string | null
          geography: string | null
          id: string
          status: string | null
        }
        Insert: {
          category?: string | null
          fund_id?: string | null
          fund_name?: string | null
          geography?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          category?: string | null
          fund_id?: string | null
          fund_name?: string | null
          geography?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_investments_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_diversification: {
        Row: {
          category: string | null
          fund_id: string | null
          id: string
          label: string | null
          percentage: number | null
        }
        Insert: {
          category?: string | null
          fund_id?: string | null
          id?: string
          label?: string | null
          percentage?: number | null
        }
        Update: {
          category?: string | null
          fund_id?: string | null
          id?: string
          label?: string | null
          percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_diversification_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_funds: {
        Row: {
          amount: number | null
          created_at: string
          fund_id: string | null
          id: string
          portfolio_id: string | null
          status: string[] | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          fund_id?: string | null
          id?: string
          portfolio_id?: string | null
          status?: string[] | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          fund_id?: string | null
          id?: string
          portfolio_id?: string | null
          status?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_funds_fund_id_fkey"
            columns: ["fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_funds_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string | null
          eligibility: Database["public"]["Enums"]["eligibility_enum"]
          first_name: string | null
          id: string
          investor_type:
            | Database["public"]["Enums"]["investor_type_enum"]
            | null
          last_name: string | null
          phone_number: string | null
          stage: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          eligibility?: Database["public"]["Enums"]["eligibility_enum"]
          first_name?: string | null
          id: string
          investor_type?:
            | Database["public"]["Enums"]["investor_type_enum"]
            | null
          last_name?: string | null
          phone_number?: string | null
          stage?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          eligibility?: Database["public"]["Enums"]["eligibility_enum"]
          first_name?: string | null
          id?: string
          investor_type?:
            | Database["public"]["Enums"]["investor_type_enum"]
            | null
          last_name?: string | null
          phone_number?: string | null
          stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          source: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          source: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          source?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
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
      eligibility_enum:
        | "not_submitted"
        | "pending_approval"
        | "approved"
        | "denied"
      investor_type_enum: "institutional" | "intermediary" | "individual"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      eligibility_enum: [
        "not_submitted",
        "pending_approval",
        "approved",
        "denied",
      ],
      investor_type_enum: ["institutional", "intermediary", "individual"],
    },
  },
} as const
