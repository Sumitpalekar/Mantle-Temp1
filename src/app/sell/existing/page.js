'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiPackage, 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown,
  FiArrowRight,
  FiInfo
} from 'react-icons/fi';
import { FaExchangeAlt, FaBook, FaChartLine } from 'react-icons/fa';

const SellExistingPage = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('');

  const userCredits = [
    { type: 'CARBON', amount: 1250, value: 15625, price: 12.50, unit: 'tCO2e' },
    { type: 'WATER', amount: 8500, value: 102000, price: 12.00, unit: 'm³' },
    { type: 'RENEWABLE', amount: 3200, value: 41600, price: 13.00, unit: 'MWh' },
    { type: 'GREEN', amount: 950, value: 12825, price: 13.50, unit: 'Units' },
  ];

  const sellingMethods = [
    {
      id: 'amm',
      title: 'AMM Swap',
      icon: <FaExchangeAlt className="h-8 w-8 text-green-400" />,
      description: 'Sell instantly to liquidity pools',
      features: ['Instant execution', 'Market price', 'Low fees (0.3%)'],
      color: 'from-green-500 to-emerald-600',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'orderbook',
      title: 'Orderbook',
      icon: <FaBook className="h-8 w-8 text-blue-400" />,
      description: 'Place limit sell orders',
      features: ['Set your price', 'No price impact', 'Advanced trading'],
      color: 'from-blue-500 to-cyan-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'auction',
      title: 'Dutch Auction',
      icon: <FaChartLine className="h-8 w-8 text-purple-400" />,
      description: 'Auction your credits',
      features: ['Price discovery', 'Bulk sales', 'Competitive bidding'],
      color: 'from-purple-500 to-indigo-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const handleSelectCredit = (creditType) => {
    // Navigate to selected selling method
    if (selectedMethod === 'amm') {
      router.push(`/sell/existing/amm?credit=${creditType}`);
    } else if (selectedMethod === 'orderbook') {
      router.push(`/sell/existing/orderbook?credit=${creditType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <FiPackage className="mr-3 text-cyan-400" /> Sell Existing Credits
          </h1>
          <p className="text-gray-400">Choose credits to sell and select your preferred selling method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1: Your Credits */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Your Environmental Credits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userCredits.map((credit) => (
                  <div 
                    key={credit.type}
                    onClick={() => selectedMethod && handleSelectCredit(credit.type)}
                    className={`bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                      selectedMethod 
                        ? 'hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20' 
                        : 'border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{credit.type} Credits</h3>
                        <p className="text-gray-400 text-sm">{credit.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">${credit.value.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Value</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Amount</p>
                        <p className="text-lg font-semibold">{credit.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Price</p>
                        <p className="text-lg font-semibold">${credit.price}</p>
                      </div>
                    </div>
                    
                    {selectedMethod && (
                      <button className="w-full mt-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        Sell {credit.type}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Market Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FiInfo className="mr-3 text-yellow-400" /> Market Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/60 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <FiTrendingUp className="mr-2 text-green-400" />
                    <span className="text-gray-400">Carbon Price</span>
                  </div>
                  <p className="text-2xl font-bold">$12.85</p>
                  <p className="text-green-400 text-sm">+2.4% today</p>
                </div>
                <div className="bg-gray-900/60 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <FiTrendingDown className="mr-2 text-red-400" />
                    <span className="text-gray-400">Water Price</span>
                  </div>
                  <p className="text-2xl font-bold">$11.95</p>
                  <p className="text-red-400 text-sm">-1.2% today</p>
                </div>
                <div className="bg-gray-900/60 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <FiDollarSign className="mr-2 text-blue-400" />
                    <span className="text-gray-400">24h Volume</span>
                  </div>
                  <p className="text-2xl font-bold">$1.8M</p>
                  <p className="text-green-400 text-sm">+15.3%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Selling Methods */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Choose Selling Method</h2>
              
              <div className="space-y-6">
                {sellingMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? `border-${method.color.split('-')[1]}-500 bg-gradient-to-br ${method.color}/20`
                        : 'border-gray-700 hover:border-gray-600 bg-gray-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${selectedMethod === method.id ? 'bg-white/10' : 'bg-gray-800'}`}>
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{method.title}</h3>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <FiArrowRight className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {method.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-2 rounded-lg font-semibold ${method.buttonColor}`}>
                      Select {method.title}
                    </button>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              {!selectedMethod ? (
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-blue-300">How to sell:</span>
                    <br />
                    1. Select a selling method from above
                    <br />
                    2. Choose credits from your portfolio
                    <br />
                    3. Configure sale parameters
                  </p>
                </div>
              ) : (
                <div className="mt-8 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-green-300">Next Step:</span>
                    <br />
                    Click on any credit card to sell using {sellingMethods.find(m => m.id === selectedMethod)?.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:opacity-90">
              Bulk Sell All
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold hover:opacity-90">
              Create Sell Bundle
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-semibold hover:opacity-90">
              Schedule Sale
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
              View Sales History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellExistingPage;