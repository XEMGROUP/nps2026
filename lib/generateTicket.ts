/**
 * generateTicketImage — NPS 2026 canvas ticket renderer
 *
 * Design:
 *  - Card bg: deep green → deep red diagonal gradient
 *  - Top panel: white bg, dark text, large rounded-2xl avatar
 *  - Text pushed right down to separator
 *  - Perforated dashed divider with semicircle notch cutouts
 *  - Bottom section: near-black bg, faint NPS watermark, QR, logos, tagline
 *  - Fonts: Montserrat (headings) + JetBrains Mono (labels/details)
 */
export async function generateTicketImage(data: {
  fullName: string
  packageLabel: string
  summitName?: string
  orderId?: string
  email?: string
  specialRequest?: string
  photoDataUrl?: string | null
}) {
  // ── Canvas ─────────────────────────────────────────────────────────────────
  const W = 640
  const H = 1080
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // ── Font loading (fonts already injected by next/font in layout.tsx) ──────
  try {
    await Promise.all([
      document.fonts.load('900 16px Montserrat'),
      document.fonts.load('700 16px Montserrat'),
      document.fonts.load('400 14px "JetBrains Mono"'),
      document.fonts.load('700 14px "JetBrains Mono"'),
    ])
  } catch { /* non-fatal – fallback to system sans */ }

  const MONT = (w: number, sz: number) => `${w} ${sz}px Montserrat, sans-serif`
  const MONO = (w: number, sz: number) => `${w} ${sz}px "JetBrains Mono", monospace`

  // ── Helpers ────────────────────────────────────────────────────────────────
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  // ── Page background ────────────────────────────────────────────────────────
  ctx.fillStyle = '#0a100a'
  ctx.fillRect(0, 0, W, H)

  // ── Card layout constants ──────────────────────────────────────────────────
  const PAD   = 18          // outer padding
  const cx    = PAD
  const cy    = PAD
  const cw    = W - PAD * 2
  const ch    = H - PAD * 2
  const BRAD  = 28          // card border radius

  // ── Card gradient background (deep green → deep red, diagonal) ────────────
  const grad = ctx.createLinearGradient(cx, cy, cx + cw, cy + ch)
  grad.addColorStop(0,   '#0a2a0a')   // very deep green
  grad.addColorStop(0.45,'#1a3d1a')   // mid deep green
  grad.addColorStop(0.55,'#3a0a0a')   // mid deep red
  grad.addColorStop(1,   '#2a0505')   // very deep red
  
  ctx.save()
  rr(cx, cy, cw, ch, BRAD)
  ctx.fillStyle = grad
  ctx.fill()
  ctx.restore()

  // ── Clip entire card ──────────────────────────────────────────────────────
  ctx.save()
  rr(cx, cy, cw, ch, BRAD)
  ctx.clip()

  // ══════════════════════════════════════════════════════════════════════════
  // TOP SECTION — white rounded panel
  // ══════════════════════════════════════════════════════════════════════════
  const TP  = 20     // top panel inner inset from card edge
  const tpx = cx + TP
  const tpy = cy + TP
  const tpw = cw - TP * 2
  const DIVIDER_Y = cy + 570   // where the perforated line sits

  // White panel top — from card top to the divider
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(tpx + BRAD - TP, tpy)
  ctx.lineTo(tpx + tpw - (BRAD - TP), tpy)
  ctx.quadraticCurveTo(tpx + tpw, tpy, tpx + tpw, tpy + (BRAD - TP))
  ctx.lineTo(tpx + tpw, DIVIDER_Y)
  ctx.lineTo(tpx, DIVIDER_Y)
  ctx.lineTo(tpx, tpy + (BRAD - TP))
  ctx.quadraticCurveTo(tpx, tpy, tpx + (BRAD - TP), tpy)
  ctx.closePath()
  ctx.fill()

  // ── Avatar ────────────────────────────────────────────────────────────────
  // Large rounded-2xl square avatar filling upper half of the white panel
  const PANEL_H = DIVIDER_Y - tpy 
  const AV   = Math.floor(PANEL_H / 2) - 10
  const avX  = cx + (cw - AV) / 2
  const avY  = tpy + 15
  const avR  = 32

  // Avatar border
  ctx.strokeStyle = '#d1d5db'
  ctx.lineWidth = 2
  rr(avX, avY, AV, AV, avR)
  ctx.stroke()

  if (data.photoDataUrl) {
    try {
      const avatar = await loadImg(data.photoDataUrl)
      ctx.save()
      rr(avX, avY, AV, AV, avR)
      ctx.clip()
      ctx.drawImage(avatar, avX, avY, AV, AV)
      ctx.restore()
    } catch { /* keep border visible */ }
  } else {
    // Placeholder
    ctx.fillStyle = '#f3f4f6'
    rr(avX, avY, AV, AV, avR)
    ctx.fill()
    ctx.fillStyle = '#9ca3af'
    ctx.font = MONO(400, 14)
    ctx.textAlign = 'center'
    ctx.fillText('Attendee Avatar', cx + cw / 2, avY + AV / 2 + 5)
  }

  // ── Top-section text ──────────────────────────────────────────────────────
  // Summit Pass badge pushed to the bottom of the white panel
  const BADGE_W = 280, BADGE_H = 54
  const bX = cx + (cw - BADGE_W) / 2
  const bY = DIVIDER_Y - BADGE_H - 24

  // All text is dark because white panel bg
  const TXT_CENTER = cx + cw / 2
  let ty = avY + AV + 36

  // Ticket type label
  ctx.fillStyle = '#475569'
  ctx.font = MONO(700, 12)
  ctx.textAlign = 'center'
  ctx.fillText(`TICKET TYPE: ${(data.packageLabel || 'PARTICIPANT').toUpperCase()}`, TXT_CENTER, ty)

  ty += 48

  // Attendee name — big, Montserrat Black
  ctx.fillStyle = '#111827'
  ctx.font = MONT(900, 44)
  ctx.fillText(data.fullName || 'Guest', TXT_CENTER, ty)

  ty += 38

  // Event date
  ctx.fillStyle = '#374151'
  ctx.font = MONT(700, 18)
  ctx.fillText('July 15 – 16, 2026', TXT_CENTER, ty)

  ty += 28

  // Ordered on
  ctx.fillStyle = '#6b7280'
  ctx.font = MONO(400, 12)
  ctx.fillText(`Ordered on: ${new Date().toLocaleString()}`, TXT_CENTER, ty)

  // Summit Pass badge — emerald pill, still on white bg
  ctx.fillStyle = '#059669'
  rr(bX, bY, BADGE_W, BADGE_H, 12)
  ctx.fill()

  ctx.strokeStyle = '#34d399'
  ctx.lineWidth = 1
  rr(bX, bY, BADGE_W, BADGE_H, 12)
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = MONT(900, 18)
  ctx.fillText('SUMMIT PASS', TXT_CENTER, bY + BADGE_H / 2 + 6)

  // ══════════════════════════════════════════════════════════════════════════
  // PERFORATED DIVIDER
  // ══════════════════════════════════════════════════════════════════════════
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 2
  ctx.setLineDash([8, 7])
  ctx.beginPath()
  ctx.moveTo(cx + 20, DIVIDER_Y)
  ctx.lineTo(cx + cw - 20, DIVIDER_Y)
  ctx.stroke()
  ctx.setLineDash([])

  // Left notch — fill with the card gradient colour (use deep green)
  const NR = 20
  ctx.fillStyle = '#0a2a0a'
  ctx.beginPath()
  ctx.arc(cx, DIVIDER_Y, NR, -Math.PI / 2, Math.PI / 2)
  ctx.fill()

  // Right notch
  ctx.fillStyle = '#2a0505'
  ctx.beginPath()
  ctx.arc(cx + cw, DIVIDER_Y, NR, Math.PI / 2, -Math.PI / 2)
  ctx.fill()

  // ══════════════════════════════════════════════════════════════════════════
  // BOTTOM SECTION — near-black on the gradient card bg
  // ══════════════════════════════════════════════════════════════════════════
  const BOT_Y  = DIVIDER_Y + 1
  const BOT_H  = cy + ch - BOT_Y

  // Dark overlay to darken the gradient below the divider
  ctx.fillStyle = 'rgba(5,5,5,0.72)'
  ctx.fillRect(cx, BOT_Y, cw, BOT_H)

  // Faint NPS watermark
  ctx.save()
  ctx.globalAlpha = 0.04
  ctx.fillStyle = '#ffffff'
  ctx.font = MONT(900, 150) + ' italic'
  ctx.textAlign = 'center'
  ctx.fillText('NPS', cx + cw / 2, BOT_Y + 200)
  ctx.restore()

  // ── QR Code ───────────────────────────────────────────────────────────────
  const QR  = 168
  const qrX = cx + (cw - QR) / 2
  const qrY = BOT_Y + 30

  // White box with shadow
  ctx.shadowColor = 'rgba(0,0,0,0.55)'
  ctx.shadowBlur   = 22
  ctx.fillStyle = '#ffffff'
  rr(qrX - 14, qrY - 14, QR + 28, QR + 28, 14)
  ctx.fill()
  ctx.shadowBlur = 0; ctx.shadowColor = 'transparent'

  try {
    const origin = (typeof globalThis !== 'undefined' && (globalThis as any).location?.origin) || ''
    const qrImg = await loadImg(
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(origin + '/register')}`
    )
    const inset = 10
    ctx.drawImage(qrImg, qrX - 14 + inset, qrY - 14 + inset, QR + 28 - inset * 2, QR + 28 - inset * 2)
  } catch { /* leave white box */ }

  // ── Logos ─────────────────────────────────────────────────────────────────
  const LOGO_H  = 46
  const LOGO_Y  = qrY + QR + 50

  // Thin vertical separator between logos
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx + cw / 2, LOGO_Y - 6)
  ctx.lineTo(cx + cw / 2, LOGO_Y + LOGO_H + 6)
  ctx.stroke()

  try {
    const nps = await loadImg('/images/logos/optimized/npslogo.webp')
    const lw  = Math.round((nps.width / nps.height) * LOGO_H)
    ctx.save()
    ctx.globalAlpha = 0.9
    ctx.drawImage(nps, cx + cw / 4 - lw / 2, LOGO_Y, lw, LOGO_H)
    ctx.restore()
  } catch {
    ctx.fillStyle = '#94a3b8'; ctx.font = MONO(400, 10); ctx.textAlign = 'center'
    ctx.fillText('NPS LOGO', cx + cw / 4, LOGO_Y + LOGO_H / 2 + 4)
  }

  try {
    const xem = await loadImg('/images/logos/optimized/XEM Consultants Ltd Logo w.webp')
    const rw  = Math.round((xem.width / xem.height) * LOGO_H)
    ctx.save()
    ctx.globalAlpha = 0.9
    ctx.drawImage(xem, cx + (cw * 3) / 4 - rw / 2, LOGO_Y, rw, LOGO_H)
    ctx.restore()
  } catch {
    ctx.fillStyle = '#94a3b8'; ctx.font = MONO(400, 10); ctx.textAlign = 'center'
    ctx.fillText('XEM LOGO', cx + (cw * 3) / 4, LOGO_Y + LOGO_H / 2 + 4)
  }

  // ── Bottom tagline ─────────────────────────────────────────────────────────
  const TAG_Y = LOGO_Y + LOGO_H + 54

  ctx.textAlign = 'center'
  ctx.fillStyle = '#f1f5f9'
  ctx.font = MONT(900, 30)
  ctx.fillText('NPS 2026', cx + cw / 2, TAG_Y)

  ctx.fillStyle = '#cbd5e1'
  ctx.font = MONT(700, 18)
  ctx.fillText('Own Your Retirement', cx + cw / 2, TAG_Y + 28)

  // ── Card border ────────────────────────────────────────────────────────────
  ctx.restore()  // end card clip
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'
  ctx.lineWidth = 1
  rr(cx, cy, cw, ch, BRAD)
  ctx.stroke()

  return canvas.toDataURL('image/png')
}

export default generateTicketImage
