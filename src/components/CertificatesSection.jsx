import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCertificate, FaTimes, FaSearch, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import { FaJava, FaPython } from 'react-icons/fa';
import { FaCode, FaLaptopCode, FaGraduationCap, FaRocket } from 'react-icons/fa';

// ── Asset imports ─────────────────────────────────────────────────────────────
import capablJava    from '../assets/Capabl java certificate.jpeg';
import capablDSA     from '../assets/capabl Java Data structures certificate.jpeg';
import capablPython  from '../assets/capabl Python Programming certificate.jpeg';
import cwhPython     from '../assets/Python programming certificate by code with harry.jpeg';
import engAcademy    from '../assets/Engineers computer academy.jpeg';
import ultimezCert   from '../assets/ultimez internship conpletion certificate.jpeg';
import cognifizCert  from '../assets/Cognifiz Internship completion certificate.jpeg';
import nainCert      from '../assets/Nain completion certificate.jpeg';

// ── Certificate data ──────────────────────────────────────────────────────────
const certificates = [
  {
    title: 'Java Internship Completion',
    issuer: 'Ultimez Technology',
    year: '2024',
    category: 'Internship',
    color: '#f59e0b',
    icon: <FaJava size={20} />,
    image: ultimezCert,
  },
  {
    title: 'Web Development Internship',
    issuer: 'Cognifiz',
    year: '2024',
    category: 'Internship',
    color: '#06b6d4',
    icon: <FaCode size={20} />,
    image: cognifizCert,
  },
  {
    title: 'Java Programming',
    issuer: 'Capabl India',
    year: '2024',
    category: 'Certification',
    color: '#ef4444',
    icon: <FaJava size={20} />,
    image: capablJava,
  },
  {
    title: 'Data Structures & Algorithms in Java',
    issuer: 'Capabl India',
    year: '2024',
    category: 'Certification',
    color: '#8b5cf6',
    icon: <FaLaptopCode size={20} />,
    image: capablDSA,
  },
  {
    title: 'Python Programming',
    issuer: 'Capabl India',
    year: '2024',
    category: 'Certification',
    color: '#10b981',
    icon: <FaPython size={20} />,
    image: capablPython,
  },
  {
    title: 'Python Programming Course',
    issuer: 'Code With Harry',
    year: '2023',
    category: 'Course',
    color: '#06b6d4',
    icon: <FaPython size={20} />,
    image: cwhPython,
  },
  {
    title: 'Diploma in Office Automation',
    issuer: 'Engineers Computer Academy',
    year: '2022',
    category: 'Diploma',
    color: '#f59e0b',
    icon: <FaGraduationCap size={20} />,
    image: engAcademy,
  },
  {
    title: 'NAIN Project Completion',
    issuer: 'Project NAIN 2.0',
    year: '2024',
    category: 'Project',
    color: '#7c3aed',
    icon: <FaRocket size={20} />,
    image: nainCert,
  },
];

const CATEGORIES = ['All', ...new Set(certificates.map(c => c.category))];

// ── Animations ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ── Lightbox ──────────────────────────────────────────────────────────────────
const Lightbox = ({ certs, index, onClose, onPrev, onNext }) => {
  const cert = certs[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(10,10,25,0.97)',
          border: '1px solid rgba(124,58,237,0.35)',
          borderRadius: '24px',
          padding: '1.75rem',
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.15)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.35)',
            borderRadius: '50%', width: '38px', height: '38px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}
        >
          <FaTimes size={14} />
        </button>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: `${cert.color}20`, border: `1px solid ${cert.color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: cert.color,
          }}>
            {cert.icon}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cert.title}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cert.issuer} · {cert.year}</div>
          </div>
          <span style={{
            marginLeft: 'auto',
            padding: '0.25rem 0.8rem', borderRadius: '99px',
            fontSize: '0.72rem', fontWeight: 600,
            background: `${cert.color}20`, border: `1px solid ${cert.color}40`,
            color: cert.color,
          }}>
            {cert.category}
          </span>
        </div>

        {/* Image */}
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: '100%', borderRadius: '14px',
            border: '1px solid rgba(124,58,237,0.2)',
            display: 'block',
          }}
        />

        {/* Navigation */}
        {certs.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.25rem' }}>
            <button
              onClick={onPrev}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.55rem 1.25rem', borderRadius: '99px',
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem',
              }}
            >
              <FaChevronLeft size={12} /> Prev
            </button>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {index + 1} / {certs.length}
            </span>
            <button
              onClick={onNext}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.55rem 1.25rem', borderRadius: '99px',
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem',
              }}
            >
              Next <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const CertificatesSection = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = filter === 'All' ? certificates : certificates.filter(c => c.category === filter);

  const openLightbox = idx => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevCert = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const nextCert = () => setLightboxIndex(i => (i + 1) % filtered.length);

  return (
    <section className="section-container section-snap" id="certificates">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label">Credentials</p>
        <h2 className="section-title">Certifications & Diplomas</h2>

        {/* ── Filter tabs ── */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '99px',
                fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: filter === cat
                  ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                  : 'rgba(124,58,237,0.08)',
                border: filter === cat
                  ? '1px solid rgba(124,58,237,0.5)'
                  : '1px solid rgba(124,58,237,0.2)',
                color: filter === cat ? '#fff' : 'var(--text-secondary)',
                boxShadow: filter === cat ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.title + i}
              variants={cardVariants}
              className="glass-panel"
              style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => openLightbox(i)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: '100%', height: '170px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,25,0.9) 0%, transparent 60%)',
                }} />
                {/* Category badge */}
                <span style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  padding: '0.22rem 0.7rem', borderRadius: '99px',
                  fontSize: '0.68rem', fontWeight: 700,
                  background: `${cert.color}25`,
                  border: `1px solid ${cert.color}50`,
                  color: cert.color,
                  backdropFilter: 'blur(6px)',
                }}>
                  {cert.category}
                </span>
                {/* View icon */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease',
                  background: 'rgba(0,0,0,0.35)',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'rgba(124,58,237,0.8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <FaSearch size={18} color="#fff" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '8px',
                    background: `${cert.color}18`, border: `1px solid ${cert.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: cert.color, flexShrink: 0,
                  }}>
                    {cert.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.3 }}>{cert.title}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{cert.issuer}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                    {cert.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Showing {filtered.length} of {certificates.length} credentials · Click any card to view full certificate
        </motion.p>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            certs={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevCert}
            onNext={nextCert}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
