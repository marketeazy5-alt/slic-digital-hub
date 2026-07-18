export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_feed: {
        Row: {
          created_at: string
          customer_id: string
          description: string | null
          event_type: string
          icon: string
          id: string
          payload: Json
          title: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          description?: string | null
          event_type: string
          icon?: string
          id?: string
          payload?: Json
          title: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          description?: string | null
          event_type?: string
          icon?: string
          id?: string
          payload?: Json
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_feed_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          address: string | null
          city: string
          code: string
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          region: string
        }
        Insert: {
          address?: string | null
          city: string
          code: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          region: string
        }
        Update: {
          address?: string | null
          city?: string
          code?: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          region?: string
        }
        Relationships: []
      }
      claims: {
        Row: {
          approved_amount: number | null
          assigned_to: string | null
          claim_number: string
          claim_type: string
          customer_id: string
          documents: Json
          filed_at: string
          fraud_ring_id: string | null
          fraud_score: number
          id: string
          notes: string | null
          paid_amount: number | null
          policy_id: string
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
        }
        Insert: {
          approved_amount?: number | null
          assigned_to?: string | null
          claim_number: string
          claim_type: string
          customer_id: string
          documents?: Json
          filed_at?: string
          fraud_ring_id?: string | null
          fraud_score?: number
          id?: string
          notes?: string | null
          paid_amount?: number | null
          policy_id: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
        }
        Update: {
          approved_amount?: number | null
          assigned_to?: string | null
          claim_number?: string
          claim_type?: string
          customer_id?: string
          documents?: Json
          filed_at?: string
          fraud_ring_id?: string | null
          fraud_score?: number
          id?: string
          notes?: string | null
          paid_amount?: number | null
          policy_id?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_rings: {
        Row: {
          detected_at: string
          id: string
          member_claim_ids: string[]
          score: number
          shared_entities: Json
          summary: string | null
        }
        Insert: {
          detected_at?: string
          id?: string
          member_claim_ids: string[]
          score: number
          shared_entities?: Json
          summary?: string | null
        }
        Update: {
          detected_at?: string
          id?: string
          member_claim_ids?: string[]
          score?: number
          shared_entities?: Json
          summary?: string | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          customer_id: string
          icon: string
          id: string
          linked_policy_ids: string[]
          milestones_hit: number
          projected_value: number
          target_amount: number
          target_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          icon?: string
          id?: string
          linked_policy_ids?: string[]
          milestones_hit?: number
          projected_value?: number
          target_amount: number
          target_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          icon?: string
          id?: string
          linked_policy_ids?: string[]
          milestones_hit?: number
          projected_value?: number
          target_amount?: number
          target_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      graph_edges: {
        Row: {
          created_at: string
          from_id: string
          from_type: string
          id: string
          metadata: Json
          to_id: string
          to_type: string
          weight: number
        }
        Insert: {
          created_at?: string
          from_id: string
          from_type: string
          id?: string
          metadata?: Json
          to_id: string
          to_type: string
          weight?: number
        }
        Update: {
          created_at?: string
          from_id?: string
          from_type?: string
          id?: string
          metadata?: Json
          to_id?: string
          to_type?: string
          weight?: number
        }
        Relationships: []
      }
      intervention_outcomes: {
        Row: {
          accepted: boolean | null
          demographic_bucket: string | null
          id: string
          intervention_type: string
          offered_at: string
          policy_id: string
          resolved_at: string | null
          saved: boolean | null
        }
        Insert: {
          accepted?: boolean | null
          demographic_bucket?: string | null
          id?: string
          intervention_type: string
          offered_at?: string
          policy_id: string
          resolved_at?: string | null
          saved?: boolean | null
        }
        Update: {
          accepted?: boolean | null
          demographic_bucket?: string | null
          id?: string
          intervention_type?: string
          offered_at?: string
          policy_id?: string
          resolved_at?: string | null
          saved?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "intervention_outcomes_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      lapse_predictions: {
        Row: {
          demographic_bucket: string | null
          factors: Json
          generated_at: string
          id: string
          policy_id: string
          probability: number
          recommended_intervention: string
        }
        Insert: {
          demographic_bucket?: string | null
          factors?: Json
          generated_at?: string
          id?: string
          policy_id: string
          probability: number
          recommended_intervention: string
        }
        Update: {
          demographic_bucket?: string | null
          factors?: Json
          generated_at?: string
          id?: string
          policy_id?: string
          probability?: number
          recommended_intervention?: string
        }
        Relationships: [
          {
            foreignKeyName: "lapse_predictions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      next_actions: {
        Row: {
          acknowledged_at: string | null
          action_type: string
          created_at: string
          cta_label: string
          cta_route: string | null
          customer_id: string
          description: string
          dismissed_at: string | null
          id: string
          payload: Json
          score: number
          title: string
        }
        Insert: {
          acknowledged_at?: string | null
          action_type: string
          created_at?: string
          cta_label?: string
          cta_route?: string | null
          customer_id: string
          description: string
          dismissed_at?: string | null
          id?: string
          payload?: Json
          score?: number
          title: string
        }
        Update: {
          acknowledged_at?: string | null
          action_type?: string
          created_at?: string
          cta_label?: string
          cta_route?: string | null
          customer_id?: string
          description?: string
          dismissed_at?: string | null
          id?: string
          payload?: Json
          score?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "next_actions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nominees: {
        Row: {
          cnic: string | null
          created_at: string
          customer_id: string
          full_name: string
          id: string
          phone: string | null
          policy_id: string | null
          relationship: string
          share_percentage: number
        }
        Insert: {
          cnic?: string | null
          created_at?: string
          customer_id: string
          full_name: string
          id?: string
          phone?: string | null
          policy_id?: string | null
          relationship: string
          share_percentage?: number
        }
        Update: {
          cnic?: string | null
          created_at?: string
          customer_id?: string
          full_name?: string
          id?: string
          phone?: string | null
          policy_id?: string | null
          relationship?: string
          share_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "nominees_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominees_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          bonus_accrual_paused: boolean
          bonus_accumulated: number
          branch_id: string | null
          cash_value: number
          commencement_date: string
          created_at: string
          customer_id: string
          grace_period_ends: string | null
          id: string
          loan_outstanding: number
          maturity_date: string
          next_premium_due: string
          policy_number: string
          premium_amount: number
          premium_frequency: string
          product_id: string
          status: Database["public"]["Enums"]["policy_status"]
          sum_assured: number
          surrender_value: number
          term_years: number
          total_premiums_paid: number
          updated_at: string
        }
        Insert: {
          bonus_accrual_paused?: boolean
          bonus_accumulated?: number
          branch_id?: string | null
          cash_value?: number
          commencement_date: string
          created_at?: string
          customer_id: string
          grace_period_ends?: string | null
          id?: string
          loan_outstanding?: number
          maturity_date: string
          next_premium_due: string
          policy_number: string
          premium_amount: number
          premium_frequency?: string
          product_id: string
          status?: Database["public"]["Enums"]["policy_status"]
          sum_assured: number
          surrender_value?: number
          term_years?: number
          total_premiums_paid?: number
          updated_at?: string
        }
        Update: {
          bonus_accrual_paused?: boolean
          bonus_accumulated?: number
          branch_id?: string | null
          cash_value?: number
          commencement_date?: string
          created_at?: string
          customer_id?: string
          grace_period_ends?: string | null
          id?: string
          loan_outstanding?: number
          maturity_date?: string
          next_premium_due?: string
          policy_number?: string
          premium_amount?: number
          premium_frequency?: string
          product_id?: string
          status?: Database["public"]["Enums"]["policy_status"]
          sum_assured?: number
          surrender_value?: number
          term_years?: number
          total_premiums_paid?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_state_events: {
        Row: {
          created_at: string
          from_state: Database["public"]["Enums"]["policy_status"] | null
          id: string
          metadata: Json
          policy_id: string
          to_state: Database["public"]["Enums"]["policy_status"]
          trigger: string
        }
        Insert: {
          created_at?: string
          from_state?: Database["public"]["Enums"]["policy_status"] | null
          id?: string
          metadata?: Json
          policy_id: string
          to_state: Database["public"]["Enums"]["policy_status"]
          trigger: string
        }
        Update: {
          created_at?: string
          from_state?: Database["public"]["Enums"]["policy_status"] | null
          id?: string
          metadata?: Json
          policy_id?: string
          to_state?: Database["public"]["Enums"]["policy_status"]
          trigger?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_state_events_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      premiums: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          late_fee: number
          paid_date: string | null
          payment_method: string | null
          payment_reference: string | null
          policy_id: string
          receipt_number: string | null
          saga_id: string | null
          status: Database["public"]["Enums"]["premium_status"]
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          late_fee?: number
          paid_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          policy_id: string
          receipt_number?: string | null
          saga_id?: string | null
          status?: Database["public"]["Enums"]["premium_status"]
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          late_fee?: number
          paid_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          policy_id?: string
          receipt_number?: string | null
          saga_id?: string | null
          status?: Database["public"]["Enums"]["premium_status"]
        }
        Relationships: [
          {
            foreignKeyName: "premiums_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_premium_rate: number
          bonus_rate: number
          category: string
          code: string
          created_at: string
          description: string | null
          id: string
          max_sum_assured: number
          min_sum_assured: number
          name: string
          tagline: string | null
          term_years_max: number
          term_years_min: number
        }
        Insert: {
          base_premium_rate?: number
          bonus_rate?: number
          category: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          max_sum_assured?: number
          min_sum_assured?: number
          name: string
          tagline?: string | null
          term_years_max?: number
          term_years_min?: number
        }
        Update: {
          base_premium_rate?: number
          bonus_rate?: number
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          max_sum_assured?: number
          min_sum_assured?: number
          name?: string
          tagline?: string | null
          term_years_max?: number
          term_years_min?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          cnic: string | null
          created_at: string
          dob: string | null
          full_name: string
          gender: string | null
          home_branch_id: string | null
          id: string
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          monthly_income: number | null
          nadra_verified: boolean
          occupation: string | null
          onboarded: boolean
          phone: string | null
          risk_rating: string
          updated_at: string
        }
        Insert: {
          cnic?: string | null
          created_at?: string
          dob?: string | null
          full_name: string
          gender?: string | null
          home_branch_id?: string | null
          id: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          monthly_income?: number | null
          nadra_verified?: boolean
          occupation?: string | null
          onboarded?: boolean
          phone?: string | null
          risk_rating?: string
          updated_at?: string
        }
        Update: {
          cnic?: string | null
          created_at?: string
          dob?: string | null
          full_name?: string
          gender?: string | null
          home_branch_id?: string | null
          id?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          monthly_income?: number | null
          nadra_verified?: boolean
          occupation?: string | null
          onboarded?: boolean
          phone?: string | null
          risk_rating?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_home_branch_id_fkey"
            columns: ["home_branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      saga_events: {
        Row: {
          actor_id: string | null
          compensation: Json | null
          created_at: string
          duration_ms: number | null
          id: string
          payload: Json
          saga_id: string
          saga_type: string
          status: Database["public"]["Enums"]["saga_step_status"]
          step: string
          step_index: number
        }
        Insert: {
          actor_id?: string | null
          compensation?: Json | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          payload?: Json
          saga_id: string
          saga_type: string
          status: Database["public"]["Enums"]["saga_step_status"]
          step: string
          step_index: number
        }
        Update: {
          actor_id?: string | null
          compensation?: Json | null
          created_at?: string
          duration_ms?: number | null
          id?: string
          payload?: Json
          saga_id?: string
          saga_type?: string
          status?: Database["public"]["Enums"]["saga_step_status"]
          step?: string
          step_index?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "agent" | "admin"
      claim_status:
        | "submitted"
        | "under_review"
        | "verification"
        | "underwriting"
        | "approval"
        | "payment"
        | "disbursed"
        | "rejected"
      kyc_status: "pending" | "verified" | "rejected"
      policy_status:
        | "draft"
        | "pending"
        | "active"
        | "grace_period"
        | "lapsed_revivable"
        | "lapsed_surrender_only"
        | "surrendered"
        | "matured"
        | "claimed"
      premium_status: "pending" | "paid" | "overdue" | "waived" | "holiday"
      saga_step_status: "pending" | "success" | "failed" | "compensated"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "agent", "admin"],
      claim_status: [
        "submitted",
        "under_review",
        "verification",
        "underwriting",
        "approval",
        "payment",
        "disbursed",
        "rejected",
      ],
      kyc_status: ["pending", "verified", "rejected"],
      policy_status: [
        "draft",
        "pending",
        "active",
        "grace_period",
        "lapsed_revivable",
        "lapsed_surrender_only",
        "surrendered",
        "matured",
        "claimed",
      ],
      premium_status: ["pending", "paid", "overdue", "waived", "holiday"],
      saga_step_status: ["pending", "success", "failed", "compensated"],
    },
  },
} as const
