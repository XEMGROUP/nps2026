import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"

export const metadata = {
  title: "About NPS - National Pre-Retirement Summit 2026",
  description: "Learn about Nigeria's premier platform advancing retirement readiness, financial security, and post-career productivity across Africa.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-12 lg:pt-[88px]">
        <PageBanner
          title="About NPS"
          subtitle="The premier Nigerian and Pan-African platform advancing retirement readiness."
        />

        <div className="container mx-auto px-4 py-24 max-w-4xl">
          <div className="prose prose-lg prose-headings:text-emerald-800 prose-p:text-muted-foreground mx-auto">
            {/* Our Vision */}
            <section className="mb-16">
              <h2 className="text-3xl font-black text-emerald-800 mb-6 tracking-tight">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The National Pre-Retirement Summit (NPS) is Nigeria&apos;s premier and fast-emerging Pan-African platform dedicated to transforming retirement from a period of uncertainty into one of financial stability, continued productivity, and purposeful living.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Across Nigeria and much of Africa, retirement is increasingly defined by rising living costs, healthcare pressures, inadequate financial preparation, and limited post-service transition support. Many retirees enter this phase without the investment knowledge, entrepreneurial skills, or structured guidance required to sustain their livelihoods and quality of life.
              </p>
            </section>

            {/* The Journey So Far */}
            <section className="mb-16">
              <h2 className="text-3xl font-black text-emerald-800 mb-6 tracking-tight">The Journey So Far</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Designed as a one-stop retirement readiness hub, the Summit convenes policymakers, labour unions, pension managers, financial institutions, development partners, healthcare providers, technology firms, and solution providers to equip professionals—particularly those with 0–10 years to retirement—with the tools, skills, and opportunities needed for a secure, productive, and dignified post-service life.
              </p>
            </section>

            {/* Blockquote */}
            <section className="mb-16">
              <blockquote className="bg-primary/5 border-l-4 border-primary p-8 rounded-r-xl">
                <p className="text-xl font-bold italic text-emerald-800 m-0">
                  &ldquo;The National Pre-Retirement Summit was established to respond to Africa&apos;s retirement challenges—creating pathways from awareness to action for every professional approaching this critical life transition.&rdquo;
                </p>
              </blockquote>
            </section>

            {/* The Three-Pillar Framework */}
            <section className="mb-16">
              <h2 className="text-3xl font-black text-emerald-800 mb-6 tracking-tight">The Three-Pillar Framework</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The Summit delivers value through a holistic, practical, and impact-driven structure:
              </p>

              <div className="space-y-8">
                {/* Pillar 1 */}
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">1. Policy & Stakeholder Engagement</h3>
                  <p className="text-muted-foreground">
                    High-level panel sessions featuring government policymakers, regulators, labour unions, pension administrators, financial institutions, and development partners. These sessions address retirement reforms, pension sustainability, and emerging opportunities within Africa&apos;s evolving retirement landscape.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">2. Technical & Capacity-Building Sessions</h3>
                  <p className="text-muted-foreground">
                    Hands-on training designed to prepare participants for real-life retirement transitions, covering financial literacy, investment readiness, entrepreneurship, SME development, digital skills, agriculture, health, wellness, and sustainable living strategies.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">3. Innovative Hub Simulation & Exhibition</h3>
                  <p className="text-muted-foreground">
                    An interactive marketplace where participants engage directly with retirement planning vendors, explore post-retirement business and investment opportunities, experience innovation showcases, and network with experts, institutions, and service providers.
                  </p>
                </div>
              </div>
            </section>

            {/* Why It Matters */}
            <section>
              <h2 className="text-3xl font-black text-emerald-800 mb-6 tracking-tight">Why It Matters</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The NPS exists because retirement should be a celebration of a life&apos;s work—not a source of anxiety. By bringing together all stakeholders in the retirement ecosystem, we create a unified platform for knowledge transfer, policy advocacy, and practical solutions that empower individuals to take ownership of their retirement journey.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
