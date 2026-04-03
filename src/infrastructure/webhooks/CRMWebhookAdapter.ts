import { MethodologyOutcome } from "@/application/use_cases/ProcessMethodology";

export class CRMWebhookAdapter {
  constructor(private webhookUrl: string) {}

  /**
   * Pushes the analyzed lead methodology outcome to a target CRM via Webhook (Zapier/Make)
   */
  async pushLeadResult(outcome: MethodologyOutcome, additionalData: any = {}): Promise<boolean> {
    try {
      const payload = {
        action: 'insightflow_new_lead',
        timestamp: new Date().toISOString(),
        outcome: {
           stage: outcome.current_stage,
           score_matrix: outcome.score_breakdown,
        },
        contact_data: additionalData
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`CRM Webhook failed with status: ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error pushing lead to CRM Webhook:", error);
      return false;
    }
  }
}
