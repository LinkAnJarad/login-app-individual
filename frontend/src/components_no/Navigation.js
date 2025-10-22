import React, { useState, useEffect } from 'react';
import { navigationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const [navigation, setNavigation] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSystems, setExpandedSystems] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set());

  useEffect(() => {
    fetchNavigation();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      fetchNavigation();
    }
  }, [searchQuery]);

  const fetchNavigation = async () => {
    try {
      const response = await navigationAPI.getNavigation();
      setNavigation(response.data);
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchNavigation();
      return;
    }

    try {
      const response = await navigationAPI.searchNavigation(searchQuery);
      setNavigation(response.data);
      // Auto-expand all when searching
      const systemIds = new Set();
      const moduleIds = new Set();
      response.data.forEach(system => {
        systemIds.add(system.id);
        system.modules.forEach(module => {
          moduleIds.add(`${system.id}-${module.id}`);
        });
      });
      setExpandedSystems(systemIds);
      setExpandedModules(moduleIds);
    } catch (error) {
      console.error('Failed to search navigation:', error);
    }
  };

  const toggleSystem = (systemId) => {
    const newExpanded = new Set(expandedSystems);
    if (newExpanded.has(systemId)) {
      newExpanded.delete(systemId);
      // Also collapse all modules in this system
      const newExpandedModules = new Set(expandedModules);
      navigation.find(s => s.id === systemId)?.modules.forEach(module => {
        newExpandedModules.delete(`${systemId}-${module.id}`);
      });
      setExpandedModules(newExpandedModules);
    } else {
      newExpanded.add(systemId);
    }
    setExpandedSystems(newExpanded);
  };

  const toggleModule = (systemId, moduleId) => {
    const newExpanded = new Set(expandedModules);
    const key = `${systemId}-${moduleId}`;
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedModules(newExpanded);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setExpandedSystems(new Set());
    setExpandedModules(new Set());
  };

  return (
    <div className="w-72 h-full bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Navigation</h3>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        {navigation.length === 0 ? (
          <div className="p-4 text-center text-slate-500 text-sm">
            {searchQuery ? 'No matching modules found' : 'No modules available'}
          </div>
        ) : (
          <div className="p-3">
            {navigation.map((system) => (
              <div key={system.id} className="mb-3">
                {/* System Level */}
                <button
                  onClick={() => toggleSystem(system.id)}
                  className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">{system.name}</span>
                    <span className="text-slate-400 text-sm">
                      {expandedSystems.has(system.id) ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {/* Modules Level */}
                {expandedSystems.has(system.id) && (
                  <div className="mt-2 ml-4 space-y-2">
                    {system.modules.map((module) => (
                      <div key={module.id}>
                        <button
                          onClick={() => toggleModule(system.id, module.id)}
                          className="w-full text-left p-2 hover:bg-slate-50 rounded text-sm border border-slate-100"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700">{module.name}</span>
                            <span className="text-slate-400 text-xs">
                              {expandedModules.has(`${system.id}-${module.id}`) ? '−' : '+'}
                            </span>
                          </div>
                        </button>

                        {/* Submodules Level */}
                        {expandedModules.has(`${system.id}-${module.id}`) && (
                          <div className="mt-1 ml-4 space-y-1">
                            {module.submodules.map((submodule) => (
                              <button
                                key={submodule.id}
                                onClick={() => {
                                  console.log('Navigate to:', submodule.route || submodule.name);
                                }}
                                className="w-full text-left p-2 hover:bg-blue-50 hover:text-blue-700 rounded text-sm text-slate-600 transition-colors"
                              >
                                {submodule.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-3">
        <div className="text-xs text-slate-500 text-center">
          {navigation.reduce((total, system) => 
            total + system.modules.reduce((moduleTotal, module) => 
              moduleTotal + module.submodules.length, 0
            ), 0
          )} total modules
        </div>
      </div>
    </div>
  );
}

export default Navigation;