import React from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../ui/Button';

interface State {
  name: string;
  type: string;
  initial?: boolean;
  final?: boolean;
}

interface StateListProps {
  states: State[];
  expandedStates: string[];
  onStateExpand: (stateName: string) => void;
  onStateEdit: (stateName: string) => void;
  onStateDelete: (stateName: string) => void;
}

export const StateList: React.FC<StateListProps> = ({
  states,
  expandedStates,
  onStateExpand,
  onStateEdit,
  onStateDelete
}) => {
  return (
    <div className="space-y-2">
      {states.map((state) => (
        <div
          key={state.name}
          className="bg-black/40 border border-yellow-400/20 rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onStateExpand(state.name)}
                className="p-1 hover:bg-yellow-400/10 rounded"
              >
                {expandedStates.includes(state.name) ? (
                  <ChevronUp className="w-4 h-4 text-yellow-400/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-yellow-400/60" />
                )}
              </button>
              <span className="text-yellow-400 font-medium">{state.name}</span>
              <div className="flex gap-2">
                {state.initial && (
                  <span className="px-2 py-0.5 text-xs bg-green-400/10 text-green-400 rounded">
                    Initial
                  </span>
                )}
                {state.final && (
                  <span className="px-2 py-0.5 text-xs bg-red-400/10 text-red-400 rounded">
                    Final
                  </span>
                )}
                <span className="px-2 py-0.5 text-xs bg-yellow-400/10 text-yellow-400 rounded">
                  {state.type}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStateEdit(state.name)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onStateDelete(state.name)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {expandedStates.includes(state.name) && (
            <div className="p-4 border-t border-yellow-400/10 bg-black/20">
              {/* State configuration details will go here */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};