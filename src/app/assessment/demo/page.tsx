'use client';

import React from 'react';
import AssessmentRenderer from '@/components/assessment/AssessmentRenderer';
import { AssessmentSchema } from '@/domain/entities/Assessment';

const sampleSchema: AssessmentSchema = {
  id: 'master-framework-v1',
  title: 'Global Master Framework | 12-Point Sales Funnel',
  description: 'Adaptive methodology engine evaluating 25 distinct logical data points across multimodal survey layers.',
  questions: [
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `q${i+1}`,
      label: `Strategic Data Point 0${i+1}: ${['Market Intent', 'Competitor Awareness', 'Budgetary Authority', 'Timeline Urgency', 'Decision Maker Role'][i % 5]} Analysis`,
      type: 'choice' as const,
      required: true,
      options: ['High Correlation', 'Medium', 'Low / Neutral']
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `img-${i+1}`,
      label: `Visual Brand Affinity 0${i+1}: Please upload your proposed ${['Logo Variant', 'Social Banner', 'Dashboard Mock', 'Color Palette', 'Brand Style Guide'][i]} for real-time sentiment analysis.`,
      type: 'image' as const,
      required: true
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `vid-${i+1}`,
      label: `Exec Voice Assessment 0${i+1}: Please record a 15-second elevator pitch for your ${['Vision', 'USP', 'Retention Plan', 'Go-to-market', 'Product Roadmap'][i]}.`,
      type: 'video' as const,
      required: true
    }))
  ]
};

export default function AssessmentDemoPage() {
  return (
    <div className="dark min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-8 pt-20 text-slate-50 antialiased">
      <AssessmentRenderer 
        schema={sampleSchema} 
        onSubmit={(responses) => {
          alert('Funnel Mapping Initiated! Responses: ' + JSON.stringify(responses, null, 2));
        }} 
      />
    </div>
  );
}
