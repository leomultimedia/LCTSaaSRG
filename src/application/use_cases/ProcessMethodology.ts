export const SalesFunnelStages = [
  "Awareness", "Engagement", "Lead Magnet", "Qualification", 
  "Nurture", "Intent", "Evaluation", "Negotiation", 
  "Closing", "Onboarding", "Retention", "Advocacy"
];

export interface MethodologyTemplateConfig {
  stages: Array<{
    name: string;
    points_required: number;
    rules: Array<{ question_id: string; condition: string; value: any; points: number }>;
  }>;
}

export interface MethodologyOutcome {
  submission_id: string;
  template_id: string;
  current_stage: string;
  score_breakdown: Record<string, number>;
}

export class ScoringEngine {
  calculate(responses: Record<string, any>, config: MethodologyTemplateConfig) {
    const scores: Record<string, number> = {};
    let totalScore = 0;
    
    // Evaluate logic rules for each stage
    for (const stage of config.stages) {
      scores[stage.name] = 0;
      for (const rule of stage.rules) {
        if (rule.condition === 'equals' && responses[rule.question_id] === rule.value) {
           scores[stage.name] += rule.points;
           totalScore += rule.points;
        } else if (rule.condition === 'has_value' && responses[rule.question_id]) {
           scores[stage.name] += rule.points;
           totalScore += rule.points;
        }
      }
    }

    // Determine the highest achieved stage
    let primary_stage = config.stages[0]?.name || "Awareness";
    let cumulativePoints = 0;
    for (const stage of config.stages) {
       cumulativePoints += scores[stage.name] || 0;
       if (cumulativePoints >= stage.points_required) {
         primary_stage = stage.name;
       }
    }

    return { primary_stage, scores, totalScore };
  }
}

/**
 * CLEAN Architecture Use Case: 
 * Evaluates a submission against a specific Methodology (like the 12-Point Funnel)
 */
export class ProcessMethodology {
  private scoringEngine: ScoringEngine;
  
  // In a real implementation, we'd inject repositories here (e.g. Supabase Repo)
  constructor(private repo: any = null) {
    this.scoringEngine = new ScoringEngine();
  }

  async execute(submissionId: string, templateId: string, responses: Record<string, any>, templateConfig: MethodologyTemplateConfig): Promise<MethodologyOutcome> {
    
    // 1. Engine Logic: Score the submission against template rules
    const analysis = this.scoringEngine.calculate(responses, templateConfig);
    
    const outcome: MethodologyOutcome = {
      submission_id: submissionId,
      template_id: templateId,
      current_stage: analysis.primary_stage,
      score_breakdown: analysis.scores
    };

    // 2. Save outcome via injected repository adapter
    if (this.repo) {
       await this.repo.saveOutcome(outcome);
    }
    
    // 3. Return outcome for trigger (e.g., CRM Webhooks)
    return outcome;
  }
}
