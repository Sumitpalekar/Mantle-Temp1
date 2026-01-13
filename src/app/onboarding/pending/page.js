'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiClock, 
  FiMail, 
  FiCheckCircle, 
  FiAlertCircle,
  FiCopy,
  FiExternalLink
} from 'react-icons/fi';

const PendingVerification = () => {
  const router = useRouter();
  const [mintId, setMintId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('pending');

  useEffect(() => {
    // Generate or fetch mint ID
    const storedMintId = localStorage.getItem('greenx_mint_id') || `MINT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setMintId(storedMintId);
    localStorage.setItem('greenx_mint_id', storedMintId);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const verificationSteps = [
    { step: 1, title: 'Document Review', status: 'completed', time: '2 hours ago' },
    { step: 2, title: 'Technical Verification', status: 'in-progress', time: 'In progress' },
    { step: 3, title: 'Auditor Approval', status: 'pending', time: 'Waiting' },
    { step: 4, title: 'Mint ID Generation', status: 'pending', time: 'Waiting' },
  ];

  const handleCheckStatus = () => {
    // Mock status check
    const statuses = ['pending', 'approved', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setVerificationStatus(randomStatus);
    
    if (randomStatus === 'approved') {
      setTimeout(() => {
        router.push('/onboarding/mint');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-6">
            <FiClock className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Verification in Progress</h1>
          <p className="text-gray-400 text-lg">Your project is being reviewed by our verification team</p>
        </div>

        {/* Mint ID Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Mint ID</h2>
              <p className="text-gray-400 mb-4">Save this ID for verification and credit minting</p>
              <div className="flex items-center space-x-4">
                <code className="text-2xl font-mono font-bold bg-gray-900 px-4 py-2 rounded-lg">
                  {mintId}
                </code>
                <button
                  onClick={() => copyToClipboard(mintId)}
                  className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  <FiCopy className="mr-2" /> Copy
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300">
                <FiClock className="mr-2" /> Awaiting Verification
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <FiCheckCircle className="mr-3 text-green-400" /> Verification Steps
          </h3>
          
          <div className="space-y-6">
            {verificationSteps.map((step) => (
              <div key={step.step} className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  step.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : step.status === 'in-progress'
                    ? 'bg-blue-500/20 text-blue-400 animate-pulse'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <FiCheckCircle />
                  ) : step.status === 'in-progress' ? (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    step.step
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{step.title}</h4>
                    <span className="text-gray-400 text-sm">{step.time}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        step.status === 'completed' 
                          ? 'bg-green-500 w-full' 
                          : step.status === 'in-progress'
                          ? 'bg-blue-500 w-1/2'
                          : 'bg-gray-600 w-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Check Status Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleCheckStatus}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold hover:opacity-90"
            >
              Check Verification Status
            </button>
            <p className="text-gray-400 text-sm mt-2">
              Status updates are also sent to your email
            </p>
          </div>
        </div>

        {/* User Guide */}
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-700/30 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FiAlertCircle className="mr-3 text-green-400" /> What Happens Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-300 mb-2">📧 Email Notifications</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• You'll receive an email when verification is complete</li>
                <li>• If documents are insufficient, you'll receive a revision request</li>
                <li>• Once approved, you'll get login credentials for the minting portal</li>
                <li>• Keep your Mint ID safe - you'll need it for minting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-300 mb-2">⏰ Expected Timeline</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Document review: 24-48 hours</li>
                <li>• Technical verification: 24 hours</li>
                <li>• Auditor approval: 24-48 hours</li>
                <li>• Total time: 3-5 business days</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4">
                <FiMail className="inline mr-1" /> Check your spam folder if you don't see emails
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-center">
            <FiMail className="inline mr-2" /> Contact Support
          </button>
          <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-center">
            <FiExternalLink className="inline mr-2" /> View Submitted Docs
          </button>
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl text-center"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingVerification;