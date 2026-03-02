import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function MentionsLegales() {
    return (
        <main className="relative min-h-screen bg-background pt-32 pb-16">
            <Navbar />
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Mentions Légales
                </h1>

                <div className="prose prose-invert prose-primary max-w-none">
                    <h3>1. Présentation du site</h3>
                    <p>
                        En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
                    </p>
                    <p>
                        <strong>Propriétaire / Éditeur :</strong><br />
                        [Votre Nom ou Nom de l'Entreprise Sqava]<br />
                        [Statut juridique (ex: Auto-entrepreneur, SASU)]<br />
                        SIRET : [Votre Numéro SIRET]<br />
                        Adresse : [Votre Adresse Postale]<br />
                        Email : [Votre Email Professionnel]
                    </p>

                    <h3>2. Hébergement</h3>
                    <p>
                        Le site est hébergé par :<br />
                        [Nom de l'hébergeur, ex: Vercel Inc.]<br />
                        [Adresse de l'hébergeur]<br />
                        [Site web de l'hébergeur]
                    </p>

                    <h3>3. Propriété intellectuelle</h3>
                    <p>
                        L'ensemble des éléments figurant sur ce site (textes, images, logos, design) sont la propriété exclusive de [Nom de l'Entreprise] ou de leurs auteurs respectifs. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de l'auteur.
                    </p>

                    <h3>4. Limitations de responsabilité</h3>
                    <p>
                        L'éditeur ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au site. L'éditeur décline également toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur le site.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
