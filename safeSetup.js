import { SafeFactory, EthersAdapter } from '@safe-global/protocol-kit';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth'); 
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function createSafeAccount() {
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
    const safeFactory = await SafeFactory.create({ ethAdapter });

    const safeAccount = await safeFactory.deploySafe({
        safeAccountConfig: { owners: [await signer.getAddress()], threshold: 1 },
    });

    console.log('Safe Deployed at:', safeAccount.getAddress());
    return safeAccount;
}

createSafeAccount();
