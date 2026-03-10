import React, { useEffect, useState, useRef } from 'react';
const NAMES = [
'Andrew',
'Sarah',
'Michael',
'Emma',
'James',
'Olivia',
'David',
'Sophia',
'Daniel',
'Isabella',
'Christopher',
'Mia',
'Matthew',
'Charlotte',
'Anthony',
'Amelia',
'Joshua',
'Harper',
'Ryan',
'Evelyn',
'Kevin',
'Luna',
'Brian',
'Aria',
'George',
'Chloe',
'Edward',
'Penelope',
'Thomas',
'Layla',
'Carlos',
'Fatima',
'Liam',
'Zara',
'Noah',
'Aisha',
'Ethan',
'Priya'];

const CRYPTOS = [
'BTC',
'ETH',
'SOL',
'BNB',
'USDT',
'XRP',
'DOGE',
'ADA',
'MATIC',
'LTC',
'AVAX',
'DOT'];

const WALLETS = [
'MetaMask',
'Trust Wallet',
'Phantom',
'Coinbase',
'Exodus',
'Binance'];

interface Notif {
  id: number;
  name: string;
  amount: string;
  crypto: string;
  wallet: string;
  percent: number;
}
function makeNotif(): Notif {
  return {
    id: Date.now() + Math.random(),
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    amount: (Math.random() * 9500 + 500).toFixed(0),
    crypto: CRYPTOS[Math.floor(Math.random() * CRYPTOS.length)],
    wallet: WALLETS[Math.floor(Math.random() * WALLETS.length)],
    percent: Math.random() > 0.4 ? 40 : 35
  };
}
export function FloatingNotifications() {
  const [notif, setNotif] = useState<Notif | null>(null);
  const [phase, setPhase] = useState<'in' | 'visible' | 'out' | 'hidden'>(
    'hidden'
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const schedule = () => {
    const delay = Math.random() * 4000 + 5000; // 5-9s between cards
    timerRef.current = setTimeout(show, delay);
  };
  const show = () => {
    setNotif(makeNotif());
    setPhase('in');
    // after slide-in (400ms) → visible
    setTimeout(() => setPhase('visible'), 400);
    // after 3.5s visible → slide out
    setTimeout(() => setPhase('out'), 3900);
    // after slide-out (400ms) → hidden, then schedule next
    setTimeout(() => {
      setPhase('hidden');
      schedule();
    }, 4300);
  };
  useEffect(() => {
    // First notification after 2.5s
    timerRef.current = setTimeout(show, 2500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  if (phase === 'hidden' || !notif) return null;
  const animClass =
  phase === 'in' ? 'notif-enter' : phase === 'out' ? 'notif-exit' : '';
  return (
    <div
      className={`fixed bottom-6 left-4 z-50 ${animClass}`}
      style={{
        maxWidth: 280
      }}>

      <div
        style={{
          background: 'rgba(10,0,22,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(139,92,246,0.45)',
          borderLeft: '3px solid #f59e0b',
          boxShadow:
          '0 4px 24px rgba(0,0,0,0.6), 0 0 12px rgba(139,92,246,0.15)',
          borderRadius: '0 12px 12px 0',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>

        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            flexShrink: 0,
            background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 14,
            color: 'white',
            fontFamily: 'Inter, sans-serif'
          }}>

          {notif.name.charAt(0)}
        </div>

        {/* Text */}
        <div
          style={{
            flex: 1,
            minWidth: 0
          }}>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 600,
              color: 'white',
              fontFamily: 'Inter, sans-serif'
            }}>

            {notif.name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'Inter, sans-serif'
            }}>

            Claimed{' '}
            <span
              style={{
                color: '#4ade80',
                fontWeight: 700
              }}>

              {notif.percent}% Bonus
            </span>{' '}
            •{' '}
            <span
              style={{
                color: '#f59e0b',
                fontWeight: 700
              }}>

              ${parseInt(notif.amount).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Badge */}
        <div
          style={{
            flexShrink: 0,
            padding: '2px 7px',
            borderRadius: 6,
            background: 'rgba(139,92,246,0.2)',
            border: '1px solid rgba(139,92,246,0.4)',
            fontSize: 10,
            fontWeight: 700,
            color: '#c084fc',
            fontFamily: 'Inter, sans-serif'
          }}>

          {notif.crypto}
        </div>
      </div>
    </div>);

}