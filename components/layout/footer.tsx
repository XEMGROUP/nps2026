"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { useState } from "react"

const quickLinks = [
  { href: "/about", label: "About NPS" },
  { href: "/program", label: "2026 Program" },
  { href: "/speakers", label: "Guest Speakers" },
  { href: "/partners", label: "Partners" },
  { href: "/history/2024", label: "2024 Summit" },
  { href: "/history/2025", label: "2025 Summit" },
]

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t-[6px] border-emerald-600 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col items-start">
                <img src="/images/logos/optimized/xem.webp" alt="XEM Consultants" className="h-10 object-contain mb-2" />
                <img src="/images/logos/optimized/npslogo.webp" alt="NPS2026" className="h-10 object-contain" />
              </div>
            </Link>
            <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
              Nigeria&apos;s premier platform advancing retirement readiness, financial security, and post-career productivity across Africa.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-mono text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-mono text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">
                  No. 22 Massenya Street,<br />
                  Wuse Zone 6, Abuja
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="tel:+2349095511111" className="hover:text-emerald-400 transition-colors block">
                    +234 909 551 1111
                  </a>
                  <a href="tel:+2348051020088" className="hover:text-emerald-400 transition-colors block">
                    +234 805 102 0088
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="mailto:nps@xemgroup.net" className="hover:text-emerald-400 transition-colors block">
                    nps@xemgroup.net
                  </a>
                  <a href="mailto:xemconsultants@gmail.com" className="hover:text-emerald-400 transition-colors block">
                    xemconsultants@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold font-mono text-white mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to receive updates on the upcoming summit and retirement insights.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all group disabled:opacity-70"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} National Pre-Retirement Summit. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Branding Text - Full Width */}
      <div className="w-full mt-12 py-0">
        <h2 className="text-[8vw] font-black text-white text-center tracking-tight font-serif">
          XEMGROUP.NPS.2026
        </h2>
      </div>
    </footer>
  )
}
