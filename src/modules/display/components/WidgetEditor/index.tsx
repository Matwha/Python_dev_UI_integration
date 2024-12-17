```tsx
import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { Input } from '@/common/components/Input';
import { Select } from '@/common/components/Select';
import { DisplayWidget } from '../../types';
import { WidgetCard } from './WidgetCard';
import { WidgetConfigForm } from './WidgetConfigForm';

interface WidgetEditorProps {
  widgets: DisplayWidget[];
  onAddWidget: (widget: Omit<DisplayWidget, 'id'>) => void;
  onUpdateWidget: (id: string, updates: Partial<DisplayWidget>) => void;
  onRemoveWidget: (id: string) => void;
}

export const WidgetEditor: React.FC<WidgetEditorProps> = ({
  widgets,
  onAddWidget,
  onUpdateWidget,
  onRemoveWidget
}) => {
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [newWidget, setNewWidget] = useState({
    type: 'value' as const,
    dataSource: '',
    config: {}
  });

  const handleAddWidget = () => {
    if (newWidget.dataSource) {
      onAddWidget(newWidget);
      setNewWidget({
        type: 'value',
        dataSource: '',
        config: {}
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Widget Form */}
      <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Add Widget</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Widget Type"
            value={newWidget.type}
            onChange={(e) => setNewWidget({ ...newWidget, type: e.target.value as any })}
            className="bg-gray-950 border-yellow-400/30"
          >
            <option value="gauge">Gauge</option>
            <option value="chart">Chart</option>
            <option value="value">Value</option>
            <option value="status">Status</option>
          </Select>

          <Input
            label="Data Source"
            value={newWidget.dataSource}
            onChange={(e) => setNewWidget({ ...newWidget, dataSource: e.target.value })}
            placeholder="Enter data source"
            className="bg-gray-950 border-yellow-400/30"
          />
        </div>

        <Button
          onClick={handleAddWidget}
          disabled={!newWidget.dataSource}
          className="mt-4 w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Widget
        </Button>
      </div>

      {/* Widget List */}
      <div className="grid grid-cols-2 gap-6">
        {widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            isSelected={widget.id === selectedWidgetId}
            onSelect={() => setSelectedWidgetId(widget.id === selectedWidgetId ? null : widget.id)}
            onRemove={() => onRemoveWidget(widget.id)}
          />
        ))}
      </div>

      {/* Widget Configuration */}
      {selectedWidgetId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-yellow-400">Configure Widget</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWidgetId(null)}
              >
                Close
              </Button>
            </div>

            <WidgetConfigForm
              widget={widgets.find(w => w.id === selectedWidgetId)!}
              onUpdate={(updates) => onUpdateWidget(selectedWidgetId, updates)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
```