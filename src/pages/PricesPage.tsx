import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}
export function PricesPage() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
      );
      if (response.ok) {
        const data = await response.json();
        setCoins(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Live Crypto Prices
            </h1>
            <p className="text-gray-400">
              Real-time market data from top cryptocurrencies
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <button
              onClick={fetchPrices}
              disabled={loading}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50">

              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />

            </button>
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden border border-purple-neon/20 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">#</th>
                  <th className="p-4 font-medium">Coin</th>
                  <th className="p-4 font-medium text-right">Price</th>
                  <th className="p-4 font-medium text-right">24h Change</th>
                  <th className="p-4 font-medium text-right hidden md:table-cell">
                    Market Cap
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && coins.length === 0 ?
                // Skeleton loading
                [...Array(10)].map((_, i) =>
                <tr key={i} className="animate-pulse">
                        <td className="p-4">
                          <div className="h-4 w-4 bg-white/10 rounded"></div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                            <div className="h-4 w-24 bg-white/10 rounded"></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-20 bg-white/10 rounded ml-auto"></div>
                        </td>
                        <td className="p-4">
                          <div className="h-4 w-16 bg-white/10 rounded ml-auto"></div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="h-4 w-28 bg-white/10 rounded ml-auto"></div>
                        </td>
                      </tr>
                ) :
                coins.map((coin) =>
                <tr
                  key={coin.id}
                  className="hover:bg-white/5 transition-colors">

                        <td className="p-4 text-gray-500 font-medium">
                          {coin.market_cap_rank}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full" />

                            <div>
                              <span className="font-bold text-white block">
                                {coin.name}
                              </span>
                              <span className="text-xs text-gray-500 uppercase">
                                {coin.symbol}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono text-white">
                          ${coin.current_price.toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <div
                      className={`inline-flex items-center gap-1 ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>

                            {coin.price_change_percentage_24h >= 0 ?
                      <TrendingUp className="w-3 h-3" /> :

                      <TrendingDown className="w-3 h-3" />
                      }
                            {Math.abs(coin.price_change_percentage_24h).toFixed(
                        2
                      )}
                            %
                          </div>
                        </td>
                        <td className="p-4 text-right text-gray-400 font-mono hidden md:table-cell">
                          ${coin.market_cap.toLocaleString()}
                        </td>
                      </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);

}