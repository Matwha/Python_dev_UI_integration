import React from 'react';
import { useDeviceStore } from '../store/deviceStore';
import { Activity, AlertTriangle, Database, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const devices = useDeviceStore((state) => state.devices);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/configuration"
              className="flex flex-col items-center p-4 bg-black/50 rounded hover:bg-yellow-400/10 transition-colors"
            >
              <Settings className="w-8 h-8 mb-2" />
              <span>Configure</span>
            </Link>
            <Link
              to="/monitoring"
              className="flex flex-col items-center p-4 bg-black/50 rounded hover:bg-yellow-400/10 transition-colors"
            >
              <Activity className="w-8 h-8 mb-2" />
              <span>Monitor</span>
            </Link>
            <Link
              to="/data"
              className="flex flex-col items-center p-4 bg-black/50 rounded hover:bg-yellow-400/10 transition-colors"
            >
              <Database className="w-8 h-8 mb-2" />
              <span>Data</span>
            </Link>
          </div>
        </div>

        {/* Active Devices */}
        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20">
          <h2 className="text-xl font-semibold mb-4">Connected Devices</h2>
          <div className="space-y-2">
            {devices.length === 0 ? (
              <p className="text-gray-400">No devices configured</p>
            ) : (
              devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-2 bg-black/50 rounded"
                >
                  <span>{device.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{device.type}</span>
                    {device.status === 'connected' ? (
                      <span className="text-green-400">●</span>
                    ) : (
                      <span className="text-red-400">●</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <Activity className="w-4 h-4" />
              <span>System Online</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <AlertTriangle className="w-4 h-4" />
              <span>No active alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};