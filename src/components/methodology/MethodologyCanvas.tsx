'use client';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';

const initialStages = [
  { id: '1', name: 'Awareness', weight: 10, mapping: 'Traffic Source' },
  { id: '2', name: 'Engagement', weight: 30, mapping: 'Video Interaction' },
  { id: '3', name: 'Qualification', weight: 60, mapping: 'Budget Q&A' },
];

export default function MethodologyCanvas() {
  const [hasMounted, setHasMounted] = useState(false);
  const [stages, setStages] = useState(initialStages);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleAddStage = () => {
    const newId = (stages.length + 1).toString();
    setStages([...stages, { id: newId, name: 'New Funnel Phase', weight: 10, mapping: 'Logic Node' }]);
    alert('New Research Phase Append successful.');
  };

  const handleDeleteStage = (id: string) => {
    setStages(prev => prev.filter(s => s.id !== id));
  };

  if (!hasMounted) return null;


  return (
    <div className="rounded-[40px] border border-white/10 bg-slate-950/40 p-10 backdrop-blur-3xl shadow-2xl transition hover:shadow-emerald-500/10">
      <div className="mb-10 flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-black text-white tracking-tighter">Strategic Canvas</h2>
           <p className="text-slate-500 text-sm mt-1">Orchestrate your customer discovery lifecycle mapping.</p>
        </div>
        <button onClick={handleAddStage} className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-emerald-500 shadow-xl shadow-emerald-600/20 active:scale-95">
          <PlusIcon className="h-4 w-4" /> Add Stage
        </button>
      </div>


      <DragDropContext onDragEnd={() => {}}>
        <Droppable 
          droppableId="stages"
          type="DEFAULT"
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {stages.map((stage, index) => (
                <Draggable key={stage.id} draggableId={stage.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all hover:bg-white/5">
                      
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-mono text-slate-500">{index + 1}</div>
                        <div>
                          <input 
                            type="text" 
                            value={stage.name} 
                            onChange={(e) => {
                               const newStages = [...stages];
                               newStages[index].name = e.target.value;
                               setStages(newStages);
                            }}
                            className="bg-transparent text-lg font-bold text-white focus:outline-none" 
                          />
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase">
                            <MapPinIcon className="h-4 w-4" /> Mapping: {stage.mapping}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <input 
                          type="number" 
                          value={stage.weight} 
                          onChange={(e) => {
                             const newStages = [...stages];
                             newStages[index].weight = parseInt(e.target.value);
                             setStages(newStages);
                          }}
                          className="w-20 rounded-2xl border border-white/10 bg-slate-900/50 p-3 text-center text-sm font-bold text-emerald-400 focus:border-emerald-500 outline-none" 
                        />
                        <button 
                          onClick={() => handleDeleteStage(stage.id)}
                          className="opacity-0 group-hover:opacity-100 transition duration-300 text-rose-500 hover:text-rose-400 p-2 hover:bg-rose-500/10 rounded-xl">
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </div>

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
