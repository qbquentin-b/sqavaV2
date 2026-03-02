"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("@/components/particle-background"),
  { ssr: false }
)

export default function ParticleBackgroundWrapper() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Only render particles if user does NOT prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      setShouldRender(true)
    }
  }, [])

  if (!shouldRender) return null

  return <ParticleBackground />
}
