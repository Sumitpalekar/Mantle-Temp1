'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function SellLayout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Sell Credits</h1>
              <p className="text-sm text-gray-400">Register or sell environmental credits</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
}