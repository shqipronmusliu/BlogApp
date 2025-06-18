import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' })
   }

   const { name, email, message } = req.body

   if (!name || !email || !message) {
      return res.status(400).json({ message: 'Të dhëna të paplota.' })
   }

   const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: "5ce4b994b70c25",
         pass: "addc157a521283"
      }
   })

   try {
      await transporter.sendMail({
         from: `"Kontakt Formular" <${process.env.SMTP_USER}>`,
         to: 'shqipronmus@gmail.com',            
         subject: `Mesazh i Ri nga ${name}`,     
         text: `Emri: ${name}
               Email: ${email}
               Mesazhi:
         ${message}
            `,
            html: `
            <h2>Mesazh i Ri nga Formulari i Kontaktit</h2>
            <p><strong>Emri:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr/>
            <p><strong>Mesazhi:</strong></p>
            <p>${message}</p>
            `,
      })
      return res.status(200).json({ message: 'Email u dërgua me sukses.' })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Gabim gjatë dërgimit të email-it.' })
   }
}
