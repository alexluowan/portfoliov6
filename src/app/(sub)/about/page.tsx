// app/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

import GridContainer from '@/components/GridContainer'
import ProfileNav from '@/components/home/ProfileNav'
import Link from 'next/link'
import DragCanvas from '@/components/DragCanvas'

// helper to get a random number between min (inclusive) and max (exclusive)
function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export default function Home() {
    // 1) hold our images array in state
    const [images, setImages] = useState<
        { src: string; alt: string; initial: { x: number; y: number } }[]
    >([])

    // 2) on each real page load/mount, generate fresh random positions
    useEffect(() => {
        const raw = [
            { src: '/about-images/faceprofile.jpg', alt: 'my ugly face' },
            { src: '/about-images/flyfishing.mp4', alt: 'out fishing' },
            { src: '/about-images/designsprintbox.mp4', alt: 'the delulu' },
            { src: '/about-images/Ree.mp4', alt: 'square breathing exercise' },



        ]

        const withRandom = raw.map(img => ({
            ...img,
            initial: {
                x: randomBetween(20, 300),
                y: randomBetween(20, 500),
            },
        }))

        setImages(withRandom)
    }, []) // empty deps = run only once on mount

    // 3) Lenis scroll setup (unchanged)
    const mainRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!mainRef.current) return
        const lenis = new Lenis({ wrapper: mainRef.current, smoothWheel: true })
        function raf(t: number) {
            lenis.raf(t)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    // 4) don’t render until our images state is populated
    if (images.length === 0) return null

    return (
        <GridContainer className="grid grid-cols-1 md:grid-cols-12 md:h-screen md:overflow-hidden gap-4">
            {/* Sidebar */}
            <div className="flex flex-col h-full col-span-1 md:col-span-2 md:sticky md:top-0 mt-4 bg-white">
                <Link href="/">
                    <p>Alex Luowan</p>
                </Link>

                <div className="flex flex-col gap-4 mt-auto">
                    <p>i was born in vancouver and grew up in surrey</p>
                    <p>i started in computer science but soon realized coding alone didn’t light me up so i switched to design full time</p>
                    <p>during the day i work on personal projects that excite me, sharpening my prototyping and problem solving skills while learning front-end development to bring ideas to life</p>
                    <p>my design philosophy centers on clarity, elegance, and functional beauty crafting interfaces that feel intuitive and human</p>
                    <p>in my free time i love fishing, working out, playing guitar and capturing moments with my camera, activities that recharge my creativity</p>
                    <p>hit me up if you’re down for coffee or a design jam, i’m always up for meeting new people</p>
                </div>

                <div className="mt-auto">
                    <ProfileNav />
                </div>
            </div>

            {/* Main DragCanvas + Lenis scroll container */}
            <div
                ref={mainRef}
                className="
          col-span-1
          md:col-span-10
          md:col-start-4
          overflow-hidden
          mt-4
          relative
          flex flex-col h-full
        "
            >
                <DragCanvas
                    // 5) force a fresh mount of DragCanvas whenever `images` changes
                    key={images.map(i => `${i.initial.x}-${i.initial.y}`).join('_')}
                    images={images}
                    width="100%"
                    height="100%"
                />
            </div>
        </GridContainer>
    )
}
