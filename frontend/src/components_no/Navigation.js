import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { navigationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const [navigation, setNavigation] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    } catch (error) {
      console.error('Failed to search navigation:', error);
    }
  };

  // Flatten all navigation items into a single list
  const flattenNavigation = (navItems) => {
    const flattened = [];
    
    navItems.forEach(system => {
      system.modules.forEach(module => {
        module.submodules.forEach(submodule => {
          flattened.push({
            id: submodule.id,
            name: submodule.name,
            route: submodule.route,
            systemName: system.name,
            moduleName: module.name
          });
        });
      });
    });
    
    return flattened;
  };

  const flatNavigation = flattenNavigation(navigation);

  return (
    <div className="w-64 h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Search Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto">
        {flatNavigation.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? 'No modules found' : 'No modules available'}
          </div>
        ) : (
          <div className="p-2">
            {flatNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  console.log('Navigate to:', item.route || item.name);
                }}
                className="w-full text-left p-3 mb-1 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white"
              >
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.systemName} → {item.moduleName}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;