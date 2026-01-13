'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWeb3 } from '../../context/Web3Context';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import HelpButton from '../common/HelpButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected, account, connectWallet, disconnectWallet } = useWeb3();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Trade', href: '/buy/amm' },
    { name: 'Onboarding', href: '/onboarding' },
    { name: 'Portfolio', href: '#' },
  ];

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                <span className="text-xl font-bold">🌿</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">GreenXchange</span>
                <span className="ml-2 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                  Mantle L2
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Help Button */}
            <HelpButton />
            
            {/* Wallet Connection */}
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 rounded-full bg-gray-800 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span className="text-sm font-medium text-gray-200">
                    {formatAddress(account)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 font-medium text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <HelpButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mt-4 rounded-xl border border-gray-800 bg-gray-900 p-4 md:hidden">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isConnected ? (
                <>
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-800 px-4 py-3">
                    <FiUser className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{formatAddress(account)}</p>
                      <p className="text-xs text-green-400">Connected</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Disconnect Wallet
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-medium text-white"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}