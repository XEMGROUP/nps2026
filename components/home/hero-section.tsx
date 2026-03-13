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
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((p) => (p + 1) % slideshowImages.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const onResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 1024)
		onResize()
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
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
					background: `linear-gradient(135deg, rgba(1,102,51,${isMobile ? 0.45 : 0.82}) 0%, rgba(204,51,0,${isMobile ? 0.45 : 0.86}) 100%)`,
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
				<div className="container mx-auto px-4 py-4 md:py-6 w-full">
					<div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 w-full">
						<div className="max-w-4xl flex-1 w-full">


							{/* Main Heading */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.05 }}
								style={{ willChange: 'opacity, transform' }}
								className="group mb-0"
							>
								<h1 className="font-black group leading-none">
									<div className="flex items-center gap-4 mb-1">
										<span className="bg-red-700 text-white font-black uppercase px-3 py-1 rounded text-sm md:text-lg tracking-tight">2026 theme:</span>
										<span className="text-white block text-2xl md:text-5xl lg:text-7xl tracking-tight">Own Your</span>
									</div>
									<span className="text-amber-300 block text-4xl md:text-7xl lg:text-9xl font-black transition-all duration-300 group-hover:drop-shadow-[0_0_36px_rgba(250,204,21,0.95)] tracking-tight">
										Retirement
									</span>
									<span className="text-white block text-xl md:text-4xl lg:text-6xl font-black transition-all duration-300 group-hover:drop-shadow-[0_0_36px_rgba(250,204,21,0.95)] tracking-tight mt-1">
										From Planning to Action
									</span>
								</h1>
							</motion.div>
						</div>


					</div>
				</div>

				{/* Marquee - Inside Hero Section, After Text, No Extra Padding */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="w-screen relative left-1/2 -translate-x-1/2 bg-yellow-400 py-2 md:py-3 overflow-hidden"
					style={{ willChange: 'opacity' }}
				>
					{/* badge removed from here to avoid clipping */}
					<div className="marquee__inner animate-marquee text-gray-900 text-sm md:text-lg font-semibold flex whitespace-nowrap">
						<span className="pr-8 md:pr-12">Join Africa's premier platform for retirement readiness, financial security, and post-career productivity — Register today to secure your spot.</span>
						<span className="pr-8 md:pr-12">Join Africa's premier platform for retirement readiness, financial security, and post-career productivity — Register today to secure your spot.</span>
					</div>
				</motion.div>

				{/* Buttons - Inside Hero Section, Below Marquee */}
				{/* Date/Location badge positioned over marquee (top-right) */}
				<div className="absolute z-30 right-4 md:right-8 top-[56%] md:top-[50%] pointer-events-auto">
					<div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-red-700 text-white font-black text-sm md:text-base shadow-lg">
						<span className="flex items-center gap-3">
							<Calendar className="w-4 h-4 md:w-5 md:h-5" />
							<span className="hidden sm:inline">15-16 July 2026</span>
							<span className="sm:hidden">Jul 15-16</span>
						</span>
						<span className="w-1 h-1 rounded-full bg-white/50" />
						<span className="flex items-center gap-3">
							<MapPin className="w-4 h-4 md:w-5 md:h-5" />
							<span className="hidden sm:inline">Shehu Musa Yar-Aduas Center CBD</span>
							<span className="sm:hidden">Musa Yar Aduas</span>
						</span>
					</div>
				</div>
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
							className="bg-gradient-to-r from-emerald-500 to-orange-400 hover:from-emerald-600 hover:to-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg text-center shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto"
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

