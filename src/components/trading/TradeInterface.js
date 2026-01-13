'use client';

import React, { useState } from 'react';
import AMM from './AMM';
import Orderbook from './Orderbook';
import { FaExchangeAlt, FaBook, FaChartLine } from 'react-icons/fa';

const TradeInterfaces = () => {
  const [activeTab, setActiveTab] = useState('amm');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trade Environmental Credits</h1>
          <p className="text-gray-400">Choose between instant AMM swaps or limit orders on the orderbook</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('amm')}
            className={`flex items-center px-6 py-3 rounded-lg font-bold ${activeTab === 'amm' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-800'}`}
          >
            <FaExchangeAlt className="mr-2" /> AMM Swap
          </button>
          <button
            onClick={() => setActiveTab('orderbook')}
            className={`flex items-center px-6 py-3 rounded-lg font-bold ${activeTab === 'orderbook' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-gray-800'}`}
          >
            <FaBook className="mr-2" /> Orderbook
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex items-center px-6 py-3 rounded-lg font-bold ${activeTab === 'charts' ? 'bg-gradient-to-r from-purple-500 to-indigo-600' : 'bg-gray-800'}`}
          >
            <FaChartLine className="mr-2" /> Charts
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-2xl p-6">
          {activeTab === 'amm' && <AMM />}
          {activeTab === 'orderbook' && <Orderbook />}
          {activeTab === 'charts' && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Price Charts</h3>
              <p className="text-gray-400 mb-8">Advanced charting will be implemented in Phase 5</p>
              <div className="bg-gray-900 rounded-xl p-8">
                <p className="text-xl">📈 Real-time price charts coming soon!</p>
                <p className="text-gray-400 mt-4">Featuring candlestick charts, volume analysis, and technical indicators</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeInterfaces;