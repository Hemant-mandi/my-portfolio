import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaFileDownload, FaGithub } from 'react-icons/fa';

const contacts = [
  {
    href: 'mailto:hemantmandi06@gmail.com',
    icon: <FaEnvelope size={28} />,
    label: 'Email',
    value: 'hemantmandi06@gmail.com',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.2)',
  },
  {
    href: 'https://www.linkedin.com/in/hemant-mandi-8a89a72bb/',
    icon: <FaLinkedin size={28} />,
    label: 'LinkedIn',
    value: 'Hemant Mandi',
    color: '#0077b5',
    glow: 'rgba(0,119,181,0.2)',
  },
  {
    href: 'https://github.com/Hemant-mandi',
    icon: <FaGithub size={28} />,
    label: 'GitHub',
    value: '@HemantMandi',
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.15)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const ContactSection = () => {
  return (
    <section className="section-container section-snap" id="contact" style={{ minHeight: '80vh', paddingTop: '8rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        style={{ width: '100%' }}
      >
        <p className="section-label">Let's Connect</p>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Get In Touch</h2>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem' }}>
          I'm always open to discussing new ideas, collaborations, or hackathons. Let's build something amazing together.
        </p>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contacts.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              variants={cardVariants}
              className="glass-panel"
              data-hover
              style={{
                display: 'flex', alignItems: 'center', gap: '1.1rem',
                textDecoration: 'none', padding: '1.4rem',
                borderColor: `${c.color}30`,
              }}
              whileHover={{ y: -6, borderColor: `${c.color}70`, boxShadow: `0 20px 40px ${c.glow}` }}
            >
              <div style={{
                width: '50px', height: '50px', borderRadius: '13px', flexShrink: 0,
                background: c.glow, border: `1px solid ${c.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.color, boxShadow: `0 0 16px ${c.glow}`,
              }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{c.label}</div>
                <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{c.value}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Resume Download */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
          <motion.a
            href="/Hemant's Resume.pdf"
            download
            className="hero-cta"
            data-hover
            whileHover={{ scale: 1.05 }}
            style={{ gap: '0.75rem' }}
          >
            <FaFileDownload size={18} />
            <span>Download Resume</span>
          </motion.a>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', letterSpacing: '0.05em', fontFamily: "'JetBrains Mono', monospace" }}>
            © {new Date().getFullYear()} <span style={{ color: 'var(--accent-color)' }}>Hemant Mandi</span> — Crafted with 💜, Coffee ☕ & Anime 🎌
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
