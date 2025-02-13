const { ethers } = require("ethers");
const SafeApiKit = require("@safe-global/api-kit");
const FileverseSDK = require("@fileverse/sdk");

// Initialize Celo Wallet & Safe SDK
const provider = new ethers.providers.JsonRpcProvider("https://forno.celo.org");
const wallet = new ethers.Wallet("PRIVATE_KEY", provider);
const safeSdk = new SafeApiKit(wallet);
const fileverse = new FileverseSDK();

// Function to execute trade
async function executeTrade(tokenA, tokenB, amount) {
    const safeTx = await safeSdk.createTransaction({
        to: "DEX_CONTRACT_ADDRESS",
        value: 0,
        data: "0x" + tokenA + tokenB + amount,
    });

    await safeSdk.executeTransaction(safeTx);
    return { success: true };
}

// Function to log data to IPFS
async function logTrade(data) {
    const ipfsHash = await fileverse.store(JSON.stringify(data));
    return { ipfsHash };
}

module.exports = { executeTrade, logTrade };

