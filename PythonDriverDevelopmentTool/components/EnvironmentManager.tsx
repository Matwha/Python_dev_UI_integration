import React, { useState, useEffect } from 'react';

interface Package {
  name: string;
  version: string;
}

interface Environment {
  name: string;
  packages: Package[];
}

const EnvironmentManager: React.FC = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [selectedEnv, setSelectedEnv] = useState<string>('');
  const [newEnvName, setNewEnvName] = useState<string>('');
  const [newPackageName, setNewPackageName] = useState<string>('');

  useEffect(() => {
    // Simulating fetching environments
    setEnvironments([
      { name: 'default', packages: [{ name: 'numpy', version: '1.21.0' }, { name: 'pandas', version: '1.3.0' }] },
      { name: 'llama', packages: [{ name: 'torch', version: '1.9.0' }, { name: 'transformers', version: '4.9.2' }] },
    ]);
  }, []);

  const selectEnvironment = (envName: string) => {
    setSelectedEnv(envName);
  };

  const createEnvironment = () => {
    if (newEnvName) {
      setEnvironments([...environments, { name: newEnvName, packages: [] }]);
      setNewEnvName('');
    }
  };

  const installPackage = () => {
    if (newPackageName && selectedEnv) {
      setEnvironments(environments.map(env => 
        env.name === selectedEnv 
          ? { ...env, packages: [...env.packages, { name: newPackageName, version: '0.0.0' }] }
          : env
      ));
      setNewPackageName('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Environment Manager</h2>
      
      <div>
        <label htmlFor="environment-select" className="block text-sm font-medium text-gray-700">Select Environment</label>
        <select
          id="environment-select"
          value={selectedEnv}
          onChange={(e) => selectEnvironment(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select an environment</option>
          {environments.map((env) => (
            <option key={env.name} value={env.name}>{env.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="new-env-name" className="block text-sm font-medium text-gray-700">Create New Environment</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="new-env-name"
            value={newEnvName}
            onChange={(e) => setNewEnvName(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="New environment name"
          />
          <button
            onClick={createEnvironment}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>

      {selectedEnv && (
        <div>
          <h3 className="text-lg font-medium">Installed Packages</h3>
          <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
            {environments.find(env => env.name === selectedEnv)?.packages.map((pkg) => (
              <li key={pkg.name} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <span className="ml-2 flex-1 w-0 truncate">{pkg.name}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="font-medium">{pkg.version}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <label htmlFor="new-package-name" className="block text-sm font-medium text-gray-700">Install New Package</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="new-package-name"
                value={newPackageName}
                onChange={(e) => setNewPackageName(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Package name"
              />
              <button
                onClick={installPackage}
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

