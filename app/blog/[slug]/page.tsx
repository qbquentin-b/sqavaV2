import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Simulation d'une base de données d'articles
const getArticle = (slug: string) => {
    const articles: Record<string, any> = {
        "pourquoi-site-web-rapide-vital-2024": {
            title: "Pourquoi un site web rapide est vital en 2024",
            date: "12 Octobre 2023",
            category: "Performance SEO",
            content: `
        <p>Aujourd'hui, l'attention des utilisateurs est plus courte que jamais. Si votre site met plus de 3 secondes à charger, vous perdez la moitié de vos visiteurs avant même qu'ils n'aient vu votre logo.</p>
        
        <h2>L'impact sur le SEO</h2>
        <p>Google utilise la vitesse de chargement (Core Web Vitals) comme critère de positionnement majeur. Un site lent sera mécaniquement moins bien classé qu'un site techniquement optimisé, même si son contenu est meilleur.</p>
        
        <h2>Le coût de la lenteur</h2>
        <p>Amazon a calculé qu'une seconde de ralentissement leur coûtait 1.6 milliard de dollars par an. À votre échelle, chaque seconde de perdue est un prospect qui s'en va chez la concurrence.</p>
        
        <h2>La solution Sqava</h2>
        <p>C'est pour cela que nous utilisons des technologies de pointe comme Next.js (le moteur derrière Sqava) pour garantir un chargement presque instantané, offrant à vos clients une expérience premium dès la première seconde.</p>
      `
        },
        "design-sombre-vs-clair-quel-choix-pour-saas": {
            title: "Design sombre (Dark Mode) vs Design clair : Que choisir ?",
            date: "28 Septembre 2023",
            category: "Design UI/UX",
            content: `
        <p>Le mode sombre a pris d'assaut le monde num&eacute;rique. Mais est-il toujours le bon choix pour votre entreprise ?</p>
        
        <h2>L'autorit&eacute; du Dark Mode</h2>
        <p>Les interfaces sombres d&eacute;gagent un sentiment de premium, de technologie et de myst&egrave;re. C'est le choix id&eacute;al pour les produits SaaS, les agences cr&eacute;atives et les produits luxueux (comme Sqava !).</p>
        
        <h2>Quand utiliser le mode clair ?</h2>
        <p>Le mode clair reste la norme pour la lisibilit&eacute; de longs textes, le e-commerce grand public et les institutions o&ugrave; la clart&eacute; et la transparence sont les ma&icirc;tres mots.</p>
      `
        }
    }

    return articles[slug]
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const article = getArticle(resolvedParams.slug)

    if (!article) {
        notFound()
    }

    return (
        <main className="relative min-h-screen bg-background pt-32 pb-16">
            <Navbar />

            <article className="mx-auto max-w-3xl px-6 lg:px-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-12"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour au blog
                </Link>

                <div className="flex items-center gap-x-4 text-sm mb-6">
                    <time dateTime={article.date} className="text-muted-foreground">
                        {article.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                        {article.category}
                    </span>
                </div>

                <h1 className="mb-12 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    {article.title}
                </h1>

                <div
                    className="prose prose-invert prose-primary prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>

            <div className="mt-32 border-t border-border/30">
                <Footer />
            </div>
        </main>
    )
}
