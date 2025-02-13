# Forex-Trading-Agent
Forex Trading Agent is a powerful, AI-driven, DeFi-integrated trading system leveraging Celo, Safe Smart Accounts, and Fileverse SDK to create a secure, transparent, and efficient solution! 🚀
## Overview
This AI-driven Forex Trading Agent integrates **AI, blockchain, and decentralized storage** to execute secure and profitable Forex trades. It leverages:

- **Celo Blockchain & Safe Smart Accounts** for secure trade execution.
- **AI-driven market analysis** for arbitrage and DCA strategies.
- **Fileverse SDK & IPFS** for decentralized trade logging and transparency.

## Tech Stack
- **Frontend:** React.js (Dashboard & Trade Monitoring)
- **Backend:** Node.js (Trade Execution & Safe Transactions)
- **AI Model:** Python (Flask-based AI for Arbitrage & DCA)
- **Blockchain:** Celo Network + Safe Smart Accounts
- **Storage:** Fileverse SDK (IPFS-based logging)

## Features
- ✅ AI-powered arbitrage and DCA trading strategies
- ✅ Secure transaction execution with **Safe Smart Accounts**
- ✅ Gasless transactions and automated approvals
- ✅ Decentralized trade logging using **Fileverse SDK (IPFS)**
- ✅ User-friendly **React.js dashboard** for real-time trade monitoring

## Workflow
### 1. Market Data Analysis
- Fetch Forex rates and stablecoin prices from **Celo DEXs & Oracles**.
- AI detects arbitrage opportunities and executes **DCA (Dollar-Cost Averaging)** trades.

### 2. Secure Trade Execution
- If an arbitrage opportunity is found, a **Safe Smart Account** executes the trade.
- Gasless transactions ensure cost efficiency.

### 3. Trade Data Logging
- Trade details, performance metrics, and AI decision logs are **stored on IPFS** using Fileverse SDK.
- Ensures transparency and decentralized trade history.

### 4. User Dashboard & Performance Tracking
- **React.js frontend** displays real-time trades, profit/loss, and AI insights.
- Users can adjust risk parameters, stop-loss limits, and strategy preferences.

## Setup & Installation
### 1. Clone the Repository
```sh
git clone https://github.com/Rajkishore08/Forex-Trading-Agent
cd Forex-Trading-Agent
```

### 2. Install Backend Dependencies
```sh
cd backend
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the backend directory and add:
```env
CELO_RPC_URL=https://forno.celo.org
PRIVATE_KEY=your-private-key
SAFE_ADDRESS=your-safe-wallet-address
FILEVERSE_API_KEY=your-fileverse-api-key
```

### 4. Start Backend Server
```sh
npm start
```

### 5. Install Frontend Dependencies
```sh
cd ../frontend
npm install
```

### 6. Start Frontend
```sh
npm start
```

## Smart Contract (Solidity)
This contract manages trade execution via **Safe Smart Accounts**.
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@gnosis.pm/safe-contracts/contracts/GnosisSafe.sol";

contract ForexTradingAgent {
    address public owner;
    GnosisSafe public safe;

    constructor(address _safeAddress) {
        owner = msg.sender;
        safe = GnosisSafe(_safeAddress);
    }

    function executeTrade(address tokenA, address tokenB, uint256 amount) public {
        require(msg.sender == owner, "Not authorized");

        safe.execTransactionFromModule(
            address(this),
            0,
            abi.encodeWithSignature("swap(address,address,uint256)", tokenA, tokenB, amount),
            Enum.Operation.Call
        );
    }
}
```

## API Endpoints
### 1. Execute Trade
```http
POST /api/trade
```
**Payload:**
```json
{
  "tokenA": "cUSD",
  "tokenB": "cEUR",
  "amount": 100
}
```

### 2. Fetch Trade History
```http
GET /api/trades
```

## Frontend UI (React.js)
Displays trade insights, performance metrics, and trade history.
```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios.get("/api/trades").then((res) => setTrades(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Forex Trading Performance</h2>
      <table>
        <thead>
          <tr>
            <th>Trade</th>
            <th>Profit/Loss</th>
            <th>IPFS Log</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.pair}</td>
              <td>{trade.profit}</td>
              <td>
                <a href={`https://ipfs.io/ipfs/${trade.ipfsHash}`} target="_blank" rel="noopener noreferrer">View Log</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
```

## Deployment
### 1. Backend Deployment (Render)
- Deploy **backend** on Render with `server.js` as the entry point.

### 2. Frontend Deployment (Vercel)
- Deploy **frontend** on Vercel with `npm run build`.

### 3. Smart Contract Deployment (Celo)
```sh
npx hardhat run scripts/deploy.js --network celo
```

## Hackathon Tracks Covered
✅ **DeFAI (Celo x Safe):** Uses **Safe Smart Accounts** for secure Forex trading execution.  
✅ **AI Advancement (Fileverse SDK):** Logs trades to **IPFS using Fileverse SDK** for transparency.  

## Future Enhancements
- **Multi-chain Arbitrage** (Ethereum, BSC, Celo).
- **Social Trading:** Follow top AI trading strategies.
- **Yield Optimization:** AI-driven DeFi liquidity allocation.

## Contributors
👨‍💻 Raj Kishore - Lead Developer  

## License
This project is licensed under the MIT License.

---

### 🌟 **If you find this useful, give it a star!** ⭐

