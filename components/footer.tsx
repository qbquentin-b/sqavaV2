"use client"

import { Reveal } from "@/components/reveal"

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">
                  Sqava
                </span>
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Votre partenaire web, sans prise de tête. Offrez-vous une présence en ligne premium et performante, clé en main.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold tracking-wide text-foreground uppercase">Navigation</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="/#constat" className="transition-colors hover:text-primary">Le constat</a></li>
                <li><a href="/#solution" className="transition-colors hover:text-primary">La solution</a></li>
                <li><a href="/#tarifs" className="transition-colors hover:text-primary">Tarifs</a></li>
                <li><a href="/blog" className="transition-colors hover:text-primary">Le Blog</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold tracking-wide text-foreground uppercase">Légal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="/mentions-legales" className="transition-colors hover:text-primary">Mentions Légales</a></li>
                <li><a href="/politique-confidentialite" className="transition-colors hover:text-primary">Politique de Confidentialité</a></li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} viewportMargin="0px">
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Sqava. Tous droits réservés.</p>
            <p>Conçu avec passion 🚀</p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
