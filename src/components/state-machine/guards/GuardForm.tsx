```tsx
import React from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';

interface GuardFormProps {
  name: string;
  condition: string;
  onNameChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onSubmit: () => void;
}

export const GuardForm: React.FC<GuardFormProps> = ({
  name,
  condition,
  onNameChange,
  onConditionChange,
  onSubmit
}) => {
  return (
    <div className="space-y-4 bg-gray-900/80 p-4 rounded-lg border border-amber-400/20">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Guard Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter guard name"
          className="bg-gray-950 border-amber-400/30"
        />
        
        <Input
          label="Condition"
          value={condition}
          onChange={(e) => onConditionChange(e.target.value)}
          placeholder="Enter condition"
          className="bg-gray-950 border-amber-400/30"
        />
      </div>

      <Button 
        onClick={onSubmit}
        disabled={!name || !condition}
        className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Guard
      </Button>
    </div>
  );
};
```