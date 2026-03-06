// test-mail.mjs
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'YOUR_GMAIL@gmail.com',
    pass: 'YOUR16CHARPASSWORD',  // no spaces!
  },
})

const info = await transporter.sendMail({
  from: 'YOUR_GMAIL@gmail.com',
  to: 'YOUR_GMAIL@gmail.com',
  subject: 'Test',
  text: 'It works!',
})

console.log('Sent:', info.messageId)