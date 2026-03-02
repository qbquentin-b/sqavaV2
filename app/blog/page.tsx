import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Données statiques pour l'exemple. Dans un vrai projet, 
// cela viendrait d'un CMS (comme Sanity) ou de fichiers Markdown locaux.
export const articles = [
    {
        slug: "pourquoi-site-web-rapide-vital-2024",
        title: "Pourquoi un site web rapide est vital en 2024",
        excerpt: "Découvrez l'impact d'une milliseconde sur votre taux de conversion et pourquoi Google pénalise les sites lents.",
        date: "12 Octobre 2023",
        category: "Performance SEO",
    },
    {
        slug: "design-sombre-vs-clair-quel-choix-pour-saas",
        title: "Design sombre (Dark Mode) vs Design clair : Que choisir ?",
        excerpt: "Le mode sombre n'est pas qu'une esthétique, c'est un outil psychologique puissant. Analyse des meilleures pratiques.",
        date: "28 Septembre 2023",
        category: "Design UI/UX",
    },
]

export default function BlogPage() {
    return (
        <main className="relative min-h-screen bg-background pt-32 pb-16">
            <Navbar />
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Le Blog
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Conseils, astuces et réflexions sur le web design, le développement et le SEO.
                </p>

                <div className="mt-16 grid gap-8 sm:grid-cols-2">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/blog/${article.slug}`}
                            className="group relative flex flex-col items-start justify-between rounded-2xl border border-border/40 bg-card/30 p-8 shadow-sm transition-all hover:bg-card/50 hover:shadow-md"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={article.date} className="text-muted-foreground">
                                    {article.date}
                                </time>
                                <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                                    {article.category}
                                </span>
                            </div>
                            <div className="group relative mt-6">
                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                    {article.excerpt}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                                Lire l'article
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-24">
                <Footer />
            </div>
        </main>
    )
}
