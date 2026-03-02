"use client"

import { Reveal } from "@/components/reveal"
import { AlertTriangle, Clock, TrendingDown } from "lucide-react"

const painPoints = [
  {
    icon: AlertTriangle,
    title: "C\u2019est une usine \u00E0 gaz",
    text: "On vous parle technique, on vous demande des mots de passe, et au final, vous n\u2019avez pas le temps de vous en occuper.",
  },
  {
    icon: Clock,
    title: "Vous perdez un temps pr\u00E9cieux",
    text: "Votre m\u00E9tier, c\u2019est les chantiers ou votre commerce. Pas de g\u00E9rer un site web.",
  },
  {
    icon: TrendingDown,
    title: "Vos clients filent ailleurs",
    text: "R\u00E9sultat\u00A0? Vous laissez des clients filer chez la concurrence sur Google.",
  },
]

export default function ConstatSection() {
  return (
    <section
      id="constat"
      className="relative px-6 py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Le constat
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            On ne va pas se mentir...
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {"Faire un site, c\u2019est souvent une usine \u00E0 gaz. On vous parle technique, on vous demande des mots de passe, et au final, vous n\u2019avez pas le temps de vous en occuper."}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <Reveal key={point.title} delay={0.2 + i * 0.15}>
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:bg-card/50 hover:shadow-[0_0_30px_rgba(80,130,255,0.08)]">
                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <p className="mt-12 text-center text-xl font-bold text-foreground md:text-2xl">
            {"Votre m\u00E9tier, c\u2019est les chantiers ou votre commerce."}
            <br />
            <span className="text-primary">
              {"Mon m\u00E9tier, c\u2019est de vous ramener des appels."}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
