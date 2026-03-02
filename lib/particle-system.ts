interface Particle {
  x: number
  y: number
  radius: number
  baseRadius: number
  vx: number
  vy: number
  opacity: number
  depth: number
  angle: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
}

interface Rocket {
  active: boolean
  x: number
  y: number
  angle: number
  speed: number
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private animationFrameId: number = 0
  private particles: Particle[] = []
  private shootingStars: ShootingStar[] = []
  private rocket: Rocket = { active: false, x: 0, y: 0, angle: 0, speed: 0 }

  private mouse = { x: -9999, y: -9999 }
  private isMobile: boolean
  private MOUSE_RADIUS: number
  private REPEL_STRENGTH = 0.06
  private CONNECTION_DISTANCE: number

  private lastScrollY: number
  private scrollVelocity = 0
  private warpIntensity = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const context = canvas.getContext("2d")
    if (!context) throw new Error("Could not get 2d context")
    this.ctx = context

    this.isMobile = window.innerWidth < 768
    this.MOUSE_RADIUS = this.isMobile ? 200 : 150
    this.CONNECTION_DISTANCE = this.isMobile ? 160 : 120
    this.lastScrollY = window.scrollY

    this.initParticles()
    this.bindEvents()
    this.handleResize()
  }

  private initParticles() {
    const PARTICLE_COUNT = this.isMobile ? 100 : 130
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = Math.random() * 1.8 + 0.4
      const depth = Math.random() * 0.8 + 0.2
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: r,
        baseRadius: r,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        depth,
        angle: Math.random() * Math.PI * 2,
      })
    }
  }

  private bindEvents() {
    window.addEventListener("resize", this.handleResize)
    window.addEventListener("mousemove", this.handleMouseMove)
    window.addEventListener("mouseleave", this.handleMouseLeave)
    window.addEventListener("touchmove", this.handleTouchMove, { passive: true })
    window.addEventListener("touchend", this.handleTouchEnd)
    window.addEventListener("scroll", this.handleScroll, { passive: true })
  }

  private unbindEvents() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("mousemove", this.handleMouseMove)
    window.removeEventListener("mouseleave", this.handleMouseLeave)
    window.removeEventListener("touchmove", this.handleTouchMove)
    window.removeEventListener("touchend", this.handleTouchEnd)
    window.removeEventListener("scroll", this.handleScroll)
  }

  private handleResize = () => {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.isMobile = window.innerWidth < 768
    this.MOUSE_RADIUS = this.isMobile ? 200 : 150
    this.CONNECTION_DISTANCE = this.isMobile ? 160 : 120
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX
    this.mouse.y = e.clientY
  }

  private handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX
      this.mouse.y = e.touches[0].clientY
    }
  }

  private handleTouchEnd = () => {
    this.mouse.x = -9999
    this.mouse.y = -9999
  }

  private handleMouseLeave = () => {
    this.mouse.x = -9999
    this.mouse.y = -9999
  }

  private handleScroll = () => {
    const currentY = window.scrollY
    this.scrollVelocity += currentY - this.lastScrollY
    this.lastScrollY = currentY
  }

  public start() {
    this.render()
  }

  public stop() {
    this.unbindEvents()
    window.cancelAnimationFrame(this.animationFrameId)
  }

  private render = () => {
    const targetWarp = Math.max(-0.7, Math.min(this.scrollVelocity / 80, 0.7))
    this.scrollVelocity *= 0.6
    if (Math.abs(this.scrollVelocity) < 0.3) this.scrollVelocity = 0

    const lerpSpeed = Math.abs(targetWarp) > Math.abs(this.warpIntensity) ? 0.1 : 0.08
    this.warpIntensity += (targetWarp - this.warpIntensity) * lerpSpeed
    if (Math.abs(this.warpIntensity) < 0.003) this.warpIntensity = 0

    const absWarp = Math.abs(this.warpIntensity)
    const warpSign = this.warpIntensity >= 0 ? 1 : -1

    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2
    const edgeRadius = Math.sqrt(centerX * centerX + centerY * centerY)

    this.ctx.fillStyle = `rgb(6, 7, 20)`
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Connections
    for (let i = 0; i < this.particles.length; i++) {
      const pi = this.particles[i]
      if (!this.isMobile) {
        const dxM = pi.x - this.mouse.x
        const dyM = pi.y - this.mouse.y
        if (Math.sqrt(dxM * dxM + dyM * dyM) > this.MOUSE_RADIUS * 1.5) continue
      }

      for (let j = i + 1; j < this.particles.length; j++) {
        const pj = this.particles[j]
        const dx = pi.x - pj.x
        const dy = pi.y - pj.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < this.CONNECTION_DISTANCE) {
          const base = (1 - dist / this.CONNECTION_DISTANCE)
          const alpha = this.isMobile ? base * 0.15 : base * 0.3
          this.ctx.strokeStyle = `rgba(100, 160, 255, ${alpha})`
          this.ctx.lineWidth = 0.5
          this.ctx.beginPath()
          this.ctx.moveTo(pi.x, pi.y)
          this.ctx.lineTo(pj.x, pj.y)
          this.ctx.stroke()
        }
      }
    }

    const mouseEffect = Math.max(0, 1 - absWarp * 3)

    // Particles
    this.particles.forEach((p) => {
      const dx = p.x - this.mouse.x
      const dy = p.y - this.mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < this.MOUSE_RADIUS && dist > 0 && mouseEffect > 0.1) {
        const force = (this.MOUSE_RADIUS - dist) / this.MOUSE_RADIUS
        const angle = Math.atan2(dy, dx)
        p.vx += Math.cos(angle) * force * this.REPEL_STRENGTH * mouseEffect
        p.vy += Math.sin(angle) * force * this.REPEL_STRENGTH * mouseEffect
        p.radius = p.baseRadius + (1 - dist / this.MOUSE_RADIUS) * 1.5 * mouseEffect
      } else {
        p.radius += (p.baseRadius - p.radius) * 0.05
      }

      if (absWarp > 0.005) {
        const fromCX = p.x - centerX
        const fromCY = p.y - centerY
        const distC = Math.sqrt(fromCX * fromCX + fromCY * fromCY) || 1
        const pushForce = absWarp * p.depth * 0.4 * warpSign
        p.vx += (fromCX / distC) * pushForce
        p.vy += (fromCY / distC) * pushForce
        p.radius = p.baseRadius * (1 + absWarp * p.depth * 0.6)
      }

      const friction = 1 - (0.05 + absWarp * 0.06)
      p.vx *= friction
      p.vy *= friction
      p.x += p.vx
      p.y += p.vy

      const margin = 30
      const outOfBounds =
        p.x < -margin || p.x > this.canvas.width + margin ||
        p.y < -margin || p.y > this.canvas.height + margin

      if (outOfBounds) {
        if (absWarp > 0.15) {
          const angle = Math.random() * Math.PI * 2
          const spawnR = edgeRadius * (0.3 + Math.random() * 0.3)
          p.x = centerX + Math.cos(angle) * spawnR
          p.y = centerY + Math.sin(angle) * spawnR
          p.vx = 0
          p.vy = 0
        } else {
          if (p.x < -margin) p.x = this.canvas.width + margin
          if (p.x > this.canvas.width + margin) p.x = -margin
          if (p.y < -margin) p.y = this.canvas.height + margin
          if (p.y > this.canvas.height + margin) p.y = -margin
        }
      }

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      const streakLen = Math.min(speed * 2, 16) * absWarp

      if (streakLen > 1 && absWarp > 0.08) {
        const angle = Math.atan2(p.vy, p.vx)
        const tailX = p.x - Math.cos(angle) * streakLen
        const tailY = p.y - Math.sin(angle) * streakLen
        const grad = this.ctx.createLinearGradient(tailX, tailY, p.x, p.y)
        grad.addColorStop(0, "rgba(100, 160, 255, 0)")
        grad.addColorStop(1, `rgba(200, 220, 255, ${Math.min(p.opacity * 0.6 + absWarp * 0.2, 0.8)})`)
        this.ctx.strokeStyle = grad
        this.ctx.lineWidth = p.radius * 0.6
        this.ctx.lineCap = "round"
        this.ctx.beginPath()
        this.ctx.moveTo(tailX, tailY)
        this.ctx.lineTo(p.x, p.y)
        this.ctx.stroke()
      }

      const isNearMouse = dist < this.MOUSE_RADIUS
      if (isNearMouse && mouseEffect > 0.1) {
        const glowI = (1 - dist / this.MOUSE_RADIUS) * mouseEffect
        const glowR = p.radius * (2.5 + glowI * 3)
        const grd = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
        grd.addColorStop(0, `rgba(100, 160, 255, ${glowI * 0.3})`)
        grd.addColorStop(1, "rgba(100, 160, 255, 0)")
        this.ctx.fillStyle = grd
        this.ctx.beginPath()
        this.ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
        this.ctx.fill()
      }

      const alpha = isNearMouse
        ? Math.min(1, p.opacity + 0.3)
        : Math.min(1, p.opacity + absWarp * 0.15)
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      this.ctx.fill()
    })

    // Planet
    const planetX = this.canvas.width * 0.8
    const planetY = (this.canvas.height * 0.3) - (this.lastScrollY * 0.15)
    const planetRadius = this.isMobile ? 80 : 150

    this.ctx.save()
    const planetGrad = this.ctx.createRadialGradient(
      planetX - planetRadius * 0.3,
      planetY - planetRadius * 0.3,
      planetRadius * 0.1,
      planetX,
      planetY,
      planetRadius
    )
    planetGrad.addColorStop(0, 'rgba(80, 130, 255, 0.15)')
    planetGrad.addColorStop(1, 'rgba(6, 7, 20, 0)')

    this.ctx.fillStyle = planetGrad
    this.ctx.beginPath()
    this.ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.ellipse(planetX, planetY, planetRadius * 1.8, planetRadius * 0.4, Math.PI / 6, 0, Math.PI * 2)
    this.ctx.strokeStyle = 'rgba(100, 160, 255, 0.05)'
    this.ctx.lineWidth = 2
    this.ctx.stroke()
    this.ctx.restore()

    // Shooting Stars
    if (Math.random() < (this.isMobile ? 0.0015 : 0.003)) {
      this.shootingStars.push({
        x: Math.random() * this.canvas.width,
        y: -50,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 15,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1
      })
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const star = this.shootingStars[i]
      star.x += Math.cos(star.angle) * star.speed
      star.y += Math.sin(star.angle) * star.speed
      star.opacity -= 0.015

      if (star.opacity <= 0 || star.x > this.canvas.width + 100 || star.y > this.canvas.height + 100) {
        this.shootingStars.splice(i, 1)
        continue
      }

      const tailX = star.x - Math.cos(star.angle) * star.length
      const tailY = star.y - Math.sin(star.angle) * star.length

      const starGrad = this.ctx.createLinearGradient(tailX, tailY, star.x, star.y)
      starGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
      starGrad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`)

      this.ctx.beginPath()
      this.ctx.strokeStyle = starGrad
      this.ctx.lineWidth = 1.5
      this.ctx.lineCap = "round"
      this.ctx.moveTo(tailX, tailY)
      this.ctx.lineTo(star.x, star.y)
      this.ctx.stroke()

      this.ctx.beginPath()
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
      this.ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2)
      this.ctx.fill()
    }

    // Rocket
    if (!this.rocket.active && Math.random() < 0.0001) {
      this.rocket.active = true
      this.rocket.x = -50
      this.rocket.y = this.canvas.height + 50
      this.rocket.angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.3
      this.rocket.speed = 3 + Math.random() * 2
    }

    if (this.rocket.active) {
      this.rocket.x += Math.cos(this.rocket.angle) * this.rocket.speed
      this.rocket.y += Math.sin(this.rocket.angle) * this.rocket.speed

      if (this.rocket.x > this.canvas.width + 100 || this.rocket.y < -100) {
        this.rocket.active = false
      } else {
        this.ctx.save()
        this.ctx.translate(this.rocket.x, this.rocket.y)
        this.ctx.rotate(this.rocket.angle)

        this.ctx.fillStyle = "#e2e8f0"
        this.ctx.beginPath()
        this.ctx.moveTo(16, 0)
        this.ctx.lineTo(-8, 6)
        this.ctx.lineTo(-12, 0)
        this.ctx.lineTo(-8, -6)
        this.ctx.closePath()
        this.ctx.fill()

        this.ctx.fillStyle = "#3b82f6"
        this.ctx.beginPath()
        this.ctx.moveTo(-4, 5)
        this.ctx.lineTo(-10, 10)
        this.ctx.lineTo(-8, 5)
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.beginPath()
        this.ctx.moveTo(-4, -5)
        this.ctx.lineTo(-10, -10)
        this.ctx.lineTo(-8, -5)
        this.ctx.closePath()
        this.ctx.fill()

        this.ctx.fillStyle = "#0f172a"
        this.ctx.beginPath()
        this.ctx.arc(4, 0, 2, 0, Math.PI * 2)
        this.ctx.fill()

        this.ctx.restore()
        this.ctx.beginPath()
        const trailTailX = this.rocket.x - Math.cos(this.rocket.angle) * 40
        const trailTailY = this.rocket.y - Math.sin(this.rocket.angle) * 40
        const trailGrad = this.ctx.createLinearGradient(trailTailX, trailTailY, this.rocket.x, this.rocket.y)
        trailGrad.addColorStop(0, "rgba(255, 100, 50, 0)")
        trailGrad.addColorStop(0.5, "rgba(255, 200, 50, 0.5)")
        trailGrad.addColorStop(1, "rgba(255, 255, 255, 0.8)")
        this.ctx.strokeStyle = trailGrad
        this.ctx.lineWidth = 4
        this.ctx.lineCap = "round"
        this.ctx.moveTo(trailTailX, trailTailY)
        this.ctx.lineTo(this.rocket.x - Math.cos(this.rocket.angle) * 15, this.rocket.y - Math.sin(this.rocket.angle) * 15)
        this.ctx.stroke()
      }
    }

    this.animationFrameId = window.requestAnimationFrame(this.render)
  }
}
