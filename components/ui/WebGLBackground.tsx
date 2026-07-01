'use client';

import React, { useEffect, useRef } from 'react';

export const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw a faint alignment grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.015)';
      ctx.lineWidth = 0.5;

      const gridSize = 100;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw moving coordinate values trailing the cursor
      ctx.font = '7px monospace';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      const mouseLabel = `dsgn/coord [${mouseX.toFixed(0)}, ${mouseY.toFixed(0)}]`;
      ctx.fillText(mouseLabel, mouseX + 16, mouseY + 16);

      // 3. Draw faint coordinate numbers spread across the grid
      ctx.fillStyle = 'rgba(0, 0, 0, 0.015)';
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          const gridX = (width / 6) * i + 50;
          const gridY = (height / 6) * j + 50;
          // Calculate values that drift slightly relative to mouse coordinates
          const val = ((gridX + mouseX * 0.08) * (gridY + mouseY * 0.08) * 0.001).toFixed(3);
          ctx.fillText(val, gridX, gridY);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default WebGLBackground;
