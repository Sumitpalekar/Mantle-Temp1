'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiPackage, 
  FiDollarSign, 
  FiCheck, 
  FiAlertCircle,
  FiHelpCircle,
  FiCopy,
  FiExternalLink
} from 'react-icons/fi';
import { FaLeaf, FaWater, FaSolarPanel, FaRecycle } from 'react-icons/fa';

const MintingPortal = () => {
  const router = useRouter();
  const [mintId, setMintId] = useState('');
  const [selectedCreditType, setSelectedCreditType] = useState('');
  const [amount, setAmount] = useState('');
  const [verificationDetails, setVerificationDetails] = useState(null);

  useEffect(() => {
    // Fetch mint ID from localStorage or mock
    const storedMintId = localStorage.getItem('greenx_mint_id');
    setMintId(storedMintId || 'MINT-ABC123XYZ');
    
    // Mock verification details
    setVerificationDetails({
      projectName: 'Amazon Rainforest Conservation',
      projectType: 'Carbon Sequestration',
      location: 'Brazil, Amazonas',
      verificationDate: '2025-01-15',
      auditor: 'DNV GL',
      status: 'approved'
    });
  }, []);

  const creditTypes = [
    {
      id: 'carbon',
      name: 'Carbon Credits',
      icon: <FaLeaf className="text-green-400" />,
      unit: 'tCO2e',
      description: 'Carbon dioxide equivalent tons',
      priceRange: '$12-25 per credit',
      available: 10000
    },
    {
      id: 'water',
      name: 'Water Credits',
      icon: <FaWater className="text-blue-400" />,
      unit: 'm³',
      description: 'Cubic meters of water conserved',
      priceRange: '$8-15 per credit',
      available: 50000
    },
    {
      id: 'renewable',
      name: 'Renewable Energy Credits',
      icon: <FaSolarPanel className="text-yellow-400" />,
      unit: 'MWh',
      description: 'Megawatt-hours of clean energy',
      priceRange: '$10-20 per credit',
      available: 25000
    },
    {
      id: 'green',
      name: 'Green Credits',
      icon: <FaRecycle className="text-emerald-400" />,
      unit: 'Units',
      description: 'General environmental improvement',
      priceRange: '$5-12 per credit',
      available: 15000
    }
  ];

  const handleMint = () => {
    if (!selectedCreditType || !amount) {
      alert('Please select credit type and enter amount');
      return;
    }

    const selectedType = creditTypes.find(t => t.id === selectedCreditType);
    alert(`✅ Minting ${amount} ${selectedType.unit} of ${selectedType.name}\n\nTransaction submitted to blockchain.`);
    
    // Reset and redirect
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <FiPackage className="mr-3 text-green-400" /> Credit Minting Portal
          </h1>
          <p className="text-gray-400">Mint your verified environmental credits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Verification Info */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Verification Details</h3>
              
              {verificationDetails && (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Project Name</p>
                    <p className="font-semibold">{verificationDetails.projectName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Type</p>
                      <p className="font-semibold">{verificationDetails.projectType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="font-semibold">{verificationDetails.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Auditor</p>
                    <p className="font-semibold text-green-400">{verificationDetails.auditor}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Mint ID</p>
                    <div className="flex items-center space-x-2">
                      <code className="font-mono bg-gray-900 px-3 py-1 rounded">
                        {mintId}
                      </code>
                      <button
                        onClick={() => copyToClipboard(mintId)}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm">
                  <FiCheck className="inline mr-2" /> Verified and ready for minting
                </p>
              </div>
            </div>

            {/* User Guide */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl border border-blue-700/30 p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center">
                <FiHelpCircle className="mr-2" /> Minting Guide
              </h4>
              <div className="space-y-3 text-sm">
                <p><strong>1. Select Credit Type:</strong> Choose the type of credit to mint</p>
                <p><strong>2. Enter Amount:</strong> Specify how many credits to mint</p>
                <p><strong>3. Review:</strong> Check estimated value and fees</p>
                <p><strong>4. Mint:</strong> Submit transaction to blockchain</p>
                <p className="text-gray-400 text-xs mt-4">
                  ⚠️ Minting is irreversible. Credits are immediately tradable.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Panel - Minting Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <h2 className="text-2xl font-bold mb-6">Mint Credits</h2>
              
              {/* Step 1: Select Credit Type */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Step 1: Select Credit Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {creditTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedCreditType(type.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCreditType === type.id
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{type.icon}</div>
                          <div>
                            <h4 className="font-bold">{type.name}</h4>
                            <p className="text-sm text-gray-400">{type.unit}</p>
                          </div>
                        </div>
                        {selectedCreditType === type.id && (
                          <FiCheck className="text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{type.description}</p>
                      <div className="flex justify-between text-sm mt-3">
                        <span className="text-gray-400">Price: {type.priceRange}</span>
                        <span className="text-green-400">Available: {type.available.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Enter Amount */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Step 2: Enter Amount to Mint</h3>
                <div className="bg-gray-900/60 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-300">Amount to Mint</label>
                    <span className="text-gray-400">
                      Max: {selectedCreditType ? creditTypes.find(t => t.id === selectedCreditType)?.available.toLocaleString() : '0'} credits
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="flex-1 bg-gray-800 text-3xl font-bold px-4 py-3 rounded-lg outline-none"
                    />
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">Credit Type</div>
                      <div className="font-bold">
                        {selectedCreditType ? creditTypes.find(t => t.id === selectedCreditType)?.unit : 'Select type'}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    {[100, 500, 1000, 5000].map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                      >
                        {value.toLocaleString()}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        const max = selectedCreditType ? creditTypes.find(t => t.id === selectedCreditType)?.available : 0;
                        setAmount(max?.toString() || '');
                      }}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3: Review & Mint */}
              <div className="bg-gray-900/60 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Step 3: Review & Mint</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credit Type</span>
                    <span className="font-semibold">
                      {selectedCreditType ? creditTypes.find(t => t.id === selectedCreditType)?.name : 'None selected'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-semibold">
                      {amount ? `${parseInt(amount).toLocaleString()} credits` : '0'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Value</span>
                    <span className="font-semibold text-green-400">
                      ${amount ? (parseInt(amount) * 15).toLocaleString() : '0'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Minting Fee</span>
                    <span className="font-semibold">0.5% (Free during beta)</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-700">
                    <span className="text-lg font-bold">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        ${amount ? (parseInt(amount) * 15).toLocaleString() : '0'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {amount ? `${parseInt(amount).toLocaleString()} credits` : '0 credits'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={!selectedCreditType || !amount || parseInt(amount) <= 0}
                className={`w-full py-4 rounded-xl text-xl font-bold transition-all ${
                  !selectedCreditType || !amount || parseInt(amount) <= 0
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                Mint Credits
              </button>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start">
                  <FiAlertCircle className="text-yellow-400 mt-1 mr-3" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-yellow-300">Important Notice</p>
                    <p>Minted credits are immediately tradable on GreenXchange. Ensure all details are correct before minting. This action cannot be reversed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            <FiExternalLink className="mr-2" /> View Minting Guide
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            <FiDollarSign className="mr-2" /> Price Calculator
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            <FiHelpCircle className="mr-2" /> FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintingPortal;