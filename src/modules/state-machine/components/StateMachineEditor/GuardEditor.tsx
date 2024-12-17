```tsx
import React, { useState } from 'react';
import { Shield, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';
import { Guard } from '../../types';

interface GuardEditorProps {
  guards: Guard[];
  onGuardAdd: (guard: Omit<Guard, 'id'>) => void;
  onGuardRemove: (id: string) => void;
}

export const GuardEditor: React.FC<GuardEditorProps> = ({
  guards,
  onGuardAdd,
  onGuardRemove
}) => {
  const [newGuard, setNewGuard] = useState({
    name: '',
    condition: ''
  });

  const handleGuardAdd = () => {
    if (newGuard.name && newGuard.condition) {
      onGuardAdd(newGuard);
      setNewGuard({ name: '', condition: '' });
    }
  };

  return (
    <div className="bg-gray-800/60 p-6 rounded-xl border border-amber-400/30">
      <h4 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Guards
      </h4>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          label="Guard Name"
          value={newGuard.name}
          onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
          placeholder="Enter guard name"
          className="bg-gray-900/60 border-amber-400/20"
        />

        <Input
          label="Condition"
          value={newGuard.condition}
          onChange={(e) => setNewGuard({ ...newGuard, condition: e.target.value })}
          placeholder="Enter condition"
          className="bg-gray-900/60 border-amber-400/20"
        />
      </div>

      <Button
        onClick={handleGuardAdd}
        disabled={!newGuard.name || !newGuard.condition}
        className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Guard
      </Button>

      <div className="mt-4 space-y-2">
        {guards.map((guard) => (
          <div
            key={guard.id}
            className="flex items-center justify-between p-3 bg-gray-900/40 rounded-lg border border-amber-400/10 group hover:border-amber-400/30"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-amber-400/60" />
              <span className="text-amber-400">{guard.name}</span>
              <span className="px-2 py-1 text-xs bg-amber-400/10 rounded text-amber-400">
                {guard.condition}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onGuardRemove(guard.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
```