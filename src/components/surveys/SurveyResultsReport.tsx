'use client';
import React from 'react';
import { CheckCircleIcon, ChartBarIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { Question } from '@/components/surveys/QuestionBuilder';

interface SurveyResultsReportProps {
  surveyTitle: string;
  client: string;
  version: string;
  plan: string;
  questions: Question[];
  allowVideo: boolean;
  onReset: () => void;
}

const planColors: Record<string, string> = {
  starter: 'text-slate-400',
  pro: 'text-blue-400',
  business: 'text-violet-400',
  unlimited: 'text-emerald-400',
};

const planLabels: Record<string, string> = {
  starter: 'Starter Node',
  pro: 'Pro Hub',
  business: 'Business Cluster',
  unlimited: 'Enterprise Unlimited',
};

export default function SurveyResultsReport({
  surveyTitle, client, version, plan, questions, allowVideo, onReset
}: SurveyResultsReportProps) {
  const mediaQuestions = questions.filter(q => ['video', 'image', 'file'].includes(q.type));
  const scoreQuestions = questions.filter(q => q.type === 'rating');
  const totalFields = questions.length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Success Banner */}
      <div className="relative overflow-hidden rounded-[32px] border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5" />
        <CheckCircleIcon className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-white tracking-tight">Assessment Live & Processing</h2>
        <p className="text-slate-400 mt-2 max-w-lg mx-auto text-sm leading-relaxed">
          Your methodology framework is active. Submissions will be scored in real-time and surfaced in this report.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <span className={`px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-widest ${planColors[plan]}`}>
            {planLabels[plan]}
          </span>
          <span className="px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-xs font-mono">{version}</span>
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-mono">{client}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Questions', value: totalFields, color: 'blue' },
          { label: 'Media Capture Fields', value: mediaQuestions.length, color: allowVideo ? 'rose' : 'slate' },
          { label: 'Rating Scales', value: scoreQuestions.length, color: 'amber' },
          { label: 'Branching Rules', value: questions.filter(q => q.branchTo).length, color: 'violet' },
        ].map(stat => (
          <div key={stat.label} className={`p-6 rounded-3xl border border-${stat.color}-500/20 bg-${stat.color}-500/5`}>
            <p className={`text-4xl font-black text-${stat.color}-400`}>{stat.value}</p>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Question Summary Table */}
      <div className="rounded-3xl border border-white/10 overflow-hidden">
        <div className="p-6 bg-white/3 border-b border-white/10 flex items-center gap-3">
          <DocumentChartBarIcon className="h-6 w-6 text-blue-400" />
          <div>
            <h3 className="text-white font-bold">{surveyTitle || 'Assessment Summary'}</h3>
            <p className="text-slate-500 text-xs font-mono uppercase mt-0.5">Registered Question Nodes · {totalFields} Total</p>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">#</th>
              <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Question</th>
              <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Type</th>
              <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Required</th>
              <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Branching</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {questions.map((q, i) => (
              <tr key={q.id} className="hover:bg-white/3 transition-colors">
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                <td className="px-6 py-4 text-white font-medium max-w-xs truncate">{q.label || <span className="text-slate-600 italic">Untitled</span>}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-black uppercase tracking-widest">{q.type}</span>
                </td>
                <td className="px-6 py-4">
                  {q.required
                    ? <span className="text-emerald-400 text-xs font-bold">Yes</span>
                    : <span className="text-slate-600 text-xs">No</span>}
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs font-mono">
                  {q.branchTo === '__end__' ? '→ End' : q.branchTo ? '→ Linked' : 'Linear'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output Report Simulation */}
      <div className="rounded-3xl border border-white/10 bg-white/2 p-8">
        <div className="flex items-center gap-3 mb-6">
          <ChartBarIcon className="h-6 w-6 text-violet-400" />
          <h3 className="text-white font-bold">Simulated Response Report</h3>
          <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">LIVE PREVIEW</span>
        </div>
        <div className="space-y-4">
          {questions.slice(0, 5).map((q, i) => (
            <div key={q.id} className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/5">
              <div className="h-10 w-10 shrink-0 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 font-black text-xs ring-1 ring-violet-500/20">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">{q.label || `Question ${i + 1}`}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {q.type === 'radio' ? q.options[i % q.options.length] || 'Sample response'
                    : q.type === 'rating' ? `Rating: ${(i % 5) + 6}/10`
                    : q.type === 'video' ? 'testimonial_video_node_001.mp4'
                    : q.type === 'image' ? 'screenshot_evidence_001.png'
                    : q.type === 'file' ? 'annual_report_q1_2026.pdf'
                    : 'Sample text response from respondent node...'}
                </p>
              </div>
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">Captured</span>
            </div>
          ))}
          {questions.length > 5 && (
            <p className="text-center text-slate-600 text-xs font-mono py-2">+{questions.length - 5} more questions in production view</p>
          )}
          {questions.length === 0 && (
            <p className="text-center text-slate-600 text-sm py-8">No questions added — add questions to see the simulated report.</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-2xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm font-bold transition"
        >
          ← Edit Assessment
        </button>
        <button className="px-10 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black uppercase tracking-widest transition shadow-xl shadow-blue-600/30 active:scale-95">
          Share Live Link →
        </button>
      </div>
    </div>
  );
}
