import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
const supabase = createClient(supabaseUrl!, supabaseKey!)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.fullName || !body.email) {
      return NextResponse.json({ error: 'fullName and email are required' }, { status: 400 })
    }

    const payload = {
      title: body.title || null,
      full_name: body.fullName,
      place_of_work: body.placeOfWork || null,
      department: body.department || null,
      designation: body.designation || null,
      phone_number: body.phoneNumber || null,
      email: body.email,
      years_to_retirement: body.yearsToRetirement || null,
      retirement_policies: body.retirementPolicies || null,
      investment_advisory: body.investmentAdvisory || null,
      digital_skillset: body.digitalSkillset || null
    }

    const { data, error } = await supabase.from('registrations').insert(payload).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, record: data }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
