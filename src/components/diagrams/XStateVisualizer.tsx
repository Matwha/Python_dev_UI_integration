import React, { useState } from 'react';
import { createActor } from 'xstate';
import { toggleMachine } from '../../machines/toggleMachine';
import { Tabs } from '../ui/Tabs';
import { MachineVisualizer } from './xstate/MachineVisualizer';
import { MachineControls } from './xstate/MachineControls';
import { MachineEditor } from './xstate/MachineEditor';
import { ContextViewer } from './xstate/ContextViewer';

const TABS = [
  { id: 'simulator', label: 'Simulator' },
  { id: 'editor', label: 'Machine Editor' }
];

export const XStateVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('simulator');
  const [actor] = useState(() => createActor(toggleMachine).start());

  return (
    <div className="space-y-6">
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-2 gap-6">
        {activeTab === 'simulator' && (
          <>
            <div className="space-y-6">
              <MachineVisualizer actor={actor} />
              <ContextViewer actor={actor} />
            </div>
            <MachineControls actor={actor} />
          </>
        )}

        {activeTab === 'editor' && (
          <div className="col-span-2">
            <MachineEditor onMachineUpdate={(machine) => {
              try {
                const newActor = createActor(machine).start();
                // Handle machine update logic here
                console.log('Machine updated successfully');
              } catch (error) {
                console.error('Invalid machine configuration:', error);
              }
            }} />
          </div>
        )}
      </div>
    </div>
  );
};