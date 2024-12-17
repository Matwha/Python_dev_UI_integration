```tsx
import React from 'react';
import { Settings, Trash2 } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { DisplayWidget } from '../../types';

interface WidgetCardProps {
  widget: DisplayWidget;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  isSelected,
  onSelect,
  onRemove
}) => {
  return (
    <div className={`
      bg-gray-900/90 p-4 rounded-lg border transition-colors
      ${isSelected ? 'border-yellow-400' : 'border-yellow-400/20 hover:border-yellow-400/40'}
    `}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-medium capitalize">{widget.type}</span>
            <span className="px-2 py-0.5 text-xs bg-yellow-400/10 rounded text-yellow-400">
              {widget.dataSource}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {getWidgetDescription(widget)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelect}
            className="hover:bg-yellow-400/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

function getWidgetDescription(widget: DisplayWidget): string {
  switch (widget.type) {
    case 'gauge':
      return `Range: ${widget.config.min} - ${widget.config.max} ${widget.config.unit || ''}`;
    case 'chart':
      return `Type: ${widget.config.chartType}, Duration: ${widget.config.duration}s`;
    case 'value':
      return `Format: ${widget.config.format || 'Default'}`;
    case 'status':
      return `States: ${Object.keys(widget.config.states || {}).join(', ')}`;
    default:
      return 'No configuration';
  }
}
```