"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/60 backdrop-blur-xl border-b border-border/30"
        : "bg-transparent"
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-2" aria-label="Sqava - Accueil">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            Sqava
          </span>
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#constat"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Le constat
          </a>
          <a
            href="/#solution"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            La solution
          </a>
          <a
            href="/#tarifs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tarifs
          </a>
          <a
            href="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </a>
        </div>

        <a
          href="/#contact"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_rgba(80,130,255,0.4)] hover:scale-105"
        >
          Contactez nous
        </a>
      </nav>
    </motion.header>
  )
}
