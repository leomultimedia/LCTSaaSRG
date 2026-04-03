'use client';
import { useEffect, useState } from 'react';
import { PlusIcon, TrashIcon, MapPinIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Stage {
  id: string;
  name: string;
  weight: number;
  mapping: string;
}

const initialStages: Stage[] = [
  { id: '1', name: 'Awareness', weight: 10, mapping: 'Traffic Source' },
  { id: '2', name: 'Engagement', weight: 30, mapping: 'Video Interaction' },
  { id: '3', name: 'Qualification', weight: 60, mapping: 'Budget Q&A' },
];

interface MethodologyCanvasProps {
  methodology: { id: string; name: string; client?: string; version?: string } | null;
  onSave: (stages: Stage[], meta: { client: string; version: string }) => void;
  onCancel: () => void;
}

export default function MethodologyCanvas({ methodology, onSave, onCancel }: MethodologyCanvasProps) {
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [methodologyName, setMethodologyName] = useState('');
  const [clientName, setClientName] = useState('Standard Template');
  const [versionNumber, setVersionNumber] = useState('v1.0');

  useEffect(() => {
    if (methodology) {
      setMethodologyName(methodology.name);
      setClientName(methodology.client || 'Standard Template');
      setVersionNumber(methodology.version || 'v1.0');
      
      // If it's a new derivative version or a completely new framework
      if (!methodology.id || methodology.id === 'new_v') {
        setStages([{ id: '1', name: 'Initial Discovery', weight: 100, mapping: 'New Source' }]);
      }
    }
  }, [methodology]);

  const handleAddStage = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setStages([...stages, { id: newId, name: 'New Research Phase', weight: 10, mapping: 'Logic Node' }]);
  };

  const handleDeleteStage = (id: string) => {
    setStages(prev => prev.filter(s => s.id !== id));
  };

  const updateStage = (index: number, field: keyof Stage, value: any) => {
    const newStages = [...stages];
    (newStages[index] as any)[field] = value;
    setStages(newStages);
  };

  return (
    <div className="rounded-[40px] border border-white/10 bg-slate-950/60 p-10 backdrop-blur-3xl shadow-2xl transition hover:shadow-blue-500/10 border-t-blue-500/30">
      <div className="mb-10 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8 relative z-20">
        <div className="flex-1">
           <div className="flex items-center gap-3 mb-2 flex-wrap">
             <div className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
               <CheckIcon className="h-3 w-3" /> Node Registered
             </div>
             <input 
               type="text" 
               value={clientName} 
               onChange={(e) => setClientName(e.target.value)}
               className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full focus:outline-none focus:border-emerald-500/50"
               placeholder="CLIENT_NAME"
             />
             <input 
               type="text" 
               value={versionNumber} 
               onChange={(e) => setVersionNumber(e.target.value)}
               className="bg-white/5 border border-white/10 text-slate-400 text-[10px] font-mono px-3 py-1 rounded-full focus:outline-none focus:border-blue-500/50 w-16"
               placeholder="v1.0"
             />
           </div>
           <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3 truncate">
             Logic Canvas: <span className="text-blue-400">{methodologyName}</span>
           </h2>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0 items-center">
          <button 
            id="btn-cancel-logic"
            onClick={onCancel} 
            className="px-6 py-3 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition active:scale-95"
          >
            Discard
          </button>
          <button 
            id="btn-save-logic"
            onClick={() => onSave(stages, { client: clientName, version: versionNumber })} 
            className="relative z-50 px-8 py-3 rounded-2xl bg-blue-600 text-xs font-black uppercase tracking-widest text-white transition hover:bg-blue-500 shadow-2xl shadow-blue-600/50 active:scale-95 flex items-center gap-2 border border-blue-400/30"
          >
            <CheckIcon className="h-4 w-4" /> Deploy Logic Framework
          </button>
          <button 
            id="btn-add-stage"
            onClick={handleAddStage} 
            className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-emerald-500 shadow-2xl shadow-emerald-600/30 active:scale-95"
          >
            <PlusIcon className="h-4 w-4" /> Add Stage
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {stages.map((stage, index) => (
          <div key={stage.id} className="group relative flex flex-col md:flex-row items-center justify-between rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-xl transition hover:bg-white/5 hover:border-white/10">
            <div className="flex items-center gap-6 w-full">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-sm border border-blue-500/20">
                {index + 1}
              </div>
              <div className="flex-1 space-y-1">
                <input 
                  type="text" 
                  value={stage.name} 
                  onChange={(e) => updateStage(index, 'name', e.target.value)}
                  placeholder="Phase Title"
                  className="bg-transparent text-xl font-black text-white focus:outline-none w-full placeholder:text-slate-700" 
                />
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPinIcon className="h-3.5 w-3.5" /> Mapping:</span>
                  <input 
                    type="text" 
                    value={stage.mapping} 
                    onChange={(e) => updateStage(index, 'mapping', e.target.value)}
                    className="bg-transparent text-blue-400 focus:outline-none border-b border-transparent focus:border-blue-500/30 pb-0.5" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Weighting</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={stage.weight} 
                    onChange={(e) => updateStage(index, 'weight', parseInt(e.target.value) || 0)}
                    className="w-20 rounded-2xl border border-white/10 bg-black/40 p-3 text-center text-sm font-black text-emerald-400 focus:border-emerald-500 outline-none shadow-inner" 
                  />
                  <span className="text-slate-700 font-bold">%</span>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteStage(stage.id)}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-rose-500 hover:text-white p-3 hover:bg-rose-500 bg-rose-500/10 rounded-2xl shadow-lg">
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleAddStage}
        className="w-full py-6 rounded-[30px] border-2 border-dashed border-white/10 text-slate-500 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
      >
        <PlusIcon className="h-5 w-5 group-hover:scale-125 transition-transform" />
        Add Incremental Phase
      </button>
    </div>
  );
}
