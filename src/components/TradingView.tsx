import React from 'react';
import { TradingPair } from '../types/trading';
import { LineChart, ArrowUpCircle, ArrowDownCircle, TrendingUp, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useAIPredictions } from '../hooks/useAIPredictions';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const mockHistoricalPrices = Array.from({ length: 30 }, (_, i) => 
  Math.sin(i / 5) * 0.2 + Math.random() * 0.1 + 1
);

const mockTradingPairs: TradingPair[] = [
  {
    id: '1',
    baseToken: 'CELO',
    quoteToken: 'cUSD',
    lastPrice: '0.99',
    priceChange24h: 1.2,
    volume24h: '1,234,567',
  },
  {
    id: '2',
    baseToken: 'CELO',
    quoteToken: 'cEUR',
    lastPrice: '1.08',
    priceChange24h: -0.5,
    volume24h: '987,654',
  },
];

export const TradingView: React.FC = () => {
  const [selectedPair, setSelectedPair] = React.useState<TradingPair>(mockTradingPairs[0]);
  const { prediction, isLoading } = useAIPredictions(mockHistoricalPrices);

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `${30 - i}m ago`),
    datasets: [
      {
        label: 'Price History',
        data: mockHistoricalPrices,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(75, 85, 99, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)'
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTradingPairs.map((pair) => (
          <div
            key={pair.id}
            className={`bg-gray-800/50 backdrop-blur rounded-xl p-6 border cursor-pointer transition-all duration-200 ${
              selectedPair.id === pair.id 
                ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => setSelectedPair(pair)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <span>{pair.baseToken}/{pair.quoteToken}</span>
                </h3>
                <p className="text-sm text-gray-400">
                  Volume: ${pair.volume24h}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${pair.lastPrice}</p>
                <div className="flex items-center justify-end space-x-1">
                  {pair.priceChange24h >= 0 ? (
                    <ArrowUpCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={pair.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}
                  >
                    {Math.abs(pair.priceChange24h)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <LineChart className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold">Price Chart</h2>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-2 text-gray-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Calculating prediction...</span>
              </div>
            ) : prediction ? (
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-semibold">
                  AI Prediction: ${prediction.toFixed(4)}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};