"use client"

import { useRef, useEffect } from "react"

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animationFrameId: number

    const mouse = { x: -9999, y: -9999 }
    const isMobile = window.innerWidth < 768
    const MOUSE_RADIUS = isMobile ? 200 : 150
    const REPEL_STRENGTH = 0.06
    const CONNECTION_DISTANCE = isMobile ? 160 : 120

    // Scroll velocity tracking (signed: positive = down, negative = up)
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let scrollDelta = 0
    let lastScrollTime = 0

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      }
    }
    const handleTouchEnd = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const handleScroll = () => {
      const currentY = window.scrollY
      scrollVelocity += currentY - lastScrollY
      lastScrollY = currentY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleResize()

    interface Particle {
      x: number
      y: number
      radius: number
      baseRadius: number
      vx: number
      vy: number
      opacity: number
      depth: number
      angle: number // angle from center, used for ring spawn
    }

    const particles: Particle[] = []
    const PARTICLE_COUNT = isMobile ? 100 : 130

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = Math.random() * 1.8 + 0.4
      const depth = Math.random() * 0.8 + 0.2
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: r,
        baseRadius: r,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        depth,
        angle: Math.random() * Math.PI * 2,
      })
    }

    let warpIntensity = 0 // signed: positive = outward, negative = inward

    interface ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
    }
    const shootingStars: ShootingStar[] = []

    const rocket = {
      active: false,
      x: 0,
      y: 0,
      angle: 0,
      speed: 0
    }

    const render = () => {
      // Consume scroll velocity (signed), decay fast
      const targetWarp = Math.max(-0.7, Math.min(scrollVelocity / 80, 0.7))
      scrollVelocity *= 0.6
      if (Math.abs(scrollVelocity) < 0.3) scrollVelocity = 0

      // Smooth toward target, fast decay to 0
      const lerpSpeed = Math.abs(targetWarp) > Math.abs(warpIntensity) ? 0.1 : 0.08
      warpIntensity += (targetWarp - warpIntensity) * lerpSpeed
      if (Math.abs(warpIntensity) < 0.003) warpIntensity = 0

      const absWarp = Math.abs(warpIntensity)
      const warpSign = warpIntensity >= 0 ? 1 : -1

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      // Ring spawn radius: edges of the screen (diagonal / 2)
      const edgeRadius = Math.sqrt(centerX * centerX + centerY * centerY)

      // Background
      ctx.fillStyle = `rgb(6, 7, 20)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // --- Draw connections ---
      // On mobile: always show connections between close particles (cluster feel)
      // On desktop: only near mouse
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]

        // On desktop, skip particles far from mouse
        if (!isMobile) {
          const dxM = pi.x - mouse.x
          const dyM = pi.y - mouse.y
          if (Math.sqrt(dxM * dxM + dyM * dyM) > MOUSE_RADIUS * 1.5) continue
        }

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j]
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const base = (1 - dist / CONNECTION_DISTANCE)
            // On mobile, connections are subtler but always present
            const alpha = isMobile
              ? base * 0.15
              : base * 0.3
            ctx.strokeStyle = `rgba(100, 160, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.stroke()
          }
        }
      }

      // --- Update and draw particles ---
      const mouseEffect = Math.max(0, 1 - absWarp * 3)

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 0 && mouseEffect > 0.1) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * REPEL_STRENGTH * mouseEffect
          p.vy += Math.sin(angle) * force * REPEL_STRENGTH * mouseEffect
          p.radius = p.baseRadius + (1 - dist / MOUSE_RADIUS) * 1.5 * mouseEffect
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05
        }

        // Scroll warp: direction depends on scroll direction
        // Scroll down (warpSign > 0) = push outward from center
        // Scroll up (warpSign < 0) = pull inward toward center
        if (absWarp > 0.005) {
          const fromCX = p.x - centerX
          const fromCY = p.y - centerY
          const distC = Math.sqrt(fromCX * fromCX + fromCY * fromCY) || 1
          const pushForce = absWarp * p.depth * 0.4 * warpSign
          p.vx += (fromCX / distC) * pushForce
          p.vy += (fromCY / distC) * pushForce
          p.radius = p.baseRadius * (1 + absWarp * p.depth * 0.6)
        }

        // Friction
        const friction = 1 - (0.05 + absWarp * 0.06)
        p.vx *= friction
        p.vy *= friction
        p.x += p.vx
        p.y += p.vy

        // Wrap edges: during warp, respawn from the ring (edges), not center
        const margin = 30
        const outOfBounds =
          p.x < -margin || p.x > canvas.width + margin ||
          p.y < -margin || p.y > canvas.height + margin

        if (outOfBounds) {
          if (absWarp > 0.15) {
            // Respawn from edge ring: random point on the screen perimeter
            const angle = Math.random() * Math.PI * 2
            const spawnR = edgeRadius * (0.3 + Math.random() * 0.3)
            p.x = centerX + Math.cos(angle) * spawnR
            p.y = centerY + Math.sin(angle) * spawnR
            p.vx = 0
            p.vy = 0
          } else {
            if (p.x < -margin) p.x = canvas.width + margin
            if (p.x > canvas.width + margin) p.x = -margin
            if (p.y < -margin) p.y = canvas.height + margin
            if (p.y > canvas.height + margin) p.y = -margin
          }
        }

        // Streak trail during warp (subtle)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const streakLen = Math.min(speed * 2, 16) * absWarp

        if (streakLen > 1 && absWarp > 0.08) {
          const angle = Math.atan2(p.vy, p.vx)
          const tailX = p.x - Math.cos(angle) * streakLen
          const tailY = p.y - Math.sin(angle) * streakLen
          const grad = ctx.createLinearGradient(tailX, tailY, p.x, p.y)
          grad.addColorStop(0, "rgba(100, 160, 255, 0)")
          grad.addColorStop(1, `rgba(200, 220, 255, ${Math.min(p.opacity * 0.6 + absWarp * 0.2, 0.8)})`)
          ctx.strokeStyle = grad
          ctx.lineWidth = p.radius * 0.6
          ctx.lineCap = "round"
          ctx.beginPath()
          ctx.moveTo(tailX, tailY)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }

        // Mouse glow
        const isNearMouse = dist < MOUSE_RADIUS
        if (isNearMouse && mouseEffect > 0.1) {
          const glowI = (1 - dist / MOUSE_RADIUS) * mouseEffect
          const glowR = p.radius * (2.5 + glowI * 3)
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
          grd.addColorStop(0, `rgba(100, 160, 255, ${glowI * 0.3})`)
          grd.addColorStop(1, "rgba(100, 160, 255, 0)")
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
          ctx.fill()
        }

        // Particle core
        const alpha = isNearMouse
          ? Math.min(1, p.opacity + 0.3)
          : Math.min(1, p.opacity + absWarp * 0.15)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- Draw Planet ---
      // A subtle planet in the deep background with parallax scrolling
      const planetX = canvas.width * 0.8
      // Moves up smoothly as the user scrolls down
      const planetY = (canvas.height * 0.3) - (lastScrollY * 0.15)
      const planetRadius = isMobile ? 80 : 150

      ctx.save()
      const planetGrad = ctx.createRadialGradient(
        planetX - planetRadius * 0.3,
        planetY - planetRadius * 0.3,
        planetRadius * 0.1,
        planetX,
        planetY,
        planetRadius
      )
      planetGrad.addColorStop(0, 'rgba(80, 130, 255, 0.15)')
      planetGrad.addColorStop(1, 'rgba(6, 7, 20, 0)') // Fade into background

      ctx.fillStyle = planetGrad
      ctx.beginPath()
      ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2)
      ctx.fill()

      // Subtle ring around the planet
      ctx.beginPath()
      ctx.ellipse(planetX, planetY, planetRadius * 1.8, planetRadius * 0.4, Math.PI / 6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(100, 160, 255, 0.05)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      // --- Update and Draw Shooting Stars ---
      if (Math.random() < (isMobile ? 0.0015 : 0.003)) { // Reduced spawn rate
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: -50,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 15,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // Roughly diagonal down-right
          opacity: 1
        })
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed
        star.opacity -= 0.015 // Fade out

        if (star.opacity <= 0 || star.x > canvas.width + 100 || star.y > canvas.height + 100) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = star.x - Math.cos(star.angle) * star.length
        const tailY = star.y - Math.sin(star.angle) * star.length

        const starGrad = ctx.createLinearGradient(tailX, tailY, star.x, star.y)
        starGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
        starGrad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`)

        ctx.beginPath()
        ctx.strokeStyle = starGrad
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(star.x, star.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // --- Update and Draw Rocket ---
      if (!rocket.active && Math.random() < 0.0001) { // Extremely rare spawn
        rocket.active = true
        rocket.x = -50
        rocket.y = canvas.height + 50
        rocket.angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.3 // Diagonal up-right
        rocket.speed = 3 + Math.random() * 2
      }

      if (rocket.active) {
        rocket.x += Math.cos(rocket.angle) * rocket.speed
        rocket.y += Math.sin(rocket.angle) * rocket.speed

        if (rocket.x > canvas.width + 100 || rocket.y < -100) {
          rocket.active = false
        } else {
          ctx.save()
          ctx.translate(rocket.x, rocket.y)
          ctx.rotate(rocket.angle) // Orient forward

          // Draw rocket hull
          ctx.fillStyle = "#e2e8f0"
          ctx.beginPath()
          ctx.moveTo(16, 0)
          ctx.lineTo(-8, 6)
          ctx.lineTo(-12, 0)
          ctx.lineTo(-8, -6)
          ctx.closePath()
          ctx.fill()

          // Draw rocket fins
          ctx.fillStyle = "#3b82f6"
          ctx.beginPath()
          ctx.moveTo(-4, 5)
          ctx.lineTo(-10, 10)
          ctx.lineTo(-8, 5)
          ctx.closePath()
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(-4, -5)
          ctx.lineTo(-10, -10)
          ctx.lineTo(-8, -5)
          ctx.closePath()
          ctx.fill()

          // Draw rocket window
          ctx.fillStyle = "#0f172a"
          ctx.beginPath()
          ctx.arc(4, 0, 2, 0, Math.PI * 2)
          ctx.fill()

          // Rocket trail
          ctx.restore()
          ctx.beginPath()
          const trailTailX = rocket.x - Math.cos(rocket.angle) * 40
          const trailTailY = rocket.y - Math.sin(rocket.angle) * 40
          const trailGrad = ctx.createLinearGradient(trailTailX, trailTailY, rocket.x, rocket.y)
          trailGrad.addColorStop(0, "rgba(255, 100, 50, 0)")
          trailGrad.addColorStop(0.5, "rgba(255, 200, 50, 0.5)")
          trailGrad.addColorStop(1, "rgba(255, 255, 255, 0.8)")
          ctx.strokeStyle = trailGrad
          ctx.lineWidth = 4
          ctx.lineCap = "round"
          ctx.moveTo(trailTailX, trailTailY)
          ctx.lineTo(rocket.x - Math.cos(rocket.angle) * 15, rocket.y - Math.sin(rocket.angle) * 15)
          ctx.stroke()
        }
      }

      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("scroll", handleScroll)
      window.cancelAnimationFrame(animationFrameId)
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
