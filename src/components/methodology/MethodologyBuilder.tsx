'use client';
import React, { useState } from 'react';
import { BeakerIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Methodology {
  id: number;
  name: string;
  type: string;
  status: string;
}

interface MethodologyBuilderProps {
  onEdit: (m: Methodology) => void;
  onAdd: () => void;
}

const MethodologyBuilder = ({ onEdit, onAdd }: MethodologyBuilderProps) => {
  const [activities, setActivities] = useState<Methodology[]>([
    { id: 1, name: '12-Point Sales Funnel', type: 'Lead Gen', status: 'Active' },
    { id: 2, name: 'Brand Sentiment Analysis', type: 'Research', status: 'Draft' }
  ]);

  const handleStateToggle = (id: number) => {
    setActivities(prev => prev.map(act => 
      act.id === id ? { ...act, status: act.status === 'Active' ? 'Draft' : 'Active' } : act
    ));
    alert('Methodology Status Updated: InsightFlow Logic Node Re-seeded.');
  };

  return (
    <div className="p-8 rounded-[40px] border border-white/10 bg-slate-950/40 backdrop-blur-3xl shadow-2xl transition hover:shadow-blue-500/10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">Methodology Library</h2>
          <p className="text-slate-500 text-sm mt-1">Deploy world-class analytical flows to your assessment cluster.</p>
        </div>
        <button onClick={onAdd} 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20">
          + Add Framework
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activities.map((act) => (
          <div key={act.id} className="group p-6 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                <BeakerIcon className="h-6 w-6" />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleStateToggle(act.id); }}
                className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-black ${act.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'}`}>
                {act.status}
              </button>
            </div>
            <h3 className="text-white font-bold text-xl mb-1">{act.name}</h3>
            <p className="text-slate-500 text-xs mb-6 font-mono uppercase tracking-tighter">Logic: Recursive Branching • Type: {act.type}</p>
            <div className="flex gap-4">
              <button onClick={() => onEdit(act)} className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                <AdjustmentsHorizontalIcon className="h-4 w-4" /> Edit Methodology
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MethodologyBuilder;
