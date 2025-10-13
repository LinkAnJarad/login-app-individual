import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Header from './Header';

function Dashboard() {
  const { isAuthenticated, isLoading, user, theme } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div 
      className="min-h-screen transition-colors-custom"
      style={{ backgroundColor: `${theme.primaryColor}05` }}
    >
      <Header />
      
      <div className="flex h-screen pt-16">
        <Navigation />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user.full_name}!
              </h1>
              <p className="mt-2 text-gray-600">
                You're logged in to {user.company.name} ({user.company.code})
              </p>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div 
                className="bg-white overflow-hidden shadow rounded-lg border-l-4"
                style={{ borderLeftColor: theme.primaryColor }}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${theme.primaryColor}20` }}
                      >
                        <span style={{ color: theme.primaryColor }}>👤</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          User Profile
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {user.username}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white overflow-hidden shadow rounded-lg border-l-4"
                style={{ borderLeftColor: theme.accentColor }}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${theme.accentColor}20` }}
                      >
                        <span style={{ color: theme.accentColor }}>🏢</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Company
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {user.company.name}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white overflow-hidden shadow rounded-lg border-l-4"
                style={{ borderLeftColor: theme.primaryColor }}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${theme.primaryColor}20` }}
                      >
                        <span style={{ color: theme.primaryColor }}>🎨</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Theme Color
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {theme.primaryColor}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="mt-8">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Getting Started</h2>
                </div>
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      Welcome to your dashboard! Here are some things you can do:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Use the navigation panel on the left to explore available modules</li>
                      <li>Search for specific modules using the search bar</li>
                      <li>Click on any submodule to navigate to that section</li>
                      <li>Notice how the theme colors change based on your company</li>
                      <li>Access your profile and logout options from the header</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;