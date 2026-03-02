"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookieConsent")
        if (!consent) {
            // Small delay so it doesn't pop up instantly on initial load
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted")
        setIsVisible(false)
        // Here you would typically initialize Analytics if they require cookies
    }

    const handleRefuse = () => {
        localStorage.setItem("cookieConsent", "refused")
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border/40 bg-background/80 p-4 backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md sm:rounded-2xl sm:border"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-foreground">
                                Politique de Cookies 🍪
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Nous utilisons des cookies essentiels pour le fonctionnement du site. Les cookies analytiques (optionnels) nous aident à améliorer votre expérience.
                            </p>
                        </div>
                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                onClick={handleRefuse}
                                className="rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                Refuser
                            </button>
                            <button
                                onClick={handleAccept}
                                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(80,130,255,0.4)]"
                            >
                                Accepter
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
