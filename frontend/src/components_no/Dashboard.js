import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Header from './Header';
import { 
  UserIcon, 
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading laboratory interface...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="flex h-screen pt-16">
        <Navigation />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user.full_name?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                {currentTime}
              </p>
            </div>

            {/* Main Dashboard Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Widget Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Session Overview</h2>
                      <p className="text-slate-600">Your current laboratory session details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-4 py-2 rounded-full">
                    <CheckCircleIcon className="h-4 w-4" />
                    Active
                  </div>
                </div>
              </div>

              {/* Widget Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* User Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">
                          {user.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{user.full_name}</h3>
                        <p className="text-slate-600">@{user.username}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-500">User ID</span>
                        <span className="text-sm font-mono text-slate-900 bg-slate-50 px-2 py-1 rounded">
                          #{user.id || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-500">Email</span>
                        <span className="text-sm text-slate-900">{user.email || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-sm font-medium text-slate-500">Access Level</span>
                        <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          Standard User
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Organization Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                        <BuildingOfficeIcon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{user.company.name}</h3>
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          {user.company.code}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-500">Organization ID</span>
                        <span className="text-sm font-mono text-slate-900 bg-slate-50 px-2 py-1 rounded">
                          #{user.company.id || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-500">Session Status</span>
                        <span className="inline-flex items-center gap-2 text-emerald-700 text-sm font-medium">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          Connected
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-sm font-medium text-slate-500">Login Time</span>
                        <span className="text-sm text-slate-900">
                          {new Date().toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
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