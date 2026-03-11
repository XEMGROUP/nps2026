import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { optimizedImages } from '@/lib/optimizedImages'
import { HistoryGallery } from '@/components/history/gallery'

export const metadata = {
  title: "2024 Summit - National Pre-Retirement Summit",
  description: "The inaugural National Pre-Retirement Summit marked the first coordinated national effort to address retirement planning in Nigeria.",
}

const highlights = [
  "First coordinated national platform dedicated solely to pre-retirement planning",
  "Strong focus on policy dialogue and foundational retirement education",
  "Introduction of the Summit's three-pillar structure",
  "Over 1,000 participants from public and private sectors",
  "Practical skills training in entrepreneurship, finance, digital literacy, agriculture, and health",
]

const participants = [
  "Office of the Secretary to the Government of the Federation (OSGF)",
  "Office of the Head of the Civil Service of the Federation (OHCSF)",
  "Nigeria Labour Congress (NLC)",
  "Nigeria Social Insurance Trust Fund (NSITF)",
  "Pension Fund Administrators",
  "Financial experts and development partners",
]

export default function History2024Page() {
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[88px]">
        <PageBanner
          title="2024 Summit"
          subtitle="Establishing a National Platform for Retirement Readiness"
        />

        <HistoryGallery images={optimizedImages} />

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
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-black text-xl mb-6">
              2024 Edition
            </div>

            <h2 className="text-3xl font-black text-secondary mb-6 tracking-tight">Executive Summary</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The inaugural National Pre-Retirement Summit, held in July 2024 in Abuja, marked the first coordinated national effort to address retirement planning in Nigeria in a comprehensive and practical way. The Summit positioned itself as a foundational platform, bringing together government institutions, labour unions, pension administrators, financial experts, and prospective retirees to confront the realities of retirement head-on.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              What made the 2024 edition particularly significant was its strong policy orientation and emphasis on basic retirement education. It created a baseline for discussions on financial preparedness, entrepreneurship, health management, and post-service productivity. The introduction of the Summit&apos;s three-pillar structure—policy panels, technical capacity-building sessions, and the Innovative Hub Simulation—set the framework that now defines subsequent editions.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-12">
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-secondary mb-2">1,000+</span>
                <span className="text-sm font-mono text-muted-foreground">Attendees</span>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-secondary mb-2">40+</span>
                <span className="text-sm font-mono text-muted-foreground">Speakers</span>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-secondary mb-2">3</span>
                <span className="text-sm font-mono text-muted-foreground">Days</span>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <span className="block text-4xl font-black text-secondary mb-2">20+</span>
                <span className="text-sm font-mono text-muted-foreground">Sessions</span>
              </div>
            </div>

            {/* Key Highlights */}
            <h3 className="text-2xl font-black text-secondary mb-6 tracking-tight">Key Highlights</h3>
            <ul className="space-y-3 mb-12">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Participating Institutions */}
            <h3 className="text-2xl font-black text-secondary mb-6 tracking-tight">Participating Institutions</h3>
            <ul className="space-y-3 mb-12">
              {participants.map((participant, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <span>{participant}</span>
                </li>
              ))}
            </ul>

            {/* Navigation to 2025 */}
            <div className="border-t border-border pt-8 mt-8 flex justify-end">
              <Link
                href="/history/2025"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors shadow-lg"
              >
                View 2025 Summit
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
