export async function generateTicketImage(data: {
  fullName: string
  packageLabel: string
  summitName?: string
  orderId?: string
  email?: string
  specialRequest?: string
}) {
  const width = 700
  const height = 1200
  const canvas = globalThis.document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Background gradient (teal)
  const g = ctx.createLinearGradient(0, 0, 0, height)
  g.addColorStop(0, '#043434')
  g.addColorStop(1, '#012a2a')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, width, height)

  // Rounded ticket panel effect
  ctx.fillStyle = 'rgba(255,255,255,0.03)'
  const pad = 28
  ctx.fillRect(pad, pad, width - pad * 2, height - pad * 2)

  // Square image placeholder (top center)
  const imgSize = 220
  const imgX = (width - imgSize) / 2
  const imgY = 60
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  ctx.fillRect(imgX, imgY, imgSize, imgSize)
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 2
  ctx.strokeRect(imgX + 4, imgY + 4, imgSize - 8, imgSize - 8)

  // Summit title
  ctx.fillStyle = '#bfe8e5'
  ctx.font = 'bold 28px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(data.summitName || 'NPS 2026', width / 2, imgY + imgSize + 40)

  // Details block (centered)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#e7f7f6'
  ctx.font = '16px sans-serif'
  const left = 60
  let y = imgY + imgSize + 80

  ctx.fillText('Date: March 20, 2025 — 7:00 PM', left, y)
  y += 28
  ctx.fillText('Location: Lagos, Nigeria', left, y)
  y += 28
  ctx.fillText('Ticket Type: ' + (data.packageLabel || 'REGULAR ACCESS'), left, y)
  y += 28
  ctx.fillText('Ordered on: ' + new Date().toLocaleString(), left, y)
  y += 28
  ctx.fillText('Ordered by: ' + (data.email || 'unknown'), left, y)
  y += 28
  if (data.specialRequest) {
    ctx.fillText('Special Request: ' + data.specialRequest, left, y)
    y += 28
  }

  // Barcode panel
  const panelY = y + 18
  const panelH = 220
  ctx.fillStyle = '#3b6b86'
  ctx.fillRect(left, panelY, width - left * 2, panelH)

  // Draw barcode-like bars
  const code = (data.orderId || String(Date.now())) + (data.email || '')
  const startX = left + 16
  const startY = panelY + 24
  const barHeight = 120
  let x = startX
  for (let i = 0; i < 80; i++) {
    const w = 4 + (i % 3 === 0 ? 2 : 0)
    ctx.fillStyle = (i % 2 === 0) ? '#071018' : '#ffffff'
    ctx.fillRect(x, startY, w, barHeight)
    x += w + 2
  }

  // Email below barcode
  ctx.fillStyle = '#071018'
  ctx.font = '18px monospace'
  ctx.textAlign = 'center'
  ctx.fillText((data.email || '').replace(/@/, '@'), width / 2, panelY + panelH - 18)

  return canvas.toDataURL('image/png')
}

export default generateTicketImage
