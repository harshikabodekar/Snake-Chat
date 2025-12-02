import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RippleShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#0a0f0a') },
    uVenomColor: { value: new THREE.Color('#39ff14') },
    uVenomLevel: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uVenomColor;
    uniform float uVenomLevel;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);

      float wave = sin(dist * 20.0 - uTime * 2.0) * 0.05;
      float intensity = 0.05 + (uVenomLevel / 100.0) * 0.2;

      vec3 color = mix(uColor, uVenomColor, wave * intensity + (uVenomLevel / 500.0));

      // Vignette
      float vignette = 1.0 - smoothstep(0.4, 1.0, dist);
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const RipplePlane = ({ venomLevel }: { venomLevel: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial(RippleShader), []);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.uVenomLevel.value = venomLevel;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[100, 100]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default function BackgroundWebGL({ venomLevel }: { venomLevel: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <RipplePlane venomLevel={venomLevel} />
      </Canvas>
    </div>
  );
}
