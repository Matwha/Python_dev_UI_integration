```tsx
import React, { useState } from 'react';
import { Database, Plus } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { Input } from '@/common/components/Input';
import { Select } from '@/common/components/Select';
import { useDataSources } from '../../hooks/useDataSources';

export const DataSourceConfig: React.FC = () => {
  const { dataSources, addDataSource, removeDataSource } = useDataSources();
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'mqtt',
    topic: '',
    interval: 1000
  });

  const handleAddSource = () => {
    if (newSource.name && newSource.topic) {
      addDataSource(newSource);
      setNewSource({
        name: '',
        type: 'mqtt',
        topic: '',
        interval: 1000
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-yellow-400">Data Sources</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Source Name"
            value={newSource.name}
            onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
            placeholder="Enter source name"
            className="bg-gray-950 border-yellow-400/30"
          />

          <Select
            label="Source Type"
            value={newSource.type}
            onChange={(e) => setNewSource({ ...newSource, type: e.target.value })}
            className="bg-gray-950 border-yellow-400/30"
          >
            <option value="mqtt">MQTT</option>
            <option value="websocket">WebSocket</option>
            <option value="rest">REST API</option>
          </Select>

          <Input
            label="Topic/Endpoint"
            value={newSource.topic}
            onChange={(e) => setNewSource({ ...newSource, topic: e.target.value })}
            placeholder="Enter topic or endpoint"
            className="bg-gray-950 border-yellow-400/30"
          />

          <Input
            type="number"
            label="Update Interval (ms)"
            value={newSource.interval}
            onChange={(e) => setNewSource({ ...newSource, interval: parseInt(e.target.value) || 1000 })}
            min={100}
            step={100}
            className="bg-gray-950 border-yellow-400/30"
          />
        </div>

        <Button
          onClick={handleAddSource}
          disabled={!newSource.name || !newSource.topic}
          className="mt-4 w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Data Source
        </Button>
      </div>

      <div className="space-y-4">
        {dataSources.map((source) => (
          <div
            key={source.id}
            className="bg-gray-900/90 p-4 rounded-lg border border-yellow-400/20"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-yellow-400 font-medium">{source.name}</h4>
                <p className="text-sm text-gray-400 mt-1">{source.topic}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  Updates every {source.interval}ms
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeDataSource(source.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```