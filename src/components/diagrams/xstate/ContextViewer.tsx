import React from 'react';
import { Database } from 'lucide-react';
import { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';
import { testMachine } from '../../../machines/testMachine';

interface ContextViewerProps {
  actor: ActorRefFrom<typeof testMachine>;
}

export const ContextViewer: React.FC<ContextViewerProps> = ({ actor }) => {
  const context = useSelector(actor, state => state.context);

  return (
    <div className="bg-black/50 p-4 rounded-lg space-y-4">
      <div className="flex items-center gap-2">
        <Database className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold text-yellow-400">Context Data</h3>
      </div>

      <div className="bg-black/30 p-3 rounded-lg border border-yellow-400/20">
        <pre className="text-sm text-yellow-400 whitespace-pre-wrap">
          {JSON.stringify(context, null, 2)}
        </pre>
      </div>
    </div>
  );
};