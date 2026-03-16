"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { optimizedImages } from '@/lib/optimizedImages'

interface PageBannerProps {
  title: string
  subtitle?: string
  imagePatternUrl?: string
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  const [bg, setBg] = useState<string>(optimizedImages[0])
  const [rotIndex, setRotIndex] = useState(0)
  const rotatingPhrases = [
    'Retirement resources hub',
    'Retirement planning platform',
    'Post career production hub',
  ]
  const reserveText = rotatingPhrases.reduce((a, b) => (a.length > b.length ? a : b), '')

  useEffect(() => {
    // pick a random optimized image for every mount
    const i = Math.floor(Math.random() * optimizedImages.length)
    setBg(optimizedImages[i])
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setRotIndex((p) => (p + 1) % rotatingPhrases.length)
    }, 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative py-24 md:py-32 overflow-hidden" style={{
      background: `linear-gradient(135deg, #016633 0%, #CC3300 100%)`,
    }}>
      {/* Background Image */}
      <Image
        src={bg}
        alt=""
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay"
        sizes="100vw"
        quality={75}
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        {/* Logo (replaces pill badge) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4"
        >
          <div className="w-64 h-36 md:w-96 md:h-48 lg:w-[520px] lg:h-[200px] relative mx-auto">
            <Image
              src="/images/logos/optimized/npslogo.webp"
              alt="NPS 2026"
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 384px, 256px"
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          style={{ willChange: 'opacity, transform' }}
        >
          {title}
        </motion.h1>

        {/* Subtitle with rotating phrase after 'premier' */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl flex flex-col md:flex-row items-center gap-2 justify-center whitespace-normal md:whitespace-nowrap text-center md:text-left"
            style={{ willChange: 'opacity, transform' }}
          >
            <span className="font-medium">Secure your place at Nigeria's premier</span>
            <span className="relative inline-block text-left md:text-left">
              {/* reserve width using the longest phrase to prevent clipping or layout shift */}
              <span className="invisible absolute left-0 top-0">{reserveText}</span>
              <motion.span
                key={rotIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.6 }}
                className="inline-block font-semibold md:inline-block"
                style={{ display: 'inline-block' }}
              >
                {rotatingPhrases[rotIndex]}
              </motion.span>
            </span>
          </motion.p>
        )}
      </div>
    </div>
  )
}
