// components/NetworkStatus.js
'use client';
import { useState, useEffect } from 'react';
import { useWeb3 } from "../contexts/Web3Context";

export default function NetworkStatus() {
  const { isConnected } = useWeb3();
  const [network, setNetwork] = useState('disconnected');
  
  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setNetwork(chainId === '0xaa36a7' ? 'sepolia' : 'wrong-network');
        } catch {
          setNetwork('disconnected');
        }
      }
    };
    
    checkNetwork();
    
    if (window.ethereum) {
      window.ethereum.on('chainChanged', checkNetwork);
      return () => window.ethereum.removeListener('chainChanged', checkNetwork);
    }
  }, []);
  
  if (!isConnected) return null;
  
  const statusConfig = {
    sepolia: {
      label: 'Sepolia',
      color: 'bg-green-500',
      text: 'text-green-400'
    },
    'wrong-network': {
      label: 'Wrong Network',
      color: 'bg-red-500',
      text: 'text-red-400'
    },
    disconnected: {
      label: 'Disconnected',
      color: 'bg-gray-500',
      text: 'text-gray-400'
    }
  };
  
  const config = statusConfig[network] || statusConfig.disconnected;
  
  return (
    <div className="fixed bottom-6 left-6 flex items-center space-x-2 px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 z-40">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`}></div>
      <span className={`text-sm ${config.text}`}>{config.label}</span>
    </div>
  );
}