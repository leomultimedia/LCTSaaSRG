/**
 * Domain entity representing the core SaaS growth KPIs.
 */
export interface SaaSMetrics {
  cltv: number;   // Customer Lifetime Value
  nps: number;    // Net Promoter Score
  arpu: number;   // Average Revenue Per User
  churnRate: number; // Percentage of users leaving
}

export class AnalyticsService {
  /**
   * Calculates the Net Promoter Score (NPS) based on survey responses.
   * NPS = % Promoters (9-10) - % Detractors (0-6)
   */
  static calculateNPS(scores: number[]): number {
    if (!scores.length) return 0;
    const promoters = scores.filter(s => s >= 9).length;
    const detractors = scores.filter(s => s <= 6).length;
    return Math.round(((promoters - detractors) / scores.length) * 100);
  }

  /**
   * Calculates Customer Lifetime Value (CLTV).
   * Simple Formula: (Avg Sale * Frequency) * Lifespan
   */
  static calculateCLTV(avgOrderValue: number, frequencyPerYear: number, lifespanYears: number): number {
    return avgOrderValue * frequencyPerYear * lifespanYears;
  }

  /**
   * Insight Generation Engine:
   * Provides contextual suggestions based on metric thresholds.
   */
  static generateSuggestions(metrics: SaaSMetrics): string[] {
    const suggestions: string[] = [];
    
    if (metrics.nps < 30) {
      suggestions.push("⚠️ Low Satisfaction Detected: Implement immediate follow-up surveys for Detractors.");
    }
    
    if (metrics.arpu < 50) {
      suggestions.push("📈 Portfolio Optimization: Consider upselling to the 'Business Monthly' tier for higher usage limits.");
    }

    if (metrics.churnRate > 5) {
      suggestions.push("🛡️ Retention Risk: Analyze 12-point funnel outcomes to identify drop-off stages in the user lifecycle.");
    }

    return suggestions;
  }
}
