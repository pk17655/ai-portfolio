import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Float,
  Icosahedron,
  Torus,
  Sparkles,
  MeshDistortMaterial,
} from '@react-three/drei'
import * as THREE from 'three'

const lerp = THREE.MathUtils.lerp

/**
 * An "AI core" avatar — a distorted glowing orb wrapped in a wireframe shell
 * and gyroscopic rings. The whole rig tilts toward the pointer (head/eye
 * tracking) and idle-floats.
 *
 * @param pointer  React ref holding { x, y } normalized to [-1, 1]
 * @param colors   { primary, secondary, accent } hex strings
 * @param quality  'high' | 'low' — lowers particle counts on weak devices
 */
export default function AIRobot({ pointer, colors, quality = 'high' }) {
  const rig = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const eye = useRef()

  const sparkleCount = quality === 'high' ? 60 : 20

  useFrame((state, delta) => {
    const p = pointer?.current || { x: 0, y: 0 }
    if (rig.current) {
      rig.current.rotation.y = lerp(rig.current.rotation.y, p.x * 0.6, 0.06)
      rig.current.rotation.x = lerp(rig.current.rotation.x, p.y * 0.4, 0.06)
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.4
    if (ringB.current) {
      ringB.current.rotation.x += delta * 0.3
      ringB.current.rotation.y += delta * 0.2
    }
    // The "eye" pupil follows the pointer a touch more sharply.
    if (eye.current) {
      eye.current.position.x = lerp(eye.current.position.x, p.x * 0.35, 0.1)
      eye.current.position.y = lerp(eye.current.position.y, -p.y * 0.35, 0.1)
    }
  })

  return (
    <group ref={rig} dispose={null}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* Glowing distorted core */}
        <Icosahedron args={[1.15, 6]}>
          <MeshDistortMaterial
            color={colors.primary}
            emissive={colors.secondary}
            emissiveIntensity={0.55}
            roughness={0.2}
            metalness={0.85}
            distort={0.35}
            speed={2.2}
          />
        </Icosahedron>

        {/* Wireframe shell */}
        <Icosahedron args={[1.55, 1]}>
          <meshBasicMaterial
            color={colors.accent}
            wireframe
            transparent
            opacity={0.35}
          />
        </Icosahedron>

        {/* Pupil / eye that tracks the pointer */}
        <mesh ref={eye} position={[0, 0, 1.25]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>

        {/* Gyroscopic rings */}
        <Torus ref={ringA} args={[2, 0.02, 16, 120]}>
          <meshBasicMaterial color={colors.primary} transparent opacity={0.6} />
        </Torus>
        <Torus ref={ringB} args={[2.3, 0.015, 16, 120]}>
          <meshBasicMaterial color={colors.secondary} transparent opacity={0.45} />
        </Torus>
      </Float>

      <Sparkles
        count={sparkleCount}
        scale={6}
        size={2}
        speed={0.4}
        color={colors.accent}
        opacity={0.7}
      />

      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={45} color={colors.primary} />
      <pointLight position={[-4, -2, 2]} intensity={30} color={colors.secondary} />
    </group>
  )
}
