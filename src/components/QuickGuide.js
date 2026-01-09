
// components/QuickGuide.js
'use client';
import { useState } from 'react';

export default function QuickGuide() {
  const [isOpen, setIsOpen] = useState(false);
  
  const tips = [
    {
      title: "Start Small",
      content: "Begin with 5-10 credits to understand how trading works",
      icon: "🎯"
    },
    {
      title: "Check Balances",
      content: "Always check your token balance before trading",
      icon: "💰"
    },
    {
      title: "Market Prices",
      content: "Prices are updated in real-time from the orderbook",
      icon: "📊"
    },
    {
      title: "Network Fees",
      content: "Sepolia testnet has minimal gas fees for testing",
      icon: "⛽"
    }
  ];
  
  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-colors flex items-center justify-center text-xl z-40"
      >
        ?
      </button>
      
      {/* Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Quick Guide</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl">{tip.icon}</div>
                    <div>
                      <h3 className="font-medium text-white">{tip.title}</h3>
                      <p className="text-sm text-gray-300">{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-white mb-2">Need More Help?</h3>
                <p className="text-sm text-gray-300">
                  Visit our documentation or contact support for detailed guides
                </p>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                Got It, Let's Trade!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}