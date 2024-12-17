import React from 'react';
import { Database, Table } from 'lucide-react';

export const DataManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Database Configuration</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded">
              <p className="text-sm text-gray-400">Connection Status</p>
              <p className="text-green-400">Connected</p>
            </div>
            <div className="bg-black/50 p-4 rounded">
              <p className="text-sm text-gray-400">Database Type</p>
              <p>TimescaleDB</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Table className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Data Tables</h2>
          </div>
          <div className="space-y-2">
            <div className="bg-black/50 p-3 rounded flex justify-between items-center">
              <span>Device Readings</span>
              <span className="text-sm text-gray-400">3 columns</span>
            </div>
            <div className="bg-black/50 p-3 rounded flex justify-between items-center">
              <span>System Events</span>
              <span className="text-sm text-gray-400">5 columns</span>
            </div>
            <div className="bg-black/50 p-3 rounded flex justify-between items-center">
              <span>Test Results</span>
              <span className="text-sm text-gray-400">8 columns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};