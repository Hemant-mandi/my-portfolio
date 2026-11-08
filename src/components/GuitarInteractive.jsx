import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Chords: E, D, C, D (frequencies in Hz)
const chordFrequencies = [
  [164.81, 329.63, 415.30, 493.88], // E Major
  [146.83, 293.66, 369.99, 440.00], // D Major
  [130.81, 261.63, 329.63, 392.00], // C Major
  [146.83, 293.66, 369.99, 440.00]  // D Major
];

const GuitarInteractive = () => {
  const [chordIndex, setChordIndex] = useState(0);
  const audioCtxRef = useRef(null);

  const playChord = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const freqs = chordFrequencies[chordIndex];
    const now = ctx.currentTime;

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Gives a slightly softer, plucked sound
      osc.frequency.setValueAtTime(freq, now);

      // Envelopes for pluck sound (arpeggiated slightly)
      const delay = i * 0.05; 
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.3, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 2.5);
    });

    // Advance chord for next strum
    setChordIndex((prev) => (prev + 1) % chordFrequencies.length);
  };

  return (
    <motion.div 
      className="guitar-interactive"
      onHoverStart={playChord}
      onClick={playChord}
      whileHover={{ scale: 1.02, rotate: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        display: 'inline-block',
        filter: 'drop-shadow(20px 30px 40px rgba(0,0,0,0.6))',
      }}
      title="Hover or tap to strum"
    >
      <div className="guitar-hover-area" style={{ position: 'relative', zIndex: 2 }}>
        <svg width="220" height="600" viewBox="0 0 220 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Guitar Neck */}
          <rect x="95" y="50" width="30" height="280" fill="#2d1c14" />
          
          {/* Frets */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="95" y1={80 + i * 18} x2="125" y2={80 + i * 18} stroke="#8a9a86" strokeWidth="1" opacity="0.5" />
          ))}

          {/* Headstock */}
          <path d="M90 10 L130 10 L135 50 L85 50 Z" fill="#3a2518" />
          
          {/* Tuning Pegs */}
          <circle cx="80" cy="20" r="4" fill="#d4a373" />
          <circle cx="80" cy="30" r="4" fill="#d4a373" />
          <circle cx="80" cy="40" r="4" fill="#d4a373" />
          <circle cx="140" cy="20" r="4" fill="#d4a373" />
          <circle cx="140" cy="30" r="4" fill="#d4a373" />
          <circle cx="140" cy="40" r="4" fill="#d4a373" />

          {/* Guitar Body */}
          <path 
            d="M 110 250 
               C 50 250, 30 300, 40 340 
               C 50 370, 70 380, 75 400 
               C 80 430, 20 460, 20 520 
               C 20 580, 80 590, 110 590 
               C 140 590, 200 580, 200 520 
               C 200 460, 140 430, 145 400 
               C 150 380, 170 370, 180 340 
               C 190 300, 170 250, 110 250 Z" 
            fill="#d4a373" 
            stroke="#5c3a21" 
            strokeWidth="8"
          />

          {/* Body inner shade */}
          <path 
            d="M 110 260 
               C 60 260, 40 305, 50 340 
               C 60 365, 75 385, 85 400 
               C 90 420, 35 465, 35 520 
               C 35 570, 85 580, 110 580 
               C 135 580, 185 570, 185 520 
               C 185 465, 130 420, 135 400 
               C 145 385, 160 365, 170 340 
               C 180 305, 160 260, 110 260 Z" 
            fill="#c28b5a" 
            opacity="0.6"
          />
          
          {/* Sound Hole */}
          <circle cx="110" cy="380" r="40" fill="#12100e" />
          
          {/* Rosette (ring around sound hole) */}
          <circle cx="110" cy="380" r="45" fill="none" stroke="#2d1c14" strokeWidth="2" opacity="0.6" />
          <circle cx="110" cy="380" r="50" fill="none" stroke="#2d1c14" strokeWidth="1" opacity="0.4" />

          {/* Pickguard */}
          <path d="M150 360 C 180 380, 180 440, 140 460 C 130 460, 120 440, 130 410 Z" fill="#4a2e15" opacity="0.8" />

          {/* Bridge */}
          <rect x="75" y="470" width="70" height="20" rx="4" fill="#2d1c14" />
          
          {/* Bridge Pins */}
          <circle cx="82" cy="480" r="2" fill="#f4f0ec" />
          <circle cx="93" cy="480" r="2" fill="#f4f0ec" />
          <circle cx="104" cy="480" r="2" fill="#f4f0ec" />
          <circle cx="115" cy="480" r="2" fill="#f4f0ec" />
          <circle cx="126" cy="480" r="2" fill="#f4f0ec" />
          <circle cx="137" cy="480" r="2" fill="#f4f0ec" />

          {/* Strings */}
          <g className="guitar-strings" stroke="#e0e0e0" strokeWidth="1.2" opacity="0.7">
            <line x1="100" y1="20" x2="100" y2="475" />
            <line x1="104" y1="25" x2="104" y2="475" />
            <line x1="108" y1="30" x2="108" y2="475" />
            <line x1="112" y1="30" x2="112" y2="475" />
            <line x1="116" y1="25" x2="116" y2="475" />
            <line x1="120" y1="20" x2="120" y2="475" />
          </g>
        </svg>
      </div>

      <div className="guitar-ambient-glow" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '180px',
        height: '450px',
        background: 'radial-gradient(ellipse, rgba(212, 163, 115, 0.15), transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
    </motion.div>
  );
};

export default GuitarInteractive;
