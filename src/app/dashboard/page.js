// app/dashboard/page.js 
'use client';
import { useState, useEffect } from 'react';
import { useWeb3 } from "../../contexts/Web3Context";
import SimpleTrade from "../../components/SimpleTrade";
import Portfolio from "../../components/Portfolio";
import ProjectTools from "../../components/ProjectTools";
import OnboardingFlow from "../../components/OnboardingFlow";
import { FiTrendingUp, FiPackage, FiSettings, FiRefreshCw, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { TbExchange, TbChartBar, TbBuildingFactory } from 'react-icons/tb';

export default function Dashboard() {
  const { account, isConnected, connectWallet, loading } = useWeb3();
  const [activeTab, setActiveTab] = useState('trade');
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Auto-show onboarding for new users
  useEffect(() => {
    if (isConnected && localStorage.getItem('greenxchange-first-visit') === null) {
      setShowOnboarding(true);
      localStorage.setItem('greenxchange-first-visit', 'true');
    }
  }, [isConnected]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-pulse mb-6">
            <span className="text-2xl font-bold text-white">GX</span>
          </div>
          <p className="text-gray-300">Initializing GreenXchange...</p>
          <p className="text-gray-500 text-sm mt-2">Connecting to blockchain network</p>
        </div>
      </div>
    );
  }
  
  // If not connected, show simple connect screen
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl mb-6">
            <span className="text-2xl font-bold text-white">GX</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">GreenXchange</h1>
          <p className="text-gray-300 mb-8">Blockchain marketplace for verified environmental credits</p>
          <button
            onClick={connectWallet}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Connect Wallet to Start
          </button>
          <p className="text-gray-400 text-sm mt-6">Connect with MetaMask on Sepolia testnet</p>
        </div>
      </div>
    );
  }
  
  // Show onboarding flow for new users
  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-950">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg">
                <span className="font-bold text-white text-sm">GX</span>
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">GreenXchange</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Connected to Sepolia</span>
                </div>
              </div>
            </div>
            
            {/* Wallet Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-300">Connected Wallet</p>
                <p className="text-xs text-gray-400 font-mono">{account?.slice(0,6)}...{account?.slice(-4)}</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
      
      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TABS NAVIGATION */}
        <div className="flex border-b border-gray-800 mb-8">
          {[
            { 
              id: 'trade', 
              label: 'Trade', 
              icon: <TbExchange className="w-5 h-5" />,
              description: 'Buy & sell environmental credits' 
            },
            { 
              id: 'portfolio', 
              label: 'Portfolio', 
              icon: <TbChartBar className="w-5 h-5" />,
              description: 'Your credit holdings & impact' 
            },
            { 
              id: 'projects', 
              label: 'Projects', 
              icon: <TbBuildingFactory className="w-5 h-5" />,
              description: 'Manage & verify projects' 
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* ACTIVE TAB CONTENT */}
        <div className="mb-8">
          {activeTab === 'trade' && <SimpleTrade />}
          {activeTab === 'portfolio' && <Portfolio />}
          {activeTab === 'projects' && <ProjectTools />}
        </div>
        
        {/* QUICK ACTIONS & MARKET OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
              <FiRefreshCw className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="group p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FiTrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white">Buy Carbon</span>
                  <span className="text-xs text-gray-400 mt-1">From $15.75</span>
                </div>
              </button>
              
              <button className="group p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TbExchange className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm text-white">Sell Water</span>
                  <span className="text-xs text-gray-400 mt-1">At $8.20</span>
                </div>
              </button>
              
              <button className="group p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TbChartBar className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-sm text-white">Market View</span>
                  <span className="text-xs text-gray-400 mt-1">Live prices</span>
                </div>
              </button>
              
              <button className="group p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FiSettings className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm text-white">Add Project</span>
                  <span className="text-xs text-gray-400 mt-1">Issue credits</span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Market Status */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Market Status</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Network</p>
                    <p className="text-xs text-gray-400">Sepolia testnet</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Active</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FiPackage className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Orderbook</p>
                    <p className="text-xs text-gray-400">Live trading</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Online</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <FiAlertCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Gas Fees</p>
                    <p className="text-xs text-gray-400">Sepolia testnet</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded">Low</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      

      
      
      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded">
                <span className="font-bold text-white text-xs">GX</span>
              </div>
              <span className="text-gray-400 text-sm">GreenXchange • Blockchain Environmental Credits</span>
            </div>
            <div className="text-gray-500 text-sm">
              Powered by Ethereum Sepolia • {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}