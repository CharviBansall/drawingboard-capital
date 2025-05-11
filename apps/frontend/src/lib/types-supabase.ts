export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      companies: {
        Row: {
          company_name: string;
          company_website: string;
          country: string;
          created_at: string;
          created_by: string | null;
          id: string;
          zip_code: string;
        };
        Insert: {
          company_name: string;
          company_website: string;
          country: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          zip_code: string;
        };
        Update: {
          company_name?: string;
          company_website?: string;
          country?: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          zip_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'companies_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      fund_managers: {
        Row: {
          address: string | null;
          city: string | null;
          co_investment_capital_amount_curr_mn: string | null;
          co_investment_capital_amount_eur_mn: string | null;
          co_investment_capital_amount_usd_mn: string | null;
          country: string | null;
          domicile: string | null;
          email: string | null;
          fax: string | null;
          firm_id: number;
          fund_manager: string | null;
          fund_manager_total_aum_curr_mn: string | null;
          fund_manager_total_aum_eur_mn: string | null;
          fund_manager_total_aum_usd_mn: string | null;
          fund_structure: string | null;
          lifespan_extension: string | null;
          logo: string | null;
          primary_region_focus: string | null;
          private_wealth: string | null;
          region: string | null;
          secondary_locations: string | null;
          single_deal_fund: string | null;
          solely_financed_by: string | null;
          state: string | null;
          subscription_credit_facility: string | null;
          target_irr_gross_min: string | null;
          target_irr_net_max: string | null;
          target_irr_net_min: string | null;
          tel: string | null;
          website: string | null;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          co_investment_capital_amount_curr_mn?: string | null;
          co_investment_capital_amount_eur_mn?: string | null;
          co_investment_capital_amount_usd_mn?: string | null;
          country?: string | null;
          domicile?: string | null;
          email?: string | null;
          fax?: string | null;
          firm_id: number;
          fund_manager?: string | null;
          fund_manager_total_aum_curr_mn?: string | null;
          fund_manager_total_aum_eur_mn?: string | null;
          fund_manager_total_aum_usd_mn?: string | null;
          fund_structure?: string | null;
          lifespan_extension?: string | null;
          logo?: string | null;
          primary_region_focus?: string | null;
          private_wealth?: string | null;
          region?: string | null;
          secondary_locations?: string | null;
          single_deal_fund?: string | null;
          solely_financed_by?: string | null;
          state?: string | null;
          subscription_credit_facility?: string | null;
          target_irr_gross_min?: string | null;
          target_irr_net_max?: string | null;
          target_irr_net_min?: string | null;
          tel?: string | null;
          website?: string | null;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          co_investment_capital_amount_curr_mn?: string | null;
          co_investment_capital_amount_eur_mn?: string | null;
          co_investment_capital_amount_usd_mn?: string | null;
          country?: string | null;
          domicile?: string | null;
          email?: string | null;
          fax?: string | null;
          firm_id?: number;
          fund_manager?: string | null;
          fund_manager_total_aum_curr_mn?: string | null;
          fund_manager_total_aum_eur_mn?: string | null;
          fund_manager_total_aum_usd_mn?: string | null;
          fund_structure?: string | null;
          lifespan_extension?: string | null;
          logo?: string | null;
          primary_region_focus?: string | null;
          private_wealth?: string | null;
          region?: string | null;
          secondary_locations?: string | null;
          single_deal_fund?: string | null;
          solely_financed_by?: string | null;
          state?: string | null;
          subscription_credit_facility?: string | null;
          target_irr_gross_min?: string | null;
          target_irr_net_max?: string | null;
          target_irr_net_min?: string | null;
          tel?: string | null;
          website?: string | null;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      funds: {
        Row: {
          asset_class: string | null;
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
            foreignKeyName: 'funds_firm_id_fkey';
            columns: ['firm_id'];
            isOneToOne: false;
            referencedRelation: 'fund_managers';
            referencedColumns: ['firm_id'];
          },
        ];
      };
      profiles: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          eligibility: Database['public']['Enums']['eligibility_enum'];
          first_name: string | null;
          id: string;
          investor_type:
            | Database['public']['Enums']['investor_type_enum']
            | null;
          last_name: string | null;
          phone_number: string | null;
          stage: string | null;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          eligibility?: Database['public']['Enums']['eligibility_enum'];
          first_name?: string | null;
          id: string;
          investor_type?:
            | Database['public']['Enums']['investor_type_enum']
            | null;
          last_name?: string | null;
          phone_number?: string | null;
          stage?: string | null;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          eligibility?: Database['public']['Enums']['eligibility_enum'];
          first_name?: string | null;
          id?: string;
          investor_type?:
            | Database['public']['Enums']['investor_type_enum']
            | null;
          last_name?: string | null;
          phone_number?: string | null;
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
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      eligibility_enum:
        | 'not_submitted'
        | 'pending_approval'
        | 'approved'
        | 'denied';
      investor_type_enum: 'institutional' | 'intermediary' | 'individual';
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      eligibility_enum: [
        'not_submitted',
        'pending_approval',
        'approved',
        'denied',
      ],
      investor_type_enum: ['institutional', 'intermediary', 'individual'],
    },
  },
} as const;
