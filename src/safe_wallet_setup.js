const { ethers } = require("ethers");
const Safe = require("@safe-global/protocol-kit");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider("https://rpc.gnosis.chain");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function deploySafe() {
    const safeSdk = await Safe.create({ ethAdapter: wallet });
    const safeAddress = await safeSdk.getAddress();

    console.log("Safe Wallet Deployed at:", safeAddress);
    return safeAddress;
}

deploySafe().then((safe) => process.env.SAFE_WALLET = safe);
