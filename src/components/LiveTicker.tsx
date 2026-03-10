import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
interface CoinPrice {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}
const FALLBACK: CoinPrice[] = [
{
  id: 'bitcoin',
  symbol: 'BTC',
  current_price: 67420,
  price_change_percentage_24h: 2.4
},
{
  id: 'ethereum',
  symbol: 'ETH',
  current_price: 3521,
  price_change_percentage_24h: 1.8
},
{
  id: 'binancecoin',
  symbol: 'BNB',
  current_price: 412,
  price_change_percentage_24h: 0.9
},
{
  id: 'solana',
  symbol: 'SOL',
  current_price: 178,
  price_change_percentage_24h: 3.2
},
{
  id: 'ripple',
  symbol: 'XRP',
  current_price: 0.62,
  price_change_percentage_24h: -0.5
},
{
  id: 'cardano',
  symbol: 'ADA',
  current_price: 0.45,
  price_change_percentage_24h: 0.8
},
{
  id: 'dogecoin',
  symbol: 'DOGE',
  current_price: 0.16,
  price_change_percentage_24h: 12.5
},
{
  id: 'avalanche',
  symbol: 'AVAX',
  current_price: 38,
  price_change_percentage_24h: -1.2
},
{
  id: 'polkadot',
  symbol: 'DOT',
  current_price: 8.4,
  price_change_percentage_24h: 2.1
},
{
  id: 'litecoin',
  symbol: 'LTC',
  current_price: 92,
  price_change_percentage_24h: 1.5
}];

export function LiveTicker() {
  const [prices, setPrices] = useState<CoinPrice[]>(FALLBACK);
  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,dogecoin,avalanche-2,polkadot,litecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        if (r.ok) setPrices(await r.json());
      } catch {}
    };
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);
  const items = [...prices, ...prices, ...prices];
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        background: 'rgba(10,0,22,0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(139,92,246,0.3)',
        zIndex: 40,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>

      <div
        className="animate-ticker-bottom"
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap'
        }}>

        {items.map((coin, i) =>
        <div
          key={`${coin.id}-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 20px',
            fontSize: 12,
            fontFamily: 'Inter, sans-serif'
          }}>

            <span
            style={{
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>

              {coin.symbol}
            </span>
            <span
            style={{
              color: 'white',
              fontWeight: 600
            }}>

              $
              {coin.current_price < 1 ?
            coin.current_price.toFixed(4) :
            coin.current_price.toLocaleString()}
            </span>
            <span
            style={{
              color:
              coin.price_change_percentage_24h >= 0 ? '#4ade80' : '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>

              {coin.price_change_percentage_24h >= 0 ?
            <TrendingUp size={10} /> :

            <TrendingDown size={10} />
            }
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
            <span
            style={{
              color: 'rgba(139,92,246,0.3)',
              marginLeft: 4
            }}>

              |
            </span>
          </div>
        )}
      </div>
    </div>);

}