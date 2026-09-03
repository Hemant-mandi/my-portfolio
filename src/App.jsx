import React from 'react';
import Background3D from './components/Background3D';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import AnimeBackground from './components/AnimeBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import AcademicSection from './components/AcademicSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceSection from './components/ExperienceSection';
import CertificatesSection from './components/CertificatesSection';
import ContactSection from './components/ContactSection';
import './index.css';

function App() {
  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* Custom Cursor */}
      <Cursor />

      {/* Fixed 3D Background */}
      <Background3D />

      {/* Anime overlay — kanji rain + sakura petals */}
      <AnimeBackground />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Page Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <HeroSection />
        <AboutSection />
        <AcademicSection />
        <AchievementsSection />
        <ExperienceSection />
        <CertificatesSection />
        <ContactSection />
      </div>
    </div>
  );
}

export default App;
