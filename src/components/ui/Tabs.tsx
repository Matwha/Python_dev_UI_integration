import React from 'react';
import { clsx } from 'clsx';

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 bg-black/40 p-1.5 rounded-lg backdrop-blur-sm border border-yellow-400/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
            'hover:bg-yellow-400/5 hover:shadow-[0_0_15px_rgba(250,204,21,0.1)]',
            activeTab === tab.id
              ? 'bg-yellow-400/10 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.15)]'
              : 'text-yellow-400/60'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};