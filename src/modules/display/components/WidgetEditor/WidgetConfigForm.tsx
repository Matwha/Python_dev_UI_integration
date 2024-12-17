```tsx
import React, { useState } from 'react';
import { Input } from '@/common/components/Input';
import { Select } from '@/common/components/Select';
import { Button } from '@/common/components/Button';
import { DisplayWidget } from '../../types';

interface WidgetConfigFormProps {
  widget: DisplayWidget;
  onUpdate: (updates: Partial<DisplayWidget>) => void;
}

export const WidgetConfigForm: React.FC<WidgetConfigFormProps> = ({
  widget,
  onUpdate
}) => {
  const [config, setConfig] = useState(widget.config);

  const handleConfigChange = (updates: Record<string, any>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onUpdate({ config: newConfig });
  };

  const renderGaugeConfig = () => (
    <div className="grid grid-cols-2 gap-4">
      <Input
        type="number"
        label="Minimum Value"
        value={config.min || 0}
        onChange={(e) => handleConfigChange({ min: parseFloat(e.target.value) })}
        className="bg-gray-950 border-yellow-400/30"
      />
      <Input
        type="number"
        label="Maximum Value"
        value={config.max || 100}
        onChange={(e) => handleConfigChange({ max: parseFloat(e.target.value) })}
        className="bg-gray-950 border-yellow-400/30"
      />
      <Input
        label="Unit"
        value={config.unit || ''}
        onChange={(e) => handleConfigChange({ unit: e.target.value })}
        className="bg-gray-950 border-yellow-400/30"
      />
      <Input
        type="number"
        label="Threshold"
        value={config.threshold || 75}
        onChange={(e) => handleConfigChange({ threshold: parseFloat(e.target.value) })}
        className="bg-gray-950 border-yellow-400/30"
      />
    </div>
  );

  const renderChartConfig = () => (
    <div className="grid grid-cols-2 gap-4">
      <Select
        label="Chart Type"
        value={config.chartType || 'line'}
        onChange={(e) => handleConfigChange({ chartType: e.target.value })}
        className="bg-gray-950 border-yellow-400/30"
      >
        <option value="line">Line</option>
        <option value="bar">Bar</option>
        <option value="area">Area</option>
      </Select>
      <Input
        type="number"
        label="Duration (seconds)"
        value={config.duration || 60}
        onChange={(e) => handleConfigChange({ duration: parseInt(e.target.value) })}
        className="bg-gray-950 border-yellow-400/30"
      />
      <Input
        type="number"
        label="Update Interval (ms)"
        value={config.interval || 1000}
        onChange={(e) => handleConfigChange({ interval: parseInt(e.target.value) })}
        className="bg-gray-950 border-yellow-400/30"
      />
    </div>
  );

  const renderValueConfig = () => (
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Format"
        value={config.format || ''}
        onChange={(e) => handleConfigChange({ format: e.target.value })}
        placeholder="e.g., %.2f"
        className="bg-gray-950 border-yellow-400/30"
      />
      <Input
        label="Unit"
        value={config.unit || ''}
        onChange={(e) => handleConfigChange({ unit: e.target.value })}
        className="bg-gray-950 border-yellow-400/30"
      />
    </div>
  );

  const renderStatusConfig = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-yellow-400">Status States</h4>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(config.states || {}).map(([state, color]) => (
          <div key={state} className="flex gap-2">
            <Input
              value={state}
              disabled
              className="bg-gray-950 border-yellow-400/30"
            />
            <Input
              type="color"
              value={color as string}
              onChange={(e) => handleConfigChange({
                states: { ...config.states, [state]: e.target.value }
              })}
              className="w-12 h-9 p-1 bg-gray-950 border-yellow-400/30"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={() => handleConfigChange({
          states: { ...config.states, 'newState': '#ffffff' }
        })}
        className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-400/50"
      >
        Add State
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {widget.type === 'gauge' && renderGaugeConfig()}
      {widget.type === 'chart' && renderChartConfig()}
      {widget.type === 'value' && renderValueConfig()}
      {widget.type === 'status' && renderStatusConfig()}
    </div>
  );
};
```