"use client"

import Image from "next/image"

// Images placed in public/images/logos/marquee
const marqueeImages = [
  '1.png', '2.png', '3.png', '4.png', '5.png', '7.png', '8.png', '9.png', '11.png', '12.png', '13.png', '15.png',
  'nlc.png', 'nps.png', 'TRHL.png', 'trustfund.png'
]

export function PartnersMarquee() {
  return (
    <section className="py-12 bg-white border-b border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center font-mono text-sm font-bold text-slate-500 uppercase tracking-widest">
          Strategic Partners & Sponsors
        </p>
      </div>

      <div className="relative flex max-w-[100vw] overflow-hidden group">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="animate-marquee flex items-center gap-12 py-6" style={{ willChange: 'transform' }}>
          {/* First Set */}
          {marqueeImages.map((name, idx) => (
            <div key={`m1-${idx}`} className="flex items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default shrink-0">
              <Image src={`/images/logos/marquee/${name}`} alt={name.replace(/\.[^.]+$/, '')} width={160} height={48} className="h-12 w-auto object-contain" />
            </div>
          ))}
          {/* Duplicate Set for Seamless Loop */}
          {marqueeImages.map((name, idx) => (
            <div key={`m2-${idx}`} className="flex items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default shrink-0">
              <Image src={`/images/logos/marquee/${name}`} alt={name.replace(/\.[^.]+$/, '')} width={160} height={48} className="h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Link removed as requested */}
    </section>
  )
}
