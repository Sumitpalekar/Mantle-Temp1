'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const Web3Context = createContext()

export function Web3Provider({ children }) {
  const [account, setAccount] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mantle Sepolia network configuration
  const MANTLE_SEPOLIA = {
    chainId: '0x138B', // 5003 in hex
    chainName: 'Mantle Sepolia Testnet',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18
    },
    rpcUrls: ['https://rpc.sepolia.mantle.xyz'],
    blockExplorerUrls: ['https://explorer.sepolia.mantle.xyz']
  }

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkIfWalletIsConnected()
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkIfWalletIsConnected = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          const chainId = await window.ethereum.request({ 
            method: 'eth_chainId' 
          })
          setChainId(parseInt(chainId, 16))
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }
  }

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      setAccount('')
      setIsConnected(false)
      setChainId(null)
    } else {
      setAccount(accounts[0])
    }
  }

  const handleChainChanged = (chainIdHex) => {
    setChainId(parseInt(chainIdHex, 16))
  }

  const connectWallet = async () => {
    try {
      setIsLoading(true)
      
      if (!window.ethereum) {
        alert('Please install MetaMask!')
        return false
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      setAccount(accounts[0])
      setIsConnected(true)
      
      const chainIdHex = await window.ethereum.request({ 
        method: 'eth_chainId' 
      })
      const currentChainId = parseInt(chainIdHex, 16)
      setChainId(currentChainId)

      // Check if on Mantle Sepolia
      if (currentChainId !== 5003) {
        await switchToMantleSepolia()
      }
      
      return true
      
    } catch (error) {
      console.error('Error connecting wallet:', error)
      if (error.code === 4001) {
        alert('Please connect your wallet to continue')
      } else {
        alert('Failed to connect wallet: ' + error.message)
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    setAccount('')
    setIsConnected(false)
    setChainId(null)
  }

  const switchToMantleSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MANTLE_SEPOLIA.chainId }]
      })
    } catch (switchError) {
      // Chain not added, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MANTLE_SEPOLIA]
          })
        } catch (addError) {
          console.error('Error adding Mantle Sepolia:', addError)
          alert('Failed to add Mantle Sepolia network. Please add it manually in your wallet.')
        }
      }
    }
  }

  const isCorrectNetwork = chainId === 5003

  const value = {
    account,
    isConnected,
    chainId,
    isCorrectNetwork,
    isLoading,
    connectWallet,
    disconnectWallet,
    switchToMantleSepolia
  }

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}