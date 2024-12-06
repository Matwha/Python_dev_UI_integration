'use client'

import { useState, useEffect } from 'react'

interface PackageMetadata {
  name: string
  classes: string[]
  functions: string[]
  variables: string[]
}

const PackageExplorer = () => {
  const [packages, setPackages] = useState<PackageMetadata[]>([])
  const [selectedPackage, setSelectedPackage] = useState<PackageMetadata | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [itemType, setItemType] = useState<'class' | 'function' | 'variable' | null>(null)

  useEffect(() => {
    // Simulating fetching package metadata
    setPackages([
      {
        name: 'package1',
        classes: ['Class1', 'Class2'],
        functions: ['function1', 'function2'],
        variables: ['variable1', 'variable2'],
      },
      {
        name: 'package2',
        classes: ['ClassA', 'ClassB'],
        functions: ['functionA', 'functionB'],
        variables: ['variableA', 'variableB'],
      },
    ])
  }, [])

  const selectPackage = (pkg: PackageMetadata) => {
    setSelectedPackage(pkg)
    setSelectedItem(null)
    setItemType(null)
  }

  const selectItem = (item: string, type: 'class' | 'function' | 'variable') => {
    setSelectedItem(item)
    setItemType(type)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Explorer</h2>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Packages</h3>
          <ul className="space-y-2">
            {packages.map((pkg) => (
              <li
                key={pkg.name}
                onClick={() => selectPackage(pkg)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                {pkg.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedPackage && (
          <div className="w-1/3 px-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedPackage.name}</h3>
            <h4 className="text-md font-medium text-gray-700 mt-4 mb-2">Classes</h4>
            <ul className="space-y-1">
              {selectedPackage.classes.map((cls) => (
                <li
                  key={cls}
                  onClick={() => selectItem(cls, 'class')}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                >
                  {cls}
                </li>
              ))}
            </ul>
            <h4 className="text-md font-medium text-gray-700 mt-4 mb-2">Functions</h4>
            <ul className="space-y-1">
              {selectedPackage.functions.map((func) => (
                <li
                  key={func}
                  onClick={() => selectItem(func, 'function')}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                >
                  {func}
                </li>
              ))}
            </ul>
            <h4 className="text-md font-medium text-gray-700 mt-4 mb-2">Variables</h4>
            <ul className="space-y-1">
              {selectedPackage.variables.map((variable) => (
                <li
                  key={variable}
                  onClick={() => selectItem(variable, 'variable')}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                >
                  {variable}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedItem && (
          <div className="w-1/3 pl-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedItem}</h3>
            <p className="text-gray-600">Type: {itemType}</p>
            {/* Add more details about the selected item here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default PackageExplorer

