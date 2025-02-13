export interface TradingPair {
  id: string;
  baseToken: string;
  quoteToken: string;
  lastPrice: string;
  priceChange24h: number;
  volume24h: string;
}

export interface Order {
  id: string;
  type: 'buy' | 'sell';
  amount: string;
  price: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
}

export interface WalletState {
  address: string | null;
  balance: string;
  connected: boolean;
}