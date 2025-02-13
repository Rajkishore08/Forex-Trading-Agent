import React from 'react';
import { TradingView } from './components/TradingView';
import { WalletConnect } from './components/WalletConnect';
import { Activity, TrendingUp, DollarSign } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DeFi Trading Platform
              </h1>
            </div>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <TradingView />
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold">Market Overview</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="font-semibold">$2.4M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Pairs</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Liquidity</span>
                  <span className="font-semibold">$5.8M</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold">Quick Trade</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">CELO</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium">
                  Buy CELO
                </button>
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium">
                  Sell CELO
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;