'use client';
import { useState } from 'react';

export default function ProjectTools() {
  const [quickAction, setQuickAction] = useState('issue');
  
  return (
    <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Project Tools</h2>
      
      {/* Two Main Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Project Onboarding */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
          <div className="text-3xl mb-4">🏭</div>
          <h3 className="text-xl font-bold text-white mb-3">Register New Project</h3>
          <p className="text-gray-300 mb-6">Onboard your green project to issue tradable credits</p>
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-lg">
            Start Onboarding
          </button>
        </div>
        
        {/* Verification Portal */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
          <div className="text-3xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-white mb-3">Verification Portal</h3>
          <p className="text-gray-300 mb-6">Access tools for certified auditors to verify projects</p>
          <button className="w-full py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors shadow-lg">
            Access Portal
          </button>
        </div>
      </div>
      
      {/* Simple Form for Quick Actions */}
      <div className="bg-gray-800/50 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
        
        {/* Action Selector */}
        <div className="flex space-x-2 mb-6">
          {['issue', 'verify', 'manage'].map((action) => (
            <button
              key={action}
              onClick={() => setQuickAction(action)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                quickAction === action
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {action === 'issue' ? 'Issue Credits' : 
               action === 'verify' ? 'Verify' : 'Manage'}
            </button>
          ))}
        </div>
        
        {/* Simple Form */}
        <div className="space-y-4">
          {quickAction === 'issue' && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Project</label>
                <select className="w-full p-3 bg-gray-900 text-white rounded-lg border border-gray-700">
                  <option>Select project...</option>
                  <option>Solar Farm Alpha</option>
                  <option>Wind Project Beta</option>
                  <option>Hydropower Gamma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount to Issue</label>
                <input
                  type="number"
                  placeholder="100"
                  className="w-full p-3 bg-gray-900 text-white rounded-lg border border-gray-700"
                />
              </div>
            </>
          )}
          
          {quickAction === 'verify' && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Project ID to Verify</label>
              <input
                type="text"
                placeholder="Enter project ID..."
                className="w-full p-3 bg-gray-900 text-white rounded-lg border border-gray-700"
              />
            </div>
          )}
          
          {quickAction === 'manage' && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Select Action</label>
              <select className="w-full p-3 bg-gray-900 text-white rounded-lg border border-gray-700">
                <option>Update project info</option>
                <option>Pause credit issuance</option>
                <option>View project details</option>
                <option>Generate reports</option>
              </select>
            </div>
          )}
          
          <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-lg">
            {quickAction === 'issue' ? 'Issue Credits' : 
             quickAction === 'verify' ? 'Start Verification' : 'Execute Action'}
          </button>
        </div>
      </div>
    </div>
  );
}