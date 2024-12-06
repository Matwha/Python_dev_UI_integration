import React from 'react';
import { clsx } from 'clsx';

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'bg-yellow-400 text-black'
              : 'text-yellow-400 hover:bg-yellow-400/10'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};