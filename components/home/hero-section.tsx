"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import { optimizedImages } from '@/lib/optimizedImages'

export function HeroSection() {
	const slideshowImages = optimizedImages

	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((p) => (p + 1) % slideshowImages.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [])

	return (
		<section
			className="relative min-h-[90vh] flex items-center overflow-hidden">

			{/* Slideshow image layers (cross-fade) */}
			<div className="absolute inset-0 z-0">
				{slideshowImages.map((src, idx) => (
					<div
						key={src}
						className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
						style={{ backgroundImage: `url('${src}')` }}
					/>
				))}
			</div>

			{/* Gradient overlay (slightly reduced opacity) */}
			<div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(1,102,51,0.82) 0%, rgba(204,51,0,0.86) 100%)' }} />
			{/* Bottom Fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />

			{/* Content */}
			<div className="container mx-auto px-4 relative z-30 py-20">
				<div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
					<div className="max-w-4xl flex-1">
						{/* Date/Location Badge */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4 }}
							className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white font-mono text-sm mb-8 backdrop-blur-sm"
							style={{ willChange: 'opacity, transform' }}
						>
							<span className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								15-16 July 2026
							</span>
							<span className="w-1 h-1 rounded-full bg-white/50" />
							<span className="flex items-center gap-2">
								<MapPin className="w-4 h-4" />
								Abuja, Nigeria
							</span>
						</motion.div>

						{/* Main Heading */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.05 }}
								style={{ willChange: 'opacity, transform' }}
								className="group"
							>
								<h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter mb-6">
									<span className="text-white">Own Your</span> <br />
									<span className="text-amber-300 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.9)] group-hover:scale-[1.02] inline-block">
										Retirement.
									</span>
								</h1>
							</motion.div>

						{/* Subtitle */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mb-10 leading-relaxed font-mono"
							style={{ willChange: 'opacity, transform' }}
						>
							From Planning to Action. Join Africa&apos;s premier platform for retirement readiness, financial security, and post-career productivity.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className="flex flex-col sm:flex-row gap-4"
							style={{ willChange: 'opacity, transform' }}
						>
							<Link
								href="/register"
								className="bg-gradient-to-r from-emerald-500 to-orange-400 hover:from-emerald-600 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg text-center shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
							>
								Register Now
								<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
							</Link>
							<Link
								href="/program"
								className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl font-bold text-lg text-center transition-all hover:-translate-y-1"
							>
								View Program
							</Link>
						</motion.div>
					</div>

					{/* Right Side: NPS 2026 Logo and Year */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="hidden lg:flex flex-col items-center gap-4 h-full justify-center w-full"
						>
							<div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 h-full w-full justify-center">
								{/* left: heading + main logo stacked */}
								<div className="flex flex-col items-center gap-4 h-full">
									<h2 className="relative z-20 text-6xl md:text-8xl lg:text-9xl font-black text-amber-300 leading-none">2026</h2>
									<div className="max-w-[44rem] w-full max-h-[64vh] flex flex-col items-center mt-0 relative z-10 overflow-visible">
										<Image
											src="/images/logos/optimized/NPSlogoWhite.webp"
											alt="NPS 2026 logo"
											width={704}
											height={704}
											className="object-contain max-h-full w-auto"
											priority
										/>
										{/* TRHL below main logo */}
										<div className="mt-4">
											<Image
												src="/images/logos/optimized/TRHL.png"
												alt="TRHL"
												width={240}
												height={72}
												className="object-contain"
												priority
											/>
										</div>
									</div>
								</div>

								{/* TRHL moved to header icons per user request */}
							</div>
						</motion.div>
				</div>
			</div>

			{/* Slide indicator (bottom center) */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
				<div className="flex gap-2 justify-center">
					{slideshowImages.map((_, idx) => (
						<button
							key={idx}
							onClick={() => setCurrentIndex(idx)}
							className={`h-2 rounded-full transition-all duration-300 ${
								idx === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/30 hover:bg-white/50'
							}`}
							aria-label={`Go to slide ${idx + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

