import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { Select } from '../../../ui/Select';

interface StateEditorProps {
  onStateAdd: (state: StateConfig) => void;
}

interface StateConfig {
  name: string;
  type: 'atomic' | 'compound' | 'parallel' | 'final';
  initial?: boolean;
  final?: boolean;
  data?: Record<string, any>;
}

export const StateEditor: React.FC<StateEditorProps> = ({ onStateAdd }) => {
  const [newState, setNewState] = useState<StateConfig>({
    name: '',
    type: 'atomic',
    initial: false,
    final: false,
    data: {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newState.name) {
      onStateAdd(newState);
      setNewState({
        name: '',
        type: 'atomic',
        initial: false,
        final: false,
        data: {}
      });
    }
  };

  return (
    <div className="space-y-4 bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-yellow-400">Add New State</h3>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Advanced
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="State Name"
            placeholder="Enter state name"
            value={newState.name}
            onChange={(e) => setNewState({ ...newState, name: e.target.value })}
            className="bg-black/40"
          />

          <Select
            label="State Type"
            value={newState.type}
            onChange={(e) => setNewState({ ...newState, type: e.target.value as StateConfig['type'] })}
            className="bg-black/40"
          >
            <option value="atomic">Atomic</option>
            <option value="compound">Compound</option>
            <option value="parallel">Parallel</option>
            <option value="final">Final</option>
          </Select>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-yellow-400">
            <input
              type="checkbox"
              checked={newState.initial}
              onChange={(e) => setNewState({ ...newState, initial: e.target.checked })}
              className="rounded border-yellow-400/20 bg-black/40"
            />
            Initial State
          </label>

          <label className="flex items-center gap-2 text-yellow-400">
            <input
              type="checkbox"
              checked={newState.final}
              onChange={(e) => setNewState({ ...newState, final: e.target.checked })}
              className="rounded border-yellow-400/20 bg-black/40"
            />
            Final State
          </label>
        </div>

        <Button type="submit" disabled={!newState.name} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add State
        </Button>
      </form>
    </div>
  );
};