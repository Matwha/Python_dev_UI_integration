import React, { useState, useEffect } from 'react';
import { Backend } from '../App';

interface EnvironmentManagerProps {
  backend: Backend;
}

const EnvironmentManager: React.FC = () => {
  const [environments, setEnvironments] = useState<string[]>([]);
  const [selectedEnv, setSelectedEnv] = useState<string>('');
  const [packages, setPackages] = useState<string[]>([]);
  const [newEnvName, setNewEnvName] = useState<string>('');

  useEffect(() => {
    fetchEnvironments();
  }, []);

  const fetchEnvironments = async () => {
    try {
      const response = await fetch(`/api/environments`);
      const data = await response.json();
      setEnvironments(data.environments);
    } catch (error) {
      console.error('Error fetching environments:', error);
    }
  };

  const selectEnvironment = async (env: string) => {
    setSelectedEnv(env);
    try {
      const response = await fetch(`/api/packages?env=${env}`);
      const data = await response.json();
      setPackages(data.packages.map((pkg: any) => pkg.name));
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const createEnvironment = async () => {
    if (!newEnvName) return;
    try {
      await fetch('/api/create-environment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEnvName }),
      });
      setNewEnvName('');
      fetchEnvironments();
    } catch (error) {
      console.error('Error creating environment:', error);
    }
  };

  const installPackage = async (packageName: string) => {
    try {
      await fetch(`/api/install-package`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ env: selectedEnv, package: packageName }),
      });
      selectEnvironment(selectedEnv);
    } catch (error) {
      console.error('Error installing package:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Environment Manager</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your Python virtual environments</p>
      </div>

      <div className="mt-4">
        <label htmlFor="environment" className="block text-sm font-medium text-gray-700">
          Select Environment
        </label>
        <select
          id="environment"
          name="environment"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedEnv}
          onChange={(e) => selectEnvironment(e.target.value)}
        >
          <option value="">Select an environment</option>
          {environments.map((env) => (
            <option key={env} value={env}>
              {env}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="newEnvName" className="block text-sm font-medium text-gray-700">
          Create New Environment
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="newEnvName"
            id="newEnvName"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="New environment name"
            value={newEnvName}
            onChange={(e) => setNewEnvName(e.target.value)}
          />
          <button
            type="button"
            onClick={createEnvironment}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>

      {selectedEnv && (
        <div className="mt-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Installed Packages</h3>
          <div className="mt-2 max-h-60 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {packages.map((pkg) => (
                <li key={pkg} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{pkg}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <label htmlFor="packageName" className="block text-sm font-medium text-gray-700">
              Install New Package
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="packageName"
                id="packageName"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Package name"
              />
              <button
                type="button"
                onClick={() => {
                  const packageName = (document.getElementById('packageName') as HTMLInputElement).value;
                  installPackage(packageName);
                }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentManager;

