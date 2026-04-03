'use client';
import React, { useState } from 'react';
import { BeakerIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const MethodologyBuilder = () => {
  const [activities] = useState([
    { id: 1, name: '12-Point Sales Funnel', type: 'Lead Gen', status: 'Active' },
    { id: 2, name: 'Brand Sentiment Analysis', type: 'Research', status: 'Draft' }
  ]);

  return (
    <div className="p-6 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Methodology Engine</h2>
          <p className="text-slate-400 text-sm">Configure custom analytical activities and research flows.</p>
        </div>
        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold transition-all transform hover:scale-105">
          + New Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((act) => (
          <div key={act.id} className="group p-5 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                <BeakerIcon className="h-6 w-6" />
              </div>
              <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold ${act.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {act.status}
              </span>
            </div>
            <h3 className="text-white font-semibold text-lg">{act.name}</h3>
            <p className="text-slate-500 text-xs mb-4">Logic: Recursive Branching • Type: {act.type}</p>
            <div className="flex gap-2">
              <button className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
                <AdjustmentsHorizontalIcon className="h-4 w-4" /> Edit Logic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MethodologyBuilder;
