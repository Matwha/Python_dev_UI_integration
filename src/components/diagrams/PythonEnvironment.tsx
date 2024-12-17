import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Package, Terminal, Check, X } from 'lucide-react';

interface PythonPackage {
  name: string;
  version: string;
  status: 'installed' | 'not-installed' | 'installing' | 'error';
}

export const PythonEnvironment: React.FC = () => {
  const [packages, setPackages] = useState<PythonPackage[]>([
    { name: 'numpy', version: '1.24.0', status: 'installed' },
    { name: 'pandas', version: '2.0.0', status: 'not-installed' },
    { name: 'pymodbus', version: '3.0.0', status: 'not-installed' },
    { name: 'python-can', version: '4.0.0', status: 'not-installed' },
  ]);
  const [newPackage, setNewPackage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddPackage = () => {
    if (newPackage) {
      setPackages([
        ...packages,
        { name: newPackage, version: 'latest', status: 'not-installed' },
      ]);
      setNewPackage('');
    }
  };

  const handleInstallPackage = async (packageName: string) => {
    setPackages(packages.map(pkg => 
      pkg.name === packageName 
        ? { ...pkg, status: 'installing' }
        : pkg
    ));

    // Simulate installation
    setTimeout(() => {
      setPackages(packages.map(pkg =>
        pkg.name === packageName
          ? { ...pkg, status: 'installed' }
          : pkg
      ));
    }, 2000);
  };

  return (
    <div className="bg-black/40 p-6 rounded-lg border-2 border-yellow-400/20">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-semibold text-yellow-400">Python Environment</h3>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <Input
            placeholder="Package name (e.g., numpy)"
            value={newPackage}
            onChange={(e) => setNewPackage(e.target.value)}
            className="bg-black/60 border-yellow-400/20 focus:border-yellow-400"
          />
          <Button onClick={handleAddPackage}>Add Package</Button>
        </div>

        <div className="space-y-2">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex items-center justify-between p-3 bg-black/60 rounded-lg border border-yellow-400/20"
            >
              <div>
                <span className="text-yellow-400">{pkg.name}</span>
                <span className="text-gray-400 ml-2">{pkg.version}</span>
              </div>
              <div className="flex items-center gap-3">
                {pkg.status === 'installed' ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : pkg.status === 'installing' ? (
                  <Terminal className="w-5 h-5 text-yellow-400 animate-pulse" />
                ) : pkg.status === 'error' ? (
                  <X className="w-5 h-5 text-red-400" />
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleInstallPackage(pkg.name)}
                  >
                    Install
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};