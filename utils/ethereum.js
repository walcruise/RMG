import { ethers } from 'ethers';
import { 
  LONG_TRADE_ADDRESS, 
  SHORT_TRADE_ADDRESS, 
  LONG_TRADE_ABI, 
  SHORT_TRADE_ABI 
} from '../constants/contracts';

// Check if window is defined (browser) or not (SSR)
const isBrowser = typeof window !== 'undefined';

// Get Ethereum provider if available
export const getProvider = () => {
  if (!isBrowser) return null;
  
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  return null;
};

// Connect to wallet
export const connectWallet = async () => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('Please install MetaMask or another Ethereum wallet');
    }
    
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

// Get contract instances
export const getContracts = (signer) => {
  if (!signer) return { longTradeContract: null, shortTradeContract: null };
  
  const longTradeContract = new ethers.Contract(
    LONG_TRADE_ADDRESS,
    LONG_TRADE_ABI,
    signer
  );
  
  const shortTradeContract = new ethers.Contract(
    SHORT_TRADE_ADDRESS,
    SHORT_TRADE_ABI,
    signer
  );
  
  return { longTradeContract, shortTradeContract };
};

// Initiate flash loans in both contracts
export const initiateContracts = async (longTradeContract, shortTradeContract) => {
  try {
    if (!longTradeContract || !shortTradeContract) {
      throw new Error('Contracts not initialized. Please connect your wallet first.');
    }
    
    // Call both contracts simultaneously
    const [longTx, shortTx] = await Promise.all([
      longTradeContract.initiateFlashLoan(),
      shortTradeContract.initiateFlashLoan()
    ]);
    
    // Wait for transactions to be mined
    await Promise.all([longTx.wait(), shortTx.wait()]);
    
    return { success: true, longTx, shortTx };
  } catch (error) {
    console.error('Error initiating contracts:', error);
    return { success: false, error: error.message || 'Transaction failed' };
  }
};