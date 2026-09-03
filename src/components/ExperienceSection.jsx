import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket, FaRobot, FaBriefcase, FaCode, FaTimes,
  FaExternalLinkAlt, FaCertificate, FaLaptopCode, FaGraduationCap, FaPython,
} from 'react-icons/fa';

// ── Certificate imports ──────────────────────────────────────────────────────
import ultimezCert   from '../assets/ultimez internship conpletion certificate.jpeg';
import cognifizCert  from '../assets/Cognifiz Internship completion certificate.jpeg';
import nainCert      from '../assets/Nain completion certificate.jpeg';
import capablJavaCert from '../assets/Capabl java certificate.jpeg';
import capablDSACert from '../assets/capabl Java Data structures certificate.jpeg';
import capablPyCert  from '../assets/capabl Python Programming certificate.jpeg';
import cwHarryCert   from '../assets/Python programming certificate by code with harry.jpeg';
import ecaCert       from '../assets/Engineers computer academy.jpeg';

// ── Data ─────────────────────────────────────────────────────────────────────
const internships = [
  {
    icon: <FaBriefcase size={24} color="#f59e0b" />,
    color: '#f59e0b',
    title: 'Java Development Intern',
    org: 'Ultimez Technology',
    period: '2024',
    description:
      'Completed a Java development internship at Ultimez Technology, gaining hands-on experience building real-world Java applications and strengthening core programming concepts.',
    tags: ['Java', 'OOP', 'Backend', 'Internship'],
    cert: ultimezCert,
    certLabel: 'Ultimez Internship Certificate',
  },
  {
    icon: <FaCode size={24} color="#06b6d4" />,
    color: '#06b6d4',
    title: 'Web Development Intern',
    org: 'Cognifiz',
    period: '2024',
    description:
      'Interned at Cognifiz as a Web Developer, working on responsive UI components and front-end features for live projects, deepening expertise in modern web technologies.',
    tags: ['Web Dev', 'Frontend', 'HTML/CSS', 'Internship'],
    cert: cognifizCert,
    certLabel: 'Cognifiz Internship Certificate',
  },
];

const projects = [
  {
    icon: <FaRocket size={24} color="#7c3aed" />,
    color: '#7c3aed',
    title: 'Project NAIN 2.0',
    org: 'Startup Initiative',
    period: '2024 – 2026 (Ongoing)',
    description:
      'Part of a startup initiative under Project NAIN 2.0, focusing on innovation and tech solutions. Collaborating with a driven team to adapt to dynamic environments and build scalable products.',
    tags: ['Startup', 'Innovation', 'Team Lead'],
    cert: nainCert,
    certLabel: 'NAIN Project Completion Certificate',
  },
  {
    icon: <FaRobot size={24} color="#10b981" />,
    color: '#10b981',
    title: 'ROS Software Management',
    org: 'Robot Simulation & Navigation',
    period: '2024',
    description:
      'Worked on robot simulation using ROS with navigation and lidar integration. Used Gazebo and RViz for testing and validating autonomous navigation algorithms.',
    tags: ['ROS', 'Gazebo', 'RViz', 'Python'],
    cert: null,
  },
];

const certifications = [
  {
    icon: <FaLaptopCode size={24} color="#f59e0b" />,
    color: '#f59e0b',
    title: 'Java Programming',
    org: 'Capabl India',
    period: '2024',
    description:
      'Earned a Java Programming certificate from Capabl India, covering core Java concepts including object-oriented programming, exception handling, and application development.',
    tags: ['Java', 'OOP', 'Programming'],
    cert: capablJavaCert,
    certLabel: 'Capabl Java Programming Certificate',
  },
  {
    icon: <FaCode size={24} color="#a855f7" />,
    color: '#a855f7',
    title: 'Data Structures & Algorithms in Java',
    org: 'Capabl India',
    period: '2024',
    description:
      'Completed a focused DSA course in Java at Capabl India, mastering fundamental data structures and algorithmic problem-solving techniques essential for software development.',
    tags: ['DSA', 'Java', 'Algorithms', 'Problem Solving'],
    cert: capablDSACert,
    certLabel: 'Capabl DSA in Java Certificate',
  },
  {
    icon: <FaPython size={24} color="#06b6d4" />,
    color: '#06b6d4',
    title: 'Python Programming',
    org: 'Capabl India',
    period: '2024',
    description:
      'Certified in Python Programming by Capabl India, covering Python fundamentals, scripting, and application of the language for data manipulation and automation.',
    tags: ['Python', 'Scripting', 'Programming'],
    cert: capablPyCert,
    certLabel: 'Capabl Python Programming Certificate',
  },
  {
    icon: <FaPython size={24} color="#10b981" />,
    color: '#10b981',
    title: 'Python Programming Course',
    org: 'Code With Harry',
    period: '2023',
    description:
      'Completed the comprehensive Python programming course by Code With Harry, building a solid foundation in Python syntax, logic, and real-world scripting projects.',
    tags: ['Python', 'Web', 'Scripting', 'Course'],
    cert: cwHarryCert,
    certLabel: 'Python Programming Certificate – Code With Harry',
  },
  {
    icon: <FaGraduationCap size={24} color="#f97316" />,
    color: '#f97316',
    title: 'Diploma in Office Automation',
    org: 'Engineers Computer Academy',
    period: '2022',
    description:
      'Received a Diploma in Office Automation from Engineers Computer Academy, gaining proficiency in productivity tools, system operations, and essential computing skills.',
    tags: ['MS Office', 'Computer Basics', 'Diploma'],
    cert: ecaCert,
    certLabel: 'Diploma in Office Automation Certificate',
  },
];

// ── Animations ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ── Certificate Modal ─────────────────────────────────────────────────────────
const CertModal = ({ cert, label, onClose }) => (
  <AnimatePresence>
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 40 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(12,12,30,0.95)',
          border: '1px solid rgba(124,58,237,0.35)',
          borderRadius: '20px',
          padding: '1.5rem',
          maxWidth: '860px',
          width: '100%',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.2)',
          position: 'relative',
        }}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', zIndex: 10,
          }}
        >
          <FaTimes size={14} />
        </button>

        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem', letterSpacing: '0.2em',
          color: 'var(--accent-2)', textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Certificate · {label}
        </p>

        <img
          src={cert}
          alt={label}
          style={{
            width: '100%', borderRadius: '12px',
            border: '1px solid rgba(124,58,237,0.2)',
            display: 'block',
          }}
        />
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ── Card ──────────────────────────────────────────────────────────────────────
const ExpCard = ({ item, onViewCert }) => (
  <motion.div variants={cardVariants} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
    {/* Icon */}
    <div style={{
      width: '50px', height: '50px', borderRadius: '14px',
      background: `${item.color}18`, border: `1px solid ${item.color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '1.2rem',
      boxShadow: `0 0 16px ${item.color}30`,
    }}>
      {item.icon}
    </div>

    {/* Header */}
    <div style={{ marginBottom: '0.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.4rem' }}>
        <h3 style={{ fontSize: '1.1rem' }}>{item.title}</h3>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          {item.period}
        </span>
      </div>
      <span style={{ color: item.color, fontSize: '0.83rem', fontWeight: 500 }}>{item.org}</span>
    </div>

    {/* Description */}
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.2rem', flex: 1 }}>
      {item.description}
    </p>

    {/* Footer */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      {item.cert && (
        <button
          onClick={() => onViewCert(item.cert, item.certLabel)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.45rem 1.1rem',
            borderRadius: '99px',
            fontSize: '0.78rem', fontWeight: 600,
            background: `${item.color}18`,
            border: `1px solid ${item.color}50`,
            color: item.color,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${item.color}30`;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${item.color}18`;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaExternalLinkAlt size={10} /> View Certificate
        </button>
      )}
    </div>
  </motion.div>
);

// ── Sub-section header ────────────────────────────────────────────────────────
const SubHeader = ({ text }) => (
  <h3 style={{
    fontSize: '1rem', color: 'var(--text-secondary)',
    marginBottom: '1.5rem', letterSpacing: '0.08em',
    fontFamily: "'JetBrains Mono', monospace",
  }}>
    {text}
  </h3>
);

// ── Main Section ──────────────────────────────────────────────────────────────
const ExperienceSection = () => {
  const [modal, setModal] = useState(null); // { src, label }

  const openCert = (src, label) => setModal({ src, label });
  const closeCert = () => setModal(null);

  return (
    <section className="section-container section-snap" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label">What I've Built & Done</p>
        <h2 className="section-title">Experience & Projects</h2>

        {/* ── Internships ── */}
        <div style={{ marginBottom: '3rem' }}>
          <SubHeader text="// Internship Experience" />
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {internships.map((item, i) => (
              <ExpCard key={i} item={item} onViewCert={openCert} />
            ))}
          </motion.div>
        </div>

        {/* ── Projects ── */}
        <div style={{ marginBottom: '3rem' }}>
          <SubHeader text="// Projects & Initiatives" />
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {projects.map((item, i) => (
              <ExpCard key={i} item={item} onViewCert={openCert} />
            ))}
          </motion.div>
        </div>

        {/* ── Certifications ── */}
        <div>
          <SubHeader text="// Certifications & Courses" />
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {certifications.map((item, i) => (
              <ExpCard key={i} item={item} onViewCert={openCert} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Certificate Modal */}
      {modal && <CertModal cert={modal.src} label={modal.label} onClose={closeCert} />}
    </section>
  );
};

export default ExperienceSection;
