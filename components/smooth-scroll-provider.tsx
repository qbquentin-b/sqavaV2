"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function smoothScrollTo(targetElementId: string, duration: number = 1500) {
    const target = document.getElementById(targetElementId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // easeInOutQuart for a very smooth, slow start and end
        const ease = progress < 0.5
            ? 8 * progress * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

export function SmoothScrollProvider() {
    const pathname = usePathname()

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const anchor = target.closest('a')

            if (!anchor) return

            const href = anchor.getAttribute('href')
            if (!href || !href.startsWith('/#')) return

            const targetPath = href.split('#')[0]
            if (pathname === targetPath || (pathname === '/' && targetPath === '')) {
                const targetId = href.split('#')[1]
                if (targetId && document.getElementById(targetId)) {
                    e.preventDefault()
                    window.history.pushState(null, '', href)
                    // Adjust duration down from 1500 to 1200 for a good balance of majestic/slow but not boring
                    smoothScrollTo(targetId, 1200)
                }
            }
        }

        // Capture phase to ensure we intercept before Next.js Link handles it
        document.addEventListener('click', handleClick, { capture: true })
        return () => document.removeEventListener('click', handleClick, { capture: true })
    }, [pathname])

    return null
}
