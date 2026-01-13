'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiArrowUp, 
  FiArrowDown, 
  FiSettings, 
  FiInfo, 
  FiClock,
  FiDollarSign,
  FiPercent
} from 'react-icons/fi';
import { 
  FaExchangeAlt, 
  FaGasPump, 
  FaHistory, 
  FaChartLine,
  FaLock,
  FaUnlock
} from 'react-icons/fa';
import { useWeb3 } from '@/context/Web3Context';

const AMM = () => {
  const { account } = useWeb3();
  const [fromToken, setFromToken] = useState('CARBON');
  const [toToken, setToToken] = useState('WATER');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [deadline, setDeadline] = useState(20);
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1.24);
  const [liquidity, setLiquidity] = useState({
    CARBON: { amount: 1250000, value: 17500000 },
    WATER: { amount: 8500000, value: 10200000 },
    RENEWABLE: { amount: 3200000, value: 44800000 },
    GREEN: { amount: 950000, value: 12350000 }
  });

  const tokens = [
    { symbol: 'CARBON', name: 'Carbon Credits', icon: '🌿', color: 'green', balance: '1,250', unit: 'tCO2e' },
    { symbol: 'WATER', name: 'Water Credits', icon: '💧', color: 'blue', balance: '8,500', unit: 'm³' },
    { symbol: 'RENEWABLE', name: 'Renewable Credits', icon: '⚡', color: 'yellow', balance: '3,200', unit: 'MWh' },
    { symbol: 'GREEN', name: 'Green Credits', icon: '♻️', color: 'emerald', balance: '950', unit: 'Units' },
  ];

  useEffect(() => {
    // Simulate price calculation
    if (fromAmount && !isNaN(fromAmount)) {
      const calculated = parseFloat(fromAmount) * exchangeRate;
      setToAmount(calculated.toFixed(4));
      
      // Simulate price impact based on amount
      const impact = (parseFloat(fromAmount) / liquidity[fromToken].amount) * 100;
      setPriceImpact(Math.min(impact, 5).toFixed(2));
    }
  }, [fromAmount, fromToken, toToken, exchangeRate]);

  const handleSwap = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      // This would interact with actual smart contracts
      console.log(`Swapping ${fromAmount} ${fromToken} to ${toToken}`);
      
      // Simulate transaction
      alert(`Swap initiated! ${fromAmount} ${fromToken} → ${toAmount} ${toToken}`);
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      
    } catch (error) {
      console.error('Swap error:', error);
      alert('Swap failed: ' + error.message);
    }
  };

  const handleMax = () => {
    const balance = parseFloat(tokens.find(t => t.symbol === fromToken)?.balance.replace(',', '') || '0');
    setFromAmount(balance.toString());
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount('');
    setToAmount('');
    setExchangeRate(1 / exchangeRate);
  };

  const calculateFee = () => {
    const amount = parseFloat(fromAmount) || 0;
    return (amount * 0.003).toFixed(4); // 0.3% fee
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <FaExchangeAlt className="mr-3 text-green-400" /> AMM Swap
          </h1>
          <p className="text-gray-400">Trade environmental credits instantly with automated liquidity pools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Swap Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
              {/* Token Selection Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-green-600 rounded-lg font-semibold">
                    Swap
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                    Add Liquidity
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                    Remove Liquidity
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsExpertMode(!isExpertMode)}
                    className={`p-2 rounded-lg ${isExpertMode ? 'bg-red-500/20' : 'bg-gray-700'}`}
                    title="Expert Mode"
                  >
                    {isExpertMode ? <FaLock className="text-red-400" /> : <FaUnlock className="text-gray-400" />}
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    <FiSettings className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* From Token */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-gray-300 font-medium">From</label>
                  <div className="text-right">
                    <span className="text-gray-400 mr-2">Balance: {tokens.find(t => t.symbol === fromToken)?.balance} {tokens.find(t => t.symbol === fromToken)?.unit}</span>
                    <button 
                      onClick={handleMax}
                      className="text-green-400 hover:text-green-300 text-sm font-semibold"
                    >
                      MAX
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-3xl font-bold outline-none placeholder-gray-500"
                    />
                    <div className="flex items-center space-x-3">
                      <select
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold"
                      >
                        {tokens.map((token) => (
                          <option key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center -my-2 z-10 relative">
                <button
                  onClick={switchTokens}
                  className="bg-gray-800 border-4 border-gray-900 p-3 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <FiArrowDown className="h-5 w-5" />
                </button>
              </div>

              {/* To Token */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-gray-300 font-medium">To (estimated)</label>
                  <span className="text-gray-400">Balance: {tokens.find(t => t.symbol === toToken)?.balance} {tokens.find(t => t.symbol === toToken)?.unit}</span>
                </div>
                <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={toAmount}
                      readOnly
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-3xl font-bold outline-none placeholder-gray-500"
                    />
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className="bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="mt-8 bg-gray-900/60 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 flex items-center">
                      <FiDollarSign className="mr-2" /> Exchange Rate
                    </span>
                    <span className="font-semibold">1 {fromToken} = {exchangeRate.toFixed(4)} {toToken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 flex items-center">
                      <FiPercent className="mr-2" /> Price Impact
                    </span>
                    <span className={priceImpact > 2 ? 'text-yellow-400' : 'text-green-400'}>
                      {priceImpact}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 flex items-center">
                      <FiPercent className="mr-2" /> Liquidity Provider Fee
                    </span>
                    <span>{calculateFee()} {fromToken} (0.3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 flex items-center">
                      <FaGasPump className="mr-2" /> Network Fee
                    </span>
                    <span>~$0.02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 flex items-center">
                      <FiClock className="mr-2" /> Slippage Tolerance
                    </span>
                    <span className="text-green-400">{slippage}%</span>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <button
                onClick={handleSwap}
                disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                className={`w-full mt-8 py-4 rounded-xl text-xl font-bold transition-all ${
                  !fromAmount || parseFloat(fromAmount) <= 0
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-green-500/30'
                }`}
              >
                {!account ? 'Connect Wallet' : 'Swap'}
              </button>
            </div>
          </div>

          {/* Right Panel - Stats & Info */}
          <div className="space-y-6">
            {/* Pool Liquidity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaChartLine className="mr-3 text-blue-400" /> Pool Liquidity
              </h3>
              <div className="space-y-4">
                {Object.entries(liquidity).map(([token, data]) => (
                  <div key={token} className="bg-gray-900/60 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{token}</span>
                      <span className="text-green-400">${(data.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {data.amount.toLocaleString()} {tokens.find(t => t.symbol === token)?.unit}
                    </div>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(data.amount / 15000000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiInfo className="mr-3 text-purple-400" /> Market Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="font-semibold">$1.24M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Value Locked</span>
                  <span className="font-semibold">$84.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Pools</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">APR</span>
                  <span className="text-green-400 font-semibold">12.8%</span>
                </div>
              </div>
            </div>

            {/* Recent Swaps */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaHistory className="mr-3 text-yellow-400" /> Recent Swaps
              </h3>
              <div className="space-y-3">
                {[
                  { from: '500 CARBON', to: '620 WATER', user: '0x8a3f...c4d2', time: '2 min ago' },
                  { from: '1,200 WATER', to: '968 CARBON', user: '0x5b9f...e7a1', time: '5 min ago' },
                  { from: '800 RENEWABLE', to: '1,040 GREEN', user: '0x3c7d...f9b2', time: '12 min ago' },
                  { from: '350 GREEN', to: '280 CARBON', user: '0x9e2a...d5c3', time: '25 min ago' },
                ].map((swap, index) => (
                  <div key={index} className="bg-gray-900/60 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-300">{swap.from}</span>
                      <span className="text-blue-300">{swap.to}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{swap.user}</span>
                      <span>{swap.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMM;