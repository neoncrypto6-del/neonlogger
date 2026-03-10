import React, { useEffect, useRef } from 'react';
interface CongratsModalProps {
  isOpen: boolean;
  userName: string;
  walletName: string;
  onClose: () => void;
}
// Simple QR-like pattern generator using canvas
function QRCodeDisplay({ value }: {value: string;}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 160;
    const cells = 21;
    const cellSize = size / cells;
    canvas.width = size;
    canvas.height = size;
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    // Generate pseudo-random pattern from value
    const seed = value.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const rand = (i: number) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };
    ctx.fillStyle = '#1a0a3e';
    // Draw cells
    for (let row = 0; row < cells; row++) {
      for (let col = 0; col < cells; col++) {
        const isCorner =
        row < 7 && col < 7 ||
        row < 7 && col >= cells - 7 ||
        row >= cells - 7 && col < 7;
        if (isCorner) {
          // Draw finder patterns
          const inInner =
          row >= 2 && row <= 4 && col >= 2 && col <= 4 ||
          row >= 2 && row <= 4 && col >= cells - 5 && col <= cells - 3 ||
          row >= cells - 5 && row <= cells - 3 && col >= 2 && col <= 4;
          const inOuter =
          (row === 0 || row === 6) && col < 7 ||
          (col === 0 || col === 6) && row < 7 ||
          (row === 0 || row === 6) && col >= cells - 7 ||
          (col === cells - 1 || col === cells - 7) && row < 7 ||
          (row === cells - 1 || row === cells - 7) && col < 7 ||
          (col === 0 || col === 6) && row >= cells - 7;
          if (inInner || inOuter) {
            ctx.fillRect(
              col * cellSize,
              row * cellSize,
              cellSize - 0.5,
              cellSize - 0.5
            );
          }
        } else if (rand(row * cells + col) > 0.5) {
          ctx.fillRect(
            col * cellSize,
            row * cellSize,
            cellSize - 0.5,
            cellSize - 0.5
          );
        }
      }
    }
  }, [value]);
  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg"
      style={{
        width: 160,
        height: 160
      }} />);


}
export function CongratsModal({
  isOpen,
  userName,
  walletName,
  onClose
}: CongratsModalProps) {
  if (!isOpen) return null;
  const confirmationCode = `NC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const bonusAmount = (Math.random() * 4000 + 500).toFixed(2);
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
          '0 0 80px rgba(139,92,246,0.3), 0 25px 50px rgba(0,0,0,0.9)'
        }}
        onClick={(e) => e.stopPropagation()}>

        {/* Gradient top bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #f59e0b, #8b5cf6)'
          }} />


        {/* Confetti-like decorative dots */}
        <div className="absolute top-8 left-4 w-2 h-2 rounded-full bg-amber-400 opacity-60" />
        <div className="absolute top-12 right-6 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-60" />
        <div className="absolute top-6 right-16 w-1 h-1 rounded-full bg-green-400 opacity-60" />
        <div className="absolute top-16 left-12 w-1 h-1 rounded-full bg-blue-400 opacity-60" />

        <div className="p-6 text-center">
          {/* Trophy */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background:
              'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(139,92,246,0.2))',
              border: '2px solid rgba(245,158,11,0.4)',
              boxShadow: '0 0 30px rgba(245,158,11,0.2)'
            }}>

            <span className="text-4xl">🏆</span>
          </div>

          {/* Congrats text */}
          <h2
            className="text-white font-black text-2xl mb-1"
            style={{
              fontFamily: 'Orbitron, sans-serif'
            }}>

            Congratulations!
          </h2>
          <p className="text-amber-400 font-bold text-lg mb-1">{userName}</p>
          <p className="text-white/50 text-sm mb-4">
            Your 40% bonus has been successfully claimed via{' '}
            <span className="text-purple-400">{walletName}</span>
          </p>

          {/* Bonus amount */}
          <div
            className="p-4 rounded-xl mb-5"
            style={{
              background:
              'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(245,158,11,0.15))',
              border: '1px solid rgba(139,92,246,0.3)'
            }}>

            <p className="text-white/50 text-xs mb-1">Bonus Amount Credited</p>
            <p
              className="text-3xl font-black"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>

              ${bonusAmount}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2 mb-5">
            <p className="text-white/40 text-xs">Confirmation QR Code</p>
            <div
              className="p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.95)',
                border: '2px solid rgba(139,92,246,0.3)'
              }}>

              <QRCodeDisplay value={confirmationCode} />
            </div>
            <p className="text-white/30 text-xs font-mono">
              {confirmationCode}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
              boxShadow: '0 0 20px rgba(139,92,246,0.3)',
              fontSize: '0.75rem'
            }}>

            Done ✓
          </button>
        </div>
      </div>
    </div>);

}