import { MethodologyOutcome } from "./ProcessMethodology";

export class ReportGenerator {
  
  /**
   * Generates a structural JSON report for the specified methodology outcome.
   * This is later compiled into PDFs or visual dashboards on the client.
   */
  generateStructuralReport(outcome: MethodologyOutcome, tenantName: string) {
    const reportTimestamp = new Date().toISOString();
    
    return {
      metadata: {
        generated_at: reportTimestamp,
        tenant_context: tenantName,
        methodology_used: outcome.template_id,
        submission_reference: outcome.submission_id
      },
      analysis: {
        primary_funnel_stage: outcome.current_stage,
        velocity_score: this.calculateVelocity(outcome.score_breakdown),
        qualitative_needs: [], // Populated by LiteLLM in the future
        score_breakdown_matrix: outcome.score_breakdown
      },
      next_actions: this.synthesizeActionItems(outcome.current_stage)
    };
  }

  private calculateVelocity(scores: Record<string, number>): number {
     const total = Object.values(scores).reduce((a,b) => a + b, 0);
     return Math.min(total, 100);
  }

  private synthesizeActionItems(stage: string): string[] {
    switch (stage) {
       case "Awareness": return ["Trigger Engagement email sequence", "Retarget with educational video"];
       case "Qualification": return ["Alert Sales Team for Manual Outreach", "Provide ROI Calculator"];
       case "Closing": return ["Send Contract Gateway Link", "Schedule Onboarding Sync"];
       default: return ["Continue designated nurture track"];
    }
  }
}
