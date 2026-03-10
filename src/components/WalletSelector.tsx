import React, { useState } from 'react';
import { DeepLinkModal } from './DeepLinkModal';
export const WALLETS = [
{
  name: 'MetaMask',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  deepLink: 'https://metamask.app.link/dapp/neoncrypto.com'
},
{
  name: 'Trust Wallet',
  logo: 'https://trustwallet.com/assets/images/media/assets/trust_platform.svg',
  deepLink:
  'https://link.trustwallet.com/open_url?coin_id=60&url=https://neoncrypto.com'
},
{
  name: 'Phantom',
  logo: 'https://phantom.app/img/phantom-logo.svg',
  deepLink: 'https://phantom.app/ul/browse/https://neoncrypto.com'
},
{
  name: 'Exodus',
  logo: 'https://www.exodus.com/img/logos/exodus-logo.svg',
  deepLink: 'https://exodus.com'
},
{
  name: 'Rainbow',
  logo: 'https://rainbow.me/assets/rainbow-logo.png',
  deepLink: 'https://rainbow.me'
},
{
  name: 'Crypto.com',
  logo: 'https://crypto.com/price/coin-price-page-meta-img.png',
  deepLink: 'https://crypto.com/app'
},
{
  name: 'ETH Wallet',
  logo: 'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/eth-diamond-purple.png',
  deepLink: 'https://ethereum.org/en/wallets/'
},
{
  name: 'Ledger',
  logo: 'https://www.ledger.com/wp-content/uploads/2021/11/Ledger_favicon.png',
  deepLink: 'https://ledger.com'
},
{
  name: 'Coinbase',
  logo: 'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqyceHIv/2727208f9f7e8b2d4c4f5c5a5c5c5c5c/coinbase-icon2.png',
  deepLink: 'https://coinbase.com'
},
{
  name: 'Coinmama',
  logo: 'https://www.coinmama.com/favicon.ico',
  deepLink: 'https://coinmama.com'
},
{
  name: 'Binance',
  logo: 'https://bin.bnbstatic.com/static/images/common/favicon.ico',
  deepLink: 'https://binance.com'
}];

interface WalletSelectorProps {
  onSelect?: (walletName: string) => void;
  showDeepLinkModal?: boolean;
}
export function WalletSelector({
  onSelect,
  showDeepLinkModal = false
}: WalletSelectorProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWallet, setActiveWallet] = useState<(typeof WALLETS)[0] | null>(
    null
  );
  const handleWalletClick = (wallet: (typeof WALLETS)[0]) => {
    setSelectedWallet(wallet.name);
    if (onSelect) {
      onSelect(wallet.name);
    }
    if (showDeepLinkModal) {
      setActiveWallet(wallet);
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
        {WALLETS.map((wallet) =>
        <button
          key={wallet.name}
          onClick={() => handleWalletClick(wallet)}
          className={`relative group flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${selectedWallet === wallet.name ? 'bg-purple-neon/20 border-2 border-purple-neon shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'glass-card hover:bg-white/10'}`}>

            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 relative flex items-center justify-center">
              <img
              src={wallet.logo}
              alt={wallet.name}
              className="w-full h-full object-contain drop-shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-white/10 rounded-full text-white font-bold">${wallet.name.charAt(0)}</div>`;
              }} />

            </div>
            <span className="text-[10px] sm:text-xs font-medium text-gray-300 group-hover:text-white text-center leading-tight">
              {wallet.name}
            </span>

            {selectedWallet === wallet.name &&
          <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]" />
          }
          </button>
        )}
      </div>

      {activeWallet &&
      <DeepLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        walletName={activeWallet.name}
        walletLogo={activeWallet.logo}
        deepLink={activeWallet.deepLink} />

      }
    </>);

}