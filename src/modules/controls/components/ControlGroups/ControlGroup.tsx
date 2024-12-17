```tsx
import React from 'react';
import { Button } from '@/common/components/Button';
import { Switch } from '@/common/components/Switch';
import { Slider } from '@/common/components/Slider';
import { Control } from '../../types';

interface ControlGroupProps {
  name: string;
  controls: Control[];
}

export const ControlGroup: React.FC<ControlGroupProps> = ({ name, controls }) => {
  const renderControl = (control: Control) => {
    switch (control.type) {
      case 'button':
        return (
          <Button
            key={control.id}
            onClick={control.action}
            className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-400/50"
          >
            {control.name}
          </Button>
        );
      
      case 'switch':
        return (
          <Switch
            key={control.id}
            label={control.name}
            onChange={control.action}
            {...control.config}
          />
        );
      
      case 'slider':
        return (
          <Slider
            key={control.id}
            label={control.name}
            onChange={control.action}
            {...control.config}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
      <h4 className="text-md font-semibold text-yellow-400 mb-4">{name}</h4>
      <div className="space-y-4">
        {controls.map(renderControl)}
      </div>
    </div>
  );
};
```