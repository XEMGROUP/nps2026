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
		<section className="relative min-h-screen flex flex-col overflow-hidden">
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

			{/* Gradient overlay */}
			<div
				className="absolute inset-0 z-10"
				style={{
					background: `linear-gradient(135deg, rgba(1,102,51,0.82) 0%, rgba(204,51,0,0.86) 100%)`,
				}}
			/>
			{/* Bottom Fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />

			{/* Decorative centered logo behind text (above gradient, below content) */}
			<div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-100 w-64 md:w-96 lg:w-[28rem]">
				<Image
					src="/images/logos/optimized/NPSlogoWhite.webp"
					alt="NPS decorative logo"
					width={900}
					height={900}
					className="w-full h-auto object-contain"
					priority
				/>
			</div>

			{/* All Content Inside Hero Section */}
			<div className="relative z-30 flex-1 flex flex-col justify-center">
				{/* Main Content - Flex to push buttons down */}
				<div className="w-full px-0 md:px-4 py-4 md:py-6">
					<div className="w-full">


						{/* Main Heading */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.05 }}
							style={{ willChange: 'opacity, transform' }}
							className="group mb-0 mx-0"
						>
							<div className="font-black group leading-none">
								{/* First Row: 2026 Theme and Own Your */}
								<div className="flex justify-center md:justify-start items-center gap-2 mb-2">
									<span className="bg-red-700 text-white font-black uppercase px-2 py-0.5 rounded text-lg md:text-lg tracking-tight">2026 theme:</span>
									<span className="text-white text-4xl md:text-5xl lg:text-7xl tracking-tight">Own Your</span>
								</div>
								{/* Second Row: Retirement */}
								<div className="text-center md:text-left mb-2">
									<span className="text-amber-300 text-7xl md:text-7xl lg:text-9xl font-black transition-all duration-300 group-hover:drop-shadow-[0_0_36px_rgba(250,204,21,0.95)] tracking-tight">
										Retirement
									</span>
								</div>
								{/* Third Row: From Planning to Action */}
								<div className="text-center md:text-left">
									<span className="text-white text-4xl md:text-4xl lg:text-6xl font-black transition-all duration-300 group-hover:drop-shadow-[0_0_36px_rgba(250,204,21,0.95)] tracking-tight">
										From Planning to Action
									</span>
								</div>
							</div>
						</motion.div>
					</div>


				</div>

				{/* Date and Venue Indicator Bar */}
				<div className="w-screen relative left-1/2 -translate-x-1/2 md:flex md:justify-end pt-3 pb-0">
					<div className="flex md:inline-flex items-center gap-2 px-1 md:px-4 py-2 bg-red-700 text-white font-black text-[10px] md:text-base shadow-lg w-full md:w-auto flex-wrap justify-center md:justify-start">
						<span className="flex items-center gap-2">
							<Calendar className="w-3 h-3 md:w-5 md:h-5" />
							<span className="hidden sm:inline">15-16 July 2026</span>
							<span className="sm:hidden">Jul 15-16</span>
						</span>
						<span className="w-1 h-1 rounded-full bg-white/50" />
						<span className="flex items-center gap-2">
							<MapPin className="w-3 h-3 md:w-5 md:h-5" />
							<span className="hidden sm:inline">Shehu Musa Yar-Aduas Center CBD</span>
							<span className="sm:hidden">Musa Yar Aduas</span>
						</span>
					</div>
				</div>

				{/* Marquee - Inside Hero Section, After Text, No Extra Padding */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="w-screen relative left-1/2 -translate-x-1/2 bg-yellow-400 pt-2 pb-2 md:pb-3 overflow-hidden"
					style={{ willChange: 'opacity' }}
				>
					{/* badge removed from here to avoid clipping */}
					<div className="marquee__inner animate-marquee text-gray-900 text-sm md:text-lg font-semibold flex whitespace-nowrap">
						<span className="pr-8 md:pr-12">Join Africa's premier platform for retirement readiness, financial security, and post-career productivity — Register today to secure your spot.</span>
						<span className="pr-8 md:pr-12">Join Africa's premier platform for retirement readiness, financial security, and post-career productivity — Register today to secure your spot.</span>
					</div>
				</motion.div>

				{/* Buttons - Inside Hero Section, Below Marquee */}
				<div className="container mx-auto px-4 py-2 md:py-3 relative z-30">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.25 }}
						className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start"
						style={{ willChange: 'opacity, transform' }}
					>
						<Link
							href="/register"
							className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg text-center shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto"
						>
							Register Now
							<ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
						</Link>
						<Link
							href="/program"
							className="bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg text-center transition-all hover:-translate-y-1 w-full sm:w-auto"
						>
							View Program
						</Link>
					</motion.div>
				</div>
			</div>

			{/* Slide indicator (pinned to hero bottom) */}
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

