'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWeb3 } from '../../../context/Web3Context'
import { 
  FiArrowLeft, 
  FiInfo, 
  FiZap, 
  FiArrowDown,
  FiSettings,
  FiRefreshCw
} from 'react-icons/fi'

// Mock token data - replace with actual contract data
const tokens = [
  {
    address: '0xUSDC',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
    balance: '1000.00',
    price: 1.00,
    logo: '💵'
  },
  {
    address: '0xCARBON',
    name: 'Carbon Credit',
    symbol: 'CARBON',
    decimals: 18,
    balance: '0.00',
    price: 25.50,
    logo: '🌳'
  },
  {
    address: '0xWATER',
    name: 'Water Credit',
    symbol: 'WATER',
    decimals: 18,
    balance: '50.00',
    price: 12.75,
    logo: '💧'
  },
  {
    address: '0xRENEW',
    name: 'Renewable Credit',
    symbol: 'RENEW',
    decimals: 18,
    balance: '25.00',
    price: 18.25,
    logo: '⚡'
  },
  {
    address: '0xGREEN',
    name: 'Green Credit',
    symbol: 'GREEN',
    decimals: 18,
    balance: '100.00',
    price: 8.50,
    logo: '🌿'
  }
]

export default function AMMPage() {
  const router = useRouter()
  const { account, isConnected } = useWeb3()
  const [fromToken, setFromToken] = useState(tokens[0]) // USDC
  const [toToken, setToToken] = useState(tokens[1]) // CARBON
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [deadline, setDeadline] = useState(20)
  const [isSwapping, setIsSwapping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Calculate output amount based on input
  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const inputValue = parseFloat(fromAmount)
      if (!isNaN(inputValue) && inputValue > 0) {
        const priceRatio = toToken.price / fromToken.price
        const calculatedAmount = inputValue * priceRatio
        setToAmount(calculatedAmount.toFixed(6))
      } else {
        setToAmount('')
      }
    } else {
      setToAmount('')
    }
  }, [fromAmount, fromToken, toToken])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
  }

  const handleMaxAmount = () => {
    setFromAmount(fromToken.balance)
  }

  const handleSwap = async () => {
    if (!isConnected || !account) {
      alert('Please connect your wallet first')
      return
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (parseFloat(fromAmount) > parseFloat(fromToken.balance)) {
      alert('Insufficient balance')
      return
    }

    setIsSwapping(true)
    try {
      // This is where you would integrate with actual AMM contract
      console.log(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`)
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      alert('Swap successful! Transaction completed.')
      
      // Reset form
      setFromAmount('')
      setToAmount('')
      
    } catch (error) {
      console.error('Swap failed:', error)
      alert('Swap failed: ' + error.message)
    } finally {
      setIsSwapping(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">AMM Swap</h1>
                <p className="mt-1 text-gray-400">Swap tokens instantly with automated market maker</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <FiSettings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
        {/* Swap Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur">
          {/* Settings Modal */}
          {showSettings && (
            <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-4">
              <h3 className="font-semibold text-white mb-4">Transaction Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Slippage Tolerance (%)
                  </label>
                  <div className="flex space-x-2">
                    {[0.1, 0.5, 1.0].map((value) => (
                      <button
                        key={value}
                        onClick={() => setSlippage(value)}
                        className={`flex-1 rounded-lg py-2 text-sm ${
                          slippage === value
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        value={slippage}
                        onChange={(e) => setSlippage(parseFloat(e.target.value))}
                        step="0.1"
                        min="0.1"
                        max="50"
                        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white text-center"
                      />
                      <span className="absolute right-3 top-2 text-gray-400">%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Transaction Deadline (minutes)
                  </label>
                  <input
                    type="number"
                    value={deadline}
                    onChange={(e) => setDeadline(parseInt(e.target.value))}
                    min="1"
                    max="60"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* From Token */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">From</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  Balance: {fromToken.balance}
                </span>
                <button
                  onClick={handleMaxAmount}
                  className="text-xs text-green-400 hover:text-green-300"
                >
                  MAX
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-xl">
                  {fromToken.logo}
                </div>
                <div>
                  <select
                    value={fromToken.address}
                    onChange={(e) => {
                      const token = tokens.find(t => t.address === e.target.value)
                      setFromToken(token)
                    }}
                    className="bg-transparent text-lg font-semibold text-white focus:outline-none"
                  >
                    {tokens.map(token => (
                      <option key={token.address} value={token.address}>
                        {token.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-400">${fromToken.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-48 bg-transparent text-right text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
                />
                <p className="text-sm text-gray-400">
                  ≈ ${fromAmount ? (parseFloat(fromAmount) * fromToken.price).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="relative my-4 flex justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <button
              onClick={handleSwapTokens}
              className="relative rounded-full border border-gray-800 bg-gray-900 p-3 hover:border-gray-700"
            >
              <FiRefreshCw className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* To Token */}
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">To</span>
              <span className="text-sm text-gray-400">
                Balance: {toToken.balance}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-xl">
                  {toToken.logo}
                </div>
                <div>
                  <select
                    value={toToken.address}
                    onChange={(e) => {
                      const token = tokens.find(t => t.address === e.target.value)
                      setToToken(token)
                    }}
                    className="bg-transparent text-lg font-semibold text-white focus:outline-none"
                  >
                    {tokens.map(token => (
                      <option key={token.address} value={token.address}>
                        {token.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-400">${toToken.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{toAmount || '0.0'}</div>
                <p className="text-sm text-gray-400">
                  ≈ ${toAmount ? (parseFloat(toAmount) * toToken.price).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          <div className="space-y-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiInfo className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Exchange Rate</span>
              </div>
              <span className="text-sm text-white">
                1 {fromToken.symbol} = {(toToken.price / fromToken.price).toFixed(6)} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Price Impact</span>
              <span className="text-sm text-green-400">&lt; 0.01%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Slippage Tolerance</span>
              <span className="text-sm text-white">{slippage}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Mantle L2 Fee</span>
              <span className="text-sm text-white">~$0.01</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!fromAmount || isSwapping || !isConnected}
            className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSwapping ? (
              <div className="flex items-center justify-center">
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Swapping...
              </div>
            ) : !isConnected ? (
              'Connect Wallet to Swap'
            ) : (
              'Swap Tokens'
            )}
          </button>
        </div>

        {/* Network Info */}
        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <FiZap className="h-5 w-5 text-green-400" />
            <span className="font-medium text-white">Trading on Mantle L2</span>
          </div>
          <div className="text-sm text-gray-400 space-y-1">
            <p>• 99.9% lower gas fees vs Ethereum</p>
            <p>• ~1 second transaction finality</p>
            <p>• Ethereum-level security</p>
            <p>• Full EVM compatibility</p>
          </div>
        </div>
      </div>
    </div>
  )
}