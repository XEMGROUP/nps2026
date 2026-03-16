"use client"

import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import generateTicketImage from '@/lib/generateTicket'

type FormState = {
  fullName: string
  phoneNumber?: string
  email?: string
  package?: string
  paymentOption?: 'online' | 'later'
  additional?: string
  photoDataUrl?: string | null
}

const packages = [
  { id: 'sponsored', label: 'Sponsored Participants — ₦249,900' },
  { id: 'military', label: 'Military & Paramilitary Participants — ₦239,900' },
  { id: 'disabled', label: 'Disabled Participants — ₦229,900' },
  { id: 'retired', label: 'Retired Participants — ₦229,900' },
]

export function RegisterModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState<FormState>({ fullName: '', email: '', phoneNumber: '', package: undefined, paymentOption: undefined, additional: '', photoDataUrl: null })
  const [ticketUrl, setTicketUrl] = useState<string | null>(null)

  const totalSteps = 4

  const next = () => setStep((s) => Math.min(totalSteps, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handlePackageSelect = (id: string) => setForm(f => ({ ...f, package: id }))

  const handlePayment = (option: 'online' | 'later') => setForm(f => ({ ...f, paymentOption: option }))

  const handleFile = async (file?: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, photoDataUrl: String(reader.result) }))
    reader.readAsDataURL(file)
  }

  const generateAndSetTicket = async (orderId?: string) => {
    const dataUrl = await generateTicketImage({ fullName: form.fullName || 'Guest', packageLabel: packages.find(p=>p.id===form.package)?.label||'Participant', summitName: 'NPS 2026', orderId, photoDataUrl: form.photoDataUrl || null })
    setTicketUrl(dataUrl)
  }

  const handleFinish = async () => {
    if (!form.package) return alert('Please select a package')
    setBusy(true)

    try {
      if (form.paymentOption === 'online') {
        // Call checkout route (simulated)
        const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ form }) })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Payment failed')
        await generateAndSetTicket(json.orderId)
        // In a real flow, you'd redirect to a gateway. Here we simulate success and show ticket.
      } else {
        // Pay later: generate ticket immediately
        await generateAndSetTicket('ON-SITE-' + Date.now())
      }
      setStep(totalSteps)
    } catch (err: any) {
      alert(err?.message || 'An error occurred')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o)=>{ setOpen(o); if(!o){ setStep(1); setTicketUrl(null); } }}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold">Register Now</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for NPS 2026</DialogTitle>
          <div className="mt-2 w-full">
            <Progress value={Math.round((step / totalSteps) * 100)} />
          </div>
        </DialogHeader>

        <div className="my-4">
          {step === 1 && (
            <div>
              <h4 className="font-semibold mb-3">Choose a package</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map(p=> (
                  <button key={p.id} onClick={()=>handlePackageSelect(p.id)} className={`p-4 text-left rounded-xl border ${form.package===p.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
                    <div className="font-semibold">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="font-semibold mb-3">Payment option</h4>
              <div className="flex gap-3">
                <button onClick={()=>handlePayment('online')} className={`px-4 py-3 rounded-xl border ${form.paymentOption==='online' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'}`}>Pay Online Now</button>
                <button onClick={()=>handlePayment('later')} className={`px-4 py-3 rounded-xl border ${form.paymentOption==='later' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'}`}>Pay Later On Site</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 className="font-semibold mb-3">Additional information</h4>
              <label className="block text-sm text-slate-700 mb-2">Full name</label>
              <input value={form.fullName} onChange={(e)=>setForm(f=>({ ...f, fullName: e.target.value }))} className="w-full mb-3 p-3 rounded-xl border" />
              <label className="block text-sm text-slate-700 mb-2">Email</label>
              <input value={form.email} onChange={(e)=>setForm(f=>({ ...f, email: e.target.value }))} className="w-full mb-3 p-3 rounded-xl border" />
              <label className="block text-sm text-slate-700 mb-2">Phone</label>
              <input value={form.phoneNumber} onChange={(e)=>setForm(f=>({ ...f, phoneNumber: e.target.value }))} className="w-full mb-3 p-3 rounded-xl border" />
              <label className="block text-sm text-slate-700 mb-2">Additional notes (optional)</label>
              <textarea value={form.additional} onChange={(e)=>setForm(f=>({ ...f, additional: e.target.value }))} className="w-full mb-3 p-3 rounded-xl border" />
            </div>
          )}

          {step === 4 && (
            <div>
              <h4 className="font-semibold mb-3">Profile photo</h4>
              <p className="text-sm text-slate-600 mb-3">You can take a photo with your camera or upload an image.</p>
              <input accept="image/*" capture="environment" type="file" onChange={(e)=>handleFile(e.target.files?.[0]||null)} />
              {form.photoDataUrl && <img src={form.photoDataUrl} className="mt-3 w-40 h-40 object-cover rounded-md" />}
              {ticketUrl && (
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">Your ticket</h5>
                  <img src={ticketUrl} alt="ticket" className="w-full rounded-md border" />
                  <a className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg" href={ticketUrl} download={`NPS2026-ticket-${form.fullName||'guest'}.png`}>Download Ticket</a>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex w-full justify-between items-center">
            <div>
              {step > 1 && <button onClick={prev} className="px-4 py-2 mr-2 rounded-md border">Back</button>}
            </div>
            <div className="flex items-center gap-2">
                  {step < totalSteps && <button disabled={busy} onClick={() => { if (step===1 && !form.package) { alert('Select a package'); return } setStep(s=>s+1) }} className={"px-4 py-2 rounded-md bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700 active:scale-95 transition transform " + (busy ? 'opacity-60 cursor-not-allowed' : '')}>Continue</button>}
                  {step === totalSteps && !ticketUrl && <button disabled={busy} onClick={async()=>{ try{ setBusy(true); await handleFinish(); } finally{ setBusy(false) } }} className={"px-4 py-2 rounded-md bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700 active:scale-95 transition transform " + (busy ? 'opacity-60 cursor-not-allowed' : '')}>{busy ? 'Processing...' : (form.paymentOption==='online' ? 'Pay & Generate Ticket' : 'Generate Ticket')}</button>}
                </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterModal
