import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  message?: string
  // optional fields used by other forms (demo / registration)
  course?: string
  company?: string
}

export async function POST(req: Request) {
  let body: ContactPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()
  const phone = body.phone?.trim() || '—'
  const course = body.course?.trim()
  const company = body.company?.trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO,
  } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error('SMTP environment variables are not configured.')
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    )
  }

  const port = Number(SMTP_PORT)
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587/25 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const to = CONTACT_TO || SMTP_USER
  const from = SMTP_FROM || SMTP_USER

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    company ? `Company/College: ${company}` : null,
    course ? `Course interested in: ${course}` : null,
    '',
    'Message:',
    message,
  ].filter(Boolean)

  try {
    await transporter.sendMail({
      from: `"XpertsEdge Website" <${from}>`,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${course ? ` — ${course}` : ''}`,
      text: lines.join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.6">
          <h2 style="margin:0 0 12px">New website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          ${company ? `<p><strong>Company/College:</strong> ${escapeHtml(company)}</p>` : ''}
          ${course ? `<p><strong>Course interested in:</strong> ${escapeHtml(course)}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-line">${escapeHtml(message)}</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to send your message. Please try again later.' },
      { status: 502 }
    )
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
