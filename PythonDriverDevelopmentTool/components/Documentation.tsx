const Documentation = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
      <section>
        <h3 className="text-xl font-semibold text-gray-800">Environment Manager</h3>
        <p className="mt-2 text-gray-600">
          Use the Environment Manager to create, select, and manage Python virtual environments. You can also install
          and update packages within the selected environment.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold text-gray-800">Package Explorer</h3>
        <p className="mt-2 text-gray-600">
          The Package Explorer allows you to browse installed packages and their contents. You can view classes,
          methods, functions, and variables for each package.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold text-gray-800">Code Editor</h3>
        <p className="mt-2 text-gray-600">
          Use the Code Editor to write and execute Python code. The editor provides a simple interface for testing your
          driver code.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold text-gray-800">Best Practices</h3>
        <ul className="mt-2 list-disc list-inside text-gray-600">
          <li>Always use virtual environments to isolate your project dependencies.</li>
          <li>Keep your packages up-to-date to ensure compatibility and security.</li>
          <li>Use meaningful names for your classes, functions, and variables.</li>
          <li>Write docstrings for your classes and functions to provide clear documentation.</li>
        </ul>
      </section>
    </div>
  )
}

export default Documentation

