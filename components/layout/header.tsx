"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About NPS" },
  {
    label: "History",
    children: [
      { href: "/history/2024", label: "2024 Summit" },
      { href: "/history/2025", label: "2025 Summit" },
    ],
  },
  { href: "/program", label: "NPS2026" },
  { href: "/speakers", label: "Speakers" },
  { href: "/partners", label: "Partners" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between py-2 sm:py-3 lg:py-4">
        {/* Logo: optimized images side-by-side + title (no subtitle) */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative h-10 sm:h-10 md:h-14 w-24 sm:w-32 md:w-44">
            <Image
              src="/images/logos/optimized/TNPRS.webp"
              alt="TNPRS icon"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-10 max-w-[900px]">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-slate-800 hover:text-orange-600 transition-colors">
                  {link.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    activeDropdown === link.label
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="bg-white shadow-xl border border-gray-200 rounded-xl py-2 min-w-[180px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-gray-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm font-bold uppercase tracking-wide text-slate-800 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Button */}
        <Link
          href="/register"
          className="hidden lg:block bg-emerald-600 text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide uppercase shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:bg-red-600 transition-all duration-300 lg:ml-4 lg:mr-32"
        >
          Register Now
        </Link>

        {/* TRHL logo: positioned at header right and overlaps header/hero */}
        <div className="hidden lg:block absolute top-full right-2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="w-32 lg:w-36">
            <Image
              src="/images/logos/optimized/TRHL.webp"
              alt="TRHL"
              width={260}
              height={96}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-800 hover:text-orange-600 transition-colors ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2 bg-white border-t border-gray-200">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="flex flex-col">
                <button
                  className="flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wide text-slate-800"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === link.label ? null : link.label)
                  }
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    activeDropdown === link.label ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-4 text-sm font-medium text-slate-600 hover:text-orange-600 border-l-2 border-gray-200 hover:border-orange-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="py-3 text-sm font-bold uppercase tracking-wide text-slate-800 hover:text-orange-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/register"
            className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-bold tracking-wide uppercase text-center shadow-lg shadow-emerald-600/30 hover:bg-red-600 transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Register Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
