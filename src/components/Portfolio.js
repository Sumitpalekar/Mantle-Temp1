// Portfolio.js 
'use client';
import { useState, useEffect } from 'react';
import { useWeb3 } from "../contexts/Web3Context";
import { ethers } from 'ethers';

// Import icons
import { FiTrendingUp, FiTrendingDown, FiRefreshCw, FiFileText, FiDroplet, FiZap,  FiPackage, FiAward } from 'react-icons/fi';

// Import ABI
import GreenCreditTokenAbi from '../../../ABI/GreenCreditTokenAbi';

export default function Portfolio() {
  const { account, signer, getContract } = useWeb3();
  const [holdings, setHoldings] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Contract address from environment
  const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_GREEN_CREDIT_TOKEN_ADDRESS;

  // Credit types with icons and colors
  const creditTypes = [
    { 
      id: 1, 
      name: 'Carbon', 
      icon: <FiFileText className="w-5 h-5" />,
      color: 'emerald',
      price: 15.75,
      unit: 'tons CO₂'
    },
    { 
      id: 2, 
      name: 'Water', 
      icon: <FiDroplet className="w-5 h-5" />,
      color: 'blue',
      price: 8.20,
      unit: 'kL saved'
    },
    { 
      id: 3, 
      name: 'Renewable', 
      icon: <FiZap className="w-5 h-5" />,
      color: 'yellow',
      price: 22.50,
      unit: 'MWh'
    },
    { 
      id: 4, 
      name: 'Green', 
      icon: <FiAward className="w-5 h-5" />,
      color: 'green',
      price: 12.30,
      unit: 'units'
    }
  ];

  useEffect(() => {
    if (account && signer && TOKEN_ADDRESS) {
      fetchPortfolioData();
    } else {
      showDemoData();
    }
  }, [account, signer, TOKEN_ADDRESS]);

  const showDemoData = () => {
    const demoHoldings = [
      { 
        type: 'Carbon', 
        amount: 25, 
        value: 393.75, 
        icon: <FiFileText className="w-5 h-5" />,
        color: 'emerald',
        change: '+2.3',
        unit: 'tons CO₂'
      },
      { 
        type: 'Water', 
        amount: 10, 
        value: 82.00, 
        icon: <FiDroplet className="w-5 h-5" />,
        color: 'blue',
        change: '+1.1',
        unit: 'kL saved'
      },
      { 
        type: 'Renewable', 
        amount: 5, 
        value: 112.50, 
        icon: <FiZap className="w-5 h-5" />,
        color: 'yellow',
        change: '+3.7',
        unit: 'MWh'
      },
      { 
        type: 'Green', 
        amount: 15, 
        value: 184.50, 
        icon: <FiAward className="w-5 h-5" />,
        color: 'green',
        change: '-0.5',
        unit: 'units'
      }
    ];
    
    setHoldings(demoHoldings);
    setTotalValue(393.75 + 82.00 + 112.50 + 184.50);
    setLastUpdated(new Date());
    setLoading(false);
  };

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      
      const tokenContract = getContract(TOKEN_ADDRESS, GreenCreditTokenAbi);
      let holdingsArray = [];
      let calculatedTotalValue = 0;

      if (tokenContract) {
        for (const credit of creditTypes) {
          try {
            const balance = await tokenContract.balanceOf(account, credit.id);
            const amount = parseFloat(ethers.utils.formatUnits(balance, 6));
            
            if (amount > 0) {
              const value = amount * credit.price;
              calculatedTotalValue += value;
              
              holdingsArray.push({
                type: credit.name,
                amount: amount,
                value: value,
                icon: credit.icon,
                color: credit.color,
                change: '+0.0',
                unit: credit.unit
              });
            }
          } catch (error) {
            console.log(`Error fetching ${credit.name} balance:`, error);
          }
        }
      }

      // Set holdings or fallback to demo
      if (holdingsArray.length > 0) {
        setHoldings(holdingsArray);
        setTotalValue(calculatedTotalValue);
      } else {
        showDemoData();
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      showDemoData();
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color) => {
    const classes = {
      emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20'
    };
    return classes[color] || classes.emerald;
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
          <div className="h-32 bg-gray-800 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-800 rounded"></div>
            <div className="h-16 bg-gray-800 rounded"></div>
            <div className="h-16 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
          <button
            onClick={fetchPortfolioData}
            className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
        
        {lastUpdated && (
          <p className="text-gray-500 text-sm">
            Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
      
      {/* TOTAL VALUE */}
      <div className="p-6 border-b border-gray-800">
        <div className="text-center">
          <p className="text-gray-400 mb-2">Total Portfolio Value</p>
          <p className="text-4xl font-bold text-white mb-2">${totalValue.toFixed(2)}</p>
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Credit Types</p>
              <p className="text-lg text-white font-medium">{holdings.length}</p>
            </div>
            <div className="h-8 w-px bg-gray-800"></div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Credits</p>
              <p className="text-lg text-white font-medium">
                {holdings.reduce((sum, h) => sum + h.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* HOLDINGS */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Holdings</h3>
        
        {holdings.length > 0 ? (
          <div className="space-y-3">
            {holdings.map((holding) => (
              <div
                key={holding.type}
                className="group p-4 rounded-lg border border-gray-800 hover:border-gray-700 hover:bg-gray-900/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(holding.color)}`}>
                      {holding.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{holding.type} Credits</p>
                      <p className="text-sm text-gray-400">
                        {holding.amount.toLocaleString()} credits • {holding.unit}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-white">${holding.value.toFixed(2)}</p>
                    <div className="flex items-center justify-end space-x-1">
                      {parseFloat(holding.change) >= 0 ? (
                        <FiTrendingUp className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <FiTrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        parseFloat(holding.change) >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {holding.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <FiFileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400">No credits in your portfolio yet</p>
            <p className="text-gray-500 text-sm mt-2">Start trading to build your portfolio</p>
          </div>
        )}
        
        {/* ENVIRONMENTAL IMPACT */}
        {holdings.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
                    <FiFileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-white">Carbon Offset</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {holdings.find(h => h.type === 'Carbon')?.amount || 0}
                </p>
                <p className="text-xs text-gray-400">tons of CO₂</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                    <FiDroplet className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-white">Water Saved</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {((holdings.find(h => h.type === 'Water')?.amount || 0) * 10).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">thousand liters</p>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded flex items-center justify-center">
                    <FiZap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium text-white">Clean Energy</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {holdings.find(h => h.type === 'Renewable')?.amount || 0}
                </p>
                <p className="text-xs text-gray-400">megawatt hours</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

