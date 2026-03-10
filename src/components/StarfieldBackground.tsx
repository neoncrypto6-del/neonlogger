import React, { useEffect, useRef } from 'react';
export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const STAR_COUNT = 200;
    const stars = Array.from(
      {
        length: STAR_COUNT
      },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.2,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      })
    );
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Deep space gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#030308');
      gradient.addColorStop(0.5, '#0d0520');
      gradient.addColorStop(1, '#030308');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      // Nebula glow 1
      const nebula1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        0,
        width * 0.2,
        height * 0.3,
        width * 0.4
      );
      nebula1.addColorStop(0, 'rgba(139,92,246,0.06)');
      nebula1.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);
      // Nebula glow 2
      const nebula2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.35
      );
      nebula2.addColorStop(0, 'rgba(245,158,11,0.04)');
      nebula2.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);
      // Draw stars
      stars.forEach((star) => {
        const twinkle =
        Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity * twinkle})`;
        ctx.fill();
        // Move star slowly downward
        star.y += star.speed;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }
      });
      frame++;
      animationId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: '#030308',
        width: '100%',
        height: '100%'
      }} />);


}