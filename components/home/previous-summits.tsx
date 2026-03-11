"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from 'react'
import { optimizedImages } from '@/lib/optimizedImages'

export function PreviousSummits() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(1)

  useEffect(() => {
    // pick two distinct random images from the optimized set
    const pick = () => {
      const len = optimizedImages.length
      let i = Math.floor(Math.random() * len)
      let j = Math.floor(Math.random() * len)
      if (i === j) j = (j + 1) % len
      setA(i)
      setB(j)
    }
    pick()
  }, [])
  return (
    <section className="py-24 bg-gradient-to-b from-emerald-50 via-amber-100 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 lg:h-[520px] flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Building on Success
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              The National Pre-Retirement Summit has rapidly evolved from a national initiative to Africa&apos;s premier retirement readiness platform.
            </p>

            {/* Timeline Items */}
            <div className="space-y-8 mb-10">
              {/* 2024 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-black text-lg">24</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">2024: The Genesis</h4>
                  <p className="text-slate-600 leading-relaxed">
                    The inaugural National Pre-Retirement Summit marked a transformative moment in Nigeria's retirement readiness landscape. With over 1,000 participants from government, private sector, and civil society, this summit established the foundational three-pillar framework addressing financial planning, healthcare security, and post-retirement productivity. The event successfully bridged the gap between policymakers and citizens, introducing comprehensive strategies for personal financial management and investment planning.
                  </p>
                </div>
              </div>

              {/* 2025 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-black text-lg">25</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">2025: Pan-African Expansion</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Building on 2024's success, the 2025 edition expanded its continental reach and hosted at the ECOWAS Commission Secretariat in Abuja. This summit brought together participants from across West Africa and beyond, exploring emerging opportunities in smart agriculture, renewable energy investments, and regional trade initiatives. Participants gained insights into leveraging retirement assets for socio-economic development while establishing networks with continental peers and thought leaders.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/history/2025"
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-lg group"
            >
              Explore Full Archive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Side: Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 relative lg:h-[520px]"
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              <div
                className="rounded-2xl shadow-xl w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${optimizedImages[a]}')`,
                }}
              />
              <div
                className="rounded-2xl shadow-xl w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${optimizedImages[b]}')`,
                }}
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-emerald-100/30 rounded-[2rem] -z-10 transform rotate-3" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
