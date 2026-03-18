import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface CarouselSlide {
    src: string
    alt: string
    label: string
}

interface ImageCarouselProps {
    slides: CarouselSlide[]
    className?: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides, className = '' }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollTo = useCallback((index: number) => {
        const container = scrollRef.current
        if (!container) return
        const child = container.children[index] as HTMLElement
        if (!child) return
        container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
    }, [])

    const goTo = useCallback((index: number) => {
        const clamped = Math.max(0, Math.min(index, slides.length - 1))
        setActiveIndex(clamped)
        scrollTo(clamped)
    }, [slides.length, scrollTo])

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        const handleScroll = () => {
            const children = Array.from(container.children) as HTMLElement[]
            const scrollLeft = container.scrollLeft
            const containerWidth = container.offsetWidth

            let closest = 0
            let minDist = Infinity
            children.forEach((child, i) => {
                const dist = Math.abs(child.offsetLeft - scrollLeft - (containerWidth - child.offsetWidth) / 2)
                if (dist < minDist) {
                    minDist = dist
                    closest = i
                }
            })
            setActiveIndex(closest)
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={className}>
            <div className="relative group">
                {/* Slides */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
                >
                    {slides.map((slide) => (
                        <div key={slide.src} className="flex-shrink-0 w-full snap-center">
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/* Label + dots */}
            <div className="flex items-center justify-between mt-3">
                <p className="text-[12px] text-[#999] font-mono">{slides[activeIndex]?.label}</p>
                <div className="flex gap-1.5">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? 'bg-[#575757]' : 'bg-[#575757]/30'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel
