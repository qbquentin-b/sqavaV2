"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"
import { ShieldCheck, Leaf, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

const contactSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit faire au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    message: z.string().min(10, "Le message doit faire au moins 10 caractères").max(1000, "Le message est trop long"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    })

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            toast.success("Message envoyé avec succès !", {
                description: "Nous vous répondrons dans les plus brefs délais.",
            })
            reset()
        } catch (error) {
            toast.error("Erreur lors de l'envoi du message", {
                description: "Veuillez réessayer plus tard.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <Reveal>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-gradient">
                            Contactez nous
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Une question ? Un projet en tête ? Laissez-nous un message et nous vous répondrons dans les plus brefs délais.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-16 space-y-6 rounded-2xl border border-border/40 bg-card/30 p-8 shadow-xl backdrop-blur-md">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-foreground">
                                    Prénom
                                </label>
                                <input
                                    {...register("firstName")}
                                    type="text"
                                    id="firstName"
                                    autoComplete="given-name"
                                    className={`block w-full rounded-xl border-0 bg-background/50 px-4 py-3 text-foreground shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.firstName ? 'ring-red-500 focus:ring-red-500' : 'ring-border/50 focus:ring-primary'}`}
                                    placeholder="Jean"
                                />
                                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-foreground">
                                    Nom
                                </label>
                                <input
                                    {...register("lastName")}
                                    type="text"
                                    id="lastName"
                                    autoComplete="family-name"
                                    className={`block w-full rounded-xl border-0 bg-background/50 px-4 py-3 text-foreground shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.lastName ? 'ring-red-500 focus:ring-red-500' : 'ring-border/50 focus:ring-primary'}`}
                                    placeholder="Dupont"
                                />
                                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                autoComplete="email"
                                className={`block w-full rounded-xl border-0 bg-background/50 px-4 py-3 text-foreground shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-border/50 focus:ring-primary'}`}
                                placeholder="jean.dupont@exemple.com"
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-foreground">
                                Message
                            </label>
                            <textarea
                                {...register("message")}
                                id="message"
                                rows={4}
                                className={`block w-full rounded-xl border-0 bg-background/50 px-4 py-3 text-foreground shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.message ? 'ring-red-500 focus:ring-red-500' : 'ring-border/50 focus:ring-primary'}`}
                                placeholder="Parlez-nous de votre projet..."
                            />
                            {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-8 flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_24px_rgba(80,130,255,0.4)] hover:scale-[1.02]'}`}
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-500/80" />
                            <span>Données sécurisées</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Leaf className="h-5 w-5 text-emerald-500/80" />
                            <span>Hébergement Vert</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
