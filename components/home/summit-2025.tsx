"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { optimizedImages } from '@/lib/optimizedImages'

const summitImages = optimizedImages

export function Summit2025() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const carouselRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % summitImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function update() {
      const ch = carouselRef.current?.clientHeight ?? 0
      setCarouselHeight(ch)
      if (!textRef.current) return
      const th = textRef.current.scrollHeight
      const newScale = th > ch && ch > 0 ? ch / th : 1
      setScale(newScale)
    }

    update()
    const ro = new ResizeObserver(update)
    if (carouselRef.current) ro.observe(carouselRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [currentImageIndex])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + summitImages.length) % summitImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % summitImages.length)
  }

  return (
    <section 
      className="py-12 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #CC3300 0%, #016633 100%)`,
      }}
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`,
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left Side: Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <div ref={carouselRef} className="relative h-[500px] overflow-hidden shadow-2xl">
              {/* Main Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url('${summitImages[currentImageIndex]}')` }}
              />

              {/* Navigation Buttons - Always Visible */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/30"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {summitImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 flex flex-col justify-start"
          >
            <div style={{ height: carouselHeight ? `${carouselHeight}px` : undefined }} className="overflow-hidden mb-6">
              <div ref={textRef} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-6xl md:text-7xl font-black text-white">2025</span>
                  <div className="h-20 w-1 bg-gradient-to-b from-white to-transparent"></div>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Pan-African Expansion: Scaling Retirement Excellence
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-white/90 leading-relaxed">
                    The 2025 National Pre-Retirement Summit expanded its continental reach with unprecedented participation from West African nations. Hosted at the ECOWAS Commission Secretariat in Abuja, this edition demonstrated the universal relevance of retirement preparedness and the power of regional cooperation in addressing shared economic challenges.
                  </p>

                  <p className="text-lg text-white/90 leading-relaxed">
                    This continental edition featured network building across West Africa, establishing ongoing knowledge-sharing networks, while exploring emerging sector opportunities in smart agriculture, renewable energy, and cross-border trade that leverage retirement assets. It showcased how retirement planning connects to broader development goals, positioning retirees as economic agents and community catalysts for sustainable growth.
                  </p>

                  <div className="flex gap-4">
                    <Link
                      href="/history/2025"
                      className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors group"
                    >
                      Explore Full Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  )
}
