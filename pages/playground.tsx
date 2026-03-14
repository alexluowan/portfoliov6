// pages/playground.tsx
'use client'

import {useEffect, useRef, useState, useCallback} from 'react'
import Lenis from '@studio-freight/lenis'
import Link from 'next/link'
import Image from 'next/image'

interface PlaygroundItemBase {
    title: string
    category: string
    color: string
}

interface ImageItem extends PlaygroundItemBase {
    type: 'image'
    imageSrc: string
}

interface CarouselItem extends PlaygroundItemBase {
    type: 'carousel'
    videos: string[]
}

interface PlaceholderItem extends PlaygroundItemBase {
    type: 'placeholder'
}

type PlaygroundItem = ImageItem | CarouselItem | PlaceholderItem

const items: PlaygroundItem[] = [
    {
        type: 'image',
        title: 'Give Me Yesterday',
        category: 'Poster',
        color: '#E8E8E8',
        imageSrc: '/playground/Givemeyesteday/Poster/givemeyesterdayposter.jpg',
    },
    {
        type: 'carousel',
        title: 'Give Me Yesterday',
        category: 'Microsite',
        color: '#E0E0E0',
        videos: [
            '/playground/Givemeyesteday/Microsite/homepage.webm',
            '/playground/Givemeyesteday/Microsite/CursorTransition.webm',
            '/playground/Givemeyesteday/Microsite/horizontalscroll.webm',
            '/playground/Givemeyesteday/Microsite/playfulzoom.webm',
        ],
    },
    {type: 'placeholder', title: 'Coming soon', category: 'Code Experiment', color: '#D8D8D8'},
    {type: 'placeholder', title: 'Coming soon', category: 'Poster', color: '#E4E4E4'},
    {type: 'placeholder', title: 'Coming soon', category: 'Prototype', color: '#DCDCDC'},
    {type: 'placeholder', title: 'Coming soon', category: 'Graphic Design', color: '#E8E8E8'},
]

function VideoCarousel({videos, color}: { videos: string[]; color: string }) {
    const [current, setCurrent] = useState(0)

    const next = useCallback(() => {
        setCurrent(i => (i + 1) % videos.length)
    }, [videos.length])

    const prev = useCallback(() => {
        setCurrent(i => (i - 1 + videos.length) % videos.length)
    }, [videos.length])

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{backgroundColor: color}}>
            <video
                key={videos[current]}
                className="w-full h-full object-contain p-8"
                autoPlay
                playsInline
                muted
                loop
            >
                <source src={videos[current]} type="video/webm" />
            </video>

            {/* Navigation arrows */}
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white transition-colors rounded-full hover-target-small"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#575757" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white transition-colors rounded-full hover-target-small"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#575757" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {videos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-[#575757]' : 'bg-[#575757]/30'}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default function Playground() {
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mainRef.current) return
        const lenis = new Lenis({wrapper: mainRef.current, smoothWheel: true})
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex flex-col">
                <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>

                <p className="mt-4 text-[14px] leading-[18px] text-[#575757] font-[350]">
                    A collection of experiments, prototypes, posters, and other things I&apos;ve made for fun.
                </p>
            </aside>

            {/* Main content */}
            <main
                ref={mainRef}
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-4 md:pl-[24px] scrollbar-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {items.map((item, i) => (
                        <div key={i} className="group relative aspect-[4/5] overflow-hidden flex items-center justify-center" style={{backgroundColor: item.color}}>
                            {item.type === 'image' ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-8"
                                    />
                                </div>
                            ) : item.type === 'carousel' ? (
                                <VideoCarousel videos={item.videos} color={item.color} />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <span className="text-[14px] leading-[18px] text-[#575757] font-[350]">{item.title}</span>
                                    <span className="text-[11px] leading-[14px] text-[#999999] font-[350] mt-1">{item.category}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
