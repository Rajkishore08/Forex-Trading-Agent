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
                <a href={`https://ipfs.io/ipfs/${trade.ipfsHash}`} target="_blank">
                  View Log
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

