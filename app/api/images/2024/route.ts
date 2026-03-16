import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', '2024')
    const files = fs.readdirSync(imagesDir)
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/images/2024/${file}`)
    return NextResponse.json(imageFiles)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}