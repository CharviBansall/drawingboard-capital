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
      action_item_templates: {
        Row: {
          compliance_definition_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          order_index: number
          updated_at: string
        }
        Insert: {
          compliance_definition_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          order_index: number
          updated_at?: string
        }
        Update: {
          compliance_definition_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_item_templates_compliance_definition_id_fkey"
            columns: ["compliance_definition_id"]
            isOneToOne: false
            referencedRelation: "compliance_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          logo: string | null
          name: string
          needs_compliance: boolean
          phone_number: string | null
          state: string | null
          updated_at: string | null
          website: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          logo?: string | null
          name: string
          needs_compliance?: boolean
          phone_number?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          logo?: string | null
          name?: string
          needs_compliance?: boolean
          phone_number?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      company_compliance: {
        Row: {
          assigned_to: string | null
          company_id: string
          compliance_definition_id: string
          created_at: string
          day_of_month: number | null
          day_of_week: number | null
          id: string
          last_completed_date: string | null
          month_of_year: number | null
          month_ordinal: number | null
          next_due_date: string | null
          notes: string | null
          ordinal_number: number | null
          period_type: string | null
          status: string
          timing: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          company_id: string
          compliance_definition_id: string
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          id?: string
          last_completed_date?: string | null
          month_of_year?: number | null
          month_ordinal?: number | null
          next_due_date?: string | null
          notes?: string | null
          ordinal_number?: number | null
          period_type?: string | null
          status?: string
          timing?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          company_id?: string
          compliance_definition_id?: string
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          id?: string
          last_completed_date?: string | null
          month_of_year?: number | null
          month_ordinal?: number | null
          next_due_date?: string | null
          notes?: string | null
          ordinal_number?: number | null
          period_type?: string | null
          status?: string
          timing?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_compliance_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_compliance_definition_fk"
            columns: ["compliance_definition_id"]
            isOneToOne: false
            referencedRelation: "compliance_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      company_compliance_dates: {
        Row: {
          company_compliance_id: string
          created_at: string
          date: string
          id: string
        }
        Insert: {
          company_compliance_id: string
          created_at?: string
          date: string
          id?: string
        }
        Update: {
          company_compliance_id?: string
          created_at?: string
          date?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_compliance_dates_fk"
            columns: ["company_compliance_id"]
            isOneToOne: false
            referencedRelation: "company_compliance"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_definitions: {
        Row: {
          assigned_to: string | null
          created_at: string
          day_of_month: number | null
          day_of_week: number | null
          detail: string | null
          id: string
          month_of_year: number | null
          month_ordinal: number | null
          name: string
          ordinal_number: number | null
          period_type: string | null
          recurring: boolean | null
          timing: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          detail?: string | null
          id?: string
          month_of_year?: number | null
          month_ordinal?: number | null
          name: string
          ordinal_number?: number | null
          period_type?: string | null
          recurring?: boolean | null
          timing?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          detail?: string | null
          id?: string
          month_of_year?: number | null
          month_ordinal?: number | null
          name?: string
          ordinal_number?: number | null
          period_type?: string | null
          recurring?: boolean | null
          timing?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      compliance_documents: {
        Row: {
          company_compliance_id: string
          document_name: string
          document_path: string
          id: string
          notes: string | null
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          company_compliance_id: string
          document_name: string
          document_path: string
          id?: string
          notes?: string | null
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          company_compliance_id?: string
          document_name?: string
          document_path?: string
          id?: string
          notes?: string | null
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_documents_company_compliance_fk"
            columns: ["company_compliance_id"]
            isOneToOne: false
            referencedRelation: "company_compliance"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_history: {
        Row: {
          action_date: string
          company_compliance_id: string
          id: string
          notes: string | null
          performed_by: string
          status: string
        }
        Insert: {
          action_date?: string
          company_compliance_id: string
          id?: string
          notes?: string | null
          performed_by: string
          status: string
        }
        Update: {
          action_date?: string
          company_compliance_id?: string
          id?: string
          notes?: string | null
          performed_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_history_company_compliance_fk"
            columns: ["company_compliance_id"]
            isOneToOne: false
            referencedRelation: "company_compliance"
            referencedColumns: ["id"]
          },
        ]
      }
      fund_managers: {
        Row: {
          co_investment_capital_amount_curr_mn: string | null
          co_investment_capital_amount_eur_mn: string | null
          co_investment_capital_amount_usd_mn: string | null
          company_id: string
          domicile: string | null
          email: string | null
          firm_id: number
          fund_manager: string | null
          fund_manager_total_aum_curr_mn: string | null
          fund_manager_total_aum_eur_mn: string | null
          fund_manager_total_aum_usd_mn: string | null
          fund_structure: string | null
          lifespan_extension: string | null
          primary_region_focus: string | null
          private_wealth: string | null
          region: string | null
          secondary_locations: string | null
          single_deal_fund: string | null
          solely_financed_by: string | null
          subscription_credit_facility: string | null
          target_irr_gross_min: string | null
          target_irr_net_max: string | null
          target_irr_net_min: string | null
          website: string | null
        }
        Insert: {
          co_investment_capital_amount_curr_mn?: string | null
          co_investment_capital_amount_eur_mn?: string | null
          co_investment_capital_amount_usd_mn?: string | null
          company_id: string
          domicile?: string | null
          email?: string | null
          firm_id: number
          fund_manager?: string | null
          fund_manager_total_aum_curr_mn?: string | null
          fund_manager_total_aum_eur_mn?: string | null
          fund_manager_total_aum_usd_mn?: string | null
          fund_structure?: string | null
          lifespan_extension?: string | null
          primary_region_focus?: string | null
          private_wealth?: string | null
          region?: string | null
          secondary_locations?: string | null
          single_deal_fund?: string | null
          solely_financed_by?: string | null
          subscription_credit_facility?: string | null
          target_irr_gross_min?: string | null
          target_irr_net_max?: string | null
          target_irr_net_min?: string | null
          website?: string | null
        }
        Update: {
          co_investment_capital_amount_curr_mn?: string | null
          co_investment_capital_amount_eur_mn?: string | null
          co_investment_capital_amount_usd_mn?: string | null
          company_id?: string
          domicile?: string | null
          email?: string | null
          firm_id?: number
          fund_manager?: string | null
          fund_manager_total_aum_curr_mn?: string | null
          fund_manager_total_aum_eur_mn?: string | null
          fund_manager_total_aum_usd_mn?: string | null
          fund_structure?: string | null
          lifespan_extension?: string | null
          primary_region_focus?: string | null
          private_wealth?: string | null
          region?: string | null
          secondary_locations?: string | null
          single_deal_fund?: string | null
          solely_financed_by?: string | null
          subscription_credit_facility?: string | null
          target_irr_gross_min?: string | null
          target_irr_net_max?: string | null
          target_irr_net_min?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fund_managers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      funds: {
        Row: {
          asset_class: string | null
          company_id: string
          country: string | null
          details: Json | null
          firm_id: number | null
          fund_currency: string | null
          fund_id: number
          fund_legal_structure: string | null
          fund_size_usd_mn: number | null
          fund_structure: string | null
          geographic_focus: string | null
          lifespan_years: number | null
          name: string | null
          offer_co_investment_opportunities_to_lps: boolean | null
          private_wealth: boolean | null
          region: string | null
          status: string | null
          strategy: string | null
          vintage_inception_year: number | null
        }
        Insert: {
          asset_class?: string | null
          company_id: string
          country?: string | null
          details?: Json | null
          firm_id?: number | null
          fund_currency?: string | null
          fund_id: number
          fund_legal_structure?: string | null
          fund_size_usd_mn?: number | null
          fund_structure?: string | null
          geographic_focus?: string | null
          lifespan_years?: number | null
          name?: string | null
          offer_co_investment_opportunities_to_lps?: boolean | null
          private_wealth?: boolean | null
          region?: string | null
          status?: string | null
          strategy?: string | null
          vintage_inception_year?: number | null
        }
        Update: {
          asset_class?: string | null
          company_id?: string
          country?: string | null
          details?: Json | null
          firm_id?: number | null
          fund_currency?: string | null
          fund_id?: number
          fund_legal_structure?: string | null
          fund_size_usd_mn?: number | null
          fund_structure?: string | null
          geographic_focus?: string | null
          lifespan_years?: number | null
          name?: string | null
          offer_co_investment_opportunities_to_lps?: boolean | null
          private_wealth?: boolean | null
          region?: string | null
          status?: string | null
          strategy?: string | null
          vintage_inception_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funds_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funds_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "fund_managers"
            referencedColumns: ["firm_id"]
          },
        ]
      }
      investors: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          investor_type: Database["public"]["Enums"]["investor_type"] | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          investor_type?: Database["public"]["Enums"]["investor_type"] | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          investor_type?: Database["public"]["Enums"]["investor_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "investors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          created_at: string
          id: number
          portfolio_fund_id: number | null
          portfolio_investor_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          portfolio_fund_id?: number | null
          portfolio_investor_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          portfolio_fund_id?: number | null
          portfolio_investor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_portfolio_fund_id_fkey"
            columns: ["portfolio_fund_id"]
            isOneToOne: false
            referencedRelation: "funds"
            referencedColumns: ["fund_id"]
          },
          {
            foreignKeyName: "portfolios_portfolio_investor_id_fkey"
            columns: ["portfolio_investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string | null
          eligibility: Database["public"]["Enums"]["eligibility_enum"]
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          profile_type: Database["public"]["Enums"]["profile_type_enum"]
          stage: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          eligibility?: Database["public"]["Enums"]["eligibility_enum"]
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          profile_type?: Database["public"]["Enums"]["profile_type_enum"]
          stage?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          eligibility?: Database["public"]["Enums"]["eligibility_enum"]
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          profile_type?: Database["public"]["Enums"]["profile_type_enum"]
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
    }
    Views: {
      fund_filter_options: {
        Row: {
          column_name: string | null
          display_name: string | null
          distinct_values: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_next_due_date: {
        Args: {
          ordinal_number: number
          day_of_week: number
          month_ordinal: number
          period_type: string
          day_of_month: number
          month_of_year: number
          reference_date?: string
        }
        Returns: string
      }
      parse_timing: {
        Args: { timing_string: string }
        Returns: {
          ordinal_number: number
          day_of_week: number
          month_ordinal: number
          period_type: string
          day_of_month: number
          month_of_year: number
        }[]
      }
    }
    Enums: {
      compliance_status:
        | "pending"
        | "in_progress"
        | "passed"
        | "failed"
        | "not_applicable"
      eligibility_enum:
        | "not_submitted"
        | "pending_approval"
        | "approved"
        | "denied"
      investor_type: "individual" | "institutional"
      "portfolio status": "Added" | "Pending" | "Shortlisted"
      profile_type_enum: "investor" | "fund_manager" | "admin"
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
      compliance_status: [
        "pending",
        "in_progress",
        "passed",
        "failed",
        "not_applicable",
      ],
      eligibility_enum: [
        "not_submitted",
        "pending_approval",
        "approved",
        "denied",
      ],
      investor_type: ["individual", "institutional"],
      "portfolio status": ["Added", "Pending", "Shortlisted"],
      profile_type_enum: ["investor", "fund_manager", "admin"],
    },
  },
} as const
