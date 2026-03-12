import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
if (!resendApiKey) {
  // Fail fast in server logs if API key missing
  console.warn('RESEND_API_KEY is not set in environment')
}

const resend = new Resend(resendApiKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email } = body

    if (!email) {
      return NextResponse.json({ success: false, error: 'email is required' }, { status: 400 })
    }

    const from = 'onboarding@resend.dev'
    const subject = 'Welcome to the National Pre-Retirement Summit'
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #111827;">
        <h1 style="color:#064e3b">Welcome ${name || ''}!</h1>
        <p>Thank you for registering for the National Pre-Retirement Summit.</p>
        <p>We are excited to have you join us. More information will be shared soon.</p>
      </div>
    `

    const response = await resend.emails.send({
      from,
      to: email,
      subject,
      html,
    })

    return NextResponse.json({ success: true, data: response }, { status: 200 })
  } catch (err: any) {
    console.error('send-welcome error', err)
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 })
  }
}
