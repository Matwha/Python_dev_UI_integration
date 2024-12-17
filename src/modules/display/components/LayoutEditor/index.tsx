```tsx
import React from 'react';
import { Grid, Move } from 'lucide-react';
import { Input } from '@/common/components/Input';
import { Button } from '@/common/components/Button';
import { DisplayLayout } from '../../types';

interface LayoutEditorProps {
  layout: DisplayLayout;
  onLayoutChange: (updates: Partial<DisplayLayout>) => void;
}

export const LayoutEditor: React.FC<LayoutEditorProps> = ({
  layout,
  onLayoutChange
}) => {
  const updateGrid = (columns: number, rows: number) => {
    onLayoutChange({
      grid: { columns, rows }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
        <div className="flex items-center gap-3 mb-6">
          <Grid className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-yellow-400">Grid Configuration</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            type="number"
            label="Columns"
            value={layout.grid.columns}
            onChange={(e) => updateGrid(parseInt(e.target.value) || 1, layout.grid.rows)}
            min={1}
            max={12}
            className="bg-gray-950 border-yellow-400/30"
          />

          <Input
            type="number"
            label="Rows"
            value={layout.grid.rows}
            onChange={(e) => updateGrid(layout.grid.columns, parseInt(e.target.value) || 1)}
            min={1}
            max={12}
            className="bg-gray-950 border-yellow-400/30"
          />
        </div>
      </div>

      <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
        <div className="flex items-center gap-3 mb-6">
          <Move className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-yellow-400">Widget Positions</h3>
        </div>

        <div className="grid gap-4" style={{
          gridTemplateColumns: `repeat(${layout.grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${layout.grid.rows}, 1fr)`
        }}>
          {layout.widgets.map((widget) => (
            <div
              key={widget.id}
              className="bg-gray-950/50 p-4 rounded border border-yellow-400/10 hover:border-yellow-400/30 transition-colors"
            >
              <div className="text-sm text-yellow-400">{widget.type}</div>
              <div className="text-xs text-gray-400 mt-1">{widget.dataSource}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```