import { useState, useCallback } from 'react';
import Safe, { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { ethers } from 'ethers';

export const useSafeWallet = () => {
  const [safeAddress, setSafeAddress] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const createSafeWallet = useCallback(async (ownerAddress: string) => {
    try {
      setIsCreating(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
      });

      const safeFactory = await SafeFactory.create({ ethAdapter });
      const safeAccountConfig: SafeAccountConfig = {
        owners: [ownerAddress],
        threshold: 1
      };

      const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
      const newSafeAddress = await safeSdk.getAddress();
      setSafeAddress(newSafeAddress);
      setIsCreating(false);
      return newSafeAddress;
    } catch (error) {
      console.error('Error creating Safe wallet:', error);
      setIsCreating(false);
      throw error;
    }
  }, []);

  return { safeAddress, isCreating, createSafeWallet };
};