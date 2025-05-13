// components/DragCanvas.tsx
'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

type MediaItem = {
    src: string
    alt?: string
    initial: { x: number; y: number }
}

interface DragCanvasProps {
    images?: MediaItem[]
    width?: string
    height?: string
}

export default function DragCanvas({
                                       images = [],
                                       width = '100%',
                                       height = '100%',
                                   }: DragCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src)

    return (
        <div
            ref={containerRef}
            onDragStart={e => e.preventDefault()}              // disable native drag ghost
            className="
        relative
        w-full
        h-64        md:h-full    /* 16rem tall on mobile, full screen on md+ */
        overflow-hidden
        border-2 border-gray-300 bg-gray-50
        mb-8
      "
            style={{ width, /* height overridden by Tailwind above */ }}
        >
            {images.map(({ src, alt, initial }, i) => {
                const commonProps = {
                    drag: true,
                    dragConstraints: containerRef,
                    initial: { x: initial.x, y: initial.y },
                    dragElastic: 0.2,                                 // a little bounce on touch
                    whileTap: { scale: 0.95 },                       // tap feedback
                    draggable: false as const,                       // no HTML5 ghost
                    style: {
                        touchAction: 'none' as const,                  // let Framer handle touch
                        willChange: 'transform' as const,
                    },
                    className: `
            absolute
            w-1/4  /* half width on mobile, quarter on sm+ */
            h-auto
            cursor-grab active:cursor-grabbing
          `,
                }

                return isVideo(src) ? (
                    <motion.video
                        key={i}
                        {...commonProps}
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <motion.img
                        key={i}
                        {...commonProps}
                        src={src}
                        alt={alt ?? ''}
                    />
                )
            })}
        </div>
    )
}
