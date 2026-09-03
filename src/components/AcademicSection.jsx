import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Circular Gauge Component ─── */
const CircleGauge = ({ percentage, label, sublabel, color1 = '#7c3aed', color2 = '#06b6d4', delay = 0 }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const strokeDash = (progress / 100) * circ;

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        let start = 0;
        const step = () => {
          start += 1.2;
          if (start >= percentage) {
            setProgress(percentage);
          } else {
            setProgress(start);
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, percentage, delay]);

  const id = `grad-${label.replace(/\s/g, '')}`;

  return (
    <div ref={ref} className="gauge-ring" style={{ animation: inView ? `float 4s ease-in-out infinite ${delay}s` : 'none' }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {/* Progress */}
        <circle
          cx="55" cy="55" r={radius}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circ}`}
          style={{ filter: `drop-shadow(0 0 6px ${color1}80)`, transition: 'stroke-dasharray 0.05s linear' }}
        />
      </svg>
      <div className="gauge-label">
        <span className="gauge-pct">{progress.toFixed(1)}<span style={{ fontSize: '0.6rem' }}>%</span></span>
        <span className="gauge-sub">{sublabel}</span>
      </div>
    </div>
  );
};

/* ─── Animated Progress Bar ─── */
const SemesterBar = ({ sem, pct, delay, max = 100 }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth((pct / max) * 100), delay * 1000 + 200);
      return () => clearTimeout(t);
    }
  }, [inView, pct, max, delay]);

  const getColor = (p) => {
    if (p >= 90) return ['#7c3aed', '#06b6d4'];
    if (p >= 85) return ['#0ea5e9', '#38bdf8'];
    if (p >= 80) return ['#10b981', '#34d399'];
    return ['#f59e0b', '#fbbf24'];
  };
  const [c1, c2] = getColor(pct);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
    >
      <span className="sem-bar-label">{sem}</span>
      <div className="progress-track" style={{ flex: 1 }}>
        <div
          className="progress-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${c1}, ${c2})`,
            boxShadow: `0 0 12px ${c1}80`,
          }}
        />
      </div>
      <span className="sem-pct-label" style={{ color: c1 }}>{pct}%</span>
    </motion.div>
  );
};

const semesters = [
  { sem: '1st Sem', pct: 88.5 },
  { sem: '2nd Sem', pct: 95.0 },
  { sem: '3rd Sem', pct: 91.9 },
  { sem: '4th Sem', pct: 84.2 },
  { sem: '5th Sem', pct: 85.0 },
  { sem: '6th Sem', pct: 96.7 },
];

const AcademicSection = () => {
  const avgSem = (semesters.reduce((a, s) => a + s.pct, 0) / semesters.length).toFixed(1);
  const bestSem = Math.max(...semesters.map(s => s.pct));

  return (
    <section className="section-container section-snap" id="academic">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label">Track Record</p>
        <h2 className="section-title">Academic Journey</h2>

        {/* ── Top row: 10th / 12th gauges ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <CircleGauge percentage={96.96} label="10th" sublabel="10th CBSE" color1="#7c3aed" color2="#ec4899" delay={0.1} />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SSLC / 10th</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.25rem 0' }}>96.96%</div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>CBSE Board</span>
              <div className="achievement-badge" style={{ marginTop: '0.75rem', fontSize: '0.72rem' }}>
                🌟 Distinction
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <CircleGauge percentage={88} label="12th" sublabel="12th PUC" color1="#06b6d4" color2="#0ea5e9" delay={0.2} />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pre-University / 12th</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.25rem 0' }}>88.00%</div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Prerana PU College</span>
              <div className="achievement-badge" style={{ marginTop: '0.75rem', fontSize: '0.72rem', background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(14,165,233,0.15))', borderColor: 'rgba(6,182,212,0.3)', color: '#06b6d4' }}>
                🎯 First Class
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Engineering Avg.</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }} className="gradient-text">{avgSem}%</div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Best Semester</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }} className="gradient-text-amber">{bestSem}%</div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>6th Semester 🔥</span>
            </div>
          </div>
        </div>

        {/* ── Engineering Semesters ── */}
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                Engineering — S.G Balekundri Institute of Technology
              </h3>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Bachelor of Engineering, 2024 – 2027</span>
            </div>
            <div className="tag">📈 Consistent Performer</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {semesters.map((s, i) => (
              <SemesterBar key={s.sem} sem={s.sem} pct={s.pct} delay={i * 0.08} />
            ))}
          </div>

          {/* Chart visual footer */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '80px' }}>
              {semesters.map((s, i) => {
                const h = ((s.pct - 78) / (98 - 78)) * 100;
                const colors = ['#7c3aed','#06b6d4','#0ea5e9','#f59e0b','#10b981','#ec4899'];
                return (
                  <motion.div
                    key={s.sem}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      flex: 1, background: colors[i],
                      borderRadius: '6px 6px 0 0',
                      opacity: 0.7,
                      position: 'relative',
                      minHeight: '8px',
                    }}
                    whileHover={{ opacity: 1 }}
                    title={`${s.sem}: ${s.pct}%`}
                  />
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              {semesters.map(s => (
                <div key={s.sem} style={{ flex: 1, textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {s.sem.replace(' Sem', '')}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AcademicSection;
