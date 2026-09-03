import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function StarField(props) {
  const ref = useRef();
  const raw = new Float32Array(5000);
  random.inSphere(raw, { radius: 1.8 });
  // Filter NaN to prevent WebGL crash
  const sphere = raw.map(v => (isNaN(v) ? 0 : v));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
    const x = (state.pointer.x * state.viewport.width) / 120;
    const y = (state.pointer.y * state.viewport.height) / 120;
    ref.current.position.x += (x - ref.current.position.x) * 0.015;
    ref.current.position.y += (y - ref.current.position.y) * 0.015;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

function NebulaDust(props) {
  const ref = useRef();
  const raw2 = new Float32Array(2000);
  random.inSphere(raw2, { radius: 1.2 });
  const sphere = raw2.map(v => (isNaN(v) ? 0 : v));

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 40;
    ref.current.rotation.z -= delta / 25;
  });

  return (
    <group rotation={[0, Math.PI / 3, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

const Background3D = () => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      zIndex: 0,
      background: 'radial-gradient(ellipse at 20% 30%, rgba(124,58,237,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(6,182,212,0.04) 0%, transparent 60%), #020208'
    }}>
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false }}>
        <StarField />
        <NebulaDust />
      </Canvas>
      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
        zIndex: 1
      }} />
    </div>
  );
};

export default Background3D;
