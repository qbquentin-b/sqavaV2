import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as z from 'zod'

const contactSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10).max(1000),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { firstName, lastName, email, message } = contactSchema.parse(body)

        // Using a fallback if API key is not yet set by the user
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is not set. Simulating successful email send.")
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            return NextResponse.json({ message: "Email send simulated successfully" })
        }

        const resend = new Resend(process.env.RESEND_API_KEY)

        const data = await resend.emails.send({
            from: 'Contact Sqava <onboarding@resend.dev>', // Use a verified domain in production
            to: ['votre-email@exemple.com'], // Replace with the client's actual email
            subject: `Nouveau message de ${firstName} ${lastName} via Sqava`,
            replyTo: email,
            text: `
        Nouveau message reçu depuis le formulaire de contact Sqava :
        
        Nom : ${firstName} ${lastName}
        Email : ${email}
        
        Message :
        ${message}
      `,
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error sending email:', error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
}
