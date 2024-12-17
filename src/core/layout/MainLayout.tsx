import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/Navigation';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};