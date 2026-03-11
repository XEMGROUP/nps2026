"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryProps {
  images: string[]
}

export function HistoryGallery({ images }: GalleryProps) {
  const [idx, setIdx] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (i: number) => { setIdx(i); setIsOpen(true) }
  const closeModal = () => setIsOpen(false)

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
          <div
            onClick={() => openModal(idx)}
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url('${images[idx]}')`, zIndex: 1 }}
          />

          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/30">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/30">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}`} aria-label={`Go to image ${i+1}`} />
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={closeModal}>
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img src={images[idx]} alt="gallery" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
