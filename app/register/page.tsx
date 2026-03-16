"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import { motion } from "framer-motion"
import { Progress } from '@/components/ui/progress'
import generateTicketImage from '@/lib/generateTicket'
import RegistrationIndicator from '@/components/ui/registration-indicator'
import { CheckCircle2, ArrowRight, User, Building2, Phone, Mail, Clock, Briefcase, Lightbulb, Shield } from "lucide-react"
import Webcam from 'react-webcam'

const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Engr.", "Chief", "Alhaji", "Hajiya"]

// Place "Already retired" first per user request
const yearsToRetirementOptions = [
  "Already retired",
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "More than 10 years",
]

const digitalSkillsetOptions = [
  "None",
  "Basic Computer Skills",
  "Microsoft Office",
  "Social Media Management",
  "Digital Marketing",
  "Web Development",
  "Data Analysis",
  "Graphic Design",
  "Video Editing",
  "E-commerce",
  "Other"
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    placeOfWork: "",
    department: "",
    designation: "",
    countryCode: "+234",
    phoneNumber: "",
    email: "",
    yearsToRetirement: "",
    investmentAdvisory: "",
    digitalSkillset: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Multi-step state (all inline in the same frame)
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [paymentOption, setPaymentOption] = useState<'online'|'later'|null>(null)
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null)
  const [ticketUrl, setTicketUrl] = useState<string | null>(null)
  const [generatingTicket, setGeneratingTicket] = useState(false)
  const [downloadConfirmed, setDownloadConfirmed] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef<Webcam | null>(null)
  const ticketCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Submits registration record to server (used after payment or on-site)
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = { ...formData, package: selectedPackage, paymentOption }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()

      if (!res.ok) {
        setIsSubmitting(false)
        alert(result?.error || 'Registration failed')
        return
      }

      // best-effort welcome email
      try {
        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.fullName, email: formData.email })
        })
      } catch (emailErr) {
        console.error('Failed to send welcome email', emailErr)
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      setIsSubmitting(false)
      alert('Submission failed. Please try again.')
    }
  }

  const packages = [
    { id: 'sponsored', name: 'Sponsored', price: '₦249,900' },
    { id: 'military', name: 'Military & Paramilitary', price: '₦239,900' },
    { id: 'disabled', name: 'Disabled', price: '₦229,900' },
    { id: 'retired', name: 'Retired', price: '₦229,900' },
  ]

  const handleGenerateTicket = async (orderId?: string) => {
    const pkg = packages.find(p => p.id === selectedPackage)
    try {
      setGeneratingTicket(true)
      const url = await generateTicketImage({ fullName: formData.fullName || 'Guest', packageLabel: pkg?.name || 'Participant', summitName: 'NPS 2026', orderId, photoDataUrl })
      setTicketUrl(url)
      return url
    } finally {
      setGeneratingTicket(false)
    }
  }

  const handleFinalise = async () => {
    if (!selectedPackage) return alert('Please select a package')
    if (!paymentOption) return alert('Please select a payment option')
    setIsSubmitting(true)
    try {
      if (paymentOption === 'online') {
        const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ form: { ...formData, package: selectedPackage } }) })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Payment failed')
        await handleGenerateTicket(json.orderId)
        await handleSubmit()
      } else {
        await handleGenerateTicket('ON-SITE-' + Date.now())
        await handleSubmit()
      }
    } catch (err: any) {
      alert(err?.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-draw the canvas ticket when the success page appears
  useEffect(() => {
    if (!isSubmitted) return
    const canvas = ticketCanvasRef.current
    if (!canvas) return

    generateTicketImage({
      fullName: formData.fullName || 'Guest',
      packageLabel: packages.find(p => p.id === selectedPackage)?.name || 'Participant',
      summitName: 'NPS 2026',
      photoDataUrl,
    }).then((dataUrl) => {
      // Draw the generated image onto the visible canvas so the preview is live
      const img = new Image()
      img.onload = () => {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const c = canvas.getContext('2d')!
        c.drawImage(img, 0, 0)
      }
      img.src = dataUrl
      setTicketUrl(dataUrl)
    }).catch(console.error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted])

  // Prevent accidental navigation away before ticket is downloaded
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (isSubmitted && !downloadConfirmed) {
        e.preventDefault()
        e.returnValue = ''
        return ''
      }
      return undefined
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', onBeforeUnload)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', onBeforeUnload)
      }
    }
  }, [isSubmitted, downloadConfirmed])

  const startCamera = () => {
    setShowCamera(true)
  }

  const stopCamera = () => {
    setShowCamera(false)
  }

  const capturePhoto = () => {
    const webcam = webcamRef.current
    if (!webcam) return

    const imageSrc = webcam.getScreenshot()
    if (imageSrc) {
      setPhotoDataUrl(imageSrc)
      stopCamera()
    }
  }

  // Country codes list (West Africa + Pan-Africa)
  const countryOptions = [
    { code: '+234', name: 'Nigeria' },
    { code: '+233', name: 'Ghana' },
    { code: '+225', name: 'Ivory Coast' },
    { code: '+221', name: 'Senegal' },
    { code: '+231', name: 'Liberia' },
    { code: '+232', name: 'Sierra Leone' },
    { code: '+220', name: 'Gambia' },
    { code: '+237', name: 'Cameroon' },
    { code: '+254', name: 'Kenya' },
    { code: '+27', name: 'South Africa' },
    { code: '+20', name: 'Egypt' }
  ]


  if (isSubmitted) {

    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        {/* Generating modal — stays visible while ticket is being prepared */}
        {(generatingTicket || isSubmitting) && (
          <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-xs text-center shadow-2xl">
              <div className="mb-4">
                <div className="inline-block w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="font-bold text-slate-900 text-lg">Generating your ticket</div>
              <div className="text-sm text-slate-500 mt-2">Please wait — your personalised ticket is being prepared.</div>
            </div>
          </div>
        )}

        <main className="flex-grow pt-12 lg:pt-[88px] bg-white">
          <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

              {/* ── Left: Ticket Canvas ── */}
              <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center">
                <canvas
                  ref={ticketCanvasRef}
                  className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none lg:w-[320px] rounded-3xl shadow-2xl"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>

              {/* ── Right: Success info card ── */}
              <div className="w-full lg:flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Registration Successful!</h3>
                    <p className="text-slate-600 mt-2">
                      Thank you for registering for NPS 2026. A confirmation email has been sent to{' '}
                      <strong>{formData.email || 'your email'}</strong>.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Important — keep your ticket safe</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                    <li>Download your ticket and save a copy on your phone.</li>
                    <li>Bring the ticket (printed or on-phone) to the event for check-in.</li>
                    <li>Do not share your ticket with others — it is unique to you.</li>
                    <li>If you lose the ticket, contact support with your registration details.</li>
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        const url = ticketUrl
                        if (!url) return
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `NPS2026-ticket-${(formData.fullName || 'guest').replace(/\s+/g, '-')}.png`
                        document.body.appendChild(a)
                        a.click()
                        a.remove()
                        setDownloadConfirmed(true)
                      }}
                      disabled={!ticketUrl}
                      className={`px-4 py-2 rounded-lg transition ${
                        ticketUrl
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                          : 'bg-emerald-200 text-emerald-800 cursor-not-allowed'
                      }`}
                    >
                      {ticketUrl ? 'Download Ticket' : 'Preparing…'}
                    </button>

                    <button
                      onClick={() => {
                        if (!downloadConfirmed) {
                          alert('Please download your ticket before returning to the homepage.')
                          return
                        }
                        window.location.href = '/'
                      }}
                      disabled={!downloadConfirmed}
                      className={`px-4 py-2 rounded-lg border ml-auto ${
                        downloadConfirmed ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Full-page generating modal — always on top during ticket generation */}
      {(generatingTicket || isSubmitting) && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-xs text-center shadow-2xl">
            <div className="mb-4">
              <div className="inline-block w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="font-bold text-slate-900 text-lg">Generating your ticket</div>
            <div className="text-sm text-slate-500 mt-2">Please wait — your personalised ticket is being prepared.</div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-12 lg:pt-[88px]">
        <PageBanner
          title="Register for NPS 2026"
          subtitle="Secure your place at Nigeria's premier pre-retirement summit"
        />

        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center">
                <RegistrationIndicator />
              </div>
              {/* Form Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg shadow-black/5 p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Registration Details</h2>
                <p className="text-slate-600">
                  Please fill in your details below to register for the National Pre-Retirement Summit 2026. 
                  All fields marked with an asterisk (*) are required.
                </p>
              </motion.div>

              {/* Registration Form (multi-step inline) */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={(e) => e.preventDefault()}
                className="bg-white rounded-2xl shadow-lg shadow-black/5 p-8"
              >
                <div className="mb-6">
                  <Progress value={Math.round((step / totalSteps) * 100)} />
                </div>

                {/* Step 1: Package selection */}
                {step === 1 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Select a participant package</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {packages.map(p => (
                        <button key={p.id} type="button" onClick={() => setSelectedPackage(p.id)} className={`p-4 text-left rounded-xl border flex items-center justify-between gap-3 ${selectedPackage === p.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
                          <div className="font-semibold text-slate-900">{p.name}</div>
                          <div className="ml-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">{p.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Payment option */}
                {step === 2 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Payment option</h3>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setPaymentOption('online')} className={`px-4 py-3 rounded-xl border ${paymentOption === 'online' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'}`}>Pay Now (Online)</button>
                      <button type="button" onClick={() => setPaymentOption('later')} className={`px-4 py-3 rounded-xl border ${paymentOption === 'later' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'}`}>Pay Later (On-site)</button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details (personal, work, retirement, additional) */}
                {step === 3 && (
                  <>
                    <div className="mb-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-700" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                          <select id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800">
                            <option value="">Title</option>
                            {titleOptions.map(title => (<option key={title} value={title}>{title}</option>))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">Full name *</label>
                          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                          <div className="flex gap-3 items-center">
                            <div className="min-w-[160px]">
                              <select value={formData.countryCode} onChange={(e)=> setFormData(prev=>({...prev, countryCode: e.target.value}))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm">
                                {countryOptions.map(c=> (<option key={c.code} value={c.code}>{c.name} ({c.code})</option>))}
                              </select>
                            </div>

                            <div className="flex-1">
                              <div className="relative">
                                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="812 345 6789" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                          <div className="relative">
                            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Work Information</h3>
                          </div>

                          <div className="grid grid-cols-1 gap-6">
                            <div>
                              <label htmlFor="placeOfWork" className="block text-sm font-semibold text-slate-700 mb-2">Place of Work *</label>
                              <input type="text" id="placeOfWork" name="placeOfWork" value={formData.placeOfWork} onChange={handleChange} required placeholder="Enter your organization/company name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                            </div>

                            <div>
                              <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-2">Department *</label>
                              <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required placeholder="Enter your department" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                            </div>

                            <div>
                              <label htmlFor="designation" className="block text-sm font-semibold text-slate-700 mb-2">Designation/Job Title *</label>
                              <div className="relative">
                                <Briefcase className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} required placeholder="Enter your job title" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Lightbulb className="w-5 h-5 text-emerald-700" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-900">Additional Information</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                              <div>
                                <label htmlFor="investmentAdvisory" className="block text-sm font-semibold text-slate-700 mb-2">Are you interested in investment advisory? *</label>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="investmentAdvisory" value="yes" checked={formData.investmentAdvisory === "yes"} onChange={handleChange} required className="w-5 h-5 text-emerald-600" />
                                    <span className="text-slate-700">Yes</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="investmentAdvisory" value="no" checked={formData.investmentAdvisory === "no"} onChange={handleChange} className="w-5 h-5 text-emerald-600" />
                                    <span className="text-slate-700">No</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="investmentAdvisory" value="maybe" checked={formData.investmentAdvisory === "maybe"} onChange={handleChange} className="w-5 h-5 text-emerald-600" />
                                    <span className="text-slate-700">Maybe</span>
                                  </label>
                                </div>
                              </div>

                              <div>
                                <label htmlFor="digitalSkillset" className="block text-sm font-semibold text-slate-700 mb-2">What digital skills do you have? *</label>
                                <select id="digitalSkillset" name="digitalSkillset" value={formData.digitalSkillset} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                  <option value="">Select your skill level</option>
                                  {digitalSkillsetOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-slate-700" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-900">Retirement Information</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                              <div>
                                <label htmlFor="yearsToRetirement" className="block text-sm font-semibold text-slate-700 mb-2">How many years to retirement? *</label>
                                <select id="yearsToRetirement" name="yearsToRetirement" value={formData.yearsToRetirement} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                                  <option value="">Select an option</option>
                                  {yearsToRetirementOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Photo Section - Full Width */}
                    <div className="mb-10">
                      <h4 className="text-md font-semibold text-slate-900 mb-2">Profile photo</h4>
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div className="flex flex-col gap-3 lg:w-48 lg:h-80 lg:justify-center lg:items-center">
                          {!showCamera ? (
                            <>
                              <button type="button" onClick={startCamera} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl shadow text-center">Use camera</button>
                              <label className="inline-block w-full">
                                <span className="sr-only">Upload photo</span>
                                <input accept="image/*" type="file" onChange={(e)=>{ const f = e.target.files?.[0]; if(!f) return; const r = new FileReader(); r.onload = ()=> setPhotoDataUrl(String(r.result)); r.readAsDataURL(f); }} className="hidden" />
                                <span className="w-full inline-flex items-center justify-center px-4 py-3 bg-white border rounded-xl text-sm shadow cursor-pointer text-center">Choose file</span>
                              </label>
                            </>
                          ) : (
                            <>
                              <button type="button" onClick={capturePhoto} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl text-center">Capture</button>
                              <button type="button" onClick={stopCamera} className="w-full px-4 py-3 bg-gray-200 rounded-xl text-center">Cancel</button>
                            </>
                          )}
                        </div>

                        <div className="flex-1 flex justify-center lg:justify-end">
                          {showCamera ? (
                            <Webcam
                              ref={webcamRef}
                              audio={false}
                              screenshotFormat="image/png"
                              videoConstraints={{
                                facingMode: { ideal: 'environment' }
                              }}
                              className="w-full max-w-sm h-64 lg:h-80 rounded-md object-cover"
                              onUserMediaError={(error) => {
                                console.error('Webcam error:', error)
                                alert('Unable to access camera. Please check permissions.')
                                stopCamera()
                              }}
                            />
                          ) : photoDataUrl ? (
                            <div className="w-full max-w-sm h-64 lg:h-80 rounded-md overflow-hidden shadow-lg">
                              <img src={photoDataUrl} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-full max-w-sm h-64 lg:h-80 bg-gray-100 rounded-md flex items-center justify-center text-center font-bold text-slate-600 px-4">
                              Add a clear headshot — use camera or upload an image
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4: Payment (online) or finalise */}
                {step === 4 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Payment</h3>
                    <p className="text-sm text-slate-600">You selected <strong className="text-slate-900">{packages.find(p=>p.id===selectedPackage)?.name}</strong>. Proceed to complete your payment online to receive your ticket immediately.</p>
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-slate-600">Package</div>
                          <div className="font-semibold text-slate-900">{packages.find(p=>p.id===selectedPackage)?.name}</div>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">{packages.find(p=>p.id===selectedPackage)?.price}</div>
                      </div>
                      <div className="mt-6 flex gap-3">
                        <button type="button" onClick={handleFinalise} disabled={isSubmitting || generatingTicket} className={"px-4 py-3 bg-emerald-600 text-white rounded-xl shadow cursor-pointer hover:bg-emerald-700 active:scale-95 transition transform " + (isSubmitting || generatingTicket ? 'opacity-60 cursor-not-allowed' : '')}>Pay Now</button>
                        <button type="button" onClick={()=>setStep(3)} className="px-4 py-3 rounded-xl border cursor-pointer">Back</button>
                      </div>
                    </div>
                    {ticketUrl && (
                      <div className="mt-4">
                        <h5 className="font-semibold mb-2">Your ticket</h5>
                        <img src={ticketUrl} alt="ticket" className="w-full rounded-md border" />
                        <a className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg" href={ticketUrl} download={`NPS2026-ticket-${formData.fullName||'guest'}.png`}>Download Ticket</a>
                      </div>
                    )}
                  </div>
                )}

                {/* Privacy Notice */}
                <div className="mb-8 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">
                    By submitting this form, you agree to our privacy policy and consent to receiving communications about NPS 2026. Your information will be kept confidential and used only for summit-related purposes.
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  {step > 1 && <button type="button" onClick={()=>setStep(s=>s-1)} className="px-4 py-3 rounded-md border cursor-pointer">Back</button>}
                  {step < totalSteps && <button type="button" disabled={generatingTicket || isSubmitting} onClick={async () => {
                    if(step===1){ if(!selectedPackage) return alert('Please select a package'); setStep(2); return }
                    if(step===2){ if(!paymentOption) return alert('Please choose a payment option'); setStep(3); return }
                    if(step===3){
                      // If user chose online payment, proceed to payment step; otherwise finalise and generate ticket
                      if(paymentOption === 'online'){
                        setStep(4); return
                      } else {
                        // show generating modal during finalise
                        setGeneratingTicket(true)
                        try {
                          await handleFinalise();
                        } finally {
                          setGeneratingTicket(false)
                        }
                        return
                      }
                    }
                  }} className={"ml-auto px-4 py-3 rounded-md bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700 active:scale-95 transition transform " + (generatingTicket || isSubmitting ? 'opacity-60 cursor-not-allowed' : '')}>{step===3 ? 'Register' : 'Continue'}</button>}
                  {step === totalSteps && <button type="button" onClick={handleFinalise} disabled={isSubmitting || generatingTicket} className={"ml-auto px-4 py-3 rounded-md bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700 active:scale-95 transition transform " + (isSubmitting || generatingTicket ? 'opacity-60 cursor-not-allowed' : '')}>{isSubmitting ? 'Processing...' : (paymentOption==='online' ? 'Pay & Generate Ticket' : 'Generate Ticket')}</button>}
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
