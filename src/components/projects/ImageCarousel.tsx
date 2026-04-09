import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface CarouselSlide {
    src: string
    alt: string
    label: string
    unoptimized?: boolean
    sizes?: string
}

interface ImageCarouselProps {
    slides: CarouselSlide[]
    className?: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides, className = '' }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false })
    const handleImageLoad = useCallback(() => {
        window.dispatchEvent(new Event('resize'))
    }, [])

    const scrollTo = useCallback((index: number) => {
        const container = scrollRef.current
        if (!container) return
        const child = container.children[index] as HTMLElement
        if (!child) return
        container.scrollTo({ left: child.offsetLeft - container.offsetLeft, behavior: 'smooth' })
    }, [])

    const goTo = useCallback((index: number) => {
        const clamped = Math.max(0, Math.min(index, slides.length - 1))
        setActiveIndex(clamped)
        scrollTo(clamped)
    }, [slides.length, scrollTo])

    const goPrev = useCallback(() => {
        goTo(activeIndex - 1)
    }, [activeIndex, goTo])

    const goNext = useCallback(() => {
        goTo(activeIndex + 1)
    }, [activeIndex, goTo])

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return
        container.scrollLeft = 0
    }, [])

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        const handleScroll = () => {
            const children = Array.from(container.children) as HTMLElement[]
            const scrollLeft = container.scrollLeft

            let closest = 0
            let minDist = Infinity
            children.forEach((child, i) => {
                const dist = Math.abs(child.offsetLeft - scrollLeft)
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

    const settleToNearest = useCallback(() => {
        const container = scrollRef.current
        if (!container) return
        const children = Array.from(container.children) as HTMLElement[]
        const scrollLeft = container.scrollLeft
        let closest = 0
        let minDist = Infinity
        children.forEach((child, i) => {
            const dist = Math.abs(child.offsetLeft - scrollLeft)
            if (dist < minDist) {
                minDist = dist
                closest = i
            }
        })
        const target = children[closest]
        if (target) {
            container.scrollTo({ left: target.offsetLeft - container.offsetLeft, behavior: 'smooth' })
        }
    }, [])

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        const container = scrollRef.current
        if (!container) return
        setIsDragging(true)
        dragState.current = { startX: e.pageX, scrollLeft: container.scrollLeft, moved: false }
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return
        const container = scrollRef.current
        if (!container) return
        e.preventDefault()
        const dx = e.pageX - dragState.current.startX
        if (Math.abs(dx) > 3) dragState.current.moved = true
        container.scrollLeft = dragState.current.scrollLeft - dx
    }, [isDragging])

    const handleMouseUp = useCallback(() => {
        if (!isDragging) return
        setIsDragging(false)
        settleToNearest()
    }, [isDragging, settleToNearest])

    useEffect(() => {
        if (isDragging) {
            const handleUp = () => {
                setIsDragging(false)
                settleToNearest()
            }
            window.addEventListener('mouseup', handleUp)
            return () => window.removeEventListener('mouseup', handleUp)
        }
    }, [isDragging, settleToNearest])

    return (
        <div className={className}>
            <div className="relative group">
                <button
                    type="button"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white/90 text-[#171717] opacity-0 transition-opacity duration-200 group-hover:opacity-100 disabled:opacity-0 md:flex"
                    aria-label="Previous slide"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={goNext}
                    disabled={activeIndex === slides.length - 1}
                    className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white/90 text-[#171717] opacity-0 transition-opacity duration-200 group-hover:opacity-100 disabled:opacity-0 md:flex"
                    aria-label="Next slide"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>

                {/* Slides */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hidden select-none"
                    style={{ cursor: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {slides.map((slide) => (
                        <div key={slide.src} className="flex-shrink-0 w-full ">
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                width={0}
                                height={0}
                                sizes={slide.sizes || '(max-width: 768px) calc(100vw - 2rem), 768px'}
                                unoptimized={slide.unoptimized}
                                className="w-full h-auto pointer-events-none"
                                draggable={false}
                                onLoad={handleImageLoad}
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
