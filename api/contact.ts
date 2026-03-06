import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.TO_EMAIL!,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:monospace;background:#0d0d12;color:#e8e8f0;padding:32px;border-radius:12px">
          <h2 style="color:#9d5cff">New Portfolio Contact</h2>
          <p><b style="color:#9d5cff">Name:</b> ${name}</p>
          <p><b style="color:#9d5cff">Email:</b> ${email}</p>
          <p><b style="color:#9d5cff">Message:</b></p>
          <div style="background:#1a1a24;padding:16px;border-left:3px solid #9d5cff;border-radius:4px">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    })
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}