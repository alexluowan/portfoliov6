import { useEffect, useRef, useState } from 'react'

interface AutoplayVideoProps {
    className?: string
    videoSrcWebm?: string
    videoSrcMp4?: string
    preload?: 'none' | 'metadata' | 'auto'
    eager?: boolean
    rootMargin?: string
}

export default function AutoplayVideo({
    className,
    videoSrcWebm,
    videoSrcMp4,
    preload = 'metadata',
    eager = false,
    rootMargin = '200px',
}: AutoplayVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [shouldLoad, setShouldLoad] = useState(eager)

    useEffect(() => {
        if (eager) return
        const element = containerRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                setShouldLoad(true)
                observer.disconnect()
            },
            { rootMargin }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [eager, rootMargin])

    useEffect(() => {
        if (!shouldLoad || !videoRef.current) return
        videoRef.current.play().catch(() => {})
    }, [shouldLoad])

    return (
        <div ref={containerRef} className={className}>
            {shouldLoad ? (
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls={false}
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload={preload}
                >
                    {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
                    {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="h-full w-full bg-[#F5F5F5]" />
            )}
        </div>
    )
}
