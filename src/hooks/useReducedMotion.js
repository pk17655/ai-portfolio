import { useMediaQuery } from './useMediaQuery'

/**
 * True when the user has requested reduced motion at the OS level.
 * Components use this to skip / simplify heavy animations.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
