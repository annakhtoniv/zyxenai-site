import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { tokens } from '../../theme/tokens'

/**
 * The hero's 3D scene: a slow particle core that leans toward the pointer,
 * over a soft flowing colour field. Loaded lazily and paused when off screen.
 */

const backdropVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.999, 1.0); // fill the screen, behind everything
  }
`

const backdropFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uBase;
  uniform vec3 uA;
  uniform vec3 uB;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y) * 1.6;
    float t = uTime * 0.045;
    float n1 = fbm(p + vec2(t, -t * 0.6) + fbm(p * 0.8 - t));
    float n2 = fbm(p * 1.3 - vec2(t * 0.8, t) + 4.0);
    // Keep the glow toward the upper right and let the edges fall back to the page colour.
    float focus = smoothstep(1.05, 0.1, distance(vUv, vec2(0.7, 0.55)));
    vec3 col = uBase;
    col += uA * smoothstep(0.42, 0.95, n1) * 0.34 * focus;
    col += uB * smoothstep(0.45, 0.95, n2) * 0.30 * focus;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Backdrop({ animate }: { animate: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 12 },
      uAspect: { value: 1 },
      uBase: { value: new THREE.Color(tokens.colors.canvas) },
      uA: { value: new THREE.Color(tokens.colors.cyan) },
      uB: { value: new THREE.Color(tokens.colors.violet) },
    }),
    [],
  )
  useFrame(({ size }, delta) => {
    if (!material.current) return
    material.current.uniforms.uAspect.value = size.width / size.height
    if (animate) material.current.uniforms.uTime.value += delta
  })
  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={backdropVertex}
        fragmentShader={backdropFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Evenly spread points on a sphere, with a little depth so it reads as a volume. */
function spherePoints(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(1 - y * y)
    const theta = golden * i
    const r = radius * (0.9 + ((i * 7919) % 100) / 500)
    out[i * 3] = Math.cos(theta) * ring * r
    out[i * 3 + 1] = y * r
    out[i * 3 + 2] = Math.sin(theta) * ring * r
  }
  return out
}

function Core({ count, animate }: { count: number; animate: boolean }) {
  const lean = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const inner = useRef<THREE.LineSegments>(null)
  const { viewport } = useThree()
  const positions = useMemo(() => spherePoints(count, 1.55), [count])
  const wire = useMemo(() => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.95, 1)), [])

  // Sit to the right on wide screens, centred and further back on narrow ones.
  const wide = viewport.width > 6.5
  const x = wide ? viewport.width * 0.27 : viewport.width * 0.18
  const scale = wide ? 0.8 : 0.62

  useFrame(({ pointer }, delta) => {
    if (!animate || !lean.current || !spin.current) return
    spin.current.rotation.y += delta * 0.11
    if (inner.current) inner.current.rotation.x -= delta * 0.07
    // Ease toward the pointer for the "leaning" effect.
    const k = 1 - Math.exp(-delta * 3)
    lean.current.rotation.y += (pointer.x * 0.45 - lean.current.rotation.y) * k
    lean.current.rotation.x += (-pointer.y * 0.3 - lean.current.rotation.x) * k
  })

  return (
    <group ref={lean} position={[x, wide ? 0.15 : 1.25, 0]} scale={scale}>
      <group ref={spin} rotation={[0.35, 0, 0.18]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={tokens.colors.cyan}
            size={0.022}
            sizeAttenuation
            transparent
            opacity={wide ? 0.9 : 0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments ref={inner} geometry={wire}>
          <lineBasicMaterial color={tokens.colors.violet} transparent opacity={wide ? 0.5 : 0.3} />
        </lineSegments>
        {[1.9, 2.15].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2 + i * 0.5, i * 0.6, 0]}>
            <torusGeometry args={[r, 0.003, 6, 160]} />
            <meshBasicMaterial color={i ? tokens.colors.amber : tokens.colors.cyan} transparent opacity={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function HeroScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  const small = typeof window !== 'undefined' && window.innerWidth < 768
  // Reduced motion: draw one still frame. Off screen: stop drawing entirely.
  const frameloop = reduced ? 'demand' : active ? 'always' : 'never'
  return (
    <Canvas
      className="!absolute inset-0 animate-[fadein_1.2s_ease-out_both]"
      frameloop={frameloop}
      dpr={[1, small ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <Backdrop animate={!reduced} />
      <Core count={small ? 900 : 2600} animate={!reduced} />
    </Canvas>
  )
}
