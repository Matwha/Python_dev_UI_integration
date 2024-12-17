```tsx
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/common/components/Button';
import { State } from '../../types';

interface CodePreviewProps {
  states: State[];
}

export const CodePreview: React.FC<CodePreviewProps> = ({ states }) => {
  const generateMachineCode = () => {
    return {
      id: 'stateMachine',
      initial: states.find(s => s.initial)?.name,
      states: states.reduce((acc, state) => ({
        ...acc,
        [state.name]: {
          type: state.type,
          transitions: state.transitions,
          guards: state.guards
        }
      }), {})
    };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generateMachineCode(), null, 2));
  };

  return (
    <div className="bg-gray-900/90 p-6 rounded-lg border border-yellow-400/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-yellow-400">Machine Code</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-2 hover:bg-yellow-400/10"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>

      <div className="bg-gray-950 p-4 rounded-lg border border-yellow-400/10">
        <pre className="text-sm text-yellow-400 font-mono whitespace-pre-wrap overflow-auto max-h-[600px]">
          {JSON.stringify(generateMachineCode(), null, 2)}
        </pre>
      </div>
    </div>
  );
};
```