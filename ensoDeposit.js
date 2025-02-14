import axios from 'axios';

const ENOS_API = 'https://api.enso.build/v1/vaults';

async function depositToEnsoVault(vaultAddress, amount, token) {
    const response = await axios.post(`${ENOS_API}/deposit`, {
        vault: vaultAddress,
        token: token,  // e.g., USDC
        amount: amount,
        account: process.env.SAFE_ADDRESS,
    }, {
        headers: { Authorization: `Bearer ${process.env.ENSO_API_KEY}` }
    });

    console.log('Deposit Response:', response.data);
}

depositToEnsoVault('0xEnsoVaultAddress', '1000', 'USDC');
