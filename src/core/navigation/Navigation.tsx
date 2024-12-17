import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Activity, Database, Cpu } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            <span>State Machine</span>
          </Link>
          <Link to="/driver" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
            <Cpu className="w-6 h-6" />
            <span>Drivers</span>
          </Link>
          <Link to="/controls" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            <span>Controls</span>
          </Link>
          <Link to="/display" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
            <Database className="w-6 h-6" />
            <span>Display</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};