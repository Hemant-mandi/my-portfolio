import React, { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Academic', href: '#academic' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="nav-fixed" style={{
      background: scrolled ? 'rgba(2,2,8,0.9)' : 'rgba(2,2,8,0.4)',
      borderBottomColor: scrolled ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.05)',
    }}>
      <div className="nav-logo">
        <span>&lt;</span>HM<span>/&gt;</span>
      </div>
      <ul className="nav-links">
        {navLinks.map(l => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
