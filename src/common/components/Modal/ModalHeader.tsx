```typescript
import React from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-yellow-400/10">
      <h3 className="text-lg font-semibold text-yellow-400">{title}</h3>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
```