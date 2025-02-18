const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider("https://rpc.gnosis.chain");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function placeBet(marketId, outcome, amount) {
    const marketUrl = `https://api.omen.eth.link/markets/${marketId}/bet`;

    const response = await axios.post(marketUrl, {
        outcome,
        amount,
        user: wallet.address,
    });

    console.log("Bet Placed:", response.data);
}

placeBet("0xMarketID", "YES", 50);
