"use client"

import { useRef, useEffect } from "react"
import { ParticleSystem } from "@/lib/particle-system"

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const system = new ParticleSystem(canvas)
    system.start()

    return () => {
      system.stop()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
