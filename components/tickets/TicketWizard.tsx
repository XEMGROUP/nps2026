"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

type Tier = {
  id: string
  title: string
  price: number
  subtitle: string
}

const TIERS: Tier[] = [
  { id: 'participant', title: '$200', price: 200, subtitle: 'PARTICIPANT PACKAGE' },
  { id: 'vip', title: '$350', price: 350, subtitle: 'VIP PACKAGE' },
  { id: 'vvip', title: '$500', price: 500, subtitle: 'VVIP PACKAGE' },
]

const summit = {
  title: 'National Pre-Retirement Summit',
  date: 'July 15 - 16, 2026',
  location: 'Lagos, Nigeria',
}

export default function TicketWizard() {
  const [step, setStep] = useState<number>(1)
  const [selectedTier, setSelectedTier] = useState<Tier>(TIERS[0])
  const [quantity, setQuantity] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [special, setSpecial] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  const images = [
    '/tickets/one.png',
    '/tickets/two.png',
    '/tickets/three.png',
    '/tickets/ticket.png',
  ]

  const logoLeft = encodeURI('/images/logos/optimized/NPSlogoWhite.webp')
  const logoRight = encodeURI('/images/logos/optimized/XEM Consultants Ltd Logo w.webp')

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tier: selectedTier, quantity, name, email, special }),
      })
      const data = await res.json()
      if (data?.success) {
        setOrderId(data.orderId || String(Date.now()))
        setStep(4)
      }
    } catch (e) {
      console.error(e)
      alert('Payment failed (simulated).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
      <div className="mb-6">
        <h2 className="text-center text-2xl font-bold text-slate-900">Ticket Progression</h2>
        <p className="text-center text-sm text-slate-600 mt-2">Follow the steps to book your summit ticket</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <img src={images[Math.min(step - 1, images.length - 1)]} alt="progress" className="w-full rounded-2xl border border-white/10 shadow-sm" />

        {step === 1 && (
          <div className="w-full">
            <h3 className="text-center text-lg text-slate-900 mb-4">Select Ticket Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTier(t)}
                  className={`p-4 rounded-xl border ${selectedTier.id === t.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'} text-left`}
                >
                  <div className="text-sm font-semibold text-slate-900">{t.title}</div>
                  <div className="text-xs text-slate-500">{t.subtitle}</div>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm text-slate-700 mb-2">Number of Tickets</label>
              <select className="w-full rounded-xl p-3 bg-white border border-gray-200" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => alert('Cancelled')}>Cancel</Button>
              <Button className="flex-1" onClick={() => setStep(2)}>Next</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full">
            <h3 className="text-center text-lg text-slate-900 mb-4">Attendee Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-1">Enter your name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl bg-white border border-gray-200" />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">Enter your email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-white border border-gray-200" />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">Special Request?</label>
                <textarea value={special} onChange={(e) => setSpecial(e.target.value)} className="w-full p-3 rounded-xl bg-white border border-gray-200" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(3)}>Get Ticket</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full">
            <h3 className="text-center text-lg text-slate-900 mb-4">Confirm & Pay (simulated)</h3>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-slate-900">
              <p className="font-medium">{summit.title}</p>
              <p className="text-sm">{summit.date}</p>
              <p className="text-sm">{summit.location}</p>
              <p className="mt-2 text-sm">Ticket: <strong>{selectedTier.subtitle}</strong> · Qty: {quantity} · Total: <strong>${selectedTier.price * quantity}</strong></p>
              <p className="mt-2 text-sm">Name: {name || '(not provided)'}</p>
              <p className="text-sm">Email: {email || '(not provided)'}</p>

              <div className="mt-4">
                <label className="block text-sm text-slate-700 mb-2">Upload profile photo (will appear on ticket)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setPhotoFile(f)
                    if (f) setPhotoPreview(URL.createObjectURL(f))
                    else setPhotoPreview(null)
                  }}
                  className=""
                />
                {photoPreview && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-600 mb-2">Preview</p>
                    <img src={photoPreview} alt="preview" className="w-28 h-28 object-cover rounded-full border" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1" onClick={handleCheckout} disabled={loading}>{loading ? 'Processing…' : 'Pay now'}</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="w-full text-center text-slate-900">
            <h3 className="text-lg font-semibold mb-2">Your Ticket is Booked!</h3>
            <p className="text-sm mb-4">Check your email for a copy or download it below.</p>

            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4 inline-block">
              <div className="w-[320px] text-left">
                <div className="w-full h-28 bg-slate-100 rounded-md mb-4 flex items-center justify-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt="ticket-photo" className="w-20 h-20 object-cover rounded-full border" />
                  ) : (
                    <div className="w-20 h-20 bg-white/60 rounded-full" />
                  )}
                </div>

                <p className="text-sm font-medium">{summit.title}</p>
                <p className="text-xs mt-2">Date: {summit.date}</p>
                <p className="text-xs">Location: {summit.location}</p>

                <div className="mt-3 flex items-center justify-center gap-4">
                  <img src={logoLeft} alt="left-logo" className="w-20 h-12 object-contain" />

                  <div className="p-2 bg-white rounded-md shadow-inner border">
                    <div className="w-24 h-24 bg-slate-200 flex items-center justify-center">QR</div>
                  </div>

                  <img src={logoRight} alt="right-logo" className="w-28 h-12 object-contain" />
                </div>

                <p className="text-xs mt-3">Ticket Type: {selectedTier.subtitle}</p>
                <p className="text-xs">Ordered on: {new Date().toLocaleString()}</p>
                <p className="text-xs">Special Request: {special || 'none'}</p>

                <div className="mt-3 text-center opacity-90">
                  <div className="text-2xl font-black italic">NPS</div>
                  <p className="text-xs text-slate-500 mt-1">Own Your retirement</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={async () => {
                // generate image from template + photo and download
                try {
                  const dataUrl = await generateTicketImage()
                  const a = document.createElement('a')
                  a.href = dataUrl
                  a.download = `ticket-${Date.now()}.png`
                  document.body.appendChild(a)
                  a.click()
                  a.remove()
                } catch (e) {
                  alert('Failed to generate ticket image')
                }
              }}>Download Ticket</Button>

              <Button variant="outline" className="w-full" onClick={() => { setStep(1); setOrderId(null); setPhotoFile(null); setPhotoPreview(null); }}>Book Another Ticket</Button>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        )}
      </div>
    </div>
  )

  async function generateTicketImage(): Promise<string> {
    // Draw template and uploaded photo onto a canvas and return data URL
    const canvas = canvasRef.current || document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    // set a reasonable ticket size
    const W = 800
    const H = 1200
    canvas.width = W
    canvas.height = H

    // load background template
    const bg = await loadImage('/tickets/ticket.png')
    // draw background to fill canvas
    ctx.drawImage(bg, 0, 0, W, H)

    // draw uploaded photo if available
    if (photoFile || photoPreview) {
      const img = photoPreview ? await loadImage(photoPreview) : await loadImage(URL.createObjectURL(photoFile as File))
      // place photo near top center
      const pw = 180
      const ph = 180
      const px = (W - pw) / 2
      const py = 160
      // draw circular clipping
      ctx.save()
      ctx.beginPath()
      ctx.arc(px + pw / 2, py + ph / 2, pw / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(img, px, py, pw, ph)
      ctx.restore()
    }

    // draw text: event title and details
    ctx.fillStyle = '#ffffff'
    ctx.font = '28px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(summit.title, W / 2, 380)
    ctx.font = '18px sans-serif'
    ctx.fillText(summit.date, W / 2, 410)
    ctx.fillText(summit.location, W / 2, 435)

    // small ticket info
    ctx.font = '16px sans-serif'
    ctx.fillText(`Ticket: ${selectedTier.subtitle}`, W / 2, 480)
    ctx.fillText(`Name: ${name || '---'}`, W / 2, 505)

    return canvas.toDataURL('image/png')
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = (e) => reject(e)
      img.src = src
    })
  }
}
