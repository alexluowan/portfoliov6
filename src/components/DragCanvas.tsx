// components/DragCanvas.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type RawItem = { src: string; alt?: string }
type PositionedItem = RawItem & { initial: { x: number; y: number } }

interface DragCanvasProps {
    images?: RawItem[]
    width?: string
}

function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export default function DragCanvas({
                                       images = [],
                                       width = '100%',
                                   }: DragCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [items, setItems] = useState<PositionedItem[]>([])

    useEffect(() => {
        if (!containerRef.current || images.length === 0) return

        const cw = containerRef.current.clientWidth
        const ch = containerRef.current.clientHeight

        const ITEM_W = cw * 0.25   // 25% of container width
        const PADDING = 20

        // we'll keep track of each placed box's x,y,width,height
        const placed: { x: number; y: number; w: number; h: number }[] = []

        const positioned = images.map(img => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(img.src)
            const w = ITEM_W
            const h = isVideo ? ITEM_W * (9 / 16) : ITEM_W

            let x: number, y: number, collision: boolean, tries = 0
            do {
                x = randomBetween(PADDING, cw - w - PADDING)
                y = randomBetween(PADDING, ch - h - PADDING)

                collision = placed.some(box =>
                    x < box.x + box.w &&
                    x + w > box.x &&
                    y < box.y + box.h &&
                    y + h > box.y
                )

                tries++
            } while (collision && tries < 100)

            placed.push({ x, y, w, h })
            return { ...img, initial: { x, y } }
        })

        setItems(positioned)
    }, [images])

    const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src)

    return (
        <div
            ref={containerRef}
            onDragStart={e => e.preventDefault()}
            className="
        relative
        w-full
        h-64 md:h-full
        overflow-hidden
        border-2 border-gray-300 bg-gray-50
        mb-8
      "
            style={{ width }}
        >
            {items.map(({ src, alt, initial }, i) => {
                const common = {
                    drag: true as const,
                    dragConstraints: containerRef,
                    dragElastic: 0.2,
                    whileTap: { scale: 0.95 },
                    initial: { x: initial.x, y: initial.y },
                    style: { touchAction: 'none' as const, willChange: 'transform' as const },
                    className: `
            absolute
            w-1/4
            h-auto       /* let height adjust to maintain aspect ratio */
            cursor-grab active:cursor-grabbing
          `,
                }

                return isVideo(src) ? (
                    <motion.video
                        key={i}
                        {...common}
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={alt}
                    />
                ) : (
                    <motion.img
                        key={i}
                        {...common}
                        src={src}
                        alt={alt || ''}
                    />
                )
            })}
        </div>
    )
}
