'use client'

import { useWeb3 } from '../../context/Web3Context'
import { FiChevronRight, FiZap, FiShield, FiGlobe } from 'react-icons/fi'

export default function HeroSection() {
  const { isConnected, connectWallet, isLoading } = useWeb3()

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-600/10"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Tagline */}
          <div className="mb-8 inline-flex items-center rounded-full bg-green-500/10 px-4 py-2">
            <FiZap className="mr-2 h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Built on Mantle L2</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            <span className="block">Trade</span>
            <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Environmental Credits
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            GreenXchange is the first decentralized exchange dedicated to tokenized environmental assets. 
            Trade carbon, water, renewable energy, and green credits with near-zero fees on Mantle L2.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Connecting...
                  </div>
                ) : (
                  <>
                    Connect Wallet & Start Trading
                    <FiChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            ) : (
              <a
                href="#features"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl"
              >
                Explore Trading Dashboard
                <FiChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            )}

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:border-gray-600 hover:bg-gray-800"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur">
              <FiZap className="mx-auto h-8 w-8 text-green-500" />
              <div className="mt-4 text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400">Lower Gas Fees</div>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur">
              <FiShield className="mx-auto h-8 w-8 text-green-500" />
              <div className="mt-4 text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">On-Chain Verification</div>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur">
              <FiGlobe className="mx-auto h-8 w-8 text-green-500" />
              <div className="mt-4 text-3xl font-bold text-white">4</div>
              <div className="text-sm text-gray-400">Credit Types</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}