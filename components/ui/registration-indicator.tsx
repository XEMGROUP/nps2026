"use client"

import { useEffect, useState } from 'react'

const messages = [
  'person just registered',
  'Another participant just registered',
  'Someone reserved a seat',
]

export function RegistrationIndicator() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 3) + 1)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c + (Math.random() > 0.6 ? 2 : 1))
      setMsgIndex((i) => (i + 1) % messages.length)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mx-auto mt-6 inline-flex items-center gap-3 bg-red-100 border border-red-200 px-4 py-2 rounded-xl shadow-sm">
      <div className="text-sm text-slate-700 font-semibold">{count}</div>
      <div className="text-sm text-slate-600">{messages[msgIndex]}</div>
    </div>
  )
}

export default RegistrationIndicator
