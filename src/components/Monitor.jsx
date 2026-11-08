import React from 'react';
import { motion } from 'framer-motion';

const Monitor = ({ roles, roleIndex, displayText }) => {
  return (
    <div className="workspace-monitor">
      <div className="monitor-frame">
        <div className="monitor-screen">
          <div className="monitor-glare"></div>
          
          <div className="monitor-content">
            <motion.h1
              className="monitor-name"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Hemant Mandi
            </motion.h1>

            <motion.div
              className="monitor-role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span style={{ color: roles[roleIndex].color, transition: 'color 0.3s ease' }}>
                {displayText}
                <span
                  className="monitor-cursor"
                  style={{ background: roles[roleIndex].color }}
                />
              </span>
            </motion.div>

            <motion.p
              className="monitor-desc"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Code by day, chords by night. I build backend systems that hold up
              under load, chase 24-hour hackathon deadlines, and keep a guitar
              within arm's reach of the keyboard.
            </motion.p>

            <motion.div
              className="monitor-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <a href="#achievements" className="hero-cta">View Achievements</a>
              <a href="#contact" className="hero-cta-outline">Get In Touch</a>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="monitor-stand">
        <div className="stand-neck"></div>
        <div className="stand-base"></div>
      </div>
    </div>
  );
};

export default Monitor;
