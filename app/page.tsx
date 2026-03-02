import ParticleBackground from "@/components/particle-background-wrapper"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ConstatSection from "@/components/constat-section"
import SolutionSection from "@/components/solution-section"
import PricingSection from "@/components/pricing-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ConstatSection />
        <SolutionSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
