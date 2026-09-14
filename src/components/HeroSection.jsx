import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const roles = [
  { text: 'CSE Student', color: '#5ec8d8' },
  { text: 'Data Science Enthusiast', color: '#5ec8d8' },
  { text: 'Problem Solver', color: '#ffb454' },
  { text: 'Guitarist', color: '#ffb454' },
  { text: 'Singer', color: '#ffb454' },
  { text: 'Weeb at Heart', color: '#5ec8d8' },
];

const tags = ['Anime', 'Guitar', 'Code', 'Hackathons'];

// Five open chords a hover cycles through, low-to-high string frequencies (Hz)
const chords = [
  { name: 'G', freqs: [196.0, 246.94, 293.66, 392.0, 493.88] },
  { name: 'C', freqs: [130.81, 164.81, 196.0, 261.63, 329.63] },
  { name: 'D', freqs: [146.83, 185.0, 220.0, 293.66, 369.99] },
  { name: 'Em', freqs: [164.81, 196.0, 246.94, 329.63, 392.0] },
  { name: 'Am', freqs: [220.0, 261.63, 329.63, 440.0, 261.63] },
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [strumming, setStrumming] = useState(false);

  const audioCtxRef = useRef(null);
  const chordIndexRef = useRef(0);

  useEffect(() => {
    const currentRole = roles[roleIndex].text;
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex(i => i + 1), 65);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(i => i - 1), 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }

    setDisplayText(currentRole.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Plucks a strummed chord using the Web Audio API — no audio files needed.
  // Cycles to a different chord on every hover.
  const strumChord = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const chord = chords[chordIndexRef.current % chords.length];
    chordIndexRef.current += 1;

    chord.freqs.forEach((freq, i) => {
      const t0 = ctx.currentTime + i * 0.035; // strum stagger, low string to high
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.14, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 1.2);
    });

    setStrumming(true);
    setTimeout(() => setStrumming(false), 500);
  };

  return (
    <section className="hero-section section-snap hero-terminal" style={{ minHeight: '100vh' }}>
      <div className="term-room">
        <div className="term-body">
          {/* Copy */}
          <div className="term-copy">
            <motion.h1
              className="term-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Hemant</span>
              <span className="term-name-stroke">Mandi</span>
            </motion.h1>

            <motion.div
              className="term-role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span style={{ color: roles[roleIndex].color, transition: 'color 0.5s ease' }}>
                {displayText}
                <span
                  className="term-cursor"
                  style={{ background: roles[roleIndex].color }}
                />
              </span>
              <span className="term-role-dim"> · Backend Developer · Hackathon Finalist</span>
            </motion.div>

            <motion.p
              className="term-desc"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              Code by day, chords by night. I build backend systems that hold up
              under load, chase 24-hour hackathon deadlines, and keep a guitar
              within arm's reach of the keyboard.
            </motion.p>

            <motion.div
              className="term-eq-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 0.1, 0.2, 0.3, 0.15, 0.25].map((delay, i) => (
                <span
                  key={i}
                  className={`term-eq-bar ${i % 2 === 0 ? 'warm' : 'cool'}`}
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
              <span className="term-eq-label">hover the guitar to strum</span>
            </motion.div>

            <motion.div
              className="term-btn-row"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
            >
              <a href="#achievements" className="term-btn primary" data-hover>
                view achievements
              </a>
              <a href="#contact" className="term-btn ghost" data-hover>
                get in touch →
              </a>
            </motion.div>

            <motion.div
              className="term-tags"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {tags.map(t => (
                <span key={t} className="term-tag">{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Guitar under spotlight — hover the strings to strum a chord */}
          <motion.div
            className="term-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="term-spotlight" />
            <div className="term-amp-glow" />
            <div
              className={`term-guitar-wrap ${strumming ? 'is-strumming' : ''}`}
              onMouseEnter={strumChord}
              role="button"
              tabIndex={0}
              aria-label="Hover to strum a chord"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') strumChord(); }}
            >
              <svg width="190" height="330" viewBox="0 0 190 330" fill="none">
                <path d="M78 6 L112 6 L117 34 L110 44 L80 44 L73 34 Z" fill="#171c28" stroke="#5ec8d8" strokeOpacity="0.4" strokeWidth="1"/>
                <rect x="85" y="42" width="20" height="106" fill="#171c28"/>
                <path d="M95 140 C 50 140, 28 172, 32 206 C 34 228, 50 240, 56 260 C 62 280, 76 304, 95 306
                         C 114 304, 128 280, 134 260 C 140 240, 156 228, 158 206 C 162 172, 140 140, 95 140 Z"
                      fill="#0f1218" stroke="#ffb454" strokeOpacity="0.28" strokeWidth="1.5"/>
                <circle cx="95" cy="222" r="22" fill="#05070c" stroke="#5ec8d8" strokeOpacity="0.3" strokeWidth="1"/>
                {/* Invisible wide hit-area over the strings so hover is easy to trigger */}
                <rect x="78" y="8" width="24" height="270" fill="transparent" />
                <g stroke="#8892a6" strokeWidth="0.8" opacity="0.8">
                  <line className="term-string" x1="82" y1="10" x2="90" y2="270" style={{ animationDelay: '0s' }}/>
                  <line className="term-string" x1="87" y1="10" x2="93" y2="270" style={{ animationDelay: '0.03s' }}/>
                  <line className="term-string" x1="92" y1="10" x2="95" y2="270" style={{ animationDelay: '0.06s' }}/>
                  <line className="term-string" x1="98" y1="10" x2="97" y2="270" style={{ animationDelay: '0.09s' }}/>
                  <line className="term-string" x1="103" y1="10" x2="100" y2="270" style={{ animationDelay: '0.12s' }}/>
                  <line className="term-string" x1="108" y1="10" x2="103" y2="270" style={{ animationDelay: '0.15s' }}/>
                </g>
              </svg>
            </div>
          </motion.div>

          <div className="term-scanline" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="term-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.8 }}
      >
        <span>Scroll</span>
        <div className="term-scroll-line" />
      </motion.div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes eq-pulse { 0%, 100% { height: 6px; } 50% { height: 24px; } }
        @keyframes term-float {
          0%, 100% { transform: translateX(-50%) rotate(-7deg) translateY(0); }
          50% { transform: translateX(-50%) rotate(-4deg) translateY(-10px); }
        }
        @keyframes string-vibrate {
          0%, 100% { transform: translateX(0); }
          30% { transform: translateX(1.6px); }
          60% { transform: translateX(-1.2px); }
          100% { transform: translateX(0); }
        }

        .hero-terminal { padding: 6.5rem 4% 3rem; }

        .term-room {
          position: relative;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          border-radius: 14px;
          overflow: hidden;
          background:
            radial-gradient(700px 500px at 78% 18%, rgba(94,200,216,0.10), transparent 60%),
            radial-gradient(500px 400px at 18% 85%, rgba(255,180,84,0.08), transparent 60%),
            linear-gradient(180deg, #070a11 0%, #05070c 60%, #04050a 100%);
          border: 1px solid #171c28;
          box-shadow: 0 40px 90px rgba(0,0,0,0.55);
        }

        .term-body {
          position: relative;
          min-height: 560px;
          padding: 3rem 2rem;
        }

        .term-copy { max-width: 480px; position: relative; z-index: 2; }

        .term-cursor {
          display: inline-block; width: 6px; height: 12px;
          background: #ffb454; vertical-align: -1px; margin-left: 2px;
          animation: blink 1s step-end infinite;
        }

        .term-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 5vw, 3.4rem);
          line-height: 1.04;
          color: #f2f4f9;
          letter-spacing: -0.01em;
          display: flex;
          flex-direction: column;
        }
        .term-name-stroke { -webkit-text-stroke: 1.5px #5ec8d8; color: transparent; }

        .term-role {
          margin-top: 16px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px;
          font-weight: 500;
          min-height: 1.4em;
        }
        .term-role-dim { color: #5a6478; font-weight: 400; }

        .term-desc {
          margin-top: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          line-height: 1.75;
          color: #8892a6;
        }

        .term-eq-row { display: flex; align-items: flex-end; gap: 3px; margin-top: 26px; height: 26px; }
        .term-eq-bar { width: 4px; border-radius: 2px; animation: eq-pulse 1.1s ease-in-out infinite; }
        .term-eq-bar.cool { background: #5ec8d8; }
        .term-eq-bar.warm { background: #ffb454; animation-duration: 0.8s; }
        .term-eq-label { margin-left: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #5a6478; align-self: center; }

        .term-btn-row { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
        .term-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          padding: 11px 20px;
          border-radius: 4px;
          letter-spacing: 0.02em;
          text-decoration: none;
          cursor: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .term-btn.primary {
          background: #5ec8d8; color: #05070c; font-weight: 700;
          box-shadow: 0 0 24px rgba(94,200,216,0.35);
        }
        .term-btn.primary:hover { transform: translateY(-3px); box-shadow: 0 0 36px rgba(94,200,216,0.55); }
        .term-btn.ghost { border: 1px solid #262c3a; color: #cdd6e8; background: transparent; }
        .term-btn.ghost:hover { border-color: #5ec8d8; color: #5ec8d8; transform: translateY(-3px); }

        .term-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 22px; }
        .term-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; padding: 5px 11px; border-radius: 99px;
          border: 1px solid #5ec8d8; color: #5ec8d8;
        }

        .term-stage {
          position: absolute;
          right: 60px; bottom: 0;
          width: 260px; height: 380px;
        }
        .term-spotlight {
          position: absolute; left: 50%; top: -30px;
          width: 380px; height: 380px; transform: translateX(-50%);
          background: conic-gradient(from 200deg at 50% 0%, transparent 0deg, rgba(255,180,84,0.10) 40deg, transparent 80deg);
          filter: blur(2px);
        }
        .term-amp-glow {
          position: absolute; left: 50%; bottom: 20px; transform: translateX(-50%);
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(255,180,84,0.16), transparent 70%);
        }
        .term-guitar-wrap {
          position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%) rotate(-7deg);
          filter: drop-shadow(0 30px 40px rgba(0,0,0,0.6));
          animation: term-float 6s ease-in-out infinite;
          cursor: none;
          outline: none;
        }
        .term-string { transform-origin: center; }
        .term-guitar-wrap.is-strumming .term-string {
          animation: string-vibrate 0.4s ease-out;
        }

        .term-scanline {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px);
        }

        .term-scroll-cue {
          position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .term-scroll-cue span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.2em; color: var(--text-muted); text-transform: uppercase;
        }
        .term-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #5ec8d8, transparent);
        }

        @media (max-width: 900px) {
          .term-stage { position: relative; right: auto; width: 100%; height: 260px; margin-top: 1rem; }
          .term-body { display: flex; flex-direction: column; }
          .term-copy { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;