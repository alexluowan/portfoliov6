import { useEffect } from 'react'
import { useRouter } from 'next/router'

let isInitialized = false
let cursorCleanup: (() => void) | null = null
let cursorRefresh: (() => void) | null = null

function initCursor() {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window && navigator.maxTouchPoints > 0) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Destroy previous instance
    if (cursorCleanup) {
        cursorCleanup()
        cursorCleanup = null
        cursorRefresh = null
    }

    const { setupCursor } = require('./cursor')
    const { refershCursorTargets, cleanupCursor } = setupCursor()
    cursorCleanup = cleanupCursor
    cursorRefresh = refershCursorTargets
    isInitialized = true
}

export function refreshCursor() {
    if (cursorRefresh) {
        cursorRefresh()
    }
}

export function useCursor() {
    const router = useRouter()

    // Initialize cursor on mount
    useEffect(() => {
        if (!isInitialized) {
            initCursor()
        }
    }, [])

    // Re-init on route changes
    useEffect(() => {
        const handleRouteChange = () => {
            // Wait for page transition animation (0.8s) + buffer
            setTimeout(() => {
                initCursor()
            }, 1000)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
}
