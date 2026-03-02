import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import CookieBanner from '@/components/cookie-banner'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Sqava | Votre site web pro, sans vous faire plumer',
  description:
    'Agence web premium. Création de sites vitrines clé en main. Essai 14 jours pour 10 euros. Zéro technique, zéro prise de tête.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0d0e1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sqava',
    image: 'https://votre-site.com/icon.png', // Remplacer par la vraie URL
    description: 'Agence web premium pour la création de sites internet professionnels.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris', // À adapter
      addressCountry: 'FR',
    },
    url: 'https://votre-site.com/', // Remplacer par la vraie URL
    telephone: '+33123456789', // À adapter
    priceRange: '€',
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster theme="dark" position="bottom-right" />
        <CookieBanner />
      </body>
    </html>
  )
}

