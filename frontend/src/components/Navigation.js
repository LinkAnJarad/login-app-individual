import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { navigationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const { theme } = useAuth();
  const [navigation, setNavigation] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSystems, setExpandedSystems] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [isSearching, setIsSearching] = useState(false);

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
      
      // Auto-expand all systems if there are results
      if (response.data.length > 0) {
        const systemIds = new Set(response.data.map(system => system.id));
        setExpandedSystems(systemIds);
      }
    } catch (error) {
      console.error('Failed to fetch navigation:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchNavigation();
      return;
    }

    setIsSearching(true);
    try {
      const response = await navigationAPI.searchNavigation(searchQuery);
      setNavigation(response.data);
      
      // Auto-expand all systems and modules when searching
      if (response.data.length > 0) {
        const systemIds = new Set(response.data.map(system => system.id));
        const moduleIds = new Set();
        response.data.forEach(system => {
          system.modules.forEach(module => {
            moduleIds.add(module.id);
          });
        });
        setExpandedSystems(systemIds);
        setExpandedModules(moduleIds);
      }
    } catch (error) {
      console.error('Failed to search navigation:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleSystem = (systemId) => {
    const newExpanded = new Set(expandedSystems);
    if (newExpanded.has(systemId)) {
      newExpanded.delete(systemId);
    } else {
      newExpanded.add(systemId);
    }
    setExpandedSystems(newExpanded);
  };

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getIconComponent = (iconName) => {
    // You can expand this to include more icons
    const icons = {
      users: '👥',
      settings: '⚙️',
      'chart-bar': '📊',
      database: '🗄️',
      'trending-up': '📈',
      megaphone: '📢',
    };
    
    return icons[iconName] || '📄';
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Search Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{ 
              '--tw-ring-color': theme.primaryColor,
              borderColor: searchQuery ? theme.primaryColor : undefined 
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tree */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {navigation.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? 'No modules found' : 'No modules available'}
          </div>
        ) : (
          <div className="p-2">
            {navigation.map((system) => (
              <div key={system.id} className="mb-2">
                {/* System Level */}
                <button
                  onClick={() => toggleSystem(system.id)}
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-md"
                  style={{ 
                    backgroundColor: expandedSystems.has(system.id) ? `${theme.primaryColor}10` : 'transparent'
                  }}
                >
                  <span className="font-medium text-gray-800">{system.name}</span>
                  {expandedSystems.has(system.id) ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                  )}
                </button>

                {/* Modules Level */}
                {expandedSystems.has(system.id) && (
                  <div className="ml-4 mt-1">
                    {system.modules.map((module) => (
                      <div key={module.id} className="mb-1">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-md"
                          style={{ 
                            backgroundColor: expandedModules.has(module.id) ? `${theme.primaryColor}15` : 'transparent'
                          }}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{getIconComponent(module.icon)}</span>
                            <span className="text-gray-700">{module.name}</span>
                          </div>
                          {expandedModules.has(module.id) ? (
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </button>

                        {/* Submodules Level */}
                        {expandedModules.has(module.id) && (
                          <div className="ml-6 mt-1">
                            {module.submodules.map((submodule) => (
                              <button
                                key={submodule.id}
                                onClick={() => {
                                  // Handle submodule click (navigation would go here)
                                  console.log('Navigate to:', submodule.route || submodule.name);
                                }}
                                className="w-full flex items-center p-2 text-left hover:bg-gray-50 rounded-md transition-colors-custom"
                                style={{ 
                                  '--tw-bg-opacity': 0.1,
                                  color: theme.primaryColor
                                }}
                              >
                                <span className="text-sm">{submodule.name}</span>
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
    </div>
  );
}

export default Navigation;