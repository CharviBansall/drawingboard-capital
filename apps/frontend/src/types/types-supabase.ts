export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      action_item_templates: {
        Row: {
          compliance_definition_id: string;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          order_index: number;
          updated_at: string;
        };
        Insert: {
          compliance_definition_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          order_index: number;
          updated_at?: string;
        };
        Update: {
          compliance_definition_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          order_index?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'action_item_templates_compliance_definition_id_fkey';
            columns: ['compliance_definition_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_checklist_status';
            referencedColumns: ['compliance_definition_id'];
          },
          {
            foreignKeyName: 'action_item_templates_compliance_definition_id_fkey';
            columns: ['compliance_definition_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_definitions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'action_item_templates_compliance_definition_id_fkey';
            columns: ['compliance_definition_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_documents_overview';
            referencedColumns: ['compliance_definition_id'];
          },
        ];
      };
      companies: {
        Row: {
          address: string | null;
          city: string | null;
          company_name: string;
          company_website: string | null;
          country: string | null;
          created_at: string | null;
          id: string;
          logo: string | null;
          phone_number: string | null;
          state: string | null;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          company_name: string;
          company_website?: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: string;
          logo?: string | null;
          phone_number?: string | null;
          state?: string | null;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          company_name?: string;
          company_website?: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: string;
          logo?: string | null;
          phone_number?: string | null;
          state?: string | null;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      company_action_items: {
        Row: {
          company_compliance_id: string;
          completed_at: string | null;
          completed_by: string | null;
          created_at: string;
          id: string;
          is_completed: boolean;
          notes: string | null;
          template_id: string;
          updated_at: string;
        };
        Insert: {
          company_compliance_id: string;
          completed_at?: string | null;
          completed_by?: string | null;
          created_at?: string;
          id?: string;
          is_completed?: boolean;
          notes?: string | null;
          template_id: string;
          updated_at?: string;
        };
        Update: {
          company_compliance_id?: string;
          completed_at?: string | null;
          completed_by?: string | null;
          created_at?: string;
          id?: string;
          is_completed?: boolean;
          notes?: string | null;
          template_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'company_action_items_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliances';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'company_action_items_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_checklist_status';
            referencedColumns: ['company_compliance_id'];
          },
          {
            foreignKeyName: 'company_action_items_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_documents_overview';
            referencedColumns: ['company_compliance_id'];
          },
          {
            foreignKeyName: 'company_action_items_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_compliance_id'];
          },
          {
            foreignKeyName: 'company_action_items_template_id_fkey';
            columns: ['template_id'];
            isOneToOne: false;
            referencedRelation: 'action_item_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      company_compliances: {
        Row: {
          company_id: string;
          completed_date: string | null;
          compliance_definition_id: string;
          created_at: string;
          deadline_date: string;
          has_ical: boolean | null;
          id: string;
          next_occurrence_date: string | null;
          notes: string | null;
          status: Database['public']['Enums']['compliance_status'];
          updated_at: string;
        };
        Insert: {
          company_id: string;
          completed_date?: string | null;
          compliance_definition_id: string;
          created_at?: string;
          deadline_date: string;
          has_ical?: boolean | null;
          id?: string;
          next_occurrence_date?: string | null;
          notes?: string | null;
          status?: Database['public']['Enums']['compliance_status'];
          updated_at?: string;
        };
        Update: {
          company_id?: string;
          completed_date?: string | null;
          compliance_definition_id?: string;
          created_at?: string;
          deadline_date?: string;
          has_ical?: boolean | null;
          id?: string;
          next_occurrence_date?: string | null;
          notes?: string | null;
          status?: Database['public']['Enums']['compliance_status'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_compliance_definition_id_fkey';
            columns: ['compliance_definition_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_checklist_status';
            referencedColumns: ['compliance_definition_id'];
          },
          {
            foreignKeyName: 'company_compliances_compliance_definition_id_fkey';
            columns: ['compliance_definition_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_definitions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'company_compliances_compliance_definition_id_fkey';
            columns: ['compliance_definition_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_documents_overview';
            referencedColumns: ['compliance_definition_id'];
          },
        ];
      };
      compliance_definitions: {
        Row: {
          created_at: string;
          default_deadline_days: number;
          description: string | null;
          id: string;
          name: string;
          recurrence_custom_days: number | null;
          recurrence_period: string | null;
          recurring: boolean | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          default_deadline_days: number;
          description?: string | null;
          id?: string;
          name: string;
          recurrence_custom_days?: number | null;
          recurrence_period?: string | null;
          recurring?: boolean | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          default_deadline_days?: number;
          description?: string | null;
          id?: string;
          name?: string;
          recurrence_custom_days?: number | null;
          recurrence_period?: string | null;
          recurring?: boolean | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      compliance_documents: {
        Row: {
          category_id: string | null;
          company_compliance_id: string;
          created_at: string;
          file_name: string;
          file_path: string;
          file_size: number;
          file_type: string;
          id: string;
          is_current_version: boolean;
          updated_at: string;
          uploaded_by: string | null;
          version: number;
        };
        Insert: {
          category_id?: string | null;
          company_compliance_id: string;
          created_at?: string;
          file_name: string;
          file_path: string;
          file_size: number;
          file_type: string;
          id?: string;
          is_current_version?: boolean;
          updated_at?: string;
          uploaded_by?: string | null;
          version?: number;
        };
        Update: {
          category_id?: string | null;
          company_compliance_id?: string;
          created_at?: string;
          file_name?: string;
          file_path?: string;
          file_size?: number;
          file_type?: string;
          id?: string;
          is_current_version?: boolean;
          updated_at?: string;
          uploaded_by?: string | null;
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'compliance_documents_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'document_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'compliance_documents_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliances';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'compliance_documents_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_checklist_status';
            referencedColumns: ['company_compliance_id'];
          },
          {
            foreignKeyName: 'compliance_documents_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'compliance_documents_overview';
            referencedColumns: ['company_compliance_id'];
          },
          {
            foreignKeyName: 'compliance_documents_company_compliance_id_fkey';
            columns: ['company_compliance_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_compliance_id'];
          },
        ];
      };
      document_categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      firm_id_uuid_map: {
        Row: {
          new_company_id: string | null;
          old_firm_id: number;
        };
        Insert: {
          new_company_id?: string | null;
          old_firm_id: number;
        };
        Update: {
          new_company_id?: string | null;
          old_firm_id?: number;
        };
        Relationships: [];
      };
      fund_managers: {
        Row: {
          co_investment_capital_amount_curr_mn: string | null;
          co_investment_capital_amount_eur_mn: string | null;
          co_investment_capital_amount_usd_mn: string | null;
          company_id: string;
          domicile: string | null;
          email: string | null;
          firm_id: number;
          fund_manager: string | null;
          fund_manager_total_aum_curr_mn: string | null;
          fund_manager_total_aum_eur_mn: string | null;
          fund_manager_total_aum_usd_mn: string | null;
          fund_structure: string | null;
          lifespan_extension: string | null;
          primary_region_focus: string | null;
          private_wealth: string | null;
          region: string | null;
          secondary_locations: string | null;
          single_deal_fund: string | null;
          solely_financed_by: string | null;
          subscription_credit_facility: string | null;
          target_irr_gross_min: string | null;
          target_irr_net_max: string | null;
          target_irr_net_min: string | null;
          website: string | null;
        };
        Insert: {
          co_investment_capital_amount_curr_mn?: string | null;
          co_investment_capital_amount_eur_mn?: string | null;
          co_investment_capital_amount_usd_mn?: string | null;
          company_id: string;
          domicile?: string | null;
          email?: string | null;
          firm_id: number;
          fund_manager?: string | null;
          fund_manager_total_aum_curr_mn?: string | null;
          fund_manager_total_aum_eur_mn?: string | null;
          fund_manager_total_aum_usd_mn?: string | null;
          fund_structure?: string | null;
          lifespan_extension?: string | null;
          primary_region_focus?: string | null;
          private_wealth?: string | null;
          region?: string | null;
          secondary_locations?: string | null;
          single_deal_fund?: string | null;
          solely_financed_by?: string | null;
          subscription_credit_facility?: string | null;
          target_irr_gross_min?: string | null;
          target_irr_net_max?: string | null;
          target_irr_net_min?: string | null;
          website?: string | null;
        };
        Update: {
          co_investment_capital_amount_curr_mn?: string | null;
          co_investment_capital_amount_eur_mn?: string | null;
          co_investment_capital_amount_usd_mn?: string | null;
          company_id?: string;
          domicile?: string | null;
          email?: string | null;
          firm_id?: number;
          fund_manager?: string | null;
          fund_manager_total_aum_curr_mn?: string | null;
          fund_manager_total_aum_eur_mn?: string | null;
          fund_manager_total_aum_usd_mn?: string | null;
          fund_structure?: string | null;
          lifespan_extension?: string | null;
          primary_region_focus?: string | null;
          private_wealth?: string | null;
          region?: string | null;
          secondary_locations?: string | null;
          single_deal_fund?: string | null;
          solely_financed_by?: string | null;
          subscription_credit_facility?: string | null;
          target_irr_gross_min?: string | null;
          target_irr_net_max?: string | null;
          target_irr_net_min?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fund_managers_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fund_managers_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'fund_managers_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'fund_managers_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
        ];
      };
      funds: {
        Row: {
          asset_class: string | null;
          company_id: string;
          country: string | null;
          details: Json | null;
          firm_id: number | null;
          fund_currency: string | null;
          fund_id: number;
          fund_legal_structure: string | null;
          fund_size_usd_mn: number | null;
          fund_structure: string | null;
          geographic_focus: string | null;
          lifespan_years: number | null;
          name: string | null;
          offer_co_investment_opportunities_to_lps: boolean | null;
          private_wealth: boolean | null;
          region: string | null;
          status: string | null;
          strategy: string | null;
          vintage_inception_year: number | null;
        };
        Insert: {
          asset_class?: string | null;
          company_id: string;
          country?: string | null;
          details?: Json | null;
          firm_id?: number | null;
          fund_currency?: string | null;
          fund_id: number;
          fund_legal_structure?: string | null;
          fund_size_usd_mn?: number | null;
          fund_structure?: string | null;
          geographic_focus?: string | null;
          lifespan_years?: number | null;
          name?: string | null;
          offer_co_investment_opportunities_to_lps?: boolean | null;
          private_wealth?: boolean | null;
          region?: string | null;
          status?: string | null;
          strategy?: string | null;
          vintage_inception_year?: number | null;
        };
        Update: {
          asset_class?: string | null;
          company_id?: string;
          country?: string | null;
          details?: Json | null;
          firm_id?: number | null;
          fund_currency?: string | null;
          fund_id?: number;
          fund_legal_structure?: string | null;
          fund_size_usd_mn?: number | null;
          fund_structure?: string | null;
          geographic_focus?: string | null;
          lifespan_years?: number | null;
          name?: string | null;
          offer_co_investment_opportunities_to_lps?: boolean | null;
          private_wealth?: boolean | null;
          region?: string | null;
          status?: string | null;
          strategy?: string | null;
          vintage_inception_year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'funds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'funds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'funds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'funds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'funds_firm_id_fkey';
            columns: ['firm_id'];
            isOneToOne: false;
            referencedRelation: 'fund_managers';
            referencedColumns: ['firm_id'];
          },
        ];
      };
      ical_feeds: {
        Row: {
          company_id: string;
          created_at: string;
          feed_uid: string;
          id: string;
          is_active: boolean;
          name: string;
          updated_at: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          feed_uid?: string;
          id?: string;
          is_active?: boolean;
          name: string;
          updated_at?: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          feed_uid?: string;
          id?: string;
          is_active?: boolean;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ical_feeds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ical_feeds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'ical_feeds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'ical_feeds_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
        ];
      };
      investors: {
        Row: {
          company_id: string | null;
          created_at: string;
          id: string;
          investor_type: Database['public']['Enums']['investor_type'] | null;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string;
          id?: string;
          investor_type?: Database['public']['Enums']['investor_type'] | null;
        };
        Update: {
          company_id?: string | null;
          created_at?: string;
          id?: string;
          investor_type?: Database['public']['Enums']['investor_type'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'investors_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'investors_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'investors_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'investors_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
        ];
      };
      portfolios: {
        Row: {
          created_at: string;
          id: number;
          portfolio_fund_id: number | null;
          portfolio_investor_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          portfolio_fund_id?: number | null;
          portfolio_investor_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          portfolio_fund_id?: number | null;
          portfolio_investor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'portfolios_portfolio_fund_id_fkey';
            columns: ['portfolio_fund_id'];
            isOneToOne: false;
            referencedRelation: 'funds';
            referencedColumns: ['fund_id'];
          },
          {
            foreignKeyName: 'portfolios_portfolio_investor_id_fkey';
            columns: ['portfolio_investor_id'];
            isOneToOne: false;
            referencedRelation: 'investors';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          eligibility: Database['public']['Enums']['eligibility_enum'];
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone_number: string | null;
          profile_type: Database['public']['Enums']['profile_type_enum'];
          stage: string | null;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          eligibility?: Database['public']['Enums']['eligibility_enum'];
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone_number?: string | null;
          profile_type?: Database['public']['Enums']['profile_type_enum'];
          stage?: string | null;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          eligibility?: Database['public']['Enums']['eligibility_enum'];
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone_number?: string | null;
          profile_type?: Database['public']['Enums']['profile_type_enum'];
          stage?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'profiles_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'profiles_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
        ];
      };
    };
    Views: {
      company_compliance_summary: {
        Row: {
          company_id: string | null;
          company_name: string | null;
          failed_count: number | null;
          in_progress_count: number | null;
          not_applicable_count: number | null;
          overdue_count: number | null;
          passed_count: number | null;
          pending_count: number | null;
          total_compliances: number | null;
        };
        Relationships: [];
      };
      compliance_checklist_status: {
        Row: {
          company_compliance_id: string | null;
          company_id: string | null;
          company_name: string | null;
          completed_action_items: number | null;
          completion_percentage: number | null;
          compliance_definition_id: string | null;
          compliance_name: string | null;
          compliance_status:
            | Database['public']['Enums']['compliance_status']
            | null;
          deadline_date: string | null;
          total_action_items: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
        ];
      };
      compliance_documents_overview: {
        Row: {
          company_compliance_id: string | null;
          company_id: string | null;
          company_name: string | null;
          compliance_definition_id: string | null;
          compliance_name: string | null;
          compliance_status:
            | Database['public']['Enums']['compliance_status']
            | null;
          document_count: number | null;
          latest_document_update: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'company_compliance_summary';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'ical_feed_contents';
            referencedColumns: ['company_id'];
          },
          {
            foreignKeyName: 'company_compliances_company_id_fkey';
            columns: ['company_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_compliance_deadlines';
            referencedColumns: ['company_id'];
          },
        ];
      };
      fund_filter_options: {
        Row: {
          column_name: string | null;
          display_name: string | null;
          distinct_values: string[] | null;
        };
        Relationships: [];
      };
      ical_feed_contents: {
        Row: {
          company_id: string | null;
          company_name: string | null;
          compliance_name: string | null;
          deadline_date: string | null;
          feed_id: string | null;
          feed_name: string | null;
          feed_uid: string | null;
          status: Database['public']['Enums']['compliance_status'] | null;
        };
        Relationships: [];
      };
      upcoming_compliance_deadlines: {
        Row: {
          company_compliance_id: string | null;
          company_id: string | null;
          company_name: string | null;
          compliance_name: string | null;
          days_remaining: number | null;
          deadline_date: string | null;
          has_ical: boolean | null;
          status: Database['public']['Enums']['compliance_status'] | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      compliance_status:
        | 'pending'
        | 'in_progress'
        | 'passed'
        | 'failed'
        | 'not_applicable';
      eligibility_enum:
        | 'not_submitted'
        | 'pending_approval'
        | 'approved'
        | 'denied';
      investor_type: 'individual' | 'institutional';
      'portfolio status': 'Added' | 'Pending' | 'Shortlisted';
      profile_type_enum: 'investor' | 'fund_manager' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      compliance_status: [
        'pending',
        'in_progress',
        'passed',
        'failed',
        'not_applicable',
      ],
      eligibility_enum: [
        'not_submitted',
        'pending_approval',
        'approved',
        'denied',
      ],
      investor_type: ['individual', 'institutional'],
      'portfolio status': ['Added', 'Pending', 'Shortlisted'],
      profile_type_enum: ['investor', 'fund_manager', 'admin'],
    },
  },
} as const;
