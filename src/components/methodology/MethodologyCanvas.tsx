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

  if (!hasMounted) return null;


  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Methodology Builder: <span className='text-blue-400'>12-Point Sales Funnel</span></h2>
        <button className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500">
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
                          <input type="text" defaultValue={stage.name} className="bg-transparent text-lg font-semibold text-white focus:outline-none" />
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <MapPinIcon className="h-4 w-4" /> Mapping: {stage.mapping}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <input type="number" defaultValue={stage.weight} className="w-16 rounded-md border border-white/20 bg-black/40 p-2 text-center text-white" />
                        <button className="opacity-0 group-hover:opacity-100 transition text-rose-400 hover:text-rose-300">
                          <TrashIcon className="h-5 w-5" />
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
