// utils/backgroundHandlers.js
export class BackgroundTransactionHandler {
    static async ensureNetwork(chainId = '0xaa36a7') {
      if (!window.ethereum) throw new Error('MetaMask not installed');
      
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (currentChainId !== chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
          return true;
        } catch (switchError) {
          if (switchError.code === 4902) {
            // Chain not added, add it
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xaa36a7',
                chainName: 'Sepolia',
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/'],
              }],
            });
            return true;
          }
          throw switchError;
        }
      }
      return true;
    }
  
    static async ensurePYUSDApproval(orderbookAddress, pyusdContract, amount) {
      const allowance = await pyusdContract.allowance(await pyusdContract.signer.getAddress(), orderbookAddress);
      
      if (allowance.lt(amount)) {
        const tx = await pyusdContract.approve(orderbookAddress, amount);
        await tx.wait();
        return true;
      }
      return false;
    }
  
    static async ensureTokenApproval(orderbookAddress, tokenContract, tokenId, amount) {
      const isApproved = await tokenContract.isApprovedForAll(
        await tokenContract.signer.getAddress(),
        orderbookAddress
      );
      
      if (!isApproved) {
        const tx = await tokenContract.setApprovalForAll(orderbookAddress, true);
        await tx.wait();
        return true;
      }
      return false;
    }
  
    static async simpleTrade(params) {
      // All background steps in one function
      const steps = [];
      
      try {
        // Step 1: Ensure network
        steps.push('Checking network...');
        await this.ensureNetwork();
        
        // Step 2: Ensure approvals
        if (params.action === 'buy') {
          steps.push('Approving PYUSD...');
          await this.ensurePYUSDApproval(
            params.orderbookAddress,
            params.pyusdContract,
            params.totalPrice
          );
        } else {
          steps.push('Approving tokens...');
          await this.ensureTokenApproval(
            params.orderbookAddress,
            params.tokenContract,
            params.tokenId,
            params.amount
          );
        }
        
        // Step 3: Place order
        steps.push('Placing order...');
        const orderbookContract = new ethers.Contract(
          params.orderbookAddress,
          params.orderbookAbi,
          params.signer
        );
        
        const tx = await orderbookContract.placeOrder(
          params.tokenId,
          params.amount,
          params.price,
          params.action === 'buy',
          ethers.constants.AddressZero // No referrer
        );
        
        steps.push('Waiting for confirmation...');
        const receipt = await tx.wait();
        
        return {
          success: true,
          transactionHash: receipt.transactionHash,
          steps
        };
        
      } catch (error) {
        console.error('Trade failed:', error);
        return {
          success: false,
          error: error.message,
          steps
        };
      }
    }
  }