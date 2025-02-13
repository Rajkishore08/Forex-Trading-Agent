import { useState, useCallback } from 'react';
import Web3 from 'web3';
import { WalletState } from '../types/trading';

export const useCeloWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: '0',
    connected: false,
  });

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        
        // Get CELO balance
        const balance = await web3.eth.getBalance(address);
        const celoBalance = web3.utils.fromWei(balance, 'ether');

        setWalletState({
          address,
          balance: celoBalance,
          connected: true,
        });
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('Please install a Web3 wallet');
    }
  }, []);

  return { walletState, connectWallet };
};