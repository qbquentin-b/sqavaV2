"use client"

import { Reveal, StaggerChildren, StaggerItem } from "@/components/reveal"
import { Check } from "lucide-react"

const plans = [
  {
    name: "La Mensualit\u00E9 All\u00E9g\u00E9e",
    price: "39",
    unit: "\u20AC / mois",
    creation: "150 \u20AC au d\u00E9marrage",
    engagement: "24 mois",
    description:
      "Id\u00E9al si vous pr\u00E9f\u00E9rez payer la cr\u00E9ation tout de suite pour baisser vos charges mensuelles.",
    features: [
      "Site vitrine premium cl\u00E9 en main",
      "H\u00E9bergement & s\u00E9curit\u00E9 inclus",
      "Modifications illimit\u00E9es par SMS",
      "Nom de domaine offert",
      "Optimis\u00E9 SEO / Google",
    ],
    highlighted: false,
  },
  {
    name: "La Libert\u00E9",
    price: "59",
    unit: "\u20AC / mois",
    creation: "0 \u20AC de frais de cr\u00E9ation",
    engagement: "12 mois",
    description:
      "Id\u00E9al pour pr\u00E9server votre tr\u00E9sorerie avec un vrai lissage sans frais d\u2019entr\u00E9e.",
    features: [
      "Site vitrine premium cl\u00E9 en main",
      "H\u00E9bergement & s\u00E9curit\u00E9 inclus",
      "Modifications illimit\u00E9es par SMS",
      "Nom de domaine offert",
      "Optimis\u00E9 SEO / Google",
    ],
    highlighted: true,
  },
]

export default function PricingSection() {
  return (
    <section
      id="tarifs"
      className="relative px-6 py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Tarifs
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="text-balance text-center text-3xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"Le m\u00EAme site premium."}
            <br />
            {"Deux fa\u00E7ons de payer."}
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-pretty text-lg leading-relaxed text-muted-foreground">
            {"On commence toujours par un essai de 14 jours pour 10\u00A0\u20AC (uniquement pour r\u00E9server votre nom de domaine officiel \u00E0 votre nom). Ensuite, si \u00E7a vous pla\u00EEt, c\u2019est vous qui choisissez comment financer votre site. Le r\u00E9sultat final est exactement le m\u00EAme\u00A0: un site qui en jette."}
          </p>
        </Reveal>

        <StaggerChildren className="mt-16 grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-xl transition-all duration-500 lg:p-10 ${plan.highlighted
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_40px_rgba(80,130,255,0.12)]"
                  : "border-border/40 bg-card/30 hover:border-primary/20 hover:bg-card/50"
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-8 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    Populaire
                  </div>
                )}

                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    {plan.unit}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-sm font-semibold text-primary">
                    {"Frais de cr\u00E9ation\u00A0: "}
                    {plan.creation}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {"Engagement\u00A0: "}
                    {plan.engagement}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <div className="my-6 h-px bg-border/50" />

                <ul className="flex flex-col gap-3" role="list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a
                    href="/#contact"
                    className={`block w-full rounded-full py-3.5 text-center text-sm font-bold transition-all hover:scale-[1.02] ${plan.highlighted
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(80,130,255,0.4)]"
                      : "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                  >
                    Échanger sur votre projet
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
