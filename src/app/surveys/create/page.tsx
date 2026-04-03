'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import QuestionBuilder, { Question } from '@/components/surveys/QuestionBuilder';
import SurveyResultsReport from '@/components/surveys/SurveyResultsReport';
import {
  SparklesIcon, ShareIcon, GlobeAltIcon, DocumentChartBarIcon,
  CheckIcon, ArrowLeftIcon
} from '@heroicons/react/24/outline';

const STEPS = [
  { title: 'Plan & Config', subtitle: 'Plan · Client · Mimetypes', icon: GlobeAltIcon },
  { title: 'Build Questions', subtitle: 'Canvas · Branching · Types', icon: ShareIcon },
  { title: 'Methodology', subtitle: 'Framework Customization', icon: SparklesIcon },
  { title: 'Live Report', subtitle: 'Deploy & View Output', icon: DocumentChartBarIcon },
];

const PLANS = [
  { id: 'starter',   label: 'Starter Node',         price: '$29/mo',  features: ['5 Surveys', 'Text Only'] },
  { id: 'pro',       label: 'Pro Hub',               price: '$79/mo',  features: ['10 Surveys', 'Image Upload'] },
  { id: 'business',  label: 'Business Cluster',      price: '$199/mo', features: ['50 Surveys', 'File Upload'] },
  { id: 'unlimited', label: 'Enterprise Unlimited',  price: '$499/mo', features: ['Unlimited', 'Video/MP4', 'Custom Domain'] },
];

export default function CreateSurveyPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDeployed, setIsDeployed] = useState(false);

  // Step 1 — Config
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [surveyTitle, setSurveyTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [versionTag, setVersionTag] = useState('v1.0');
  const [allowVideo, setAllowVideo] = useState(false);
  const [allowImage, setAllowImage] = useState(true);
  const [allowFile, setAllowFile] = useState(true);

  // Step 2 — Questions
  const [questions, setQuestions] = useState<Question[]>([]);

  // Step 3 — Methodology
  const [framework, setFramework] = useState('12-Point Sales Funnel');
  const [frameworkVersion, setFrameworkVersion] = useState('v2.4');

  // Deploy
  const [isDeploying, setIsDeploying] = useState(false);

  const videoUnlocked = selectedPlan === 'unlimited';

  const handleDeploy = async () => {
    if (!surveyTitle.trim()) {
      alert('Please enter a survey title before going live.');
      return;
    }
    setIsDeploying(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsDeploying(false);
    setIsDeployed(true);
    setActiveStep(3);
  };

  if (isDeployed) {
    return (
      <main className="dark min-h-screen bg-slate-950 text-white antialiased bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-black p-8 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <button onClick={() => setIsDeployed(false)} className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition">
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-black tracking-tight">Assessment Output Report</h1>
          </div>
          <SurveyResultsReport
            surveyTitle={surveyTitle}
            client={clientName || 'No Client Assigned'}
            version={versionTag}
            plan={selectedPlan}
            questions={questions}
            allowVideo={allowVideo && videoUnlocked}
            onReset={() => { setIsDeployed(false); setActiveStep(1); }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="dark min-h-screen bg-slate-950 text-white antialiased bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-slate-950 pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-14">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/" className="text-slate-500 hover:text-white transition text-sm font-medium flex items-center gap-1.5">
                <ArrowLeftIcon className="h-4 w-4" /> Dashboard
              </Link>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Create New Assessment</h1>
            <p className="text-slate-500 text-sm mt-1">Build, configure, and deploy a versioned survey for your client.</p>
          </div>
          <button
            disabled={isDeploying || !surveyTitle.trim()}
            onClick={handleDeploy}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-white text-sm uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/30 active:scale-95 disabled:opacity-40 flex items-center gap-2"
          >
            {isDeploying ? (
              <><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Deploying…</>
            ) : (
              <><CheckIcon className="h-4 w-4" /> Go Live</>
            )}
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex gap-3 mb-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex-1 p-4 rounded-2xl border text-left transition-all ${active ? 'border-blue-500/50 bg-blue-500/8 shadow-lg shadow-blue-500/10' : done ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/8 bg-white/2 opacity-60 hover:opacity-80'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${active ? 'bg-blue-600/20 text-blue-400' : done ? 'bg-emerald-600/20 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                    {done ? <CheckIcon className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Step 0{i + 1}</p>
                    <p className="text-sm font-bold text-white leading-tight">{step.title}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── STEP 0: Config ── */}
            {activeStep === 0 && (
              <div className="space-y-6 p-8 rounded-[32px] border border-white/10 bg-white/2 backdrop-blur-xl">
                <h2 className="text-xl font-black text-white">Assessment Configuration</h2>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Survey Title *</label>
                  <input
                    value={surveyTitle}
                    onChange={e => setSurveyTitle(e.target.value)}
                    placeholder="e.g. Q2 Customer Discovery — Dubai Retail"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium focus:outline-none focus:border-blue-500/50 placeholder:text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Client / Company</label>
                    <input
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="e.g. Global Retail LLC"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Version Tag</label>
                    <input
                      value={versionTag}
                      onChange={e => setVersionTag(e.target.value)}
                      placeholder="v1.0"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Node Subscription Plan</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PLANS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedPlan(p.id); if (p.id !== 'unlimited') setAllowVideo(false); }}
                        className={`p-5 rounded-2xl border text-left transition-all ${selectedPlan === p.id ? 'border-blue-500/50 bg-blue-500/8' : 'border-white/8 bg-white/2 hover:border-white/15'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold text-white">{p.label}</span>
                          {selectedPlan === p.id && <CheckIcon className="h-4 w-4 text-blue-400 shrink-0" />}
                        </div>
                        <p className="text-blue-400 font-mono text-xs mb-2">{p.price}</p>
                        {p.features.map(f => (
                          <p key={f} className="text-[10px] text-slate-500 font-mono">· {f}</p>
                        ))}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mimetype Toggles */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Accepted Mimetypes</label>
                  <div className="space-y-3">
                    {[
                      { key: 'image', label: 'Image Capture (JPG, PNG, WebP)', value: allowImage, set: setAllowImage, lock: false },
                      { key: 'file',  label: 'Document Upload (PDF, DOCX, CSV)', value: allowFile, set: setAllowFile, lock: false },
                      { key: 'video', label: 'Video Testimonials (MP4, MOV)', value: allowVideo && videoUnlocked, set: (v: boolean) => { if (videoUnlocked) setAllowVideo(v); }, lock: !videoUnlocked },
                    ].map(m => (
                      <div key={m.key} className="flex items-center justify-between px-5 py-4 rounded-2xl border border-white/8 bg-black/30">
                        <div>
                          <p className="text-sm font-bold text-white">{m.label}</p>
                          {m.lock && <p className="text-[10px] text-amber-400 font-mono mt-0.5">Requires Enterprise Unlimited plan</p>}
                        </div>
                        <button
                          disabled={m.lock}
                          onClick={() => m.set(!m.value)}
                          className={`w-12 h-6 rounded-full transition-all relative p-0.5 ${m.value ? 'bg-emerald-600' : 'bg-slate-700'} ${m.lock ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${m.value ? 'translate-x-6' : ''}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={() => setActiveStep(1)} className="w-full py-4 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-600/30 transition text-sm">
                  Next: Build Questions →
                </button>
              </div>
            )}

            {/* ── STEP 1: Questions ── */}
            {activeStep === 1 && (
              <div className="p-8 rounded-[32px] border border-white/10 bg-white/2 backdrop-blur-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-black text-white">Question Canvas</h2>
                  <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-widest">
                    Survey: <span className="text-blue-400">{surveyTitle || 'Untitled'}</span>
                    {' '}· Client: <span className="text-emerald-400">{clientName || 'None'}</span>
                    {' '}· <span className="text-slate-400">{versionTag}</span>
                  </p>
                </div>
                <QuestionBuilder
                  questions={questions}
                  onChange={setQuestions}
                  allowVideo={allowVideo && videoUnlocked}
                />
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setActiveStep(0)} className="flex-1 py-3 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition font-bold text-sm">← Back</button>
                  <button onClick={() => setActiveStep(2)} className="flex-1 py-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-600/30 transition text-sm">Next: Methodology →</button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Methodology ── */}
            {activeStep === 2 && (
              <div className="p-8 rounded-[32px] border border-white/10 bg-white/2 backdrop-blur-xl space-y-6">
                <h2 className="text-xl font-black text-white">Framework Customization</h2>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Scoring Methodology</label>
                  <select
                    value={framework}
                    onChange={e => setFramework(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 text-white text-sm font-bold p-4 rounded-2xl focus:outline-none focus:ring-1 ring-blue-500"
                  >
                    <option>12-Point Sales Funnel</option>
                    <option>Brand Sentiment Analysis</option>
                    <option>Custom Framework</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Framework Version</label>
                  <input
                    value={frameworkVersion}
                    onChange={e => setFrameworkVersion(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div className="p-5 rounded-2xl border border-violet-500/20 bg-violet-500/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-2">Scoring Engine Preview</p>
                  <p className="text-slate-300 text-sm">Responses to your <strong>{questions.length}</strong> questions will be processed through the <strong>{framework}</strong> ({frameworkVersion}) engine, producing a stage classification and score breakdown for each submission.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveStep(1)} className="flex-1 py-3 rounded-2xl border border-white/10 text-slate-400 hover:text-white transition font-bold text-sm">← Back</button>
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying || !surveyTitle.trim()}
                    className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition shadow-xl shadow-blue-600/30 active:scale-95 disabled:opacity-40 text-sm flex items-center justify-center gap-2"
                  >
                    {isDeploying ? (
                      <><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Deploying…</>
                    ) : (
                      <><CheckIcon className="h-4 w-4" /> Deploy & Generate Report</>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Summary */}
            <div className="p-6 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Assessment Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Title</span>
                  <span className="text-white font-medium truncate max-w-[140px]">{surveyTitle || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Client</span>
                  <span className="text-white font-medium">{clientName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Version</span>
                  <span className="text-blue-400 font-mono text-xs">{versionTag}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan</span>
                  <span className="text-emerald-400 font-bold text-xs uppercase">{PLANS.find(p => p.id === selectedPlan)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Questions</span>
                  <span className="text-white font-bold">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Video Capture</span>
                  <span className={allowVideo && videoUnlocked ? 'text-emerald-400 font-bold text-xs' : 'text-slate-600 text-xs'}>{allowVideo && videoUnlocked ? 'ENABLED' : 'Disabled'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Framework</span>
                  <span className="text-violet-400 text-xs font-mono">{framework}</span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-6 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Quick Access</h4>
              <Link href="/billing" className="block text-sm text-blue-400 hover:text-white transition font-medium py-2 border-b border-white/5">Upgrade Plan →</Link>
              <Link href="/" className="block text-sm text-slate-400 hover:text-white transition font-medium py-2 border-b border-white/5">Back to Dashboard →</Link>
              <Link href="/compliance" className="block text-sm text-slate-400 hover:text-white transition font-medium py-2">Compliance & Audit →</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
