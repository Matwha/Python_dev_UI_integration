import React from 'react';
import { useDeviceStore } from '../store/deviceStore';
import { Activity } from 'lucide-react';

export const Monitoring: React.FC = () => {
  const devices = useDeviceStore((state) => state.devices);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Device Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.length === 0 ? (
          <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20 text-center">
            <p className="text-gray-400">No devices to monitor</p>
            <p className="text-sm text-gray-500">Configure devices in the Configuration page</p>
          </div>
        ) : (
          devices.map((device) => (
            <div
              key={device.id}
              className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{device.name}</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span
                    className={
                      device.status === 'connected'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  >
                    {device.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-black/50 p-3 rounded">
                  <p className="text-sm text-gray-400">Device Type</p>
                  <p>{device.type}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};