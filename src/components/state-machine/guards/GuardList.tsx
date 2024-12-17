```tsx
import React from 'react';
import { Trash2, Shield } from 'lucide-react';
import { Button } from '../../ui/Button';

interface Guard {
  id: string;
  name: string;
  condition: string;
}

interface GuardListProps {
  guards: Guard[];
  onDelete: (id: string) => void;
}

export const GuardList: React.FC<GuardListProps> = ({
  guards,
  onDelete
}) => {
  return (
    <div className="space-y-2">
      {guards.map((guard) => (
        <div
          key={guard.id}
          className="flex items-center justify-between p-3 bg-gray-950 rounded-lg border border-amber-400/20 group hover:border-amber-400/40"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-amber-400/60" />
            <span className="text-amber-400">{guard.name}</span>
            <span className="px-2 py-1 text-xs bg-amber-400/10 rounded-md text-amber-400">
              {guard.condition}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(guard.id)}
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