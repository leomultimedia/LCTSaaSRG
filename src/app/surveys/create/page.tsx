'use client';
import React, { useState } from 'react';
import MethodologyBuilder from '@/components/methodology/MethodologyBuilder';
import { SparklesIcon, ShareIcon, GlobeAltIcon, HashtagIcon } from '@heroicons/react/24/outline';

export default function CreateSurveyPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Define Logic', subtitle: 'Methodology Framework', icon: SparklesIcon },
    { title: 'Build Questions', subtitle: 'Visual Flow & Branching', icon: ShareIcon },
    { title: 'Integration', subtitle: 'CRM & Social Media Routing', icon: GlobeAltIcon },
    { title: 'Review & Live', subtitle: 'Metadata & Social Snippets', icon: HashtagIcon }
  ];

  return (
    <main className="dark min-h-screen bg-slate-950 p-8 pt-20 text-white font-sans antialiased bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-slate-950">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-4">Create New Assessment</h1>
          <div className="flex gap-4">
             {steps.map((step, i) => {
               const Icon = step.icon;
               return (
                 <div key={i} className={`flex-1 p-4 rounded-2xl border transition-all ${i === activeStep ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-white/2 opacity-50'}`}>
                    <div className="flex items-center gap-3">
                       <Icon className={`h-6 w-6 ${i === activeStep ? 'text-blue-500' : 'text-slate-400'}`} />
                       <div className="text-left">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Step 0{i + 1}</p>
                          <h4 className="text-sm font-bold">{step.title}</h4>
                       </div>
                    </div>
                 </div>
               );
             })}
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <MethodologyBuilder />
              
              <div className="bg-white/5 rounded-3xl border border-white/10 p-12 text-center border-dashed">
                 <p className="text-slate-500 text-sm">Question Builder & Canvas module will render here.</p>
              </div>

              <div className="flex justify-between items-center bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-3xl sticky bottom-8">
                 <button className="text-sm font-bold text-slate-400 hover:text-white transition">Cancel & Exit</button>
                 <button onClick={() => setActiveStep(prev => prev + 1)} className="px-8 py-3 rounded-full bg-blue-600 font-bold hover:bg-blue-500 shadow-xl shadow-blue-600/30">
                    Next: Question Flow
                 </button>
              </div>
           </div>

           <aside className="space-y-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                 <h4 className="text-sm font-bold text-blue-400 mb-2 uppercase">Live Preview (Social Meta)</h4>
                 <div className="rounded-xl bg-slate-900 border border-white/5 overflow-hidden">
                    <div className="h-40 bg-slate-800 animate-pulse flex items-center justify-center text-[10px] uppercase font-mono text-slate-600">Dynamic Social Thumbnail</div>
                    <div className="p-4">
                       <h5 className="font-bold text-sm">How to scale 10X in Dubai?</h5>
                       <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Take the InsightFlow assessment and get your custom sales funnel roadmap immediately.</p>
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-blue-500/5 ring-1 ring-blue-500/20">
                 <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase">Integration Sync Status</h4>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">HubSpot CRM</span>
                       <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px]">CONNECTED</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">LinkedIn Tagging</span>
                       <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px]">PENDING</span>
                    </div>
                 </div>
              </div>
           </aside>
        </section>
      </div>
    </main>
  );
}
