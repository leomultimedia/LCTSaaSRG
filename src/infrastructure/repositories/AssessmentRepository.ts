import { supabase } from '../supabase/client';

export interface PostgrestRepository {
  saveOutcome(outcome: any): Promise<void>;
  getAssessment(id: string): Promise<any>;
}

export class SupabaseAssessmentRepository implements PostgrestRepository {
  async saveOutcome(outcome: any) {
    const { error } = await supabase
      .from('methodology_outcomes')
      .insert({
        submission_id: outcome.submission_id,
        template_id: outcome.template_id,
        current_stage: outcome.current_stage,
        score_breakdown: outcome.score_breakdown,
        calculated_at: new Date().toISOString()
      });
      
    if (error) throw new Error(`Supabase Error: ${error.message}`);
  }

  async getAssessment(id: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw new Error(`Supabase Error: ${error.message}`);
    return data;
  }
}
