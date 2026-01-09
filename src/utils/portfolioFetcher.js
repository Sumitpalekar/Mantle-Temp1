// utils/portfolioFetcher.js
import { ethers } from 'ethers';

export class PortfolioFetcher {
  static async fetchBalances(account, tokenContract) {
    try {
      const balances = {};
      
      // Fetch balances for each token ID (1-4)
      for (let tokenId = 1; tokenId <= 4; tokenId++) {
        const balance = await tokenContract.balanceOf(account, tokenId);
        balances[tokenId] = balance.toString();
      }
      
      return balances;
    } catch (error) {
      console.error('Failed to fetch balances:', error);
      return null;
    }
  }

  static async fetchPYUSDBalance(account, pyusdContract) {
    try {
      const balance = await pyusdContract.balanceOf(account);
      return ethers.utils.formatUnits(balance, 6); // PYUSD has 6 decimals
    } catch (error) {
      console.error('Failed to fetch PYUSD balance:', error);
      return '0';
    }
  }
}