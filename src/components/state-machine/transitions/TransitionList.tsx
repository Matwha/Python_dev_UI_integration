```tsx
import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';

interface Transition {
  id: string;
  event: string;
  target: string;
  guard?: string;
}

interface TransitionListProps {
  transitions: Transition[];
  onDelete: (id: string) => void;
}

export const TransitionList: React.FC<TransitionListProps> = ({
  transitions,
  onDelete
}) => {
  return (
    <div className="space-y-2">
      {transitions.map((transition) => (
        <div
          key={transition.id}
          className="flex items-center justify-between p-3 bg-gray-950 rounded-lg border border-amber-400/20 group hover:border-amber-400/40"
        >
          <div className="flex items-center gap-3">
            <span className="text-amber-400">{transition.event}</span>
            <ArrowRight className="w-4 h-4 text-amber-400/60" />
            <span className="text-amber-400">{transition.target}</span>
            {transition.guard && (
              <span className="px-2 py-1 text-xs bg-amber-400/10 rounded-md text-amber-400">
                [{transition.guard}]
              </span>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(transition.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
```