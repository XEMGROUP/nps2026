import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import { CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "2026 Summit - National Pre-Retirement Summit",
  description: "Own Your Retirement: From Planning to Action. Strategic shift from awareness to execution with practical tools, partnerships, and pathways for retirement security.",
}

const objectives = [
  "Promote early and structured retirement planning among workers with 0–10 years to retirement",
  "Equip participants with practical strategies for entrepreneurship, income diversification, wealth and legacy preservation",
  "Facilitate engagement between workers, policymakers, financial service providers, and retirement planning vendors",
  "Showcase emerging and future-facing post-retirement opportunities aligned with economic and technological trends",
]

const targetAudience = [
  "Public and Private Sector employees with 0–10 years to retirement",
  "Policymakers and Stakeholders",
  "Labour Union members",
  "Pension Fund Administrators and Custodians (PFAs)",
  "Financial Institutions and Investment Advisory Firms",
  "Health, Wellness, and Lifestyle Service Providers",
  "Entrepreneurs, technology firms, and other retirement planning vendors",
  "Embassies and Foreign Missions",
  "Telecommunication Outfits (MTN, Airtel, etc)",
  "Government Agencies (EFCC, ICPC)",
]

const keyThemes = [
  "Health and Geriatrics: Preventive healthcare planning for retirement",
  "Financial Literacy: The new retirement math—inflation, risk, and income longevity",
  "Retirement Planning: Retirement as a transition project with timing, skills, and purpose",
  "Post-Retirement Income Strategies: Consulting, freelancing, and knowledge monetization",
  "Entrepreneurship and Agro-allied Industries: Smart entrepreneurship after 50",
  "SME Development and Export Promotion: Financing and export opportunities",
  "Cybersecurity for Retirees: Protecting digital assets and personal information",
  "AI, Automation, and Digital Tools: Leveraging technology for small businesses",
  "Legacy Planning: Estate planning, succession, and intergenerational wealth transfer",
]

const programDays = [
  {
    day: "Day 1",
    date: "July 15, 2026",
    title: "Redesigning Retirement in a Changing World",
    sessions: [
      "8:00 – 9:30 - Arrival, Registration, and Networking",
      "9:30 – 9:40 - National Anthem and Opening Reflection",
      "9:40 – 9:55 - Welcome Address by the Summit Convener",
      "9:55 – 10:25 - Keynote Address: Retirement Is No Longer an Exit but a Re-invention",
      "10:25 – 11:25 - Technical Session I: Health & Geriatrics Preventive Healthcare Planning",
      "11:40 – 12:40 - Panel Discussion: Re-thinking Retirement Policy, Pensions, and Workforce Exit Models",
      "12:40 – 1:40 - Lunch",
      "1:40 – 2:40 - Technical Session II: Financial Literacy - The New Retirement Math: Inflation, Risk, and Income Longevity",
      "2:40 – 3:40 - Technical Session III: Retirement Planning - Retirement as a Transition Project: Timing, Skills, and Purpose",
      "3:40 – 4:30 - Exhibition and Personal Retirement Advisory Booking",
    ],
  },
  {
    day: "Day 2",
    date: "July 16, 2026",
    title: "Wealth Creation, Entrepreneurship, and Skill Development",
    sessions: [
      "9:00 – 9:30 - Arrival and Networking",
      "9:30 – 10:30 - Technical Session IV: Post Retirement Income Strategies - Consulting, Freelancing, and Knowledge Monetization",
      "10:30 – 11:45 - Technical Session V: Entrepreneurship and Agro-allied Industries - Smart Entrepreneurship After 50",
      "11:45 – 12:45 - Technical Session VI: SME development and Export Promotion - SME development, financing and export promotion",
      "12:45 – 1:45 - Lunch",
      "1:45 – 2:45 - Business Ideation Session",
      "2:45 – 3:30 - Technical Session VII: Cybersecurity - Cybersecurity for Retirees",
    ],
  },
  {
    day: "Day 3 (Optional)",
    date: "July 16, 2026 Extended",
    title: "Retirement Planning and Legacy Systems",
    sessions: [
      "9:00 – 9:30 - Arrival",
      "9:30 – 10:30 - Technical Session VIII: AI, Automation, and Digital Tools for Small Businesses",
      "10:30 – 11:30 - Technical Session IX: Legacy Planning - Estate Planning, Succession, and Intergenerational Wealth Transfer",
      "11:45 – 12:45 - Business Pitching Session",
      "12:45 – 1:45 - Lunch/Closing Ceremony",
    ],
  },
]

export default function Program2026Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-12 lg:pt-[88px]">
        <PageBanner
          title="2026 Summit"
          subtitle="Own Your Retirement: From Planning to Action"
          imagePatternUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
        />

        <div className="container mx-auto px-3 py-6 max-w-6xl">
          {/* Main Content Card - No Border */}
          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl shadow-black/5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-800 mb-4 tracking-tight">Strategic Shift: From Awareness to Execution</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Building on the strong national foundation established in 2024 and the continental expansion achieved in 2025, the 2026 National Pre-Retirement Summit represents a strategic shift from awareness to execution. With the theme "Own Your Retirement: From Planning to Action," the Summit will focus on enabling participants to translate knowledge into concrete decisions, enterprises, investments, and lifestyle changes that support long-term security, purpose, and wellbeing.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              The Summit will bring together policymakers, labour unions, pension administrators, financial service providers, health and wellness experts, entrepreneurs, and prospective retirees to create a comprehensive ecosystem that supports the transition from active service into financially secure, healthy, and purpose-driven post-service lives.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 mb-8">
              <div className="bg-muted rounded-xl p-4 text-center">
                <span className="block text-2xl md:text-4xl font-black text-emerald-800 mb-1">15-16</span>
                <span className="text-xs md:text-sm font-mono text-muted-foreground">July 2026</span>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <span className="block text-2xl md:text-4xl font-black text-emerald-800 mb-1">2</span>
                <span className="text-xs md:text-sm font-mono text-muted-foreground">Main Days</span>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <span className="block text-2xl md:text-4xl font-black text-emerald-800 mb-1">9</span>
                <span className="text-xs md:text-sm font-mono text-muted-foreground">Technical Sessions</span>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <span className="block text-2xl md:text-4xl font-black text-emerald-800 mb-1">Abuja</span>
                <span className="text-xs md:text-sm font-mono text-muted-foreground">Nigeria</span>
              </div>
            </div>

            {/* Objectives */}
            <h3 className="text-xl sm:text-2xl font-black text-emerald-800 mb-4 tracking-tight">Summit Objectives</h3>
            <ul className="space-y-2 mb-8">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3 text-base text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>

            {/* Target Audience */}
            <h3 className="text-xl sm:text-2xl font-black text-emerald-800 mb-4 tracking-tight">Target Audience</h3>
            <ul className="space-y-2 mb-8">
              {targetAudience.map((audience, index) => (
                <li key={index} className="flex items-start gap-3 text-base text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>

            {/* Key Themes */}
            <h3 className="text-xl sm:text-2xl font-black text-emerald-800 mb-4 tracking-tight">Key Technical Themes</h3>
            <ul className="space-y-2 mb-8">
              {keyThemes.map((theme, index) => (
                <li key={index} className="flex items-start gap-3 text-base text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>{theme}</span>
                </li>
              ))}
            </ul>

            {/* Summit Format */}
            <h3 className="text-xl sm:text-2xl font-black text-emerald-800 mb-4 tracking-tight">Summit Format</h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              The 2026 Summit will run over two main days (July 15-16), combining policy dialogue, technical capacity-building sessions, exhibitions, and networking opportunities. An optional Day 3 extension will provide advanced sessions on legacy planning, entrepreneurship, and business pitching for participants seeking deeper engagement.
            </p>

            <div className="bg-muted/50 rounded-xl p-6 mb-12">
              <h4 className="font-bold text-emerald-800 mb-3">Summit Components:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <strong>Policy Dialogue:</strong> High-level sessions on retirement policy, pensions, and workforce transition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <strong>Technical Sessions:</strong> Nine capacity-building sessions across health, finance, entrepreneurship, and digital skills
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <strong>Exhibitions:</strong> Interactive displays by financial service providers, health vendors, and retirement solution vendors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <strong>Business Pitching & Ideation:</strong> Opportunities for participants to pitch retirement-focused businesses and ideas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <strong>Networking:</strong> Extensive networking sessions connecting participants with solution providers and policymakers
                </li>
              </ul>
            </div>

            {/* Event Schedule */}
            <h3 className="text-xl sm:text-2xl font-black text-emerald-800 mb-6 tracking-tight">Event Schedule</h3>
            <div className="space-y-4 mb-8">
              {programDays.map((day, index) => (
                <div key={index} className="bg-white rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-sm">{day.day}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{day.date}</span>
                  </div>
                  <h4 className="text-lg font-black text-emerald-800 mb-3">{day.title}</h4>
                  <ul className="space-y-2">
                    {day.sessions.map((session, sessionIndex) => (
                      <li key={sessionIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span>{session}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="pt-8 mt-8">
              <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(180deg, #016633 0%, #1e3a5f 100%)' }}>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 text-white">Ready to Own Your Retirement?</h3>
                <p className="text-base md:text-lg text-white/80 mb-6 max-w-2xl mx-auto">
                  Join us for two days of transformative learning, expert technical sessions, and actionable strategies to take control of your retirement journey.
                </p>
                <a
                  href="/register"
                  className="inline-block bg-emerald-600 hover:bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-bold text-base sm:text-lg shadow-xl transition-all hover:-translate-y-1"
                >
                  Register Now
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
