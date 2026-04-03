'use client';
import React, { useState } from 'react';
import { ChartBarIcon, DocumentTextIcon, VideoCameraIcon, PhotoIcon, PlusIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Pre-configured 10 Surveys for the new user
const initialSurveys = Array.from({ length: 10 }, (_, i) => ({
  id: `srv-${i + 1}`,
  title: i === 0 ? 'Enterprise Sales Funnel (New Framework)' : `Customer Discovery Phase ${i + 1}`,
  responses: i === 0 ? 0 : Math.floor(Math.random() * 200),
  status: i === 0 ? 'Active' : 'Draft',
  kpi: i === 0 ? '--' : (Math.random() * 10).toFixed(1)
}));

export default function BusinessDashboard() {
  const [surveys] = useState(initialSurveys);

  return (
    <main className="dark min-h-screen bg-slate-950 p-12 text-white font-sans antialiased bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-slate-950">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400"><SparklesIcon className="h-4 w-4" /></div>
               <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">New Organization Dashboard</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
               Welcome, Acme Corp.
            </h1>
            <p className="text-slate-500 max-w-xl text-lg font-medium">Your InsightFlow cluster is fully provisioned with the 12-Point Methodology framework.</p>
          </div>
          
          <button className="px-10 py-5 rounded-3xl bg-blue-600 hover:bg-blue-500 text-sm font-black uppercase tracking-widest transition shadow-2xl shadow-blue-600/30 active:scale-95 flex items-center gap-3">
             <PlusIcon className="h-5 w-5" /> Deploy New Assessment
          </button>
        </header>

        {/* FEATURED: THE NEW HEAVY FRAMEWORK (25Q, 5I, 5V) */}
        <section className="mb-20">
           <div className="relative group rounded-[40px] border border-blue-500/30 bg-blue-600/5 p-12 backdrop-blur-3xl ring-1 ring-blue-500/50 shadow-blue-500/5 transition hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><ChartBarIcon className="h-64 w-64 text-blue-500" /></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                 <div>
                    <h2 className="text-4xl font-black mb-6">Master Sales Funnel Framework<br/><span className="text-blue-400">V1.2 Adaptive Flow</span></h2>
                    <div className="flex gap-4 mb-10">
                       <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold">
                          <DocumentTextIcon className="h-4 w-4 text-blue-400" /> 25 Questions
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold">
                          <PhotoIcon className="h-4 w-4 text-emerald-400" /> 5 Image Prompts
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold">
                          <VideoCameraIcon className="h-4 w-4 text-purple-400" /> 5 Video Logic Nodes
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <Link href="/assessment/demo" className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition">
                          View Live Survey Engine
                       </Link>
                       <button className="px-8 py-4 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest text-slate-300 hover:bg-white/5">
                          Edit Schema Settings
                       </button>
                    </div>
                 </div>
                 
                 <div className="bg-slate-950/40 border border-white/5 rounded-[30px] p-8 backdrop-blur-md">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 border-b border-white/5 pb-4">Real-time Node Status</h4>
                    <div className="space-y-4">
                       {['Branching Logic', 'CRM Webhook Trigger', 'CDN Image Hosting'].map((node, i) => (
                         <div key={i} className="flex justify-between items-center bg-white/2 p-4 rounded-2xl border border-white/5">
                            <span className="text-sm font-bold text-slate-300">{node}</span>
                            <span className="flex items-center gap-2 text-[10px] text-emerald-400 font-black"><CheckCircleIcon className="h-4 w-4" /> ACTIVE</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 10 SURVEYS LIST */}
        <section>
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-2xl font-black tracking-tight">Your Assessments (10 Total)</h3>
             <button className="text-sm font-bold text-slate-500 hover:text-white transition">Show All Infrastructure</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((srv) => (
              <div key={srv.id} className="group p-6 rounded-3xl border border-white/10 bg-white/2 transition-all hover:bg-white/5 hover:-translate-y-1">
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-500 group-hover:text-blue-400 group-hover:border-blue-400/30 transition-all duration-500">
                       <DocumentTextIcon className="h-6 w-6" />
                    </div>
                    <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full ${srv.status === 'Active' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/30 text-slate-500'}`}>
                       {srv.status}
                    </span>
                 </div>
                 <h4 className="text-lg font-bold mb-1 truncate">{srv.title}</h4>
                 <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-6">Responses: <span className="text-white tabular-nums">{srv.responses}</span></p>
                 <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="text-left">
                       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Performance KPI</p>
                       <p className="text-lg font-black text-emerald-400">{srv.kpi}</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-slate-500 hover:text-white border border-white/5">
                          <PlusIcon className="h-5 w-5" />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
