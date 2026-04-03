'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MethodologyBuilder from '@/components/methodology/MethodologyBuilder';
import MethodologyCanvas from '@/components/methodology/MethodologyCanvas';
import ComplianceMonitor from '@/components/compliance/ComplianceMonitor';
import RealtimeTraffic from '@/components/dashboard/RealtimeTraffic';
import { AnalyticsService } from '@/domain/services/AnalyticsService';
import SimulationDashboard from '@/components/testing/SimulationDashboard';
import { ChartBarIcon, UsersIcon, CurrencyDollarIcon, LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function Home() {
  const [activeMethodology, setActiveMethodology] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for initial world-class dashboard rendering
  const metrics = {
    cltv: 12400,
    nps: 72,
    arpu: 89,
    churnRate: 2.1
  };
  
  const suggestions = AnalyticsService.generateSuggestions(metrics);

  const handleEdit = (m: any) => {
    setActiveMethodology(m);
    setIsEditing(true);
    // Smooth scroll to canvas
    setTimeout(() => {
      document.getElementById('logic-canvas')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (stages: any) => {
    alert(`Success! Methodology '${activeMethodology?.name || 'New'}' logic has been re-synced to the Dubai node.`);
    setIsEditing(false);
    setActiveMethodology(null);
  };

  return (
    <main className="dark min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-8 text-white space-y-12 antialiased">

      <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-emerald-400">
            InsightFlow
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Enterprise Orchestration for High-Performance Surveys</p>
          
          <nav className="mt-8 flex gap-8 items-center border-t border-white/5 pt-4">
             <Link href="/" className="text-sm font-bold text-blue-400 border-b-2 border-blue-400 pb-1">Command Center</Link>
             <Link href="/surveys/create" className="text-sm font-medium text-slate-400 hover:text-white transition">Create Survey</Link>
             <Link href="/billing" className="text-sm font-medium text-slate-400 hover:text-white transition">Account & Billing</Link>
             <Link href="/integrations" className="text-sm font-medium text-slate-400 hover:text-white transition">Integrations</Link>
          </nav>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-3">
             <Link href="/assessment/demo" className="px-6 py-2.5 rounded-full bg-blue-600 font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition active:scale-95">
                Live Engine Preview
             </Link>
             <div className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                STABLE_NODE_DUBAI
             </div>
          </div>
        </div>
      </header>


      {/* KPI GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl transition hover:bg-white/10 hover:-translate-y-1 duration-300">
          <ChartBarIcon className="h-8 w-8 text-blue-500 opacity-20 absolute top-8 right-8" />
          <div className="flex items-center gap-2 mb-4">
             <h4 className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Customer Sentiment</h4>
             <span className="cursor-help w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[8px] border border-white/10" 
                   title="NPS calculation info">?</span>
          </div>
          <div className="flex items-baseline gap-3">
             <span className="text-4xl font-black tabular-nums">{metrics.nps}</span>
             <div className="px-2 py-1 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-400">+5.2%</div>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Trending toward <span className="text-white">Exceptional</span> loyalty bracket.</p>
        </div>

        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl transition hover:bg-white/10 hover:-translate-y-1 duration-300">
          <CurrencyDollarIcon className="h-8 w-8 text-emerald-500 opacity-20 absolute top-8 right-8" />
          <div className="flex items-center gap-2 mb-4">
             <h4 className="text-[10px] font-black tracking-widest text-slate-500 uppercase">LTV (Lifetime Value)</h4>
             <span className="cursor-help w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[8px] border border-white/10" title="CLTV info">?</span>
          </div>
          <div className="flex items-baseline gap-3">
             <span className="text-4xl font-black tabular-nums">${(metrics.cltv / 1000).toFixed(1)}k</span>
             <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-400">STABLE</div>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">LTV/CAC ratio is <span className="text-emerald-400 font-bold">3.2</span> (Optimal).</p>
        </div>

        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl transition hover:bg-white/10 hover:-translate-y-1 duration-300">
          <UsersIcon className="h-8 w-8 text-purple-500 opacity-20 absolute top-8 right-8" />
          <div className="flex items-center gap-2 mb-4">
             <h4 className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Revenue / User</h4>
             <span className="cursor-help w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[8px] border border-white/10" title="ARPU info">?</span>
          </div>
          <div className="flex items-baseline gap-3">
             <span className="text-4xl font-black tabular-nums">${metrics.arpu}</span>
             <div className="px-2 py-1 rounded bg-blue-500/10 text-[10px] font-bold text-blue-400">+12%</div>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Driven by <span className="text-white">Pro Tier</span> upgrades.</p>
        </div>

        <div className="group relative rounded-3xl border border-blue-500/30 bg-blue-600/5 p-8 backdrop-blur-3xl ring-1 ring-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 rounded-lg bg-blue-500/20"><LightBulbIcon className="h-4 w-4 text-blue-400" /></div>
             <h4 className="text-xs font-bold text-blue-400 uppercase tracking-tighter">Strategic Actions</h4>
          </div>
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[10px] leading-snug text-slate-300 border-l border-blue-500/40 pl-3">
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <RealtimeTraffic />
         <ComplianceMonitor />
      </div>

      <section>
        <MethodologyBuilder onEdit={handleEdit} onAdd={() => handleEdit({ id: Date.now(), name: 'New Analytic Framework' })} />
      </section>

      {isEditing && (
        <section id="logic-canvas" className="animate-in fade-in slide-in-from-bottom-10 duration-700">
          <MethodologyCanvas 
            methodology={activeMethodology} 
            onSave={handleSave} 
            onCancel={() => { setIsEditing(false); setActiveMethodology(null); }} 
          />
        </section>
      )}

      <section className="pb-24">
        <SimulationDashboard />
      </section>
      
    </main>

  );
}
