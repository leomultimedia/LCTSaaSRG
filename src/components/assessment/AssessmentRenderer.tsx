'use client';
import React, { useState } from 'react';
import { AssessmentSchema, Question } from '@/domain/entities/Assessment';
import { CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AssessmentRendererProps {
  schema: AssessmentSchema;
  onSubmit: (responses: Record<string, any>) => void;
}

export default function AssessmentRenderer({ schema, onSubmit }: AssessmentRendererProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (questionId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    // Basic logic processing (e.g. branch skipping) goes here
    const currentQuestion = schema.questions[currentStep];
    
    // Evaluate simple skip logic based on the schema if it exists here
    if (currentQuestion.logic) {
      for (const rule of currentQuestion.logic) {
        if (rule.condition === 'equals' && responses[currentQuestion.id] === rule.value) {
           if (rule.action === 'skip_to') {
              const targetIndex = schema.questions.findIndex(q => q.id === rule.targetQuestionId);
              if (targetIndex !== -1) {
                setCurrentStep(targetIndex);
                return;
              }
           }
        }
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, schema.questions.length - 1));
  };

  const currentQuestion = schema.questions[currentStep];

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">{schema.title}</h2>
        <p className="mt-2 text-slate-400">{schema.description}</p>
        <div className="mt-4 flex gap-2">
           {schema.questions.map((_, i) => (
             <div key={i} className={`h-1 flex-1 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-white/10'}`} />
           ))}
        </div>
      </div>

      <div className="space-y-6">
        <label className="block text-xl font-medium text-white">
          {currentQuestion.label}
          {currentQuestion.required && <span className="text-rose-400 ml-1">*</span>}
        </label>

        {currentQuestion.type === 'text' && (
          <input
            type="text"
            className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 backdrop-blur-md"
            placeholder="Type your answer here..."
            value={responses[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
          />
        )}

        {currentQuestion.type === 'choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange(currentQuestion.id, option)}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                  responses[currentQuestion.id] === option 
                    ? 'border-blue-500 bg-blue-500/20 text-white' 
                    : 'border-white/10 bg-black/30 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {responses[currentQuestion.id] === option && <CheckCircleIcon className="h-6 w-6 text-blue-400" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {(currentQuestion.type === 'image' || currentQuestion.type === 'video') && (
          <div className="flex justify-center rounded-2xl border-2 border-dashed border-white/20 px-6 py-12 bg-black/20 hover:bg-white/5 transition">
            <div className="text-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-slate-400 justify-center">
                <label className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-300 focus-within:outline-none">
                  <span>Upload a {currentQuestion.type}</span>
                  <input type="file" className="sr-only" onChange={(e) => {
                     // Need real upload interface connected to Supabase storage.
                     if (e.target.files && e.target.files[0]) {
                        handleInputChange(currentQuestion.id, e.target.files[0].name);
                     }
                  }} />
                </label>
              </div>
              <p className="text-xs text-slate-500 mt-2">Up to 50MB</p>
              {responses[currentQuestion.id] && (
                 <p className="text-emerald-400 mt-4 text-sm break-all font-mono">
                    <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                    {responses[currentQuestion.id]} staged for upload.
                 </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-end">
        {currentStep < schema.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={currentQuestion.required && !responses[currentQuestion.id]}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={() => onSubmit(responses)}
            disabled={currentQuestion.required && !responses[currentQuestion.id]}
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
}
