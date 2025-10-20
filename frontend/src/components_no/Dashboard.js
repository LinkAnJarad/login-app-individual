import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Header from './Header';

function Dashboard() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="flex h-screen pt-16">
        <Navigation />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">
                Dashboard
              </h1>
            </div>

            {/* Simple Labels */}
            <div className="space-y-4">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">User</div>
                <div className="text-white text-lg font-medium">{user.full_name}</div>
                <div className="text-gray-500 text-sm">{user.username}</div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-gray-400 text-sm mb-1">Company</div>
                <div className="text-white text-lg font-medium">{user.company.name}</div>
                <div className="text-gray-500 text-sm">{user.company.code}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;