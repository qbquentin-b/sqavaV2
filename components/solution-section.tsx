"use client"

import { Reveal } from "@/components/reveal"
import { Smartphone, Shield, Zap, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Cr\u00E9ation compl\u00E8te",
    text: "Design premium, contenu optimis\u00E9 SEO, le tout livr\u00E9 cl\u00E9 en main.",
  },
  {
    icon: Shield,
    title: "H\u00E9bergement & s\u00E9curit\u00E9",
    text: "SSL, sauvegardes, mises \u00E0 jour\u2026 Tout est inclus, vous ne touchez \u00E0 rien.",
  },
  {
    icon: Smartphone,
    title: "Responsive parfait",
    text: "Votre site s\u2019adapte parfaitement sur mobile, tablette et ordinateur.",
  },
  {
    icon: MessageSquare,
    title: "Modifications par SMS",
    text: "Un changement d\u2019horaire\u00A0? Une nouvelle photo\u00A0? Un simple SMS et c\u2019est fait dans la journ\u00E9e.",
  },
]

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="relative px-6 py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            La solution
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"Z\u00E9ro technique."}
            <br />
            {"Z\u00E9ro prise de t\u00EAte."}
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {"Avec Sqava, c\u2019est comme un abonnement Netflix, on s\u2019occupe de tout de A \u00E0 Z\u00A0: cr\u00E9ation, h\u00E9bergement, s\u00E9curit\u00E9. Vous avez un changement d\u2019horaire ou une nouvelle photo de r\u00E9alisation \u00E0 ajouter\u00A0? Vous m\u2019envoyez un simple SMS, et je m\u2019en occupe dans la journ\u00E9e. Vous ne touchez \u00E0 rien."}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={0.2 + i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="group flex gap-5 rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:bg-card/50 hover:shadow-[0_0_30px_rgba(80,130,255,0.08)]">
                <div className="flex-shrink-0">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
