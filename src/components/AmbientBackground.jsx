import React, { useEffect, useRef } from 'react';

// Mixed glyph rain: music notation + binary/code symbols — tech meets music
const CHARS = '♪♫♬♩0101{}</>101λ∑π01♪10';

class GlyphColumn {
  constructor(canvas) {
    this.reset(canvas);
  }
  reset(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * canvas.height;
    this.speed = 0.35 + Math.random() * 0.55;
    this.chars = [];
    this.length = Math.floor(3 + Math.random() * 6);
    this.opacity = 0.05 + Math.random() * 0.1;
    this.fontSize = 12 + Math.floor(Math.random() * 7);
    this.hue = Math.random() > 0.5 ? 260 : 190; // purple or cyan
    for (let i = 0; i < this.length; i++) {
      this.chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
  }
  update(canvas) {
    this.y += this.speed;
    if (Math.random() < 0.04) {
      const i = Math.floor(Math.random() * this.chars.length);
      this.chars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    if (this.y > canvas.height + this.length * this.fontSize) {
      this.reset(canvas);
    }
  }
  draw(ctx) {
    ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
    this.chars.forEach((ch, i) => {
      const alpha = this.opacity * (1 - i / this.length);
      const bright = i === 0 ? Math.min(this.opacity * 3, 0.5) : alpha;
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${bright})`;
      ctx.fillText(ch, this.x, this.y - i * this.fontSize);
    });
  }
}

// Fireflies — soft drifting glow points (nature + night-sky feel)
class Firefly {
  constructor(canvas) {
    this.reset(canvas, true);
  }
  reset(canvas, initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
    this.size = 1.5 + Math.random() * 2.5;
    this.speedY = -(0.15 + Math.random() * 0.25);
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.baseOpacity = 0.15 + Math.random() * 0.35;
    this.flicker = Math.random() * Math.PI * 2;
    this.flickerSpeed = 0.02 + Math.random() * 0.03;
    this.hue = [45, 190, 265][Math.floor(Math.random() * 3)]; // amber, cyan, violet
  }
  update(canvas) {
    this.flicker += this.flickerSpeed;
    this.x += this.speedX + Math.sin(this.flicker * 0.5) * 0.2;
    this.y += this.speedY;
    if (this.y < -20) this.reset(canvas);
  }
  draw(ctx) {
    const alpha = this.baseOpacity * (0.5 + 0.5 * Math.sin(this.flicker));
    ctx.save();
    ctx.globalAlpha = alpha;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
    grad.addColorStop(0, `hsla(${this.hue}, 90%, 70%, 0.9)`);
    grad.addColorStop(1, `hsla(${this.hue}, 90%, 70%, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let columns = [];
    let flies = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / 48);
      columns = Array.from({ length: colCount }, () => new GlyphColumn(canvas));
      const flyCount = Math.floor(canvas.width / 90);
      flies = Array.from({ length: flyCount }, () => new Firefly(canvas));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      columns.forEach(col => {
        col.update(canvas);
        col.draw(ctx);
      });
      flies.forEach(f => {
        f.update(canvas);
        f.draw(ctx);
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
};

export default AmbientBackground;
