import React, { useState } from 'react';
import { useDeviceStore } from '../store/deviceStore';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { StateMachineDiagram } from '../components/diagrams/StateMachineDiagram';
import { XStateVisualizer } from '../components/diagrams/XStateVisualizer';
import { DeviceDriverConfig } from '../components/diagrams/DeviceDriverConfig';
import { DriverBuilder } from '../components/diagrams/DriverBuilder';
import { Plus } from 'lucide-react';
import { testMachine } from '../machines/testMachine';
import { createActor } from 'xstate';

const TABS = [
  { id: 'devices', label: 'Devices' },
  { id: 'state-machine', label: 'State Machine' },
  { id: 'xstate', label: 'XState Visualizer' },
  { id: 'driver-config', label: 'Driver Configuration' },
  { id: 'driver-builder', label: 'Driver Builder' },
];

export const Configuration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const devices = useDeviceStore((state) => state.devices);
  const [actor] = useState(() => createActor(testMachine).start());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Configuration</h1>
        {activeTab === 'devices' && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        )}
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'devices' && (
          <div className="grid grid-cols-1 gap-6">
            {devices.length === 0 ? (
              <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20 text-center">
                <p className="text-gray-400">No devices configured yet</p>
                <p className="text-sm text-gray-500">Add a device to get started</p>
              </div>
            ) : (
              devices.map((device) => (
                <div
                  key={device.id}
                  className="bg-gray-900 p-6 rounded-lg border border-yellow-400/20"
                >
                  <h3 className="text-xl font-semibold mb-4">{device.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="ml-2">{device.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className="ml-2">{device.status}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'state-machine' && <StateMachineDiagram />}
        {activeTab === 'xstate' && <XStateVisualizer actor={actor} />}
        {activeTab === 'driver-config' && <DeviceDriverConfig />}
        {activeTab === 'driver-builder' && <DriverBuilder />}
      </div>
    </div>
  );
};