import React from 'react';
import { motion } from 'framer-motion';
import { FaGuitar, FaRocket, FaTrophy, FaLeaf, FaCode, FaMountain } from 'react-icons/fa';

const cards = [
  {
    icon: <FaGuitar />,
    title: 'Music',
    desc: 'Six strings, endless practice. I write riffs the way I write functions — one clean iteration at a time.',
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    size: 'large',
  },
  {
    icon: <FaRocket />,
    title: 'Space',
    desc: 'Orbital mechanics and astrophysics rabbit holes on repeat. The night sky is my favorite debugger for perspective.',
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
  {
    icon: <FaTrophy />,
    title: 'Hackathons',
    desc: '24-hour sprints, 189 teams, one working demo. I thrive on the deadline-shaped chaos.',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    icon: <FaLeaf />,
    title: 'Nature',
    desc: 'Trails, quiet mornings, and the occasional attempt to identify a bird by ear.',
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399, #06b6d4)',
  },
  {
    icon: <FaCode />,
    title: 'Tech',
    desc: 'Backend systems, data pipelines, and the satisfying click of a build that finally passes.',
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
    size: 'large',
  },
  {
    icon: <FaMountain />,
    title: 'Exploration',
    desc: 'New frameworks, new trails, new chord progressions — same restless curiosity.',
    accent: '#a3e635',
    gradient: 'linear-gradient(135deg, #a3e635, #34d399)',
  },
];

const InterestsSection = () => {
  return (
    <section className="section-container section-snap" id="interests">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label">Off the Clock</p>
        <h2 className="section-title">Beyond the Code</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', marginTop: '-1.5rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          What I build is shaped by what I do when I'm not building. Here's the rest of the stack.
        </p>
        <div className="bento-grid">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className={`bento-card ${c.size === 'large' ? 'large' : ''}`}
              style={{ '--card-accent': c.accent, '--card-gradient': c.gradient }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-hover
            >
              <span className="bento-icon">{c.icon}</span>
              <h3 className="bento-title">{c.title}</h3>
              <p className="bento-desc">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default InterestsSection;
