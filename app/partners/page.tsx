"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import { PartnersMarquee } from "@/components/home/partners-marquee"
import { motion } from "framer-motion"
import { CheckCircle2, Landmark, Building2, Users, Shield, Banknote, Globe, ArrowRight } from "lucide-react"

const currentPartners = [
  { name: "OSGF", fullName: "Office of the Secretary to the Government of the Federation", icon: Landmark },
  { name: "OHCSF", fullName: "Office of the Head of the Civil Service of the Federation", icon: Building2 },
  { name: "NLC", fullName: "Nigeria Labour Congress", icon: Users },
  { name: "NSITF", fullName: "Nigeria Social Insurance Trust Fund", icon: Shield },
  { name: "BPSR", fullName: "Bureau of Public Service Reforms", icon: Landmark },
  { name: "Galaxy Backbone", fullName: "Galaxy Backbone Limited", icon: Globe },
  { name: "Trustfund Pensions", fullName: "Trustfund Pensions Limited", icon: Banknote },
  { name: "ECOWAS", fullName: "ECOWAS Commission", icon: Globe },
]

const sponsorshipTiers = [
  {
    name: "Headline Sponsor",
    price: "Contact for pricing",
    color: "bg-accent",
    features: [
      "Premier brand positioning across all summit materials",
      "Exclusive keynote speaking opportunity",
      "VIP access for 20 delegates",
      "Dedicated exhibition booth (premium location)",
      "Full-page advertisement in summit publication",
      "Logo on all digital and print communications",
      "Social media feature campaign",
      "Post-event media coverage",
    ],
  },
  {
    name: "Platinum Sponsor",
    price: "Contact for pricing",
    color: "bg-secondary",
    features: [
      "Premium brand visibility on key materials",
      "Panel speaking opportunity",
      "VIP access for 10 delegates",
      "Exhibition booth",
      "Half-page advertisement in summit publication",
      "Logo on select communications",
      "Social media mentions",
    ],
  },
  {
    name: "Gold Sponsor",
    price: "Contact for pricing",
    color: "bg-primary",
    features: [
      "Brand visibility on summit materials",
      "Session sponsorship opportunity",
      "VIP access for 5 delegates",
      "Exhibition booth",
      "Quarter-page advertisement",
      "Logo on website and event signage",
    ],
  },
]

const valuePropositions = [
  "Direct engagement with retirement-ready and investment-focused audiences",
  "Premium brand visibility among senior professionals and policymakers",
  "Thought leadership positioning through speaking and content collaboration",
  "High-level networking with government, labour, and private sector leaders",
  "Platform to showcase retirement-focused products, services, and innovations",
  "Long-term brand association with a trusted and growing African platform",
]

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[88px]">
        <PageBanner
          title="Partners & Sponsors"
          subtitle="Join Africa's premier retirement readiness platform as a strategic partner."
        />

        <PartnersMarquee />

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Current Partners Section */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-secondary mb-4 tracking-tight">Our Strategic Partners</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are proud to work with leading government institutions, financial organizations, and private sector partners committed to improving retirement outcomes in Africa.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <partner.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-secondary text-lg">{partner.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{partner.fullName}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Partner Section */}
          <section className="mb-24">
            <div className="bg-secondary text-white rounded-3xl p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-black mb-6">Why Partner With Us?</h2>
                  <p className="text-white/70 font-mono mb-8">
                    Partnering with the National Pre-Retirement Summit offers organisations a rare opportunity to engage directly with a focused, decision-ready audience actively seeking credible solutions for financial security and post-career sustainability.
                  </p>
                </div>
                <div>
                  <ul className="space-y-4">
                    {valuePropositions.map((proposition, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span className="text-white/80">{proposition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sponsorship Tiers */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-secondary mb-4 tracking-tight">Partnership Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the sponsorship tier that best aligns with your organization&apos;s goals and visibility requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {sponsorshipTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border"
                >
                  <div className={`${tier.color} text-white p-6 text-center`}>
                    <h3 className="text-2xl font-black">{tier.name}</h3>
                    <p className="text-white/70 font-mono text-sm mt-2">{tier.price}</p>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-muted rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-black text-secondary mb-4">Become a Partner</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The National Pre-Retirement Summit welcomes strategic partners, sponsors, and solution providers who share a commitment to improving retirement outcomes in Nigeria and across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:nps@xemgroup.net"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#a32900] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1 group"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+2349095511111"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-muted text-secondary px-8 py-4 rounded-xl font-bold text-lg border border-border transition-all hover:-translate-y-1"
              >
                Call Us: +234 909 551 1111
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
