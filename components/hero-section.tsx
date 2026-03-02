"use client"

import { Reveal } from "@/components/reveal"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal delay={0.2}>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Agence Web Premium
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Votre site web pro, sans vous faire plumer.{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Chacun son m&eacute;tier.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {"Les agences web classiques vous prennent la t\u00EAte et vous demandent 2\u00A0000\u00A0\u20AC d\u2019avance. Chez Sqava, on joue carte sur table\u00A0: on vous cr\u00E9e une vitrine premium cl\u00E9 en main, et vous la testez pour 10 balles. C\u2019est tout."}
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/#contact"
              className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(80,130,255,0.5)]"
            >
              Échanger sur votre projet web
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={1.2}>
          <motion.div
            className="mt-16 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </Reveal>
      </div>

    </section>
  )
}
