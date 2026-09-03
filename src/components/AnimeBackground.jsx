import React, { useEffect, useRef } from 'react';

// Hiragana + Katakana + a few Kanji that look cool
const CHARS = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ夢空星月花風雨火水木金土心力魂道';

// Sakura petal shape (simple polygon points, normalized 0–1)
const petalPoints = [
  [0.5, 0], [0.75, 0.2], [1, 0.5],
  [0.75, 0.8], [0.5, 1], [0.25, 0.8],
  [0, 0.5], [0.25, 0.2],
];

class KanjiColumn {
  constructor(canvas) {
    this.reset(canvas);
  }
  reset(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * canvas.height;
    this.speed = 0.4 + Math.random() * 0.6;
    this.chars = [];
    this.length = Math.floor(4 + Math.random() * 8);
    this.opacity = 0.06 + Math.random() * 0.12;
    this.fontSize = 13 + Math.floor(Math.random() * 6);
    this.hue = Math.random() > 0.5 ? 260 : 320; // purple or pink
    for (let i = 0; i < this.length; i++) {
      this.chars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
  }
  update(canvas) {
    this.y += this.speed;
    // Randomly mutate a character
    if (Math.random() < 0.05) {
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
      // First char is brightest (head)
      const bright = i === 0 ? Math.min(this.opacity * 3, 0.55) : alpha;
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${bright})`;
      ctx.fillText(ch, this.x, this.y - i * this.fontSize);
    });
  }
}

class SakuraPetal {
  constructor(canvas) {
    this.reset(canvas, true);
  }
  reset(canvas, initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -20;
    this.size = 5 + Math.random() * 8;
    this.speedY = 0.3 + Math.random() * 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.opacity = 0.12 + Math.random() * 0.2;
    this.sway = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.008 + Math.random() * 0.012;
  }
  update(canvas) {
    this.sway += this.swaySpeed;
    this.x += this.speedX + Math.sin(this.sway) * 0.35;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    if (this.y > canvas.height + 20) this.reset(canvas);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    const s = this.size;
    // Draw a simple petal shape
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 0.8, s * 0.2, 0, s);
    ctx.bezierCurveTo(-s * 0.8, s * 0.2, -s * 0.6, -s * 0.6, 0, -s);
    ctx.closePath();
    // Gradient fill
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
    grad.addColorStop(0, 'rgba(255, 180, 200, 0.9)');
    grad.addColorStop(1, 'rgba(200, 120, 180, 0.3)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

const AnimeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let columns = [];
    let petals = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize on resize
      const colCount = Math.floor(canvas.width / 38);
      columns = Array.from({ length: colCount }, () => new KanjiColumn(canvas));
      const petalCount = Math.floor(canvas.width / 70);
      petals = Array.from({ length: petalCount }, () => new SakuraPetal(canvas));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Clear with slight trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw kanji columns
      columns.forEach(col => {
        col.update(canvas);
        col.draw(ctx);
      });

      // Draw sakura petals
      petals.forEach(petal => {
        petal.update(canvas);
        petal.draw(ctx);
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

export default AnimeBackground;
