import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { StateData } from '../../types/stateMachine';

const CustomNode = ({ data }: NodeProps<StateData>) => {
  return (
    <div className="relative">
      {/* Input handles with visible indicators */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#FBBF24' }}
          className="w-3 h-3 border-2 border-black hover:w-4 hover:h-4 transition-all"
        />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-yellow-400/50">▼</div>
      </div>
      
      <div className="absolute top-1/2 -left-3 -translate-y-1/2">
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#FBBF24' }}
          className="w-3 h-3 border-2 border-black hover:w-4 hover:h-4 transition-all"
        />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-yellow-400/50">►</div>
      </div>

      {/* Node content */}
      <div className="px-6 py-3 min-w-[120px] text-center bg-gray-900/90 rounded-lg border-2 transition-all">
        <span className="font-medium">{data.label}</span>
        {data.stages && data.stages.length > 0 && (
          <div className="text-xs text-yellow-400/70 mt-1">
            {data.stages.length} stages
          </div>
        )}
      </div>

      {/* Output handles with visible indicators */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#FBBF24' }}
          className="w-3 h-3 border-2 border-black hover:w-4 hover:h-4 transition-all"
        />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-yellow-400/50">▲</div>
      </div>
      
      <div className="absolute top-1/2 -right-3 -translate-y-1/2">
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#FBBF24' }}
          className="w-3 h-3 border-2 border-black hover:w-4 hover:h-4 transition-all"
        />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 text-xs text-yellow-400/50">◄</div>
      </div>
    </div>
  );
};

export default memo(CustomNode);