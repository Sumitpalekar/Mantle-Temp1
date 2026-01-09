// contexts/Web3Context.js - Add these functions
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BackgroundTransactionHandler } from '../utils/backgroundHandlers';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auto-connect on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error('Auto-connect failed:', error);
        }
      }
      setLoading(false);
    };
    
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    
    try {
      setLoading(true);
      
      // Auto-switch to Sepolia in background
      await BackgroundTransactionHandler.ensureNetwork();
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      setAccount(accounts[0]);
      setSigner(signer);
      setIsConnected(true);
      
      // Store in localStorage for auto-reconnect
      localStorage.setItem('greenxchange-wallet-connected', 'true');
      
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect wallet: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
    setIsConnected(false);
    localStorage.removeItem('greenxchange-wallet-connected');
  };

  // Helper to get contract instance
  const getContract = (address, abi) => {
    if (!signer) return null;
    return new ethers.Contract(address, abi, signer);
  };

  // Simple trade wrapper
  const executeSimpleTrade = async (tradeParams) => {
    try {
      return await BackgroundTransactionHandler.simpleTrade({
        ...tradeParams,
        signer
      });
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  return (
    <Web3Context.Provider value={{
      account,
      signer,
      isConnected,
      loading,
      connectWallet,
      disconnectWallet,
      getContract,
      executeSimpleTrade
    }}>
      {children}
    </Web3Context.Provider>
  );
};