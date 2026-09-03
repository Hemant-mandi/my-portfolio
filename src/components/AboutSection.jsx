import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGuitar, FaUsers, FaBrain } from 'react-icons/fa';

const skills = [
  { name: 'Java / DSA', level: 85 },
  { name: 'Python', level: 90 },
  { name: 'C Programming', level: 78 },
  { name: 'Web Development', level: 74 },
  { name: 'Data Science', level: 70 },
];

const traits = [
  { icon: <FaCode />, label: 'Full-Stack Dev' },
  { icon: <FaBrain />, label: 'Problem Solver' },
  { icon: <FaGuitar />, label: 'Musician' },
  { icon: <FaUsers />, label: 'Team Leader' },
];

const AboutSection = () => {
  return (
    <section className="section-container section-snap" id="about">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label">Who I Am</p>
        <h2 className="section-title">About Me</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {/* Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel">
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                A curious CS student with a strong foundation in <strong style={{ color: '#fff' }}>Java, Python and C</strong>, 
                exploring the intersections of web development, data science, and systems thinking. 
                Part of a startup project under <strong style={{ color: 'var(--accent-2)' }}>Project NAIN 2.0</strong>. 
                I like building things that are useful, and occasionally things that are just fun.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                {traits.map(t => (
                  <div key={t.label} className="tag" style={{ padding: '0.45rem 1rem' }}>
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Language / Interests */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>🌍 Languages I Speak</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['English', 'Kannada', 'Marathi', 'Hindi'].map(l => (
                  <span key={l} className="tag">{l}</span>
                ))}
              </div>
              <h3 style={{ fontSize: '1rem', margin: '1.25rem 0 0.75rem', color: 'var(--text-secondary)' }}>🎌 Interests</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['🎸 Guitar', '🎤 Singing', '⛩️ Anime', '💻 Coding'].map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-panel">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Technical Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {skills.map((skill, i) => (
                <motion.div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{skill.level}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
