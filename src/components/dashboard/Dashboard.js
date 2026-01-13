'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWeb3 } from '../../context/Web3Context'
import StatsOverview from './StatsOverview'
import CreditBalances from './CreditBalances'
import RecentActivity from './RecentActivity'
import { 
  FiLogIn, 
  FiShoppingCart, 
  FiDollarSign, 
  FiArrowRight, 
  FiTrendingUp,
  FiBarChart2,
  FiFileText,
  FiPackage
} from 'react-icons/fi'
import { FaExchangeAlt, FaBook, FaClipboardCheck, FaStore } from 'react-icons/fa'

export default function Dashboard() {
  const { isConnected, connectWallet, account } = useWeb3()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('buy')

  const handleNavigation = (path) => {
    router.push(path)
  }

  if (!isConnected) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <FiLogIn className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            Connect your wallet to access the GreenXchange dashboard and start trading environmental credits on Mantle L2.
          </p>
          <button
            onClick={connectWallet}
            className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Welcome Banner with Stats */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome to GreenXchange</h1>
              <p className="mt-1 text-gray-300">
                Trade environmental credits on Mantle L2 • Wallet: {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <StatsOverview />
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HIGHLIGHTED BUY/SELL SECTION */}
        <div className="mb-12 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-1 shadow-2xl">
          <div className="bg-gray-900/90 rounded-2xl p-8">
            {/* Tab Headers */}
            <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-4 rounded-lg text-lg font-bold transition-all ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <FiShoppingCart className="h-6 w-6" />
                  <span>Buy Credits</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-4 rounded-lg text-lg font-bold transition-all ${
                  activeTab === 'sell'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <FiDollarSign className="h-6 w-6" />
                  <span>Sell Credits</span>
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'buy' ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2">Purchase Environmental Credits</h2>
                  <p className="text-gray-300 mb-6">
                    Choose your preferred method to buy verified environmental credits
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* AMM Swap */}
                    <div 
                      onClick={() => handleNavigation('/buy/amm')}
                      className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-2 border-green-800/30 hover:border-green-500 rounded-2xl p-8 transition-all group-hover:shadow-2xl group-hover:shadow-green-500/20">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-green-900/50 group-hover:bg-green-800 transition">
                              <FaExchangeAlt className="h-8 w-8 text-green-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">AMM Swap</h3>
                              <p className="text-green-400">Instant Trading</p>
                            </div>
                          </div>
                          <FiArrowRight className="h-6 w-6 text-gray-400 group-hover:text-green-400 transition-transform group-hover:translate-x-2" />
                        </div>
                        
                        <p className="text-gray-300 mb-6">
                          Trade instantly using automated liquidity pools. Perfect for quick swaps at market rates.
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">0.3% Fee</span>
                            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">Fast</span>
                          </div>
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
                            Trade Now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Orderbook */}
                    <div 
                      onClick={() => handleNavigation('/buy/orderbook')}
                      className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-2 border-blue-800/30 hover:border-blue-500 rounded-2xl p-8 transition-all group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-blue-900/50 group-hover:bg-blue-800 transition">
                              <FaBook className="h-8 w-8 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">Orderbook</h3>
                              <p className="text-blue-400">Limit Orders</p>
                            </div>
                          </div>
                          <FiArrowRight className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-transform group-hover:translate-x-2" />
                        </div>
                        
                        <p className="text-gray-300 mb-6">
                          Place limit orders at your desired price. Get better rates with advanced order types.
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">0.1% Fee</span>
                            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">Advanced</span>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                            Trade Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2">Sell Environmental Credits</h2>
                  <p className="text-gray-300 mb-6">
                    Register new credits or sell your existing ones
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Register New Credits */}
                    <div 
                      onClick={() => handleNavigation('/onboarding')}
                      className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/20 border-2 border-purple-800/30 hover:border-purple-500 rounded-2xl p-8 transition-all group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-purple-900/50 group-hover:bg-purple-800 transition">
                              <FiFileText className="h-8 w-8 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">Register New Credits</h3>
                              <p className="text-purple-400">Onboarding</p>
                            </div>
                          </div>
                          <FiArrowRight className="h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-transform group-hover:translate-x-2" />
                        </div>
                        
                        <p className="text-gray-300 mb-6">
                          Register and verify new environmental projects to mint tradable credits.
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">Verification</span>
                            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">Audit</span>
                          </div>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
                            Register
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sell Existing Credits */}
                    <div 
                      onClick={() => handleNavigation('/sell/existing')}
                      className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="bg-gradient-to-br from-cyan-900/30 to-teal-900/20 border-2 border-cyan-800/30 hover:border-cyan-500 rounded-2xl p-8 transition-all group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-xl bg-cyan-900/50 group-hover:bg-cyan-800 transition">
                              <FaStore className="h-8 w-8 text-cyan-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">Sell Existing Credits</h3>
                              <p className="text-cyan-400">Marketplace</p>
                            </div>
                          </div>
                          <FiArrowRight className="h-6 w-6 text-gray-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-2" />
                        </div>
                        
                        <p className="text-gray-300 mb-6">
                          Sell your verified credits through AMM pools or orderbook trading.
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm">AMM/Orderbook</span>
                            <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm">Flexible</span>
                          </div>
                          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold">
                            Sell Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Dashboard Widgets Below */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <FiTrendingUp className="mr-3 text-green-400" /> Market Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '24h Volume', value: '$1.24M', change: '+12.5%', positive: true },
                  { label: 'Total Credits', value: '4.8M', change: '+8.3%', positive: true },
                  { label: 'Active Trades', value: '1,248', change: '-2.1%', positive: false },
                  { label: 'Avg. Price', value: '$14.56', change: '+3.7%', positive: true },
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <CreditBalances />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}