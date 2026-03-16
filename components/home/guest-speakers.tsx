"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useMemo } from "react"
import { memo } from "react"

const speakers = [
  {
    name: "Dr. Dasuki Ibrahim Arabi",
    title: "Director General, BPSR",
    bio: "Leading public sector reforms and retirement policy development across Nigeria.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=75",
  },
  {
    name: "Prof. Ibrahim Adepoju Adeyanju",
    title: "MD/CEO, Galaxy Backbone",
    bio: "Pioneering digital infrastructure and technology solutions for government services.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=75",
  },
  {
    name: "Hajiya Khadija Okunnu-Lamidi",
    title: "Executive Director, OHCSF",
    bio: "Championing civil service excellence and workforce transition programs.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=75",
  },
  {
    name: "Dr. Michael Abiodun Adeyemo",
    title: "Managing Director, NSITF",
    bio: "Driving social insurance reforms and worker protection initiatives across Nigeria.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=75",
  },
]

// Memoize speaker card to prevent unnecessary re-renders
const SpeakerCard = memo(({ speaker, currentIndex, index }: { speaker: any; currentIndex: number; index: number }) => (
  <div
    key={`${currentIndex}-${index}`}
    className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full"
    style={{ willChange: 'opacity' }}
  >
    <div className="w-full h-48 sm:h-64 bg-gray-100 flex-shrink-0 overflow-hidden">
      <Image
        src={speaker.image}
        alt={speaker.name}
        width={300}
        height={320}
        className="w-full h-full object-cover"
        loading="lazy"
        quality={75}
      />
    </div>
    <div className="flex-1 flex flex-col p-4">
      <h3 className="text-lg font-bold text-yellow-600 mb-1">{speaker.name}</h3>
      <p className="text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-3">
        {speaker.title}
      </p>
      <p className="text-gray-900 text-sm leading-relaxed flex-1">{speaker.bio}</p>
    </div>
  </div>
))

export function GuestSpeakers() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % speakers.length)
  }

  // Show 4 speakers at a time on desktop, 2 on mobile
  const getVisibleSpeakers = () => {
    return [
      speakers[currentIndex % speakers.length],
      speakers[(currentIndex + 1) % speakers.length],
      speakers[(currentIndex + 2) % speakers.length],
      speakers[(currentIndex + 3) % speakers.length],
    ]
  }

  return (
    <section className="py-24 bg-gray-100 text-gray-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-emerald-800">
              Guest Speakers.
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-md">
              Hear from the policymakers, industry leaders, and experts shaping Africa&apos;s retirement landscape.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <Link
              href="/speakers"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-colors group text-sm sm:text-base"
            >
              Meet All the Speakers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Carousel Container */}
          <div className="relative">
            {/* Speaker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {getVisibleSpeakers().map((speaker, index) => (
                <SpeakerCard key={`${currentIndex}-${index}`} speaker={speaker} currentIndex={currentIndex} index={index} />
              ))}
            </div>

            {/* Navigation Buttons - Always Visible */}
            <div className="absolute top-1/3 -left-6 -translate-y-1/2 z-20">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors border border-gray-300"
                aria-label="Previous speakers"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="absolute top-1/3 -right-6 -translate-y-1/2 z-20">
              <button
                onClick={goToNext}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors border border-gray-300"
                aria-label="Next speakers"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex gap-2 justify-center">
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-emerald-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to speaker ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
