"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import { motion } from "framer-motion"

const speakers = [
  {
    name: "Dr. Dasuki Ibrahim Arabi",
    title: "Director General, BPSR",
    bio: "Leading public sector reforms and retirement policy development across Nigeria.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=75",
    featured: true,
  },
  {
    name: "Prof. Ibrahim Adepoju Adeyanju",
    title: "MD/CEO, Galaxy Backbone",
    bio: "Pioneering digital infrastructure and technology solutions for government services.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=75",
    featured: true,
  },
  {
    name: "Hajiya Khadija Okunnu-Lamidi",
    title: "Executive Director, OHCSF",
    bio: "Championing civil service excellence and workforce transition programs.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=75",
    featured: true,
  },
  {
    name: "Dr. Michael Abiodun Adeyemo",
    title: "Managing Director, NSITF",
    bio: "Driving social insurance reforms and worker protection initiatives across Nigeria.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=75",
    featured: true,
  },
]

export default function SpeakersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[88px]">
        <PageBanner
          title="Guest Speakers"
          subtitle="Meet the policymakers, industry leaders, and experts shaping Africa's retirement landscape."
        />

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Featured Speakers */}
          <section className="mb-16">
            <h2 className="text-2xl font-black text-secondary mb-8 tracking-tight">Featured Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {speakers
                .filter((s) => s.featured)
                .map((speaker, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full"
                  >
                    <div className="w-full h-64 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 flex flex-col p-4 text-slate-900">
                      <h3 className="text-lg font-bold mb-1">{speaker.name}</h3>
                      <p className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                        {speaker.title}
                      </p>
                      <p className="text-slate-700 text-sm leading-relaxed flex-1">{speaker.bio}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>

          {/* Become a Speaker CTA (single) */}
          <section className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
            <h2 className="text-3xl font-black text-secondary mb-4">Interested in Speaking?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We welcome thought leaders, industry experts, and policymakers who can contribute to the conversation on retirement readiness in Africa.
            </p>
            <a
              href="mailto:nps@xemgroup.net"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1"
            >
              Contact Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
