import React from 'react';
import { Input } from '@/common/components/Input';
import { Select } from '@/common/components/Select';
import { Button } from '@/common/components/Button';
import { Plus } from 'lucide-react';
import { StateType } from '../../types';

interface StateFormProps {
  name: string;
  type: StateType;
  initial: boolean;
  onNameChange: (value: string) => void;
  onTypeChange: (value: StateType) => void;
  onInitialChange: (value: boolean) => void;
  onSubmit: () => void;
}

export const StateForm: React.FC<StateFormProps> = ({
  name,
  type,
  initial,
  onNameChange,
  onTypeChange,
  onInitialChange,
  onSubmit
}) => {
  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="State Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter state name"
          className="bg-gray-950 border-yellow-400/30"
        />
        
        <Select
          label="State Type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value as StateType)}
          className="bg-gray-950 border-yellow-400/30"
        >
          <option value="atomic">Atomic</option>
          <option value="compound">Compound</option>
          <option value="parallel">Parallel</option>
          <option value="final">Final</option>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-yellow-400">
          <input
            type="checkbox"
            checked={initial}
            onChange={(e) => onInitialChange(e.target.checked)}
            className="rounded border-yellow-400/20 bg-gray-950"
          />
          Initial State
        </label>
      </div>

      <Button
        onClick={onSubmit}
        disabled={!name}
        className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add State
      </Button>
    </div>
  );
};