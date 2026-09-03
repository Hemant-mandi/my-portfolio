import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    let rafId;
    const followMouse = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 18}px, ${followerPos.current.y - 18}px)`;
      }
      rafId = requestAnimationFrame(followMouse);
    };
    followMouse();

    const onEnter = () => {
      if (followerRef.current) { followerRef.current.style.width = '60px'; followerRef.current.style.height = '60px'; }
    };
    const onLeave = () => {
      if (followerRef.current) { followerRef.current.style.width = '36px'; followerRef.current.style.height = '36px'; }
    };

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
};

export default Cursor;
