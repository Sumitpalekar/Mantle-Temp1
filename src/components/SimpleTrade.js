// components/SimpleTrade.js
'use client';
import { useState, useEffect } from 'react';
import { useWeb3 } from "../contexts/Web3Context";
import { ethers } from 'ethers';

import GreenXchangeOrderbookAbi from '../../../../ABI/GreenXchangeOrderbookAbi';
import GreenCreditTokenAbi from '../../../../ABI/GreenCreditTokenAbi';

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

export default function SimpleTrade() {
  const { account, signer, getContract } = useWeb3();
  const [step, setStep] = useState(1);
  const [action, setAction] = useState('buy');
  const [creditType, setCreditType] = useState('carbon');
  const [amount, setAmount] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [backgroundSteps, setBackgroundSteps] = useState([]);
  const [tradeResult, setTradeResult] = useState(null);
  const [pyusdBalance, setPyusdBalance] = useState('0');
  const [creditBalances, setCreditBalances] = useState({});

  // Contract addresses from environment
  const CONTRACT_ADDRESSES = {
    orderbook: process.env.NEXT_PUBLIC_ORDERBOOK_ADDRESS,
    greenCreditToken: process.env.NEXT_PUBLIC_GREEN_CREDIT_TOKEN_ADDRESS,
    pyusd: process.env.NEXT_PUBLIC_PYUSD_ADDRESS
  };

  // Credit types configuration
  const creditTypes = [
    { id: 'carbon', name: 'Carbon', emoji: '🌍', price: 15.75, tokenId: 1, decimals: 6 },
    { id: 'water', name: 'Water', emoji: '💧', price: 8.20, tokenId: 2, decimals: 6 },
    { id: 'renewable', name: 'Renewable', emoji: '⚡', price: 22.50, tokenId: 3, decimals: 6 },
    { id: 'green', name: 'Green', emoji: '🌿', price: 12.30, tokenId: 4, decimals: 6 }
  ];

  const selectedCredit = creditTypes.find(c => c.id === creditType);
  const total = amount * selectedCredit.price;

  // Fetch balances on component mount
  useEffect(() => {
    if (account && signer) {
      fetchBalances();
    }
  }, [account, signer]);

  // Fetch user balances
  const fetchBalances = async () => {
    try {
      // Get contract instances
      const pyusdContract = getContract(CONTRACT_ADDRESSES.pyusd, ERC20_ABI);
      const tokenContract = getContract(CONTRACT_ADDRESSES.greenCreditToken, GreenCreditTokenAbi);

      if (pyusdContract && CONTRACT_ADDRESSES.pyusd) {
        const balance = await pyusdContract.balanceOf(account);
        setPyusdBalance(ethers.utils.formatUnits(balance, 6)); // PYUSD has 6 decimals
      } else {
        setPyusdBalance('1250.80'); // Demo data if contract not available
      }

      // Fetch credit balances
      if (tokenContract && CONTRACT_ADDRESSES.greenCreditToken) {
        const balances = {};
        for (const credit of creditTypes) {
          try {
            const balance = await tokenContract.balanceOf(account, credit.tokenId);
            balances[credit.id] = balance.toString();
          } catch (err) {
            console.log(`Error fetching ${credit.name} balance:`, err);
            balances[credit.id] = '0';
          }
        }
        setCreditBalances(balances);
      } else {
        // Demo data
        setCreditBalances({
          carbon: '2500000000',
          water: '1000000000',
          renewable: '500000000',
          green: '1500000000'
        });
      }

    } catch (error) {
      console.log('Failed to fetch balances, using demo data:', error);
      // Fallback to demo data
      setPyusdBalance('1250.80');
      setCreditBalances({
        carbon: '25',
        water: '10',
        renewable: '5',
        green: '15'
      });
    }
  };

  // Check if user has enough balance
  const hasEnoughBalance = () => {
    if (action === 'buy') {
      // Check PYUSD balance for buying
      const neededPYUSD = total;
      const currentPYUSD = parseFloat(pyusdBalance);
      return currentPYUSD >= neededPYUSD;
    } else {
      // Check credit balance for selling
      const currentBalance = parseInt(creditBalances[creditType] || '0');
      const actualAmount = amount * Math.pow(10, selectedCredit.decimals);
      return currentBalance >= actualAmount;
    }
  };

  // Get readable balance for display
  const getReadableBalance = (creditId) => {
    const balance = creditBalances[creditId];
    if (!balance) return '0';
    const credit = creditTypes.find(c => c.id === creditId);
    return (parseInt(balance) / Math.pow(10, credit.decimals)).toString();
  };

  // Execute trade with blockchain
  const executeTrade = async () => {
    if (!signer || !account) {
      alert('Please connect your wallet first');
      return;
    }

    // Check balance before proceeding
    if (!hasEnoughBalance()) {
      setTradeResult({
        success: false,
        message: action === 'buy' 
          ? `Insufficient PYUSD balance. You need $${total} but have $${parseFloat(pyusdBalance).toFixed(2)}`
          : `Insufficient ${selectedCredit.name} credits. You need ${amount} but have ${getReadableBalance(creditType)}`
      });
      setStep(6);
      return;
    }

    setIsProcessing(true);
    setBackgroundSteps(['Starting trade process...']);

    try {
      // Get contract instances
      const pyusdContract = getContract(CONTRACT_ADDRESSES.pyusd, ERC20_ABI);
      const tokenContract = getContract(CONTRACT_ADDRESSES.greenCreditToken, GreenCreditTokenAbi);
      const orderbookContract = getContract(CONTRACT_ADDRESSES.orderbook, GreenXchangeOrderbookAbi);

      // Check if contracts are available
      if (!orderbookContract || !pyusdContract || !tokenContract) {
        throw new Error('Contracts not initialized. Check your environment variables.');
      }

      // Convert amounts to contract units
      const tokenId = selectedCredit.tokenId;
      const amountInUnits = ethers.utils.parseUnits(amount.toString(), selectedCredit.decimals);
      const priceInUnits = ethers.utils.parseUnits(selectedCredit.price.toString(), 6); // PYUSD has 6 decimals
      const totalPrice = priceInUnits.mul(amount);

      setBackgroundSteps(prev => [...prev, '1. Checking network...']);
      
      // Ensure we're on Sepolia
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xaa36a7') {
        setBackgroundSteps(prev => [...prev, 'Switching to Sepolia network...']);
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          });
        } catch (switchError) {
          console.log('Network switch error:', switchError);
        }
      }

      setBackgroundSteps(prev => [...prev, '2. Checking approvals...']);
      
      // Check and set approvals if needed
      if (action === 'buy') {
        const allowance = await pyusdContract.allowance(account, CONTRACT_ADDRESSES.orderbook);
        if (allowance.lt(totalPrice)) {
          setBackgroundSteps(prev => [...prev, 'Approving PYUSD spend...']);
          const approveTx = await pyusdContract.approve(CONTRACT_ADDRESSES.orderbook, totalPrice);
          await approveTx.wait();
        }
      } else {
        const isApproved = await tokenContract.isApprovedForAll(account, CONTRACT_ADDRESSES.orderbook);
        if (!isApproved) {
          setBackgroundSteps(prev => [...prev, 'Approving token transfer...']);
          const approveTx = await tokenContract.setApprovalForAll(CONTRACT_ADDRESSES.orderbook, true);
          await approveTx.wait();
        }
      }

      setBackgroundSteps(prev => [...prev, '3. Placing order...']);
      
      // Place the order
      const tx = await orderbookContract.placeOrder(
        tokenId,
        amountInUnits,
        priceInUnits,
        action === 'buy', // true for buy, false for sell
        ethers.constants.AddressZero // No referrer
      );

      setBackgroundSteps(prev => [...prev, '4. Waiting for confirmation...']);
      const receipt = await tx.wait();

      setBackgroundSteps(prev => [...prev, '✅ Transaction confirmed!']);
      setTradeResult({
        success: true,
        hash: receipt.transactionHash,
        message: `Successfully ${action === 'buy' ? 'bought' : 'sold'} ${amount} ${selectedCredit.name} Credits`,
        total: `$${total.toFixed(2)}`
      });
      
      // Refresh balances after successful trade
      fetchBalances();
      setTimeout(() => setStep(5), 1000);

    } catch (error) {
      console.error('Trade execution error:', error);
      setBackgroundSteps(prev => [...prev, '❌ Transaction failed']);
      setTradeResult({
        success: false,
        message: error.message || 'Something went wrong'
      });
      setTimeout(() => setStep(6), 1000);
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-execute trade when step 4 is reached
  useEffect(() => {
    if (step === 4 && !isProcessing) {
      executeTrade();
    }
  }, [step]);

  // --- UI COMPONENTS ---

  // STEP 1: Choose action
  if (step === 1) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">What would you like to do?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => { setAction('buy'); setStep(2); }}
            className="p-6 bg-emerald-500/20 border-2 border-emerald-500 rounded-xl hover:bg-emerald-500/30 transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🛒</div>
            <h3 className="font-bold text-white text-lg">Buy Credits</h3>
            <p className="text-sm text-gray-300">Purchase verified credits</p>
            <p className="text-xs text-emerald-400 mt-2">
              Available: ${parseFloat(pyusdBalance || '0').toFixed(2)} PYUSD
            </p>
          </button>
          
          <button
            onClick={() => { setAction('sell'); setStep(2); }}
            className="p-6 bg-blue-500/20 border-2 border-blue-500 rounded-xl hover:bg-blue-500/30 transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">💰</div>
            <h3 className="font-bold text-white text-lg">Sell Credits</h3>
            <p className="text-sm text-gray-300">Sell from your portfolio</p>
            <p className="text-xs text-blue-400 mt-2">
              Available: {getReadableBalance(creditType)} {selectedCredit.name}
            </p>
          </button>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setStep(2)}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            I know what I want, skip to next step →
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: Choose credit type
  if (step === 2) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Choose Credit Type</h2>
          <button
            onClick={() => setStep(1)}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Back
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {creditTypes.map((credit) => {
            const balance = getReadableBalance(credit.id);
            
            return (
              <button
                key={credit.id}
                onClick={() => setCreditType(credit.id)}
                className={`p-4 rounded-xl text-center transition-all ${
                  creditType === credit.id
                    ? 'bg-emerald-500 text-white scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{credit.emoji}</div>
                <div className="font-medium">{credit.name}</div>
                <div className="text-sm opacity-75">${credit.price}</div>
                {parseFloat(balance) > 0 && (
                  <div className="text-xs mt-1 text-gray-300">
                    You own: {balance}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => setStep(3)}
          className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg"
        >
          Continue to Amount
        </button>
      </div>
    );
  }

  // STEP 3: Choose amount
  if (step === 3) {
    const availableBalance = action === 'buy' 
      ? parseFloat(pyusdBalance || '0')
      : parseFloat(getReadableBalance(creditType));
    
    const maxAmount = action === 'buy'
      ? Math.floor(availableBalance / selectedCredit.price)
      : Math.floor(availableBalance);

    return (
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Choose Amount</h2>
          <button
            onClick={() => setStep(2)}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Back
          </button>
        </div>
        
        {/* Balance info */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Available {action === 'buy' ? 'PYUSD' : selectedCredit.name}:</span>
            <span className="text-white font-bold">
              {action === 'buy' 
                ? `$${availableBalance.toFixed(2)}`
                : `${availableBalance} credits`
              }
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {action === 'buy'
              ? `You can buy up to ${Math.max(0, Math.floor(availableBalance / selectedCredit.price))} credits`
              : `You can sell up to ${Math.floor(availableBalance)} credits`
            }
          </div>
        </div>
        
        {/* Big amount display */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-white mb-2">{amount}</div>
          <div className="text-gray-400">credits</div>
        </div>
        
        {/* Simple slider */}
        <input
          type="range"
          min="1"
          max={Math.min(100, Math.max(1, maxAmount))}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none mb-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
        />
        
        {/* Quick amount buttons */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[5, 10, 25, 50].filter(num => num <= maxAmount).map((num) => (
            <button
              key={num}
              onClick={() => setAmount(num)}
              className={`py-3 rounded-lg transition-colors ${
                amount === num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {num}
            </button>
          ))}
          {maxAmount > 0 && (
            <button
              onClick={() => setAmount(Math.min(maxAmount, 100))}
              className="py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Max
            </button>
          )}
        </div>
        
        {/* Summary */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Action</span>
            <span className={`font-medium ${action === 'buy' ? 'text-emerald-400' : 'text-blue-400'}`}>
              {action === 'buy' ? 'Buying' : 'Selling'}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Credit Type</span>
            <span className="text-white font-medium">{selectedCredit.name}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Price per credit</span>
            <span className="text-white">${selectedCredit.price}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Amount</span>
            <span className="text-white">{amount} credits</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-700">
            <span className="text-gray-400">Total</span>
            <span className="text-2xl font-bold text-emerald-400">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          onClick={() => {
            if (!hasEnoughBalance()) {
              alert(`Insufficient ${action === 'buy' ? 'PYUSD' : selectedCredit.name} balance`);
              return;
            }
            setStep(4);
          }}
          disabled={!hasEnoughBalance()}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-colors shadow-lg ${
            hasEnoughBalance()
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {hasEnoughBalance()
            ? (action === 'buy' ? `Buy ${amount} Credits` : `Sell ${amount} Credits`)
            : 'Insufficient Balance'
          }
        </button>
      </div>
    );
  }

  // STEP 4: Processing
  if (step === 4) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">⏳</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {isProcessing ? 'Processing Your Trade' : 'Trade Complete!'}
          </h2>
          
          {/* Real background steps */}
          <div className="space-y-4 mb-8 max-w-md mx-auto">
            {backgroundSteps.map((stepText, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center flex-shrink-0">
                  {stepText.includes('✅') ? (
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  ) : stepText.includes('❌') ? (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  ) : (
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className="text-gray-300 text-left">{stepText}</span>
              </div>
            ))}
          </div>
          
          {isProcessing ? (
            <div className="text-sm text-gray-400">
              Background processes: network check → approvals → trade execution
            </div>
          ) : tradeResult?.success ? (
            <div className="text-emerald-400 text-sm">
              Transaction confirmed on blockchain
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // STEP 5: Success
  if (step === 5 && tradeResult?.success) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">Trade Successful!</h2>
          <p className="text-gray-300 mb-6">{tradeResult.message}</p>
          
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-white font-bold">{tradeResult.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span className="text-emerald-400 font-medium">Confirmed</span>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
            <h3 className="font-medium text-white mb-3">Your Environmental Impact</h3>
            <div className="space-y-2">
              {selectedCredit.id === 'carbon' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Carbon Offset:</span>
                    <span className="text-white font-medium">{amount} tons CO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Equivalent to:</span>
                    <span className="text-emerald-400">Planting {amount * 5} trees</span>
                  </div>
                </>
              )}
              {selectedCredit.id === 'water' && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Water Saved:</span>
                  <span className="text-white font-medium">{amount * 1000} liters</span>
                </div>
              )}
              {selectedCredit.id === 'renewable' && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Clean Energy:</span>
                  <span className="text-white font-medium">{amount} MWh generated</span>
                </div>
              )}
              {selectedCredit.id === 'green' && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Environmental Impact:</span>
                  <span className="text-white font-medium">{amount} verified projects</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                setStep(1);
                setTradeResult(null);
                setBackgroundSteps([]);
              }}
              className="py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Make Another Trade
            </button>
            <button
              onClick={() => window.open(`https://sepolia.etherscan.io/tx/${tradeResult.hash}`, '_blank')}
              className="py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              View on Etherscan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 6: Failure
  if (step === 6 && !tradeResult?.success) {
    return (
      <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
        <div className="text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Trade Failed</h2>
          <p className="text-gray-300 mb-6">{tradeResult?.message || 'Something went wrong'}</p>
          
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm mb-2">
              Common issues:
            </p>
            <ul className="text-red-300 text-sm space-y-1 text-left">
              <li>• Insufficient PYUSD balance for buying</li>
              <li>• Insufficient credit balance for selling</li>
              <li>• Network congestion (try again in 30 seconds)</li>
              <li>• Wallet not connected to Sepolia network</li>
              <li>• Transaction ran out of gas</li>
              <li>• Smart contract interaction error</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                setStep(3);
                setTradeResult(null);
                setBackgroundSteps([]);
              }}
              className="py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                setStep(1);
                setTradeResult(null);
                setBackgroundSteps([]);
              }}
              className="py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
      <div className="text-center">
        <div className="text-4xl mb-4">❓</div>
        <p className="text-gray-300">Loading trade interface...</p>
      </div>
    </div>
  );
}