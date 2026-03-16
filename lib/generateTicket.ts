export async function generateTicketImage(data: {
  fullName: string
  packageLabel: string
  summitName?: string
  orderId?: string
  email?: string
  specialRequest?: string
  photoDataUrl?: string | null
}) {
  const width = 700
  const height = 1200
  const canvas = globalThis.document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Dark page background
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // Ticket card container - rounded corners effect
  const cardX = 30
  const cardY = 40
  const cardWidth = width - 60
  const cardHeight = height - 80
  
  // Draw rounded rect for ticket card
  ctx.fillStyle = '#111827'
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 24)
  ctx.fill()

  // TOP SECTION - solid (no gradient) as per design
  const topSectionHeight = 280
  const topY = cardY + 20
  ctx.fillStyle = '#111827'
  roundRect(ctx, cardX + 15, topY, cardWidth - 30, topSectionHeight, 12)
  ctx.fill()

  // Top section content (white text on gradient)
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.font = 'bold 14px sans-serif'
  ctx.fillText(`TICKET TYPE: ${(data.packageLabel || 'PARTICIPANT').toUpperCase()}`, width / 2, topY + 35)

  // Attendee name (large)
  ctx.font = 'bold 36px sans-serif'
  ctx.fillText(data.fullName, width / 2, topY + 110)

  // Date and order info
  ctx.font = '15px sans-serif'
  // Event date should be fixed to July 15 - 16, 2026
  const eventDateText = 'July 15 - 16, 2026'
  ctx.fillText(eventDateText, width / 2, topY + 145)
  ctx.font = '12px sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.fillText(`Ordered on: ${new Date().toLocaleString()}`, width / 2, topY + 170)

  // Badge / button
  ctx.fillStyle = '#10b981'
  roundRect(ctx, width / 2 - 70, topY + 200, 140, 40, 8)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 12px sans-serif'
  ctx.fillText('SUMMIT PASS', width / 2, topY + 228)

  // DIVIDER LINE (dashed effect)
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.setLineDash([8, 8])
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(cardX + 20, topY + topSectionHeight + 20)
  ctx.lineTo(width - cardX - 20, topY + topSectionHeight + 20)
  ctx.stroke()
  ctx.setLineDash([])

  // BOTTOM SECTION - QR Code area and logos
  const bottomY = topY + topSectionHeight + 50
  const bottomSectionHeight = cardHeight - topSectionHeight - 70

  // QR Code area - draw white rounded box and embed real QR image for the registration link
  const qrSize = 180
  const qrX = (width - qrSize) / 2
  const qrY = bottomY + 10
  ctx.fillStyle = '#ffffff'
  roundRect(ctx, qrX, qrY, qrSize, qrSize, 12)
  ctx.fill()

  // Draw actual QR image using public QR API pointing to the registration page
  try {
    const origin = (typeof globalThis !== 'undefined' && (globalThis as any).location && (globalThis as any).location.origin) || ''
    const registerUrl = origin + '/register'
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(registerUrl)}`
    const qrImg = await loadImage(qrSrc)
    // inset the qrImg slightly
    const inset = 12
    ctx.drawImage(qrImg, qrX + inset, qrY + inset, qrSize - inset * 2, qrSize - inset * 2)
  } catch (e) {
    // fallback to simple pattern
    ctx.fillStyle = '#000'
    ctx.fillRect(qrX + 20, qrY + 20, qrSize - 40, qrSize - 40)
  }

  // Logo section - draw real logos if available
  const logoY = qrY + qrSize + 30
  try {
    const leftLogo = await loadImage('/images/logos/optimized/NPSlogoWhite.webp')
    const rightLogo = await loadImage('/images/logos/optimized/XEM Consultants Ltd Logo w.webp')

    const leftW = 120
    const leftH = Math.round((leftLogo.height / leftLogo.width) * leftW)
    const rightW = 140
    const rightH = Math.round((rightLogo.height / rightLogo.width) * rightW)

    ctx.drawImage(leftLogo, width / 4 - leftW / 2 - 10, logoY, leftW, leftH)
    ctx.drawImage(rightLogo, (width * 3) / 4 - rightW / 2 + 10, logoY, rightW, rightH)
  } catch (e) {
    // fallback to text labels if logos fail to load
    ctx.fillStyle = '#d1d5db'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('THE NATIONAL PRE-RETIREMENT SUMMIT', width / 4 - 20, logoY + 10)
    ctx.fillText('XEM GLOBAL', width * 3 / 4 + 20, logoY + 10)
  }

  // Event name at bottom
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('NPS 2026', width / 2, bottomY + bottomSectionHeight - 35)

  ctx.fillStyle = '#9ca3af'
  ctx.font = '12px sans-serif'
  ctx.fillText('Own Your retirement', width / 2, bottomY + bottomSectionHeight - 10)

  // If a photo is provided, draw it as avatar at top center
  if (data.photoDataUrl) {
    try {
      const avatar = await loadImage(data.photoDataUrl)
      const pw = 140
      const ph = 140
      const px = width / 2 - pw / 2
      const py = topY - 70
      // circular clip
      ctx.save()
      ctx.beginPath()
      ctx.arc(px + pw / 2, py + ph / 2, pw / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(avatar, px, py, pw, ph)
      ctx.restore()
    } catch (e) {
      // ignore avatar errors
    }
  }

  return canvas.toDataURL('image/png')
}

// Helper to load images in the browser
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    // If src is a data URL, assign directly; otherwise ensure proper encoding
    img.src = src
  })
}

// Helper function to draw rounded rectangles
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export default generateTicketImage
