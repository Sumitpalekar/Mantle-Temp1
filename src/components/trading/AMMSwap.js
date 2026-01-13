'use client';

import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const AMMSwap = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <FaExchangeAlt className="text-5xl text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Quick Swap</h2>
        <p className="text-gray-400">Swap credits in one click</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-900 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">You pay</span>
            <span className="text-green-400">Balance: 1,250</span>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-bold outline-none"
            />
            <span className="ml-2 font-bold">CARBON</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-900 p-2 rounded-full">
            <FaExchangeAlt className="text-xl text-green-400" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">You receive</span>
            <span className="text-blue-400">Balance: 8,500</span>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-bold outline-none"
              readOnly
            />
            <span className="ml-2 font-bold">WATER</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span>1 CARBON = 1.24 WATER</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Fee</span>
            <span>0.3% ($0.15)</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Price Impact</span>
            <span className="text-green-400">0.12%</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl text-xl hover:opacity-90 transition-opacity">
          Swap Now
        </button>
      </div>
    </div>
  );
};

export default AMMSwap;