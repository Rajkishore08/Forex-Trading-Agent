import React from 'react';
import { Wallet, Shield } from 'lucide-react';
import { useCeloWallet } from '../hooks/useCeloWallet';
import { useSafeWallet } from '../hooks/useSafeWallet';

export const WalletConnect: React.FC = () => {
  const { walletState, connectWallet } = useCeloWallet();
  const { safeAddress, isCreating, createSafeWallet } = useSafeWallet();

  React.useEffect(() => {
    if (walletState.connected && walletState.address && !safeAddress) {
      createSafeWallet(walletState.address).catch(console.error);
    }
  }, [walletState.connected, walletState.address, safeAddress, createSafeWallet]);

  if (!walletState.connected) {
    return (
      <button
        onClick={connectWallet}
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <Wallet className="w-5 h-5" />
        <span>Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Balance</span>
          <span className="font-semibold">{parseFloat(walletState.balance).toFixed(4)} CELO</span>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center space-x-3">
        <Shield className="w-5 h-5 text-green-400" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">
            {isCreating ? 'Creating Safe...' : 'Safe Wallet'}
          </span>
          <span className="font-mono text-sm">
            {safeAddress 
              ? `${safeAddress.slice(0, 6)}...${safeAddress.slice(-4)}`
              : 'Not connected'}
          </span>
        </div>
      </div>
    </div>
  );
};