'use client';
import React, { useState } from 'react';
import {
  PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon,
  DocumentTextIcon, ListBulletIcon, CheckIcon,
  StarIcon, VideoCameraIcon, PhotoIcon, PaperClipIcon,
  Bars3Icon, AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'rating' | 'video' | 'image' | 'file';

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  options: string[]; // for radio/checkbox
  helpText: string;
  branchTo?: string; // question id to jump to
  mimetypes?: string[]; // accepted file types
}

interface QuestionBuilderProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
  allowVideo?: boolean;
}

const QUESTION_TYPES: { type: QuestionType; label: string; icon: React.ElementType; color: string }[] = [
  { type: 'text',     label: 'Short Text',   icon: DocumentTextIcon,  color: 'blue' },
  { type: 'textarea', label: 'Long Text',    icon: Bars3Icon,          color: 'indigo' },
  { type: 'radio',    label: 'Single Choice',icon: ListBulletIcon,     color: 'violet' },
  { type: 'checkbox', label: 'Multi Choice', icon: CheckIcon,          color: 'purple' },
  { type: 'rating',   label: 'Rating Scale', icon: StarIcon,           color: 'amber' },
  { type: 'video',    label: 'Video Upload', icon: VideoCameraIcon,    color: 'rose' },
  { type: 'image',    label: 'Image Upload', icon: PhotoIcon,          color: 'emerald' },
  { type: 'file',     label: 'Document',     icon: PaperClipIcon,      color: 'slate' },
];

const MIMETYPE_MAP: Record<QuestionType, string[]> = {
  video:    ['video/mp4', 'video/quicktime', 'video/webm'],
  image:    ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  file:     ['.pdf', '.docx', '.xlsx', '.pptx', '.csv'],
  text:     [],
  textarea: [],
  radio:    [],
  checkbox: [],
  rating:   [],
};

const uid = () => Math.random().toString(36).slice(2, 9);

const blankQuestion = (type: QuestionType = 'text'): Question => ({
  id: uid(),
  type,
  label: '',
  required: false,
  options: type === 'radio' || type === 'checkbox' ? ['Option A', 'Option B'] : [],
  helpText: '',
  mimetypes: MIMETYPE_MAP[type],
});

export default function QuestionBuilder({ questions, onChange, allowVideo = true }: QuestionBuilderProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const addQuestion = (type: QuestionType) => {
    const q = blankQuestion(type);
    onChange([...questions, q]);
    setExpandedId(q.id);
    setShowTypePicker(false);
  };

  const removeQuestion = (id: string) => {
    onChange(questions.filter(q => q.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const moveQuestion = (idx: number, dir: -1 | 1) => {
    const arr = [...questions];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    onChange(arr);
  };

  const updateQuestion = (id: string, patch: Partial<Question>) => {
    onChange(questions.map(q => q.id === id ? { ...q, ...patch } : q));
  };

  const addOption = (id: string) => {
    const q = questions.find(q => q.id === id)!;
    updateQuestion(id, { options: [...q.options, `Option ${q.options.length + 1}`] });
  };

  const updateOption = (qId: string, idx: number, val: string) => {
    const q = questions.find(q => q.id === qId)!;
    const opts = [...q.options];
    opts[idx] = val;
    updateQuestion(qId, { options: opts });
  };

  const removeOption = (qId: string, idx: number) => {
    const q = questions.find(q => q.id === qId)!;
    updateQuestion(qId, { options: q.options.filter((_, i) => i !== idx) });
  };

  const validTypes = QUESTION_TYPES.filter(t => allowVideo || t.type !== 'video');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-black text-white">Question Canvas</h3>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-0.5">
            {questions.length} Question{questions.length !== 1 ? 's' : ''} · Drag to reorder
          </p>
        </div>
        <button
          onClick={() => setShowTypePicker(!showTypePicker)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest transition active:scale-95 shadow-lg shadow-blue-600/30"
        >
          <PlusIcon className="h-4 w-4" /> Add Question
        </button>
      </div>

      {/* Type Picker */}
      {showTypePicker && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl">
          {validTypes.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.type}
                onClick={() => addQuestion(t.type)}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/8 hover:border-white/15 transition group text-left"
              >
                <div className={`p-2 rounded-xl bg-${t.color}-500/10 text-${t.color}-400 group-hover:bg-${t.color}-500/20 transition`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition">{t.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {questions.length === 0 && (
        <div className="py-16 text-center border-2 border-dashed border-white/8 rounded-[28px]">
          <AdjustmentsHorizontalIcon className="h-10 w-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No questions yet.</p>
          <p className="text-slate-600 text-xs mt-1">Click <span className="text-blue-400 font-bold">+ Add Question</span> to start building.</p>
        </div>
      )}

      {/* Question Cards */}
      {questions.map((q, idx) => {
        const meta = QUESTION_TYPES.find(t => t.type === q.type)!;
        const Icon = meta.icon;
        const isExpanded = expandedId === q.id;

        return (
          <div
            key={q.id}
            className={`rounded-3xl border transition-all ${isExpanded ? 'border-blue-500/40 bg-blue-500/3' : 'border-white/8 bg-white/2 hover:border-white/12'}`}
          >
            {/* Card Header */}
            <div
              className="flex items-center gap-4 p-5 cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : q.id)}
            >
              <div className={`shrink-0 h-10 w-10 rounded-2xl bg-${meta.color}-500/10 flex items-center justify-center text-${meta.color}-400 border border-${meta.color}-500/20`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">
                  {q.label || <span className="text-slate-500 italic">Untitled question…</span>}
                </p>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">{meta.label}{q.required ? ' · Required' : ''}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={e => { e.stopPropagation(); moveQuestion(idx, -1); }} className="p-1.5 rounded-xl text-slate-600 hover:text-white hover:bg-white/8 transition"><ChevronUpIcon className="h-4 w-4" /></button>
                <button onClick={e => { e.stopPropagation(); moveQuestion(idx, 1); }} className="p-1.5 rounded-xl text-slate-600 hover:text-white hover:bg-white/8 transition"><ChevronDownIcon className="h-4 w-4" /></button>
                <button onClick={e => { e.stopPropagation(); removeQuestion(q.id); }} className="p-1.5 rounded-xl text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition"><TrashIcon className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Expanded Editor */}
            {isExpanded && (
              <div className="px-5 pb-6 space-y-5 border-t border-white/5 pt-5">

                {/* Label */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Question Label *</label>
                  <input
                    type="text"
                    value={q.label}
                    onChange={e => updateQuestion(q.id, { label: e.target.value })}
                    placeholder="e.g. What is your monthly revenue?"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm font-medium focus:outline-none focus:border-blue-500/50 placeholder:text-slate-600"
                  />
                </div>

                {/* Help Text */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Help Text (Optional)</label>
                  <input
                    type="text"
                    value={q.helpText}
                    onChange={e => updateQuestion(q.id, { helpText: e.target.value })}
                    placeholder="Additional guidance for respondents…"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-slate-400 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-slate-700"
                  />
                </div>

                {/* Options for radio/checkbox */}
                {(q.type === 'radio' || q.type === 'checkbox') && (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Answer Options</label>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-3">
                          <div className={`shrink-0 h-4 w-4 border border-white/20 ${q.type === 'radio' ? 'rounded-full' : 'rounded'}`} />
                          <input
                            type="text"
                            value={opt}
                            onChange={e => updateOption(q.id, oi, e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/40"
                          />
                          <button onClick={() => removeOption(q.id, oi)} className="text-slate-600 hover:text-rose-400 transition p-1">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(q.id)}
                        className="flex items-center gap-2 text-xs text-blue-400 hover:text-white transition font-bold mt-2 px-3 py-2 rounded-xl hover:bg-blue-500/10"
                      >
                        <PlusIcon className="h-3.5 w-3.5" /> Add Option
                      </button>
                    </div>
                  </div>
                )}

                {/* Rating preview */}
                {q.type === 'rating' && (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Rating Scale (1–10)</label>
                    <div className="flex gap-2">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 text-xs font-bold">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Upload placeholder */}
                {(q.type === 'video' || q.type === 'image' || q.type === 'file') && (
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/2">
                    <Icon className="h-10 w-10 mx-auto text-slate-600 mb-2" />
                    <p className="text-slate-400 text-sm font-medium">Accepted types:</p>
                    <p className="text-[10px] font-mono text-blue-400 mt-1">{q.mimetypes?.join(', ')}</p>
                    {q.type === 'video' && (
                      <p className="text-[10px] text-slate-600 mt-2 font-mono uppercase">Max file size: 500MB · Encoded to H.264 on upload</p>
                    )}
                  </div>
                )}

                {/* Branching */}
                {questions.length > 1 && (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Branch Logic: Jump To</label>
                    <select
                      value={q.branchTo || ''}
                      onChange={e => updateQuestion(q.id, { branchTo: e.target.value || undefined })}
                      className="w-full bg-slate-800 border border-white/10 text-white text-xs font-bold p-3 rounded-xl focus:outline-none focus:ring-1 ring-blue-500"
                    >
                      <option value="">Linear (Next Question)</option>
                      {questions.filter(other => other.id !== q.id).map(other => (
                        <option key={other.id} value={other.id}>
                          → {other.label || `Question ${questions.indexOf(other) + 1}`}
                        </option>
                      ))}
                      <option value="__end__">→ End of Survey</option>
                    </select>
                  </div>
                )}

                {/* Required toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs text-slate-400 font-bold">Required Field</span>
                  <button
                    onClick={() => updateQuestion(q.id, { required: !q.required })}
                    className={`w-12 h-6 rounded-full transition-all relative p-0.5 ${q.required ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${q.required ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
