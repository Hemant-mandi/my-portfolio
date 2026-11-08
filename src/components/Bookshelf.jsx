import React from 'react';

const Bookshelf = () => {
  return (
    <div className="workspace-bookshelf" style={{
      width: '320px',
      height: '800px', // floor to ceiling basically
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      position: 'relative',
      paddingLeft: '20px', // attached to left wall
      zIndex: 2,
    }}>
      {/* Shelf 1 - Top (Empty for future) */}
      <div className="shelf-level" style={shelfStyle}>
      </div>

      {/* Shelf 2 (Minimal Books) */}
      <div className="shelf-level" style={shelfStyle}>
        <div style={{ ...bookStyle, height: '60px', width: '20px', background: '#3b342e' }}></div>
        <div style={{ ...bookStyle, height: '70px', width: '16px', background: '#4a5446', marginLeft: '2px' }}></div>
        <div style={{ ...bookStyle, height: '55px', width: '18px', background: '#8a9a86', marginLeft: '4px', transform: 'rotate(8deg)', transformOrigin: 'bottom left' }}></div>
      </div>

      {/* Shelf 3 (Empty for future) */}
      <div className="shelf-level" style={shelfStyle}>
      </div>

      {/* Shelf 4 (A subtle plant) */}
      <div className="shelf-level" style={shelfStyle}>
        <div className="shelf-plant" style={{ position: 'relative', marginLeft: '30px', width: '40px', height: '30px', background: '#2c2520', borderRadius: '4px 4px 0 0' }}>
          <div style={{ position: 'absolute', bottom: '25px', left: '10px', width: '12px', height: '40px', background: '#64755a', borderRadius: '20px 0', transform: 'rotate(-20deg)' }}></div>
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '10px', height: '30px', background: '#758869', borderRadius: '0 20px', transform: 'rotate(25deg)' }}></div>
        </div>
      </div>
      
      {/* Shelf 5 - Bottom (Empty) */}
      <div className="shelf-level" style={shelfStyle}>
      </div>
    </div>
  );
};

const shelfStyle = {
  width: '100%',
  height: '14px',
  background: 'linear-gradient(to bottom, #2b231d, #1a1511)',
  borderBottom: '2px solid #0f0c0a',
  boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'flex-end',
  paddingLeft: '15px'
};

const bookStyle = {
  borderRadius: '2px 2px 0 0',
  boxShadow: 'inset 2px 0 0 rgba(255,255,255,0.05)'
};

export default Bookshelf;
