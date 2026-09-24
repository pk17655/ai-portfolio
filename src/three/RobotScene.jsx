import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import AIRobot from './AIRobot'
import theme from '@/config/theme.json'
import { useStore } from '@/store/useStore'
import { useIsDesktop } from '@/hooks/useMediaQuery'

/**
 * Canvas host for the AI avatar. Default-exported so it can be React.lazy'd,
 * which keeps the heavy Three.js bundle out of the initial payload.
 */
export default function RobotScene() {
  const mode = useStore((s) => s.theme)
  const isDesktop = useIsDesktop()
  const pointer = useRef({ x: 0, y: 0 })

  const palette = theme.colors[mode] || theme.colors.dark
  const colors = {
    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,
  }

  useEffect(() => {
    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={isDesktop ? [1, 2] : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <AIRobot
        pointer={pointer}
        colors={colors}
        quality={isDesktop ? 'high' : 'low'}
      />
    </Canvas>
  )
}
