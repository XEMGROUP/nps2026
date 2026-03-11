"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { TrendingUp, UserCheck, Leaf, Landmark, Activity, ShieldCheck, ArrowRight } from "lucide-react"

const focusAreas = [
  {
    icon: TrendingUp,
    title: "Innovative Investment",
    description: "Retirement income and investment models designed for sustainable wealth preservation.",
  },
  {
    icon: UserCheck,
    title: "Silver Economy",
    description: "Digital inclusion strategies for post-retirement entrepreneurship and economic participation.",
  },
  {
    icon: Leaf,
    title: "Smart Agriculture",
    description: "Agribusiness and agro-allied value chains as retirement income opportunities.",
  },
  {
    icon: Landmark,
    title: "Policy Framework",
    description: "Labour transitions, pension reforms, and Africa's evolving demographic landscape.",
  },
  {
    icon: Activity,
    title: "Health & Wellbeing",
    description: "Health longevity planning, wellness strategies, and sustainable lifestyle management.",
  },
  {
    icon: ShieldCheck,
    title: "Digital Inclusion",
    description: "Technology adoption and digital skills for productive post-retirement engagement.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export function FocusAreas() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            2026 Implementation Focus
          </h2>
          <p className="text-lg text-slate-600 font-mono">
            Moving beyond dialogue to actionable outcomes. The 2026 Summit prioritizes execution, measurable impact, and real investment pathways.
          </p>

          {/* Theme Callout Card (per card.md) - centered */}
          <div className="mt-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl bg-white rounded-3xl p-8 md:p-12 border border-[#E5E7EB] shadow-xl shadow-black/5 flex flex-col lg:flex-row gap-8 lg:items-center"
            >
              <div className="flex-1">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#016633] mb-4">2026 Theme</p>
                <h3 className="text-3xl md:text-4xl font-black text-[#02004C] tracking-tighter leading-tight mb-4">Driving Implementation: From Policy to Practice</h3>
                <p className="text-[#787878] text-lg font-medium leading-relaxed">The 2026 program focuses on measurable outcomes across policy reform, investment pathways, and scalable retirement solutions — with dedicated working groups for finance, health, and digital inclusion.</p>
              </div>
              <div className="lg:w-64 shrink-0">
                <div className="bg-[#02004C] rounded-2xl p-8 text-white text-center">
                  <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">Save the Date</p>
                  <p className="font-black text-4xl text-[#016633] tracking-tighter mb-1">July</p>
                  <p className="font-black text-6xl text-white tracking-tighter leading-none">15–16</p>
                  <p className="font-mono text-sm text-white/60 mt-3 uppercase tracking-wider">2026 · Abuja</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-black/5 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              style={{ willChange: 'opacity, transform' }}
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-700 transition-all">
                <area.icon className="w-7 h-7 text-emerald-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
              <p className="text-slate-600">{area.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <Link
            href="/program"
            className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-800 transition-colors border-b-2 border-emerald-700 pb-1 group"
          >
            View Detailed 2026 Program
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
