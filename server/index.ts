import 'dotenv/config'  // ← add this as the FIRST line
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'

const app = express()
const PORT = process.env.PORT || 3001
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',  // free default sender
      to: process.env.TO_EMAIL!,                  // your email
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

    res.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`)
})