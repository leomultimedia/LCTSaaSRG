'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, ChartBarSquareIcon, GlobeAltIcon, SparklesIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

const features = [
  { name: '12-Point Logic Funnel', desc: 'Enterprise-grade sales methodology mapping that goes beyond simple surveys.', icon: PresentationChartLineIcon },
  { name: 'Multimodal Research', desc: 'Native support for 25+ question types including high-fidelity Video and AI Image analysis.', icon: SparklesIcon },
  { name: 'Compliance By Design', desc: 'Full GDPR "Right to be Forgotten" and multi-tenant sub-user isolation.', icon: ShieldCheckIcon },
  { name: 'SSO & AD Native', desc: 'Sync your entire enterprise cluster with Active Directory or SAML 2.0.', icon: GlobeAltIcon },
];

export default function LandingPage() {
  return (
    <main className="dark min-h-screen bg-slate-950 font-sans antialiased text-white">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-3xl border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">InsightFlow</div>
          <div className="flex gap-10 items-center">
             <a href="#features" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition">Solution</a>
             <a href="#enterprise" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition">Enterprise</a>
             <Link href="/auth/login" className="px-6 py-2.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition">
                Access Node
             </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-10">
             Next-Gen Enterprise Analytics
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-tight mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
             Research That Thinks. <br/> Surveys That Scaled.
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
             InsightFlow is the world's first adaptive methodology engine for high-performance sales clusters. Provision 100+ surveys in minutes with ISO-grade security.
          </p>
          <div className="flex gap-6 justify-center">
             <Link href="/auth/signup" className="px-10 py-5 rounded-3xl bg-blue-600 text-sm font-black uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition transform hover:scale-105 active:scale-95">
                Join our Global Cluster
             </Link>
             <button className="px-10 py-5 rounded-3xl bg-white/5 border border-white/10 text-sm font-black uppercase tracking-widest hover:bg-white/10 transition">
                Watch Commercial
             </button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feat) => {
             const Icon = feat.icon;
             return (
               <div key={feat.name} className="group p-8 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 transition duration-500">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-8 inline-block group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-500">
                     <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feat.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
               </div>
             );
          })}
        </div>
      </section>

      {/* SOCIAL PROOF / KPI PREVIEW */}
      <section className="py-32 bg-white/2 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-5xl font-black mb-8 leading-tight">Insight-Driven Results for <span className="text-blue-400">Dubai's Smartest</span> Teams.</h2>
              <p className="text-slate-400 mb-12">We don't just collect data. We orchestrate it through ISO-compliant methodology logic to ensure 100% accuracy in customer sentiment profiling.</p>
              <div className="space-y-6">
                 <div className="flex gap-4 items-center">
                    <div className="h-1 bg-blue-500 w-12 rounded-full" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">92% Average NPS Score Improvements</span>
                 </div>
                 <div className="flex gap-4 items-center">
                    <div className="h-1 bg-emerald-500 w-12 rounded-full" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">300% Faster Funnel Mapping Execution</span>
                 </div>
              </div>
           </div>
           
           <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl opacity-30 -z-10" />
              <div className="rounded-[40px] border border-white/10 bg-slate-950/80 p-10 backdrop-blur-3xl shadow-2xl">
                 <div className="flex gap-2 mb-8">
                    <div className="h-3 w-3 rounded-full bg-rose-500/20 border border-rose-500/30" />
                    <div className="h-3 w-3 rounded-full bg-orange-500/20 border border-orange-500/30" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                 </div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-2 font-mono">Simulated Research Node 0x42</h4>
                 <div className="h-4 w-full bg-white/5 rounded-full mb-4 overflow-hidden">
                    <div className="h-full w-2/3 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse" />
                 </div>
                 <p className="text-[10px] text-slate-500">Orchestrating 25-Point methodology logic across 10 global clusters...</p>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">InsightFlow Enterprise © 2026 • Sovereign Research Intelligence</p>
      </footer>
    </main>
  );
}
