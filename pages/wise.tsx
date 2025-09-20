// pages/wise.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import GridContainer from '@/components/GridContainer'
import ProfileNav from '@/components/home/ProfileNav'
import Link from 'next/link'

export default function Wise() {
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

    return (
        <GridContainer className="grid grid-cols-1 md:grid-cols-12 md:h-screen md:overflow-hidden gap-4">
            <div className="flex flex-col h-full col-span-1 md:col-span-2 md:sticky md:top-0 mt-4 bg-white">
                <Link href="/">
                    <p>Alex Luowan</p>
                </Link>
                <p className="mt-4">
                    Wise UI design project.
                </p>
                <div className="mt-auto">
                    <ProfileNav />
                </div>
            </div>
            <div
                ref={mainRef}
                className="col-span-1 md:col-span-10 md:col-start-4 overflow-hidden mt-4 relative pb-4"
            >
                <div className="flex flex-col gap-4">
                    <h1>Wise Project</h1>
                    <p>This is a placeholder for the Wise project page.</p>
                </div>
            </div>
        </GridContainer>
    )
}
