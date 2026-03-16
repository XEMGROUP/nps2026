import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PartnersMarquee } from "@/components/home/partners-marquee"
import { FocusAreas } from "@/components/home/focus-areas"
import { Summit2024 } from "@/components/home/summit-2024"
import { Summit2025 } from "@/components/home/summit-2025"
import { GuestSpeakers } from "@/components/home/guest-speakers"
import { SummitDeliverables } from "@/components/home/summit-deliverables"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-12 lg:pt-[88px]">
        <HeroSection />
        <PartnersMarquee />
        <FocusAreas />
        <Summit2024 />
        <Summit2025 />
        <GuestSpeakers />
        <SummitDeliverables />
      </main>
      <Footer />
    </div>
  )
}
