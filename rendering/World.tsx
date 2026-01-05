import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../core/store';
import { QUALITY_CONFIG } from '../constants';

// Reusable geometry/material to save draw calls
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const standardMat = new THREE.MeshStandardMaterial({ color: '#f6ad55' });

const Zombies = () => {
  const zombieCount = useStore((state) => state.zombieCount);
  // In a real app, zombie positions would be managed by a physics engine or simple state
  const dummyData = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      position: [Math.sin(i) * 5, 0.5, Math.cos(i) * 5] as [number, number, number],
      speed: Math.random() * 0.02
  })), []);

  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (ref.current) {
        ref.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={ref}>
      <Instances range={zombieCount} geometry={boxGeo} material={standardMat}>
        {dummyData.map((data, i) => (
          <Instance key={i} position={data.position} color={i % 2 === 0 ? "#68d391" : "#fc8181"} />
        ))}
      </Instances>
    </group>
  );
};

export const World = () => {
  const qualityTier = useStore((state) => state.qualityTier);
  const config = QUALITY_CONFIG[qualityTier];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow={config.shadows} shadow-mapSize={[1024, 1024]} />
      
      <Environment preset="sunset" background blur={0.6} />

      {/* The Fortress */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 1.5, 0]} castShadow={config.shadows}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#63b3ed" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      {/* Terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow={config.shadows}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Game Entities */}
      <Zombies />

      {/* Expensive effects gated by quality */}
      {config.shadows && (
        <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
      )}
      
      {/* Particle System Placeholder - Only show on High/Med */}
      {(config.particles > 0) && (
        <points position={[0, 5, 0]}>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position" 
                    count={config.particles} 
                    array={new Float32Array(config.particles * 3).map(() => (Math.random() - 0.5) * 20)} 
                    itemSize={3} 
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="white" transparent opacity={0.4} />
        </points>
      )}
    </>
  );
};