import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const achievements = [
  {
    rank: 'FEATURED',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.1))',
    border: 'rgba(245,158,11,0.3)',
    icon: <FaTrophy size={28} color="#f59e0b" />,
    title: 'NeoNexus 36.0 — National Hackathon',
    year: '2025',
    org: 'IEEE BITM',
    description: 'Developed a Smart Accident-Alert System using GSM, GPS, and embedded sensors during a 36-hour national-level hackathon with 189 teams. The solution enables real-time, internet-free emergency response.',
    tags: ['IoT', 'Embedded Systems', 'GSM/GPS', '36 Hours'],
  }
];

const participations = [
  {
    icon: <FaMedal size={22} color="#94a3b8" />,
    title: 'Smart India Hackathon (SIH)',
    year: '2025',
    description: "India's largest national-level hackathon. Competed with a team to build impactful tech solutions for government problem statements.",
    color: '#94a3b8',
    border: 'rgba(148,163,184,0.2)',
  },
  {
    icon: <FaAward size={22} color="#06b6d4" />,
    title: 'Inventra',
    year: '2025',
    location: 'Chikkodi',
    description: 'Innovation and invention-focused hackathon. Developed creative prototype solutions with a cross-functional team.',
    color: '#06b6d4',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: <FaStar size={22} color="#8b5cf6" />,
    title: 'Anveshan',
    year: '2025',
    location: 'Bangalore',
    description: 'Research and innovation showcase held in Bangalore. Presented cutting-edge project concepts to industry experts and academicians.',
    color: '#8b5cf6',
    border: 'rgba(139,92,246,0.2)',
  },
];

const AchievementsSection = () => {
  return (
    <section className="section-container section-snap" id="achievements">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label">Recognition</p>
        <h2 className="section-title">Achievements & Hackathons</h2>

        {/* ── Featured Win ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ marginBottom: '2rem' }}
        >
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="glass-panel"
              style={{
                background: ach.gradient,
                borderColor: ach.border,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Big background trophy */}
              <div style={{
                position: 'absolute', bottom: '-30px', right: '-20px',
                opacity: 0.04, pointerEvents: 'none', transform: 'rotate(-10deg)'
              }}>
                <FaTrophy size={240} color="#f59e0b" />
              </div>

              {/* Glow corner */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '200px', height: '200px',
                background: `radial-gradient(circle at 0% 0%, ${ach.glow} 0%, transparent 70%)`,
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '16px', flexShrink: 0,
                    background: `linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.1))`,
                    border: `1px solid ${ach.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 20px ${ach.glow}`
                  }}>
                    {ach.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem', fontWeight: 700,
                        padding: '0.2rem 0.75rem',
                        background: 'rgba(245,158,11,0.2)',
                        border: '1px solid rgba(245,158,11,0.4)',
                        borderRadius: '99px', color: '#f59e0b',
                        letterSpacing: '0.1em'
                      }}>
                        ⭐ {ach.rank} PROJECT
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{ach.org} · {ach.year}</span>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', color: '#fff' }}>{ach.title}</h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '640px', fontSize: '0.95rem' }}>
                  {ach.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {ach.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Participations ── */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
            Other Hackathon Participations
          </h3>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {participations.map((p, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="glass-panel"
                style={{ borderColor: p.border, padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `${p.color}18`,
                    border: `1px solid ${p.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.1rem' }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {p.year}{p.location ? ` · ${p.location}` : ''}
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: '1.6' }}>
                  {p.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AchievementsSection;
