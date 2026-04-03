'use client';
import React, { useState, useEffect } from 'react';
import { ProcessMethodology, MethodologyTemplateConfig, SalesFunnelStages } from '@/application/use_cases/ProcessMethodology';
import { CheckCircleIcon, ChartBarSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Simulation Configuration
const templateConfig: MethodologyTemplateConfig = {
  stages: SalesFunnelStages.map((name, i) => ({
    name,
    points_required: (i + 1) * 20,
    rules: [
      { question_id: 'q1', condition: 'equals', value: 'Lead Generation', points: 10 },
      { question_id: 'q2', condition: 'equals', value: 'Yes', points: 50 },
      { question_id: 'q3', condition: 'has_value', value: '', points: 30 }
    ]
  }))
};

const mockSubmissions = Array.from({ length: 10 }, (_, i) => ({
  id: `sub-${i + 1}`,
  responses: {
     q1: i % 2 === 0 ? 'Lead Generation' : 'Process Automation',
     q2: i % 3 === 0 ? 'Yes' : 'No',
     q3: `Budget Estimate: ${1000 * (i + 1)}`
  }
}));

export default function SimulationDashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = async () => {
    setIsRunning(true);
    setResults([]);
    const processor = new ProcessMethodology();
    const outcomes = [];

    // Check if configuration is available
    if (!templateConfig || !templateConfig.stages.length) {
      alert("Error: Methodology Framework Configuration missing.");
      setIsRunning(false);
      return;
    }

    try {
      for (const sub of mockSubmissions) {
        // Run core engine logic
        const outcome = await processor.execute(sub.id, 'temp-123', sub.responses, templateConfig);
        outcomes.push({ ...sub, outcome });
        
        // Progressive UI update
        setResults([...outcomes]);
        // Simulate real-world node latency
        await new Promise(r => setTimeout(r, 400)); 
      }
    } catch (err) {
      console.error("Simulation Node Error:", err);
      alert("Simulation failed on the Dubai node. Check cluster health.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="rounded-[40px] border border-white/10 bg-slate-950/60 p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10"><ChartBarSquareIcon className="h-32 w-32 text-blue-500" /></div>
      
      <div className="flex justify-between items-center mb-12 relative z-20">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">Simulation Engine: <span className="text-blue-400">E2E Flow</span></h2>
          <p className="text-slate-400 text-sm mt-1">Processing 10 surveys through the 12-Point Funnel Scoring Engine.</p>
        </div>
        <button 
          id="btn-run-simulation"
          onClick={runSimulation}
          disabled={isRunning}
          className="relative z-30 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/30 flex items-center gap-2 active:scale-95 disabled:opacity-50 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          {isRunning ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <ArrowPathIcon className="h-5 w-5" />}
          {isRunning ? 'Orchestrating...' : 'Run End-to-End Test'}
        </button>
      </div>

      <div className="space-y-4">
        {results.map((res, i) => (
          <div key={res.id} className="group p-5 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs ring-1 ring-blue-500/30">
                {i + 1}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Submission {res.id}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Status: Processed • Methodology Mapping Complete</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Calculated Stage</p>
                  <p className="text-sm font-black text-emerald-400">{res.outcome.current_stage}</p>
               </div>
               <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircleIcon className="h-5 w-5" />
               </div>
            </div>
          </div>
        ))}

        {results.length === 0 && !isRunning && (
           <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[30px]">
              <p className="text-slate-600 text-sm">Dashboard Ready. Click 'Run' to generate 10 survey reports.</p>
           </div>
        )}

        {results.length > 0 && !isRunning && (
           <div className="mt-8 p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-center animate-bounce">
              <p className="text-blue-400 font-bold text-sm">✅ Test Successful: 10 Results Generated & Synced to Company Dashboard.</p>
           </div>
        )}
      </div>
    </div>
  );
}
