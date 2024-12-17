import React from 'react';
import { StateMachineEditor as Editor } from './StateMachineEditor';
import { StateTransitionEditor } from './StateTransitionEditor';
import { CodePreview } from './CodePreview';

export const StateMachineEditor: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-400">State Machine Editor</h2>
      <Editor onUpdate={() => {}} />
    </div>
  );
};