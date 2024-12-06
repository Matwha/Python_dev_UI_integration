import React, { useState, useEffect } from 'react';
import { Backend } from '../App';

interface PackageMetadata {
  name: string;
  classes: string[];
  functions: string[];
  variables: string[];
}

// interface PackageExplorerProps {
//   backend: Backend;
// }

const PackageExplorer: React.FC = () => {
  const [packages, setPackages] = useState<PackageMetadata[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageMetadata | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemType, setItemType] = useState<'class' | 'function' | 'variable' | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(`/api/package-metadata`);
      const data = await response.json();
      setPackages(data.packages);
    } catch (error) {
      console.error('Error fetching package metadata:', error);
    }
  };

  const selectPackage = (pkg: PackageMetadata) => {
    setSelectedPackage(pkg);
    setSelectedItem(null);
    setItemType(null);
  };

  const selectItem = (item: string, type: 'class' | 'function' | 'variable') => {
    setSelectedItem(item);
    setItemType(type);
  };

  return (
    <div>
      <h2>Package Explorer </h2>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%' }}>
          <h3>Packages</h3>
          <ul>
            {packages.map((pkg) => (
              <li key={pkg.name} onClick={() => selectPackage(pkg)}>
                {pkg.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedPackage && (
          <div style={{ width: '30%' }}>
            <h3>{selectedPackage.name}</h3>
            <h4>Classes</h4>
            <ul>
              {selectedPackage.classes.map((cls) => (
                <li key={cls} onClick={() => selectItem(cls, 'class')}>
                  {cls}
                </li>
              ))}
            </ul>
            <h4>Functions</h4>
            <ul>
              {selectedPackage.functions.map((func) => (
                <li key={func} onClick={() => selectItem(func, 'function')}>
                  {func}
                </li>
              ))}
            </ul>
            <h4>Variables</h4>
            <ul>
              {selectedPackage.variables.map((variable) => (
                <li key={variable} onClick={() => selectItem(variable, 'variable')}>
                  {variable}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem && (
          <div style={{ width: '40%' }}>
            <h3>{selectedItem}</h3>
            <p>Type: {itemType}</p>
            {/* Add more details about the selected item here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageExplorer;

