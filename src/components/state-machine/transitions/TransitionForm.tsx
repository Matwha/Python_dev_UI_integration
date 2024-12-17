```tsx
import React from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';

interface TransitionFormProps {
  eventName: string;
  targetState: string;
  availableStates: string[];
  onEventNameChange: (value: string) => void;
  onTargetStateChange: (value: string) => void;
  onSubmit: () => void;
}

export const TransitionForm: React.FC<TransitionFormProps> = ({
  eventName,
  targetState,
  availableStates,
  onEventNameChange,
  onTargetStateChange,
  onSubmit
}) => {
  return (
    <div className="space-y-4 bg-gray-900/80 p-4 rounded-lg border border-amber-400/20">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Event Name"
          value={eventName}
          onChange={(e) => onEventNameChange(e.target.value)}
          placeholder="Enter event name"
          className="bg-gray-950 border-amber-400/30"
        />
        
        <select
          className="w-full rounded-lg bg-gray-950 border border-amber-400/30 px-3 py-2 text-amber-400"
          value={targetState}
          onChange={(e) => onTargetStateChange(e.target.value)}
        >
          <option value="">Select Target State</option>
          {availableStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <Button 
        onClick={onSubmit}
        disabled={!eventName || !targetState}
        className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Transition
      </Button>
    </div>
  );
};
```