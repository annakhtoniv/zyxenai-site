import { useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { site, type ProductIcon } from '../../content/site'
import { tokens } from '../../theme/tokens'
import { accentOf } from './accent'

/**
 * Glossy 3D icons, one per product, built from simple shapes in code.
 * Only the active product's icon is shown; it floats, turns slowly and leans to the pointer.
 */

function Gloss({ color, soft = false }: { color: string; soft?: boolean }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.2}
      metalness={0.2}
      clearcoat={1}
      clearcoatRoughness={0.12}
      emissive={color}
      emissiveIntensity={soft ? 0.05 : 0.16}
      side={THREE.DoubleSide}
    />
  )
}
const pale = '#F3F5FA'
const extrude = { depth: 0.34, bevelEnabled: true, bevelSize: 0.07, bevelThickness: 0.07, bevelSegments: 6, curveSegments: 40 }

function useFlame() {
  return useMemo(() => {
    const pts = Array.from({ length: 32 }, (_, i) => {
      const t = i / 31
      return new THREE.Vector2(0.72 * Math.sin(Math.PI * Math.pow(t, 0.5)) * (1 - 0.5 * t), -0.8 + 2 * t)
    })
    const geo = new THREE.LatheGeometry(pts, 48)
    // Bend the tip sideways so it reads as a flame, not a droplet.
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getY(i) + 0.8) / 2
      pos.setX(i, pos.getX(i) + 0.3 * t * t * Math.sin(t * 3.4))
    }
    geo.computeVertexNormals()
    return geo
  }, [])
}
function useMoon() {
  return useMemo(() => {
    const deg = Math.PI / 180
    const s = new THREE.Shape()
    s.absarc(0, 0, 1, 50 * deg, 310 * deg, false)
    s.absarc(0.45, 0, 0.79, -75.9 * deg, 75.9 * deg, true)
    return new THREE.ExtrudeGeometry(s, extrude).center()
  }, [])
}
function useGear() {
  return useMemo(() => {
    const s = new THREE.Shape()
    const teeth = 8
    const step = (Math.PI * 2) / teeth
    for (let i = 0; i < teeth; i++) {
      const a = i * step
      const corners: [number, number][] = [[0, 0.76], [0.14, 1], [0.5, 1], [0.64, 0.76]]
      corners.forEach(([f, r], j) => {
        const x = Math.cos(a + f * step) * r
        const y = Math.sin(a + f * step) * r
        if (i === 0 && j === 0) s.moveTo(x, y)
        else s.lineTo(x, y)
      })
    }
    s.closePath()
    const hole = new THREE.Path()
    hole.absarc(0, 0, 0.34, 0, Math.PI * 2, true)
    s.holes.push(hole)
    return new THREE.ExtrudeGeometry(s, { ...extrude, bevelSize: 0.04, bevelThickness: 0.05 }).center()
  }, [])
}

function Icon({ kind, color }: { kind: ProductIcon; color: string }): ReactNode {
  const flame = useFlame()
  const moon = useMoon()
  const gear = useGear()
  switch (kind) {
    case 'flame':
      return (
        <>
          <mesh geometry={flame} position={[0, 0, 0]}><Gloss color={color} /></mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
            <torusGeometry args={[1.02, 0.07, 20, 80]} />
            <Gloss color={pale} soft />
          </mesh>
        </>
      )
    case 'moon':
      return (
        <>
          <mesh geometry={moon} rotation={[0, 0, 0.35]}><Gloss color={color} /></mesh>
          <mesh position={[0.62, 0.42, 0.1]}><sphereGeometry args={[0.11, 24, 24]} /><Gloss color={pale} soft /></mesh>
          <mesh position={[0.9, -0.1, -0.1]}><sphereGeometry args={[0.06, 24, 24]} /><Gloss color={pale} soft /></mesh>
        </>
      )
    case 'compass':
      return (
        <>
          <mesh><torusGeometry args={[1, 0.1, 24, 96]} /><Gloss color={color} /></mesh>
          <group rotation={[0, 0, -0.6]}>
            <mesh position={[0, 0.38, 0]}><coneGeometry args={[0.17, 0.76, 4]} /><Gloss color={pale} soft /></mesh>
            <mesh position={[0, -0.38, 0]} rotation={[0, 0, Math.PI]}><coneGeometry args={[0.17, 0.76, 4]} /><Gloss color={color} /></mesh>
          </group>
          <mesh><sphereGeometry args={[0.1, 24, 24]} /><Gloss color={pale} soft /></mesh>
        </>
      )
    case 'gear':
      return (
        <>
          <mesh geometry={gear}><Gloss color={color} /></mesh>
          <mesh geometry={gear} scale={0.46} position={[0.98, 0.72, -0.05]} rotation={[0, 0, 0.3]}><Gloss color={pale} soft /></mesh>
        </>
      )
    case 'funnel':
      return (
        <group position={[0, 0.15, 0]} rotation={[0.25, 0, 0]}>
          <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[1, 0.26, 0.95, 64, 1, true]} /><Gloss color={color} /></mesh>
          <mesh position={[0, 0.725, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1, 0.06, 20, 96]} /><Gloss color={pale} soft /></mesh>
          <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.26, 0.2, 0.56, 48, 1, true]} /><Gloss color={color} /></mesh>
          <mesh position={[0, -1.02, 0]}><sphereGeometry args={[0.12, 24, 24]} /><Gloss color={pale} soft /></mesh>
        </group>
      )
    case 'radar':
      return (
        <group rotation={[-0.75, 0, 0]}>
          {[1, 0.66, 0.33].map((r) => (
            <mesh key={r}><torusGeometry args={[r, 0.045, 16, 96]} /><Gloss color={color} /></mesh>
          ))}
          <mesh rotation={[0, 0, 0.5]}>
            <circleGeometry args={[1, 32, 0, 0.8]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
          <mesh position={[0.42, 0.32, 0.05]}><sphereGeometry args={[0.1, 24, 24]} /><Gloss color={pale} soft /></mesh>
          <mesh><sphereGeometry args={[0.08, 24, 24]} /><Gloss color={pale} soft /></mesh>
        </group>
      )
    case 'book':
      return (
        <group rotation={[0.5, 0, 0]} position={[0, -0.1, 0]}>
          {[-1, 1].map((side) => (
            <group key={side} rotation={[0, side * -0.32, 0]}>
              <mesh position={[side * 0.52, 0, 0]}><boxGeometry args={[1, 1.36, 0.1]} /><Gloss color={color} /></mesh>
              <mesh position={[side * 0.5, 0, 0.09]}><boxGeometry args={[0.9, 1.24, 0.1]} /><Gloss color={pale} soft /></mesh>
            </group>
          ))}
        </group>
      )
  }
}

/** Holds one icon and grows or shrinks it as it becomes active or inactive. */
function Slot({ active, children }: { active: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const target = active ? 1 : 0
    const next = g.scale.x + (target - g.scale.x) * (1 - Math.exp(-delta * 9))
    g.scale.setScalar(next)
    g.visible = next > 0.01
  })
  return <group ref={group} scale={0} visible={false}>{children}</group>
}

function Stage({ activeIndex }: { activeIndex: number }) {
  const lean = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  useFrame(({ pointer, clock }, delta) => {
    if (!lean.current || !spin.current) return
    spin.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.55
    spin.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.08
    const k = 1 - Math.exp(-delta * 4)
    lean.current.rotation.y += (pointer.x * 0.5 - lean.current.rotation.y) * k
    lean.current.rotation.x += (-pointer.y * 0.35 - lean.current.rotation.x) * k
  })
  return (
    <group ref={lean}>
      <group ref={spin}>
        {site.products.map((p, i) => (
          <Slot key={p.id} active={i === activeIndex}>
            <Icon kind={p.icon} color={accentOf(p)} />
          </Slot>
        ))}
      </group>
    </group>
  )
}

export default function LabIconScene({ activeIndex, running }: { activeIndex: number; running: boolean }) {
  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} />
      <directionalLight position={[-4, 2, -3]} intensity={1.4} color={tokens.colors.cyan} />
      <pointLight position={[-2, -3, 2]} intensity={18} color={tokens.colors.violet} />
      <Stage activeIndex={activeIndex} />
    </Canvas>
  )
}
