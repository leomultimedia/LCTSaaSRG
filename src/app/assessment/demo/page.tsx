'use client';

import React from 'react';
import AssessmentRenderer from '@/components/assessment/AssessmentRenderer';
import { AssessmentSchema } from '@/domain/entities/Assessment';

const sampleSchema: AssessmentSchema = {
  id: 'a1b2c3d4',
  title: 'InsightFlow Sales Qualification',
  description: 'Please answer the following questions so we can map you correctly within the 12-Point Sales Funnel.',
  questions: [
    {
      id: 'q1',
      label: 'What is your primary goal?',
      type: 'choice',
      required: true,
      options: ['Lead Generation', 'Brand Awareness', 'Process Automation']
    },
    {
      id: 'q2',
      label: 'Do you have an allocated budget?',
      type: 'choice',
      required: true,
      options: ['Yes', 'No'],
      logic: [
        {
          targetQuestionId: 'q4', // Skips directly to media upload if no budget
          condition: 'equals',
          value: 'No',
          action: 'skip_to'
        }
      ]
    },
    {
      id: 'q3',
      label: 'What is your estimated timeline?',
      type: 'text',
      required: false,
    },
    {
      id: 'q4',
      label: 'Please upload a 30s video expressing your brand voice.',
      type: 'video',
      required: false,
    }
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
