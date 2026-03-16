"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const speakers2026 = [
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

const speakers2025 = [
  {
    name: "John Doe",
    title: "Former Minister of Finance",
    bio: "Expert in economic policy and retirement planning.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=75",
  },
  {
    name: "Jane Smith",
    title: "CEO, Pension Fund",
    bio: "Leading pension reforms and investment strategies.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=75",
  },
  {
    name: "Bob Johnson",
    title: "Economist",
    bio: "Specializing in African economic development.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=75",
  },
]

const speakers2024 = [
  {
    name: "Alice Brown",
    title: "Policy Advisor",
    bio: "Advising on retirement and social security policies.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=75",
  },
  {
    name: "Charlie Wilson",
    title: "Investment Banker",
    bio: "Expert in retirement investment portfolios.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=75",
  },
  {
    name: "Diana Lee",
    title: "HR Director",
    bio: "Focusing on workforce transition and retirement planning.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=75",
  },
]

export default function SpeakersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-12 lg:pt-[88px]">
        <PageBanner
          title="Guest Speakers"
          subtitle="Meet the policymakers, industry leaders, and experts shaping Africa's retirement landscape."
        />

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Featured Speakers 2026 */}
          <section className="mb-16">
            <h2 className="text-2xl font-black text-emerald-800 mb-8 tracking-tight">Featured Speakers 2026</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {speakers2026
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
                    <div className="w-full h-48 sm:h-64 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 flex flex-col p-4 text-slate-900">
                      <h3 className="text-lg font-bold mb-1 text-yellow-600">{speaker.name}</h3>
                      <p className="text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                        {speaker.title}
                      </p>
                      <p className="text-black text-sm leading-relaxed flex-1">{speaker.bio}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>

          {/* 2025 Speakers Carousel */}
          <section className="mb-16">
            <h2 className="text-2xl font-black text-emerald-800 mb-8 tracking-tight">2025 Speakers</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {speakers2025.map((speaker, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full">
                      <div className="w-full h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 flex flex-col p-4 text-slate-900">
                        <h3 className="text-lg font-bold mb-1 text-yellow-600">{speaker.name}</h3>
                        <p className="text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                          {speaker.title}
                        </p>
                        <p className="text-black text-sm leading-relaxed flex-1">{speaker.bio}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* 2024 Speakers Carousel */}
          <section className="mb-16">
            <h2 className="text-2xl font-black text-emerald-800 mb-8 tracking-tight">2024 Speakers</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {speakers2024.map((speaker, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full">
                      <div className="w-full h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 flex flex-col p-4 text-slate-900">
                        <h3 className="text-lg font-bold mb-1 text-yellow-600">{speaker.name}</h3>
                        <p className="text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                          {speaker.title}
                        </p>
                        <p className="text-black text-sm leading-relaxed flex-1">{speaker.bio}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Become a Speaker CTA (single) */}
          <section className="bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
            <h2 className="text-3xl font-black text-emerald-800 mb-4">Interested in Speaking?</h2>
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
