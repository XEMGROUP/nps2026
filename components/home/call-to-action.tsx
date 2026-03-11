"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function CallToAction() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section 
      className="py-24 text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #016633 0%, #CC3300 100%)`,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following radial gradient */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(204, 51, 0, 0.15) 0%, rgba(204, 51, 0, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
          style={{ willChange: 'opacity, transform' }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Ready to Secure Your Retirement Future?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join thousands of Nigerians and Africans who are taking control of their retirement destiny. Register now for the National Pre-Retirement Summit 2026 and unlock pathways to financial security and post-career productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-red-800 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl group"
            >
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/program"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold backdrop-blur-md transition-all border border-white/30 group"
            >
              Explore NPS2026
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-4">Trusted by over 2,000+ participants across Africa</p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Evidence-Based Planning
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Expert Guidance
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Community Support
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
