import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  TrendingDown } from
'lucide-react';
/* ── Wallet list ── */
const WALLETS = [
{
  name: 'MetaMask',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png'
},
{
  name: 'Trust Wallet',
  logo: 'https://static.vecteezy.com/system/resources/previews/067/565/496/non_2x/trust-wallet-rounded-logo-design-free-png.png'
},
{
  name: 'Phantom',
  logo: 'https://docs.phantom.com/favicon.svg'
},
{
  name: 'Exodus',
  logo: 'https://www.exodus.com/brand/img/logo-with-halo.png'
},
{
  name: 'Rainbow',
  logo: 'https://play-lh.googleusercontent.com/fMUvmUmIpIDoZGTACYohbY3DE7-24GFkQ21WjVHxa57qluzWrr7khkycE8cz_juhew'
},
{
  name: 'Crypto.com',
  logo: 'https://www.vhv.rs/dpng/d/257-2574815_crypto-com-logo-svg-hd-png-download.png'
},
{
  name: 'ETH Wallet',
  logo: 'https://www.cryptocompare.com/media/35309279/hb-wallet-logo.png'
},
{
  name: 'Ledger',
  logo: 'https://cryptorecovers.com/wp-content/uploads/2025/03/Ledger.png'
},
{
  name: 'Coinbase',
  logo: 'https://images.seeklogo.com/logo-png/44/1/coinbase-coin-logo-png_seeklogo-444569.png'
},
{
  name: 'Coinmama',
  logo: 'https://media.cryptomaniaks.com/images/logos/1739096884479_67a88334f12aaec7e4a46aed.png'
},
{
  name: 'Binance',
  logo: 'https://images.seeklogo.com/logo-png/44/2/binance-smart-chain-bsc-logo-png_seeklogo-446621.png'
}];

/* ── Crypto list ── */
const CRYPTOS = [
{
  symbol: 'BTC',
  name: 'Bitcoin',
  logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
},
{
  symbol: 'ETH',
  name: 'Ethereum',
  logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
},
{
  symbol: 'BNB',
  name: 'BNB',
  logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png'
},
{
  symbol: 'SOL',
  name: 'Solana',
  logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
},
{
  symbol: 'XRP',
  name: 'XRP',
  logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
},
{
  symbol: 'ADA',
  name: 'Cardano',
  logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
},
{
  symbol: 'DOGE',
  name: 'Dogecoin',
  logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png'
},
{
  symbol: 'AVAX',
  name: 'Avalanche',
  logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png'
},
{
  symbol: 'MATIC',
  name: 'Polygon',
  logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
},
{
  symbol: 'LINK',
  name: 'Chainlink',
  logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
},
{
  symbol: 'DOT',
  name: 'Polkadot',
  logo: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png'
},
{
  symbol: 'LTC',
  name: 'Litecoin',
  logo: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png'
},
{
  symbol: 'TRX',
  name: 'TRON',
  logo: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png'
},
{
  symbol: 'USDT',
  name: 'Tether',
  logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png'
},
{
  symbol: 'USDC',
  name: 'USD Coin',
  logo: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
}];

/* ── Live price type ── */
interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}
/* ── Animated counter ── */
function useCounter(target: number, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const steps = 60;
    const step = target / steps;
    const interval = duration / steps;
    const t = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(t);
      } else setVal(Math.floor(start));
    }, interval);
    return () => clearInterval(t);
  }, [target]);
  return val;
}
export function LandingPage() {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const users = useCounter(2000000);
  const claimed = useCounter(80000000);
  const claimedUsers = useCounter(5000000);
  useEffect(() => {
    const fetch_ = async () => {
      try {
        const r = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        if (r.ok) setPrices(await r.json());
      } catch {}
    };
    fetch_();
    const t = setInterval(fetch_, 60000);
    return () => clearInterval(t);
  }, []);
  /* duplicate arrays for seamless marquee */
  const walletRow = [...WALLETS, ...WALLETS, ...WALLETS];
  const cryptoRow = [...CRYPTOS, ...CRYPTOS, ...CRYPTOS];
  const priceRow = prices.length ? [...prices, ...prices, ...prices] : [];
  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: 64,
        paddingBottom: 80,
        background: 'transparent'
      }}>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px',
          position: 'relative'
        }}>

        <div
          style={{
            maxWidth: 900,
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 16px',
              borderRadius: 999,
              marginBottom: 24,
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.4)',
              color: '#c084fc',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}>

            🚀 The #1 Crypto Rewards Platform
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2.6rem, 8vw, 5.5rem)',
              fontWeight: 900,
              color: 'white',
              margin: '0 0 20px',
              lineHeight: 1.1
            }}>

            Claim Your{' '}
            <span className="text-neon-gradient text-glow">35% Bonus</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              maxWidth: 600,
              margin: '0 auto 40px',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.6
            }}>

            Claim bonus to your crypto address. Instantly boost your portfolio with our exclusive bonus program
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              justifyContent: 'center',
              marginBottom: 60
            }}>

            <Link
              to="/claim"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                borderRadius: 999,
                background:
                'linear-gradient(135deg, #ff6b35 0%, #f59e0b 30%, #c084fc 70%, #8b5cf6 100%)',
                color: 'white',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                boxShadow:
                '0 0 30px rgba(255,107,53,0.35), 0 0 60px rgba(139,92,246,0.2)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) =>
              e.currentTarget.style.transform = 'scale(1.04)'
              }
              onMouseLeave={(e) =>
              e.currentTarget.style.transform = 'scale(1)'
              }>

              <Zap size={18} /> Claim Bonus Now
            </Link>
            <Link
              to="/recovery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                borderRadius: 999,
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.5)',
                color: 'white',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.1)';
              }}>

              <Shield size={18} /> Recover Wallet
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
              maxWidth: 700,
              margin: '0 auto'
            }}>

            {[
            {
              value: `${(users / 1000000).toFixed(1)}M+`,
              label: 'Active Users',
              color: 'white'
            },
            {
              value: `+${(claimedUsers / 1000000).toFixed(0)}M`,
              label: 'Users Claimed',
              color: 'white'
            },
            {
              value: `$${(claimed / 1000000).toFixed(0)}M+`,
              label: 'Bonus Claimed',
              color: 'white'
            },
            {
              value: '35%',
              label: 'Bonus Rate',
              color: 'white'
            }].
            map((s) =>
            <div
              key={s.label}
              style={{
                background: 'rgba(139,92,246,0.08)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: 16,
                padding: '20px 12px',
                textAlign: 'center'
              }}>

                <div
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  fontWeight: 800,
                  color: s.color,
                  marginBottom: 4
                }}>

                  {s.value}
                </div>
                <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'Inter, sans-serif'
                }}>

                  {s.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LIVE MARKET PRICES ── */}
      {prices.length > 0 &&
      <section
        style={{
          padding: '60px 16px',
          maxWidth: 1200,
          margin: '0 auto'
        }}>

          <div
          style={{
            textAlign: 'center',
            marginBottom: 32
          }}>

            <h2
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 8px'
            }}>

              Live Market <span className="text-neon-gradient">Prices</span>
            </h2>
            <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>

              Real-time data updated every minute
            </p>
          </div>
          <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 12
          }}>

            {prices.slice(0, 15).map((coin) =>
          <div
            key={coin.id}
            style={{
              background: 'rgba(139,92,246,0.07)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>

                <img
              src={coin.image}
              alt={coin.symbol}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%'
              }} />

                <div
              style={{
                flex: 1,
                minWidth: 0
              }}>

                  <div
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'white'
                }}>

                    {coin.symbol.toUpperCase()}
                  </div>
                  <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)'
                }}>

                    $
                    {coin.current_price < 1 ?
                coin.current_price.toFixed(4) :
                coin.current_price.toLocaleString()}
                  </div>
                </div>
                <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                color:
                coin.price_change_percentage_24h >= 0 ?
                '#4ade80' :
                '#f87171'
              }}>

                  {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
          )}
          </div>
        </section>
      }

      {/* ── CRYPTO LOGOS MARQUEE ── */}
      <section
        style={{
          padding: '40px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.25)',
          overflow: 'hidden',
          marginBottom: 0
        }}>

        <div
          style={{
            textAlign: 'center',
            marginBottom: 20
          }}>

          <p
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>

            Supported Cryptocurrencies
          </p>
        </div>
        <div
          style={{
            overflow: 'hidden'
          }}>

          <div
            className="animate-ticker"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0
            }}>

            {cryptoRow.map((c, i) =>
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '0 28px',
                flexShrink: 0
              }}>

                <img
                src={c.logo}
                alt={c.symbol}
                style={{
                  width: 44,
                  height: 44,
                  objectFit: 'contain',
                  opacity: 0.8
                }} />

                <span
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Inter, sans-serif'
                }}>

                  {c.symbol}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── WALLET LOGOS MARQUEE ── */}
      <section
        style={{
          padding: '40px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          overflow: 'hidden'
        }}>

        <div
          style={{
            textAlign: 'center',
            marginBottom: 20
          }}>

          <p
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>

            Accepted Wallets
          </p>
        </div>
        <div
          style={{
            overflow: 'hidden'
          }}>

          <div
            className="animate-ticker-reverse"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0
            }}>

            {walletRow.map((w, i) =>
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '0 32px',
                flexShrink: 0
              }}>

                <img
                src={w.logo}
                alt={w.name}
                style={{
                  width: 44,
                  height: 44,
                  objectFit: 'contain',
                  opacity: 0.85
                }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none';
                }} />

                <span
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap'
                }}>

                  {w.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        style={{
          padding: '80px 16px',
          maxWidth: 1100,
          margin: '0 auto'
        }}>

        <div
          style={{
            textAlign: 'center',
            marginBottom: 48
          }}>

          <h2
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 12px'
            }}>

            Why Choose <span className="text-neon-gradient">NeonCrypto</span>?
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 15,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>

            Experience the next generation of decentralized finance
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20
          }}>

          {[
          {
            icon: <Globe size={28} color="#8b5cf6" />,
            title: 'Global Access',
            desc: 'Access your funds and bonuses from anywhere with zero restrictions.',
            accent: '#8b5cf6'
          },
          {
            icon: <Zap size={28} color="#f59e0b" />,
            title: 'Instant Claims',
            desc: 'Your 35% bonus is credited to your wallet immediately upon connection.',
            accent: '#f59e0b'
          },
          {
            icon: <Users size={28} color="#4ade80" />,
            title: 'Community First',
            desc: 'Join over 2 million users already earning passive income with NeonCrypto.',
            accent: '#4ade80'
          },
          {
            icon: <Shield size={28} color="#60a5fa" />,
            title: 'Bank-Grade Security',
            desc: '256-bit encryption and multi-layer security protect every transaction.',
            accent: '#60a5fa'
          }].
          map((f) =>
          <div
            key={f.title}
            style={{
              background: 'rgba(139,92,246,0.07)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 18,
              padding: '28px 24px'
            }}>

              <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${f.accent}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}>

                {f.icon}
              </div>
              <h3
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 15,
                fontWeight: 700,
                color: 'white',
                margin: '0 0 8px'
              }}>

                {f.title}
              </h3>
              <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
                lineHeight: 1.6
              }}>

                {f.desc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          padding: '60px 16px',
          textAlign: 'center'
        }}>

        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            background: 'rgba(139,92,246,0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 24,
            padding: '48px 32px'
          }}>

          <h2
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 12px'
            }}>

            Ready to Claim Your{' '}
            <span className="text-neon-gradient">Bonus?</span>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 15,
              fontFamily: 'Inter, sans-serif',
              margin: '0 0 28px'
            }}>

            Join millions of users and start earning today
          </p>
          <Link
            to="/claim"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 36px',
              borderRadius: 999,
              background:
              'linear-gradient(135deg, #ff6b35 0%, #f59e0b 30%, #c084fc 70%, #8b5cf6 100%)',
              color: 'white',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(255,107,53,0.3)'
            }}>

            <Zap size={18} /> Get Started Now
          </Link>
        </div>
      </section>
    </div>);

}