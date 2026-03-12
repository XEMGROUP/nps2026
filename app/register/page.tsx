"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageBanner } from "@/components/ui/page-banner"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, User, Building2, Phone, Mail, Clock, Briefcase, Lightbulb, Shield } from "lucide-react"

const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Engr.", "Chief", "Alhaji", "Hajiya"]

const yearsToRetirementOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "More than 10 years",
  "Already retired"
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
    phoneNumber: "",
    email: "",
    yearsToRetirement: "",
    retirementPolicies: "",
    investmentAdvisory: "",
    digitalSkillset: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await res.json()

      if (!res.ok) {
        setIsSubmitting(false)
        alert(result?.error || 'Registration failed')
        return
      }

      // After successful registration, trigger welcome email via server route.
      try {
        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.fullName, email: formData.email })
        })
      } catch (emailErr) {
        // Log but don't block the flow for the user
        console.error('Failed to send welcome email', emailErr)
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      setIsSubmitting(false)
      alert('Submission failed. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-[88px]">
          <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg mx-auto px-4"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h1>
              <p className="text-slate-600 mb-8">
                Thank you for registering for NPS 2026. You will receive a confirmation email shortly with further details about the summit.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Return to Homepage
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[88px]">
        <PageBanner
          title="Register for NPS 2026"
          subtitle="Secure your place at Nigeria's premier pre-retirement summit"
        />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
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

              {/* Registration Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg shadow-black/5 p-8"
              >
                {/* Personal Information */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                        Title *
                      </label>
                      <select
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      >
                        <option value="">Select title</option>
                        {titleOptions.map(title => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name (as it should appear on certificate) *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                          placeholder="+234 XXX XXX XXXX"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Information */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Work Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="placeOfWork" className="block text-sm font-semibold text-slate-700 mb-2">
                        Place of Work *
                      </label>
                      <input
                        type="text"
                        id="placeOfWork"
                        name="placeOfWork"
                        value={formData.placeOfWork}
                        onChange={handleChange}
                        required
                        placeholder="Enter your organization/company name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        placeholder="Enter your department"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="designation" className="block text-sm font-semibold text-slate-700 mb-2">
                        Designation/Job Title *
                      </label>
                      <div className="relative">
                        <Briefcase className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          required
                          placeholder="Enter your job title"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retirement Information */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-slate-700" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Retirement Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="yearsToRetirement" className="block text-sm font-semibold text-slate-700 mb-2">
                        How many years to retirement? *
                      </label>
                      <select
                        id="yearsToRetirement"
                        name="yearsToRetirement"
                        value={formData.yearsToRetirement}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      >
                        <option value="">Select an option</option>
                        {yearsToRetirementOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="retirementPolicies" className="block text-sm font-semibold text-slate-700 mb-2">
                        Do you have any retirement policies? (Optional)
                      </label>
                      <textarea
                        id="retirementPolicies"
                        name="retirementPolicies"
                        value={formData.retirementPolicies}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe any existing retirement policies, pension plans, or savings arrangements you have..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Additional Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="investmentAdvisory" className="block text-sm font-semibold text-slate-700 mb-2">
                        Are you interested in investment advisory? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="investmentAdvisory"
                            value="yes"
                            checked={formData.investmentAdvisory === "yes"}
                            onChange={handleChange}
                            required
                            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="investmentAdvisory"
                            value="no"
                            checked={formData.investmentAdvisory === "no"}
                            onChange={handleChange}
                            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="investmentAdvisory"
                            value="maybe"
                            checked={formData.investmentAdvisory === "maybe"}
                            onChange={handleChange}
                            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-slate-700">Maybe</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="digitalSkillset" className="block text-sm font-semibold text-slate-700 mb-2">
                        What digital skills do you have? *
                      </label>
                      <select
                        id="digitalSkillset"
                        name="digitalSkillset"
                        value={formData.digitalSkillset}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      >
                        <option value="">Select your skill level</option>
                        {digitalSkillsetOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="mb-8 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">
                    By submitting this form, you agree to our privacy policy and consent to receiving communications about NPS 2026. Your information will be kept confidential and used only for summit-related purposes.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Registration...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
