import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Settings, Cpu, Power, Database } from 'lucide-react';

const driverTypes = [
  { id: 'plc', label: 'PLC', icon: Cpu },
  { id: 'modbus', label: 'Modbus', icon: Database },
  { id: 'canbus', label: 'CAN Bus', icon: Power },
  { id: 'scpi', label: 'SCPI', icon: Settings },
];

const controlTypes = [
  { id: 'contactor', label: 'Contactor' },
  { id: 'relay', label: 'Relay' },
  { id: 'digital', label: 'Digital I/O' },
  { id: 'analog', label: 'Analog I/O' },
];

export const DeviceDriverConfig: React.FC = () => {
  const [driverType, setDriverType] = useState('');
  const [controlType, setControlType] = useState('');

  return (
    <div className="relative space-y-6 bg-gray-900/80 p-8 rounded-lg border border-yellow-400/20 backdrop-blur-sm">
      {/* Honeycomb Background Pattern */}
      <div className="absolute inset-0 bg-honeycomb opacity-10 pointer-events-none" />
      
      <div className="relative grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-yellow-400">Driver Configuration</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {driverTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setDriverType(type.id)}
                    className={`flex flex-col items-center justify-center p-4 ${
                      driverType === type.id
                        ? 'bg-yellow-400/20 border-yellow-400'
                        : 'bg-black/40 border-yellow-400/20 hover:bg-yellow-400/10'
                    } border-2 rounded-lg transition-all duration-300`}
                  >
                    <Icon className="w-8 h-8 mb-2" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {driverType === 'plc' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-yellow-400 mb-2">
                  Control Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {controlTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setControlType(type.id)}
                      className={`p-3 ${
                        controlType === type.id
                          ? 'bg-yellow-400/20 border-yellow-400'
                          : 'bg-black/40 border-yellow-400/20 hover:bg-yellow-400/10'
                      } border-2 rounded-lg transition-all duration-300`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Device Name"
                placeholder="Enter device name"
                className="bg-black/40 border-yellow-400/20 focus:border-yellow-400"
              />

              <Input
                label="IP Address/Port"
                placeholder="e.g., 192.168.1.100:502"
                className="bg-black/40 border-yellow-400/20 focus:border-yellow-400"
              />
            </div>
          </div>
        </div>

        {driverType === 'plc' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-yellow-400">Control Points</h3>
            </div>

            <div className="bg-black/40 p-6 rounded-lg border-2 border-yellow-400/20">
              <h4 className="font-medium mb-4 text-yellow-400">Input/Output Points</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Digital Inputs"
                  type="number"
                  min="0"
                  placeholder="Number of DI points"
                  className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
                />
                <Input
                  label="Digital Outputs"
                  type="number"
                  min="0"
                  placeholder="Number of DO points"
                  className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
                />
                <Input
                  label="Analog Inputs"
                  type="number"
                  min="0"
                  placeholder="Number of AI points"
                  className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
                />
                <Input
                  label="Analog Outputs"
                  type="number"
                  min="0"
                  placeholder="Number of AO points"
                  className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
                />
              </div>
            </div>

            {controlType && (
              <div className="bg-black/40 p-6 rounded-lg border-2 border-yellow-400/20">
                <h4 className="font-medium mb-4 text-yellow-400">{controlType} Configuration</h4>
                <div className="space-y-4">
                  <Input
                    label="Control Address"
                    placeholder="Enter control address"
                    className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
                  />
                  <Input
                    label="Update Rate (ms)"
                    type="number"
                    min="100"
                    step="100"
                    placeholder="Enter update rate"
                    className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save Configuration</Button>
      </div>
    </div>
  );
};