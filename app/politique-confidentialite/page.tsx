import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PolitiqueConfidentialite() {
    return (
        <main className="relative min-h-screen bg-background pt-32 pb-16">
            <Navbar />
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Politique de Confidentialité
                </h1>

                <div className="prose prose-invert prose-primary max-w-none">
                    <h3>1. Collecte des données personnelles</h3>
                    <p>
                        Nous collectons les données suivantes via notre formulaire de contact :
                    </p>
                    <ul>
                        <li>Nom et Prénom</li>
                        <li>Adresse électronique (Email)</li>
                        <li>Données fournies dans le message</li>
                    </ul>
                    <p>
                        Ces données sont collectées à des fins de gestion de la relation client et de réponse à vos demandes de devis ou de renseignements.
                    </p>

                    <h3>2. Utilisation et transmission des données</h3>
                    <p>
                        Vos données personnelles sont strictement confidentielles et ne seront jamais vendues, louées ou cédées à des tiers à des fins commerciales. Elles sont conservées pour une durée ne dépassant pas celle nécessaire aux finalités pour lesquelles elles ont été collectées (généralement 3 ans au maximum après le dernier contact inactif).
                    </p>

                    <h3>3. Cookies et Traceurs</h3>
                    <p>
                        Notre site utilise uniquement des cookies essentiels à son bon fonctionnement et, avec votre consentement, des outils d'analyse de trafic (Analytics) qui ne collectent pas de données personnelles identifiables de manière directe, afin de comprendre l'utilisation de notre site et d'améliorer nos services.
                    </p>

                    <h3>4. Vos droits (RGPD)</h3>
                    <p>
                        Conformément à la réglementation européenne en vigueur, vous disposez des droits suivants concernant vos données personnelles :
                    </p>
                    <ul>
                        <li>Droit d'accès et de rectification</li>
                        <li>Droit d'effacement</li>
                        <li>Droit de retirer votre consentement à tout moment</li>
                    </ul>
                    <p>
                        Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : [Votre Email Professionnel].
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
