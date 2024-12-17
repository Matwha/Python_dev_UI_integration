```tsx
import React, { useState } from 'react';
import { WidgetEditor } from '../WidgetEditor';
import { LayoutEditor } from '../LayoutEditor';
import { DataSourceConfig } from '../DataSourceConfig';
import { DisplayPreview } from '../DisplayPreview';
import { Tabs } from '@/common/components/Tabs';
import { useDisplayConfig } from '../../hooks/useDisplayConfig';
import { DisplayLayout } from '../../types';

const TABS = [
  { id: 'widgets', label: 'Widgets' },
  { id: 'layout', label: 'Layout' },
  { id: 'data', label: 'Data Sources' },
  { id: 'preview', label: 'Preview' }
];

export const DisplayConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState('widgets');
  const { layout, updateLayout, addWidget, updateWidget, removeWidget } = useDisplayConfig();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-400">Display Configuration</h2>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          {activeTab === 'widgets' && (
            <WidgetEditor
              widgets={layout.widgets}
              onAddWidget={addWidget}
              onUpdateWidget={updateWidget}
              onRemoveWidget={removeWidget}
            />
          )}

          {activeTab === 'layout' && (
            <LayoutEditor
              layout={layout}
              onLayoutChange={updateLayout}
            />
          )}

          {activeTab === 'data' && (
            <DataSourceConfig />
          )}

          {activeTab === 'preview' && (
            <DisplayPreview layout={layout} />
          )}
        </div>

        <div className="col-span-4">
          <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20 sticky top-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Configuration Summary</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Total Widgets:</span>
                <span className="ml-2 text-yellow-400">{layout.widgets.length}</span>
              </div>
              <div>
                <span className="text-gray-400">Grid Size:</span>
                <span className="ml-2 text-yellow-400">
                  {layout.grid.columns}x{layout.grid.rows}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Active Data Sources:</span>
                <span className="ml-2 text-yellow-400">
                  {new Set(layout.widgets.map(w => w.dataSource)).size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```