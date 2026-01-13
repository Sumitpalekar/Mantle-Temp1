'use client';

import React, { useState, useEffect } from 'react';
import { FiArrowUp, FiArrowDown, FiSearch, FiFilter, FiDownload, FiHelpCircle } from 'react-icons/fi';
import { FaBook, FaChartBar, FaHistory, FaExchangeAlt } from 'react-icons/fa';
import { useWeb3 } from '@/context/Web3Context';

const Orderbook = () => {
  const { account } = useWeb3();
  const [activePair, setActivePair] = useState('CARBON/WATER');
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  // Mock orderbook data
  const [orderbook, setOrderbook] = useState({
    buyOrders: [
      { price: 12.50, amount: 1250, total: 15625, cumulative: 15625 },
      { price: 12.45, amount: 890, total: 11080.5, cumulative: 26705.5 },
      { price: 12.40, amount: 1540, total: 19096, cumulative: 45801.5 },
      { price: 12.35, amount: 720, total: 8892, cumulative: 54693.5 },
      { price: 12.30, amount: 1850, total: 22755, cumulative: 77448.5 },
    ],
    sellOrders: [
      { price: 12.55, amount: 980, total: 12299, cumulative: 12299 },
      { price: 12.60, amount: 1120, total: 14112, cumulative: 26411 },
      { price: 12.65, amount: 760, total: 9614, cumulative: 36025 },
      { price: 12.70, amount: 1450, total: 18415, cumulative: 54440 },
      { price: 12.75, amount: 830, total: 10582.5, cumulative: 65022.5 },
    ],
  });

  const tradingPairs = [
    { pair: 'CARBON/WATER', price: 12.55, change: '+2.4%', volume: '$1.2M' },
    { pair: 'RENEWABLE/GREEN', price: 1.30, change: '-0.8%', volume: '$845K' },
    { pair: 'WATER/GREEN', price: 0.95, change: '+1.2%', volume: '$620K' },
    { pair: 'CARBON/RENEWABLE', price: 0.85, change: '+3.1%', volume: '$1.1M' },
  ];

  const recentTrades = [
    { price: 12.55, amount: 120, side: 'buy', time: '12:45:23' },
    { price: 12.54, amount: 85, side: 'sell', time: '12:44:51' },
    { price: 12.56, amount: 210, side: 'buy', time: '12:43:37' },
    { price: 12.53, amount: 95, side: 'sell', time: '12:42:15' },
    { price: 12.57, amount: 180, side: 'buy', time: '12:41:42' },
    { price: 12.52, amount: 140, side: 'sell', time: '12:40:28' },
    { price: 12.58, amount: 75, side: 'buy', time: '12:39:55' },
  ];

  useEffect(() => {
    if (amount && price) {
      const calculatedTotal = parseFloat(amount) * parseFloat(price);
      setTotal(calculatedTotal.toFixed(2));
    } else {
      setTotal('');
    }
  }, [amount, price]);

  const handlePlaceOrder = () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!amount || !price) {
      alert('Please enter amount and price');
      return;
    }

    const order = {
      side,
      type: orderType,
      amount: parseFloat(amount),
      price: parseFloat(price),
      total: parseFloat(total),
    };

    console.log('Placing order:', order);
    alert(`${side === 'buy' ? 'Buy' : 'Sell'} order placed: ${amount} @ $${price}`);

    // Reset form
    setAmount('');
    setPrice('');
    setTotal('');
  };

  const calculateDepth = (orders, isBuy) => {
    return orders.map((order, index) => ({
      ...order,
      depth: (order.cumulative / (isBuy ? orderbook.buyOrders[orderbook.buyOrders.length - 1].cumulative : orderbook.sellOrders[orderbook.sellOrders.length - 1].cumulative)) * 100,
    }));
  };

  const buyDepth = calculateDepth(orderbook.buyOrders, true);
  const sellDepth = calculateDepth(orderbook.sellOrders, false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white p-4 md:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header with Help Button */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <FaBook className="mr-3 text-blue-400" /> Orderbook Trading
              </h1>
              <p className="text-gray-400">Advanced limit order trading for environmental credits</p>
            </div>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-lg hover:opacity-90"
            >
              <FiHelpCircle className="mr-2" /> {showGuide ? 'Hide Guide' : 'Show Guide'}
            </button>
          </div>
        </div>

        {/* User Guide */}
        {showGuide && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 mb-8">
            <div className="flex items-start mb-4">
              <FiHelpCircle className="text-blue-400 text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Orderbook Trading Guide</h3>
                <p className="text-gray-300 mb-4">Master limit order trading with this guide:</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-green-300">📋 Step-by-Step Process</h4>
                <ol className="space-y-2 text-gray-300">
                  <li>1. <strong>Select trading pair</strong> from left panel</li>
                  <li>2. <strong>Choose Buy/Sell</strong> and order type (Limit/Market)</li>
                  <li>3. <strong>Enter amount</strong> and desired price</li>
                  <li>4. <strong>Review order details</strong> and total cost</li>
                  <li>5. <strong>Place order</strong> and wait for matching</li>
                </ol>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-blue-300">💡 Tips & Best Practices</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Limit orders</strong> give you price control</li>
                  <li>• Monitor <strong>order depth</strong> for better pricing</li>
                  <li>• Use <strong>partial fills</strong> for large orders</li>
                  <li>• Set <strong>price alerts</strong> for market movements</li>
                  <li>• Check <strong>market depth</strong> before placing orders</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-yellow-300">⚠️ Important Warnings</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Orders remain <strong>active until filled</strong> or cancelled</li>
                  <li>• <strong>Market orders</strong> execute immediately at best price</li>
                  <li>• <strong>USDC must be approved</strong> before placing buy orders</li>
                  <li>• Watch out for <strong>slippage</strong> on large orders</li>
                  <li>• <strong>Cancel orders</strong> you no longer want</li>
                </ul>
              </div>
            </div>
            
            {/* Order Types Explanation */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
                <h4 className="font-bold text-green-300 mb-2">📈 Limit Order</h4>
                <p className="text-gray-300 text-sm">
                  • Set your desired price<br/>
                  • Order executes only at your price or better<br/>
                  • Best for price-sensitive traders<br/>
                  • May not execute immediately
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl">
                <h4 className="font-bold text-blue-300 mb-2">⚡ Market Order</h4>
                <p className="text-gray-300 text-sm">
                  • Executes immediately at best available price<br/>
                  • Guaranteed execution<br/>
                  • Best for quick trades<br/>
                  • May experience price slippage
                </p>
              </div>
            </div>
            
            {/* Quick Reference */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-xl">
              <div className="flex items-start">
                <FaExchangeAlt className="text-purple-400 mt-1 mr-3" />
                <div className="text-sm">
                  <p className="font-semibold text-purple-300">Quick Reference:</p>
                  <p className="text-gray-300 mt-1">
                    • <strong>Buy Orders:</strong> Green side - You want to buy credits<br/>
                    • <strong>Sell Orders:</strong> Red side - You want to sell credits<br/>
                    • <strong>Spread:</strong> Difference between best buy and sell prices<br/>
                    • <strong>Depth:</strong> Visual representation of order volume<br/>
                    • <strong>Network:</strong> Mantle Sepolia (Chain ID: 5003)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Trading Pairs */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaExchangeAlt className="mr-3 text-purple-400" /> Trading Pairs
              </h3>
              <div className="space-y-3">
                {tradingPairs.map((pair, index) => (
                  <div
                    key={index}
                    onClick={() => setActivePair(pair.pair)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      activePair === pair.pair
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
                        : 'bg-gray-900/60 hover:bg-gray-900/80'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{pair.pair}</span>
                      <span className={pair.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                        {pair.change}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">${pair.price}</span>
                      <span className="text-gray-400">{pair.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Trades */}
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaHistory className="mr-3 text-yellow-400" /> Recent Trades
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-900/60 rounded">
                    <span className={`font-semibold ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.price.toFixed(2)}
                    </span>
                    <span className="text-gray-300">{trade.amount}</span>
                    <span className={`px-2 py-1 rounded text-xs ${trade.side === 'buy' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {trade.side.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Orderbook */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{activePair}</h2>
                  <p className="text-gray-400">Market Price: <span className="text-green-400 font-bold">$12.55</span></p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    <FiSearch className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    <FiFilter className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Orderbook Grid */}
              <div className="grid grid-cols-3 gap-8">
                {/* Buy Orders */}
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
                    <FiArrowUp className="mr-2" /> Buy Orders
                  </h3>
                  <div className="space-y-1">
                    <div className="grid grid-cols-3 text-sm text-gray-400 pb-2 border-b border-gray-700">
                      <span>Price</span>
                      <span className="text-right">Amount</span>
                      <span className="text-right">Total</span>
                    </div>
                    {buyDepth.map((order, index) => (
                      <div key={index} className="grid grid-cols-3 py-2 relative group cursor-pointer hover:bg-green-500/10 rounded">
                        {/* Depth visualization */}
                        <div
                          className="absolute left-0 top-0 h-full bg-green-500/20 rounded-r"
                          style={{ width: `${order.depth}%` }}
                        />
                        <span className="text-green-400 font-semibold relative z-10">${order.price.toFixed(2)}</span>
                        <span className="text-right relative z-10">{order.amount.toLocaleString()}</span>
                        <span className="text-right relative z-10">${order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spread */}
                <div className="text-center">
                  <div className="bg-gray-900/60 p-4 rounded-xl h-full flex flex-col justify-center">
                    <p className="text-gray-400 text-sm">Spread</p>
                    <p className="text-2xl font-bold text-yellow-400">$0.05</p>
                    <p className="text-gray-400 text-sm mt-2">0.40%</p>
                    <div className="mt-4">
                      <p className="text-gray-400 text-sm">24h High/Low</p>
                      <p className="text-lg font-semibold">$12.75 / $12.25</p>
                    </div>
                  </div>
                </div>

                {/* Sell Orders */}
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center">
                    <FiArrowDown className="mr-2" /> Sell Orders
                  </h3>
                  <div className="space-y-1">
                    <div className="grid grid-cols-3 text-sm text-gray-400 pb-2 border-b border-gray-700">
                      <span>Price</span>
                      <span className="text-right">Amount</span>
                      <span className="text-right">Total</span>
                    </div>
                    {sellDepth.map((order, index) => (
                      <div key={index} className="grid grid-cols-3 py-2 relative group cursor-pointer hover:bg-red-500/10 rounded">
                        {/* Depth visualization */}
                        <div
                          className="absolute right-0 top-0 h-full bg-red-500/20 rounded-l"
                          style={{ width: `${order.depth}%` }}
                        />
                        <span className="text-red-400 font-semibold relative z-10">${order.price.toFixed(2)}</span>
                        <span className="text-right relative z-10">{order.amount.toLocaleString()}</span>
                        <span className="text-right relative z-10">${order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Depth Chart */}
              <div className="mt-8 bg-gray-900/60 p-4 rounded-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <FaChartBar className="mr-3 text-cyan-400" /> Market Depth
                </h3>
                <div className="h-48 relative">
                  {/* Buy side depth */}
                  {buyDepth.map((order, index) => (
                    <div
                      key={`buy-${index}`}
                      className="absolute bottom-0 bg-green-500/40 rounded-t"
                      style={{
                        left: `${index * 20}%`,
                        width: '20%',
                        height: `${order.depth}%`,
                      }}
                    />
                  ))}
                  {/* Sell side depth */}
                  {sellDepth.map((order, index) => (
                    <div
                      key={`sell-${index}`}
                      className="absolute bottom-0 bg-red-500/40 rounded-t"
                      style={{
                        left: `${50 + index * 10}%`,
                        width: '10%',
                        height: `${order.depth}%`,
                      }}
                    />
                  ))}
                  <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-yellow-400"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>Buy Depth</span>
                  <span>Market Price</span>
                  <span>Sell Depth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6">Place Order</h3>

              {/* Order Type */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-3 rounded-lg font-semibold ${orderType === 'limit' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  Limit
                </button>
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-3 rounded-lg font-semibold ${orderType === 'market' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  Market
                </button>
              </div>

              {/* Buy/Sell Buttons */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setSide('buy')}
                  className={`flex-1 py-3 rounded-lg font-bold ${side === 'buy' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-700'}`}
                >
                  <FiArrowUp className="inline mr-2" /> Buy
                </button>
                <button
                  onClick={() => setSide('sell')}
                  className={`flex-1 py-3 rounded-lg font-bold ${side === 'sell' ? 'bg-gradient-to-r from-red-500 to-orange-600' : 'bg-gray-700'}`}
                >
                  <FiArrowDown className="inline mr-2" /> Sell
                </button>
              </div>

              {/* Order Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Amount ({activePair.split('/')[1]})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg outline-none"
                  />
                  <div className="flex justify-between mt-2">
                    {[25, 50, 75, 100].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => setAmount((1000 * (percent / 100)).toString())}
                        className="text-sm px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>
                </div>

                {orderType === 'limit' && (
                  <div>
                    <label className="block text-gray-400 mb-2">Price (USD)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg outline-none"
                    />
                  </div>
                )}

                {/* Order Summary */}
                <div className="bg-gray-900/60 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-bold">${total || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Fee (0.1%)</span>
                    <span>${(parseFloat(total || 0) * 0.001).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">Avg. Price</span>
                    <span>${price || '0.00'}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={!amount || (orderType === 'limit' && !price)}
                  className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
                    !amount || (orderType === 'limit' && !price)
                      ? 'bg-gray-700 cursor-not-allowed'
                      : side === 'buy'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700'
                  }`}
                >
                  {!account ? 'Connect Wallet' : `Place ${side === 'buy' ? 'Buy' : 'Sell'} Order`}
                </button>
              </div>

              {/* Balance Info */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Available Balance</span>
                  <span className="font-semibold">1,250 CARBON</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Cost</span>
                  <span className="font-semibold">${total || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderbook;