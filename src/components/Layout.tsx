import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Activity, Database, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black bg-honeycomb bg-[length:28px_50px] text-yellow-400">
      <nav className="fixed top-0 left-0 h-full w-20 bg-gray-900/95 border-r border-yellow-400/20">
        <div className="flex flex-col items-center gap-8 py-8">
          <Link
            to="/"
            className="p-3 hover:bg-yellow-400/10 rounded-lg transition-colors"
          >
            <LayoutDashboard size={24} />
          </Link>
          <Link
            to="/configuration"
            className="p-3 hover:bg-yellow-400/10 rounded-lg transition-colors"
          >
            <Settings size={24} />
          </Link>
          <Link
            to="/monitoring"
            className="p-3 hover:bg-yellow-400/10 rounded-lg transition-colors"
          >
            <Activity size={24} />
          </Link>
          <Link
            to="/data"
            className="p-3 hover:bg-yellow-400/10 rounded-lg transition-colors"
          >
            <Database size={24} />
          </Link>
        </div>
        <div className="absolute bottom-8 left-0 w-full flex justify-center">
          <button
            onClick={handleLogout}
            className="p-3 hover:bg-yellow-400/10 rounded-lg transition-colors"
          >
            <LogOut size={24} />
          </button>
        </div>
      </nav>
      <div className="ml-20">
        <header className="bg-gray-900/95 border-b border-yellow-400/20 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">SCADA ATE System</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user?.username}</span>
            </div>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};