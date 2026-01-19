// pages/about.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

import GridContainer from '@/components/GridContainer'
import ProfileNav from '@/components/home/ProfileNav'
import Link from 'next/link'
import DragCanvas from '@/components/DragCanvas'

export default function About() {
    // Lenis scroll ref & setup
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

    // just pass your raw media list
    const mediaItems = [
        { src: '/about-images/faceprofile.jpg',     alt: 'my ugly face' },
        { src: '/about-images/flyfishing.mp4',      alt: 'out fishing' },
        { src: '/about-images/designsprintbox.mp4', alt: 'the delulu' },
    ]

    return (
        <GridContainer className="grid grid-cols-1 md:grid-cols-12 md:h-screen md:overflow-hidden gap-4">
            {/* Sidebar */}
            <div className="flex flex-col h-full col-span-1 md:col-span-2 md:sticky md:top-0 mt-4 bg-white">
                <Link href="/">
                    <p>Alex Luowan</p>
                </Link>

                <div className="flex flex-col gap-4 mt-20 lg:mt-auto">
                    <p>i was born in vancouver and grew up in surrey</p>
                    <p>i started in computer science but soon realized coding alone didn&apos;t light me up so i switched to design full time</p>
                    <p>during the day i work on personal projects that excite me, sharpening my prototyping and problem solving skills while learning front-end development to bring ideas to life</p>
                    <p>my design philosophy centres on clarity, elegance, and functional beauty crafting interfaces that feel intuitive and human</p>
                    <p>in my free time i love fishing, working out, playing guitar and capturing moments with my camera, activities that recharge my creativity</p>
                    <p>hit me up if you&apos;re down for coffee or a design jam, i&apos;m always up for meeting new people</p>
                </div>

                <div className="mt-auto">
                    <ProfileNav />
                </div>
            </div>

            {/* Main drag area */}
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
                <DragCanvas images={mediaItems} width="100%" />
            </div>
        </GridContainer>
    )
}
