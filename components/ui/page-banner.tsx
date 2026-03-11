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

  useEffect(() => {
    // pick a random optimized image for every mount
    const i = Math.floor(Math.random() * optimizedImages.length)
    setBg(optimizedImages[i])
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-white font-mono text-sm uppercase tracking-wider"
          style={{ willChange: 'opacity, transform' }}
        >
          NPS 2026
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

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl"
            style={{ willChange: 'opacity, transform' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
