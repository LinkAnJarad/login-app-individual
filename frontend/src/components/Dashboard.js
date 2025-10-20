import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Header from './Header';

function Dashboard() {
  const { isAuthenticated, isLoading, user, theme } = useAuth();
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          background: `radial-gradient(circle at center, ${theme.primaryColor}15 0%, ${theme.primaryColor}08 50%, ${theme.primaryColor}03 100%)` 
        }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmoduleSelect = (submodule, module, system) => {
    setSelectedSubmodule({
      ...submodule,
      moduleName: module.name,
      systemName: system.name,
      moduleIcon: module.icon
    });
  };

  return (
    <div 
      className="min-h-screen transition-colors-custom relative overflow-hidden"
      style={{ 
        background: `
          radial-gradient(ellipse at top left, ${theme.primaryColor}12 0%, transparent 50%),
          radial-gradient(ellipse at top right, ${theme.accentColor}10 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, ${theme.accentColor}08 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, ${theme.primaryColor}15 0%, transparent 50%),
          linear-gradient(135deg, ${theme.primaryColor}06 0%, ${theme.accentColor}04 50%, ${theme.primaryColor}08 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div 
        className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-5 animate-pulse"
        style={{ backgroundColor: theme.primaryColor }}
      ></div>
      <div 
        className="absolute top-1/3 right-20 w-48 h-48 rounded-full opacity-5 animate-pulse"
        style={{ 
          backgroundColor: theme.accentColor,
          animationDelay: '1s'
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full opacity-5 animate-pulse"
        style={{ 
          backgroundColor: theme.primaryColor,
          animationDelay: '2s'
        }}
      ></div>
      
      <Header />
      
      <div className="flex h-screen pt-16 relative z-10">
        <Navigation onSubmoduleSelect={handleSubmoduleSelect} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {selectedSubmodule ? (
              // Show selected submodule content
              <div>
                <div className="mb-8">
                  <nav className="flex items-center space-x-2 text-sm mb-4">
                    <span className="text-gray-600">{selectedSubmodule.systemName}</span>
                    <span style={{ color: theme.primaryColor }}>→</span>
                    <span className="text-gray-600">{selectedSubmodule.moduleName}</span>
                    <span style={{ color: theme.primaryColor }}>→</span>
                    <span 
                      className="font-semibold px-3 py-1 rounded-full text-white text-sm"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {selectedSubmodule.name}
                    </span>
                  </nav>
                  
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mr-6 shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}CC 100%)` 
                      }}
                    >
                      <span className="text-3xl">
                        {selectedSubmodule.moduleIcon === 'users' ? '👥' :
                         selectedSubmodule.moduleIcon === 'settings' ? '⚙️' :
                         selectedSubmodule.moduleIcon === 'chart-bar' ? '📊' :
                         selectedSubmodule.moduleIcon === 'database' ? '🗄️' :
                         selectedSubmodule.moduleIcon === 'trending-up' ? '📈' :
                         selectedSubmodule.moduleIcon === 'megaphone' ? '📢' : '📄'}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {selectedSubmodule.name}
                      </h1>
                      <p 
                        className="text-lg font-medium"
                        style={{ color: theme.primaryColor }}
                      >
                        {selectedSubmodule.moduleName} module in {selectedSubmodule.systemName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder Content */}
                <div className="space-y-8">
                  {/* Status Card */}
                  <div 
                    className="shadow-xl rounded-2xl border-l-8 p-8 relative overflow-hidden backdrop-blur-sm"
                    style={{ 
                      borderLeftColor: theme.primaryColor,
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.95) 0%, 
                        ${theme.primaryColor}15 50%, 
                        rgba(255,255,255,0.90) 100%)`
                    }}
                  >
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                      style={{ 
                        backgroundColor: theme.primaryColor,
                        transform: 'translate(25%, -25%)'
                      }}
                    ></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h3 
                          className="text-2xl font-bold mb-2"
                          style={{ color: theme.primaryColor }}
                        >
                          {selectedSubmodule.name} Status
                        </h3>
                        <p className="text-gray-700 text-lg">
                          This submodule is currently active and ready for use.
                        </p>
                      </div>
                      <div 
                        className="px-8 py-3 rounded-2xl text-lg font-bold text-white shadow-lg transform hover:scale-105 transition-transform"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}DD 100%)` 
                        }}
                      >
                        ● Active
                      </div>
                    </div>
                  </div>

                  {/* Content Areas */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Actions */}
                    <div 
                      className="shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm"
                      style={{ 
                        background: `linear-gradient(135deg, 
                          rgba(255,255,255,0.90) 0%, 
                          ${theme.primaryColor}10 50%, 
                          rgba(255,255,255,0.85) 100%)`
                      }}
                    >
                      <div 
                        className="px-8 py-6 text-white"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}DD 100%)` 
                        }}
                      >
                        <h3 className="text-xl font-bold">Quick Actions</h3>
                      </div>
                      <div className="p-8">
                        <div className="space-y-4">
                          <button 
                            className="w-full text-left p-4 rounded-xl border-2 transition-all transform hover:scale-102 hover:shadow-lg backdrop-blur-sm"
                            style={{ 
                              borderColor: `${theme.primaryColor}30`,
                              background: `linear-gradient(135deg, 
                                rgba(255,255,255,0.80) 0%, 
                                ${theme.primaryColor}12 50%, 
                                rgba(255,255,255,0.70) 100%)`
                            }}
                          >
                            <div className="font-bold text-gray-900 text-lg">Create New</div>
                            <div className="text-gray-600">Add a new item to {selectedSubmodule.name}</div>
                          </button>
                          <button 
                            className="w-full text-left p-4 rounded-xl border-2 transition-all transform hover:scale-102 hover:shadow-lg backdrop-blur-sm"
                            style={{ 
                              borderColor: `${theme.primaryColor}30`,
                              background: `linear-gradient(135deg, 
                                rgba(255,255,255,0.80) 0%, 
                                ${theme.primaryColor}12 50%, 
                                rgba(255,255,255,0.70) 100%)`
                            }}
                          >
                            <div className="font-bold text-gray-900 text-lg">View All</div>
                            <div className="text-gray-600">Browse all items in {selectedSubmodule.name}</div>
                          </button>
                          <button 
                            className="w-full text-left p-4 rounded-xl border-2 transition-all transform hover:scale-102 hover:shadow-lg backdrop-blur-sm"
                            style={{ 
                              borderColor: `${theme.primaryColor}30`,
                              background: `linear-gradient(135deg, 
                                rgba(255,255,255,0.80) 0%, 
                                ${theme.primaryColor}12 50%, 
                                rgba(255,255,255,0.70) 100%)`
                            }}
                          >
                            <div className="font-bold text-gray-900 text-lg">Settings</div>
                            <div className="text-gray-600">Configure {selectedSubmodule.name} settings</div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div 
                      className="shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm"
                      style={{ 
                        background: `linear-gradient(135deg, 
                          rgba(255,255,255,0.90) 0%, 
                          ${theme.accentColor}10 50%, 
                          rgba(255,255,255,0.85) 100%)`
                      }}
                    >
                      <div 
                        className="px-8 py-6 text-white"
                        style={{ 
                          background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.accentColor}DD 100%)` 
                        }}
                      >
                        <h3 className="text-xl font-bold">Recent Activity</h3>
                      </div>
                      <div className="p-8">
                        <div className="space-y-6">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-start space-x-4">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                                style={{ 
                                  background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.accentColor}CC 100%)` 
                                }}
                              >
                                <span className="text-sm font-bold text-white">
                                  {item}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-base font-bold text-gray-900">
                                  Sample activity {item}
                                </p>
                                <p className="text-gray-600">
                                  Something happened in {selectedSubmodule.name}
                                </p>
                                <p 
                                  className="text-sm font-medium mt-1"
                                  style={{ color: theme.accentColor }}
                                >
                                  {item} hour{item > 1 ? 's' : ''} ago
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Table Placeholder */}
                  <div 
                    className="shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm"
                    style={{ 
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.95) 0%, 
                        ${theme.primaryColor}08 50%, 
                        rgba(255,255,255,0.90) 100%)`
                    }}
                  >
                    <div 
                      className="px-8 py-6 text-white"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}DD 100%)` 
                      }}
                    >
                      <h3 className="text-xl font-bold">{selectedSubmodule.name} Data</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead 
                          style={{ 
                            background: `linear-gradient(135deg, 
                              ${theme.primaryColor}15 0%, 
                              ${theme.primaryColor}08 100%)`
                          }}
                        >
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
                              ID
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
                              Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
                              Status
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {[1, 2, 3, 4, 5].map((row) => (
                            <tr 
                              key={row} 
                              className="transition-colors backdrop-blur-sm"
                              style={{ 
                                background: `linear-gradient(135deg, 
                                  rgba(255,255,255,0.70) 0%, 
                                  ${theme.primaryColor}03 50%, 
                                  rgba(255,255,255,0.60) 100%)`
                              }}
                              onMouseEnter={(e) => {
                                e.target.parentElement.style.background = `linear-gradient(135deg, 
                                  ${theme.primaryColor}10 0%, 
                                  ${theme.primaryColor}05 100%)`;
                              }}
                              onMouseLeave={(e) => {
                                e.target.parentElement.style.background = `linear-gradient(135deg, 
                                  rgba(255,255,255,0.70) 0%, 
                                  ${theme.primaryColor}03 50%, 
                                  rgba(255,255,255,0.60) 100%)`;
                              }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap font-bold" style={{ color: theme.primaryColor }}>
                                #{row.toString().padStart(3, '0')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Sample {selectedSubmodule.name} Item {row}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span 
                                  className="inline-flex px-4 py-2 text-sm font-bold rounded-full text-white shadow-lg"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${row % 2 === 0 ? theme.primaryColor : theme.accentColor} 0%, ${row % 2 === 0 ? theme.primaryColor : theme.accentColor}DD 100%)`
                                  }}
                                >
                                  {row % 2 === 0 ? 'Active' : 'Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2024-01-{(15 + row).toString().padStart(2, '0')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Show default dashboard content
              <div>
                <div className="mb-10">
                  <h1 
                    className="text-5xl font-bold mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Welcome, {user.full_name}!
                  </h1>
                  <p className="text-xl text-gray-700 font-medium">
                    You're logged in to <span style={{ color: theme.primaryColor, fontWeight: 'bold' }}>{user.company.name}</span> ({user.company.code})
                  </p>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {/* Stats Cards */}
                  <div 
                    className="overflow-hidden shadow-xl rounded-2xl border-l-8 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                    style={{ 
                      borderLeftColor: theme.primaryColor,
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.85) 0%, 
                        ${theme.primaryColor}18 50%, 
                        rgba(255,255,255,0.75) 100%)`
                    }}
                  >
                    <div className="p-8">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ 
                              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}CC 100%)` 
                            }}
                          >
                            <span className="text-2xl">👤</span>
                          </div>
                        </div>
                        <div className="ml-6 w-0 flex-1">
                          <dl>
                            <dt className="text-base font-bold text-gray-600 truncate mb-2">
                              User Profile
                            </dt>
                            <dd 
                              className="text-2xl font-bold"
                              style={{ color: theme.primaryColor }}
                            >
                              {user.username}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="overflow-hidden shadow-xl rounded-2xl border-l-8 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                    style={{ 
                      borderLeftColor: theme.accentColor,
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.85) 0%, 
                        ${theme.accentColor}18 50%, 
                        rgba(255,255,255,0.75) 100%)`
                    }}
                  >
                    <div className="p-8">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ 
                              background: `linear-gradient(135deg, ${theme.accentColor} 0%, ${theme.accentColor}CC 100%)` 
                            }}
                          >
                            <span className="text-2xl">🏢</span>
                          </div>
                        </div>
                        <div className="ml-6 w-0 flex-1">
                          <dl>
                            <dt className="text-base font-bold text-gray-600 truncate mb-2">
                              Company
                            </dt>
                            <dd 
                              className="text-2xl font-bold"
                              style={{ color: theme.accentColor }}
                            >
                              {user.company.name}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="overflow-hidden shadow-xl rounded-2xl border-l-8 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                    style={{ 
                      borderLeftColor: theme.primaryColor,
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.85) 0%, 
                        ${theme.primaryColor}18 50%, 
                        rgba(255,255,255,0.75) 100%)`
                    }}
                  >
                    <div className="p-8">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ 
                              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.primaryColor}CC 100%)` 
                            }}
                          >
                            <span className="text-2xl">🎨</span>
                          </div>
                        </div>
                        <div className="ml-6 w-0 flex-1">
                          <dl>
                            <dt className="text-base font-bold text-gray-600 truncate mb-2">
                              Theme Color
                            </dt>
                            <dd 
                              className="text-xl font-bold"
                              style={{ color: theme.primaryColor }}
                            >
                              {theme.primaryColor}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="mt-10">
                  <div 
                    className="shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm"
                    style={{ 
                      background: `linear-gradient(135deg, 
                        rgba(255,255,255,0.90) 0%, 
                        ${theme.primaryColor}10 25%, 
                        ${theme.accentColor}08 75%, 
                        rgba(255,255,255,0.85) 100%)`
                    }}
                  >
                    <div 
                      className="px-8 py-6 text-white"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)` 
                      }}
                    >
                      <h2 className="text-2xl font-bold">Getting Started</h2>
                    </div>
                    <div className="p-8">
                      <div className="prose max-w-none">
                        <p className="text-gray-700 mb-6 text-lg">
                          Welcome to your dashboard! Here are some things you can do:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            'Use the navigation panel on the left to explore available modules',
                            'Search for specific modules using the search bar',
                            'Click on any submodule to navigate to that section',
                            'Notice how the theme colors change based on your company',
                            'Access your profile and logout options from the header'
                          ].map((item, index) => (
                            <div 
                              key={index}
                              className="flex items-start space-x-4 p-4 rounded-xl transition-all hover:shadow-lg backdrop-blur-sm"
                              style={{ 
                                background: `linear-gradient(135deg, 
                                  rgba(255,255,255,0.60) 0%, 
                                  ${theme.primaryColor}15 50%, 
                                  rgba(255,255,255,0.50) 100%)`
                              }}
                            >
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg"
                                style={{ 
                                  background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)` 
                                }}
                              >
                                {index + 1}
                              </div>
                              <p className="text-gray-700 font-medium">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;