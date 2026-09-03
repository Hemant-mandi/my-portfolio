import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  { text: 'CSE Student', color: '#7c3aed' },
  { text: 'Data Science Enthusiast', color: '#06b6d4' },
  { text: 'Problem Solver', color: '#f59e0b' },
  { text: 'Guitarist', color: '#ec4899' },
  { text: 'Singer', color: '#b6e217' },
  { text: 'Weeb at Heart', color: '#10b981' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Hemant-mandi', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hemant-mandi-8a89a72bb/', icon: 'LI' },
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

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

  return (
    <section className="hero-section section-snap" style={{ minHeight: '100vh' }}>
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '60%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '40%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)'
      }} />

      <div style={{ maxWidth: '900px', position: 'relative', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-greeting"
        >
          &gt; Hello, World. I am —
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ display: 'block' }}>Hemant</span>
          <span style={{ display: 'block', WebkitTextStroke: '2px rgba(124,58,237,0.5)', color: 'transparent' }}>
            Mandi
          </span>
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          className="hero-role-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="hero-role-prefix">a</span>
          <span style={{
            fontWeight: 700,
            fontSize: 'inherit',
            color: roles[roleIndex].color,
            fontFamily: "'Space Grotesk', sans-serif",
            transition: 'color 0.5s ease',
            minWidth: '280px',
            display: 'inline-block'
          }}>
            {displayText}
            <span style={{
              display: 'inline-block',
              width: '3px',
              height: '1.1em',
              background: roles[roleIndex].color,
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
              borderRadius: '2px',
              animation: 'blink 1s step-end infinite'
            }} />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            maxWidth: '600px',
            marginBottom: '2.5rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          Crafting digital experiences and building software that matters. 
          I specialize in <strong style={{ color: '#c4b5fd' }}>backend systems, data-driven applications, and creating elegant solutions to complex problems</strong>. 
          Always learning, exploring new technologies, and striving for excellence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <a href="#achievements" className="hero-cta" data-hover>
            <span>View Achievements</span>
            <span style={{ fontSize: '1.2rem' }}>🏆</span>
          </a>
          <a href="#contact" className="hero-cta-outline" data-hover>
            <span>Get in Touch</span>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', justifyContent: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="stat-bubble">
            <span className="stat-number">4+</span>
            <span className="stat-label">Hackathons</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div className="stat-bubble">
            <span className="stat-number">189</span>
            <span className="stat-label">Teams Competed</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div className="stat-bubble">
            <span className="stat-number">90.2%</span>
            <span className="stat-label">Engg. Avg.</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div className="stat-bubble">
            <span className="stat-number">6</span>
            <span className="stat-label">Semesters Done</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2 }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, var(--accent-color), transparent)',
          animation: 'float 2s ease-in-out infinite'
        }} />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
