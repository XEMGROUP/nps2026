"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { HistoryGallery } from '@/components/history/gallery'

const highlights = [
  "Continental participation by ambassadors and regional representatives from West and Central Africa",
  "Introduction of new opportunity areas in smart agriculture and agribusiness",
  "Export promotion and regional trade opportunities for retirees",
  "Renewable energy and sustainable living focus",
  "Stronger alignment with regional policy and cross-border investment opportunities",
]

const outcomes = [
  "Elevated the Summit from a national to a Pan-African engagement platform",
  "Expanded partner visibility to a broader African audience",
  "Strengthened cross-country collaboration on retirement solutions",
  "Reinforced the Summit's role as a catalyst for retirement innovation in Africa",
]

export default function History2025Page() {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images/2025')
        const imgs = await response.json()
        setImages(imgs)
      } catch (error) {
        console.error('Failed to fetch images:', error)
      }
    }
    fetchImages()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-12 lg:pt-[88px]">
        <PageBanner
          title="2025 Summit"
          subtitle="The Retirement Revolution: Embracing the New Era of Possibilities"
        />

        <HistoryGallery images={images} />

        <div className="container mx-auto px-4 py-16 max-w-5xl">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary font-bold mb-12 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5 border border-border">
            {/* Edition Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xl mb-6">
              2025 Edition
            </div>

            <h2 className="text-3xl font-black text-emerald-800 mb-6 tracking-tight">Expanding the Retirement Conversation Across Africa</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The 2025 edition of the National Pre-Retirement Summit represented a strategic evolution from a national initiative to a regional platform. Hosted at the ECOWAS Commission Secretariat in Abuja, the Summit deliberately expanded its scope to include participants and institutional representatives from across West and Central Africa.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Under the theme &ldquo;The Retirement Revolution: Embracing the New Era of Possibilities,&rdquo; the 2025 Summit deepened the conversation on retirement by introducing new opportunity areas that reflected Africa&apos;s changing economic landscape. These included smart agriculture, renewable energy, export promotion, and regional trade opportunities for retirees and post-career entrepreneurs.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The presence of ambassadors, regional delegates, and international stakeholders elevated the Summit&apos;s policy relevance and reinforced its role as a Pan-African convening platform. By fostering cross-border dialogue and collaboration, the 2025 edition positioned the NPS as a catalyst for innovative, scalable retirement solutions beyond Nigeria.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-12">
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-emerald-800 mb-2">1,500+</span>
                <span className="text-sm font-mono text-muted-foreground">Attendees</span>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-emerald-800 mb-2">15+</span>
                <span className="text-sm font-mono text-muted-foreground">Countries</span>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-emerald-800 mb-2">50+</span>
                <span className="text-sm font-mono text-muted-foreground">Speakers</span>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-emerald-800 mb-2">30+</span>
                <span className="text-sm font-mono text-muted-foreground">Sessions</span>
              </div>
            </div>

            {/* What Was Peculiar */}
            <h3 className="text-2xl font-black text-emerald-800 mb-6 tracking-tight">What Was Peculiar to 2025</h3>
            <ul className="space-y-3 mb-12">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Key Outcomes */}
            <h3 className="text-2xl font-black text-emerald-800 mb-6 tracking-tight">Key Outcomes</h3>
            <ul className="space-y-3 mb-12">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            {/* Navigation */}
            <div className="border-t border-border pt-8 mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
              <Link
                href="/history/2024"
                className="inline-flex items-center gap-2 bg-muted text-emerald-800 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold hover:bg-muted/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                View 2024 Summit
              </Link>
              <Link
                href="/program"
                className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors shadow-lg"
              >
                View 2026 Program
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  )
}
