// components/BouncingMedia.tsx
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface MediaItem {
    src: string
    type: 'image' | 'video'
    alt?: string
}

interface BouncingMediaProps {
    items: MediaItem[]
    mediaWidth?: number
    mediaHeight?: number
    mobileMediaWidth?: number
    mobileMediaHeight?: number
    speed?: number
}

export default function BouncingMedia({
    items,
    mediaWidth = 360,
    mediaHeight = 270,
    mobileMediaWidth = 200,
    mobileMediaHeight = 150,
    speed = 1.5,
}: BouncingMediaProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => {
            const touch = 'ontouchstart' in window && navigator.maxTouchPoints > 0
            const coarse = window.matchMedia('(pointer: coarse)').matches
            setIsMobile(touch || coarse)
        }
        check()
    }, [])

    const activeWidth = isMobile ? mobileMediaWidth : mediaWidth
    const activeHeight = isMobile ? mobileMediaHeight : mediaHeight
    const containerRef = useRef<HTMLDivElement>(null)
    const posRef = useRef({ x: 50, y: 50 })
    const velRef = useRef({ dx: speed, dy: speed })
    const frameRef = useRef<number>(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [position, setPosition] = useState({ x: 50, y: 50 })

    const animate = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const cw = container.clientWidth
        const ch = container.clientHeight

        if (cw === 0 || ch === 0) {
            frameRef.current = requestAnimationFrame(animate)
            return
        }

        const pos = posRef.current
        const vel = velRef.current

        let nextX = pos.x + vel.dx
        let nextY = pos.y + vel.dy
        let bounced = false

        // Bounce off right/left edges
        if (nextX + activeWidth > cw) {
            nextX = cw - activeWidth
            vel.dx = -Math.abs(vel.dx)
            bounced = true
        } else if (nextX < 0) {
            nextX = 0
            vel.dx = Math.abs(vel.dx)
            bounced = true
        }

        // Bounce off bottom/top edges
        if (nextY + activeHeight > ch) {
            nextY = ch - activeHeight
            vel.dy = -Math.abs(vel.dy)
            bounced = true
        } else if (nextY < 0) {
            nextY = 0
            vel.dy = Math.abs(vel.dy)
            bounced = true
        }

        pos.x = nextX
        pos.y = nextY

        if (bounced) {
            setCurrentIndex(prev => (prev + 1) % items.length)
        }

        setPosition({ x: nextX, y: nextY })
        frameRef.current = requestAnimationFrame(animate)
    }, [items.length, activeWidth, activeHeight])

    useEffect(() => {
        // Randomize initial position
        const container = containerRef.current
        if (container) {
            const cw = container.clientWidth
            const ch = container.clientHeight
            if (cw > activeWidth && ch > activeHeight) {
                posRef.current.x = Math.random() * (cw - activeWidth)
                posRef.current.y = Math.random() * (ch - activeHeight)
            }
        }

        // Randomize initial direction
        velRef.current.dx = speed * (Math.random() > 0.5 ? 1 : -1)
        velRef.current.dy = speed * (Math.random() > 0.5 ? 1 : -1)

        // Add slight angle variation so it doesn't loop the same path
        velRef.current.dx *= 0.8 + Math.random() * 0.4
        velRef.current.dy *= 0.8 + Math.random() * 0.4

        frameRef.current = requestAnimationFrame(animate)

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
        }
    }, [animate, speed, activeWidth, activeHeight])

    const current = items[currentIndex]

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            <div
                className="absolute overflow-hidden"
                style={{
                    width: activeWidth,
                    height: activeHeight,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    willChange: 'transform',
                }}
            >
                {current.type === 'video' ? (
                    <video
                        key={current.src}
                        src={current.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Image
                        key={current.src}
                        src={current.src}
                        alt={current.alt || ''}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="360px"
                    />
                )}
            </div>
        </div>
    )
}
