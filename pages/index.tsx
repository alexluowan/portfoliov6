// pages/index.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import Lenis from '@studio-freight/lenis'

import FeedCard from '@/components/projects/FeedCard'
import Link from "next/link";

export default function Home() {
    const [time, setTime] = useState('')
    const [lastVisited, setLastVisited] = useState<string | null>(null)

    useEffect(() => {
        setLastVisited(sessionStorage.getItem('lastVisitedCaseStudy'))
    }, [])

    useEffect(() => {
        const update = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }))
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mainRef.current) return

        const mq = window.matchMedia('(min-width: 1200px)')

        let lenis: Lenis | null = null
        let rafId: number | null = null

        function initLenis() {
            if (!mainRef.current) return
            lenis = new Lenis({
                wrapper: mainRef.current,
                smoothWheel: true,
            })
            function raf(time: number) {
                lenis!.raf(time)
                rafId = requestAnimationFrame(raf)
            }
            rafId = requestAnimationFrame(raf)
        }

        function destroyLenis() {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = null
            lenis?.destroy()
            lenis = null
        }

        function handleChange() {
            if (mq.matches) {
                if (!lenis) initLenis()
            } else {
                destroyLenis()
            }
        }

        handleChange()
        mq.addEventListener('change', handleChange)

        return () => {
            mq.removeEventListener('change', handleChange)
            destroyLenis()
        }
    }, [])

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[343px] md:py-4 flex flex-col">
                <p className="text-[14px] leading-[18px] text-[#575757] font-[400]">
                    Alex Luowan is a product designer with a love for playful interactions and a sharp eye for detail. He is interested in creating digital experiences that feel clear, engaging, and enjoyable for the people using them.
                </p>
                <p className="mt-4 text-[14px] leading-[18px] text-[#575757] font-[400]">
                    Currently, he&apos;s designing <a href="https://athenahq.ai/" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@AthenaHQ</a>.<br/>
                    Previously worked with, <a href="https://www.blaze.ai" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@Blaze.ai</a>, <a href="https://www.phlur.com" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@Phlur</a>, and <a href="https://www.blueberrysocial.com" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@Blueberry Social</a>
                </p>

                <div className="mt-6 flex gap-6">
                    <div className="flex flex-col gap-2 w-[75px]">
                        <span className="text-[12px] leading-[14px] text-[#999] font-[350]">Other Spaces</span>
                        <nav className="flex flex-col items-start text-[14px] leading-[18px] font-[400] text-[#171717]">
                            <Link href="/about" className="w-fit py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">About</Link>
                            <Link href="/friends" className="w-fit py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">Friends</Link>
                            <Link href="/reviews" className="w-fit py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">Reviews</Link>
                            <Link href="/playground" className="w-fit py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">Playground</Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-2 w-[93px]">
                        <span className="text-[12px] leading-[14px] text-[#999] font-[350]">Places to find me</span>
                        <nav className="flex flex-col items-start text-[14px] leading-[18px] font-[400] text-[#171717]">
                            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-fit py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">CV</a>
                            <a href="https://www.linkedin.com/in/alexluowan" target="_blank" rel="noreferrer" className="w-fit py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">LinkedIn</a>
                        </nav>
                    </div>
                </div>

                <p className="hidden md:block mt-auto pt-4 text-[12px] leading-[14px] text-[#575757] font-[350]">
                    Vancouver, BC {time}
                </p>
            </aside>

            {/* Main scroll container */}
            <main
                ref={mainRef}
                className="w-full md:overflow-y-auto overflow-hidden relative md:pl-[24px] scrollbar-hidden"
            >
                <div className="feed-grid flex flex-col gap-8 md:flex-row md:gap-4 pt-4 pb-16">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-8 md:w-1/2 md:gap-6">
                        <Link href="/athena" className="feed-card hover-target-big transition-opacity duration-200">
                            <FeedCard
                                mediaSrc="/project-covers/athenathumbnail.png"
                                mediaType="image"
                                aspectClass="aspect-[657/611]"
                                meta="AthenaHQ — 2026"
                                title="Modular Dashboards"
                                subtitle="Redesigning the command centre for AI search visibility."
                                justSeen={lastVisited === 'athena'}
                            />
                        </Link>
                        <Link href="/88rising" className="feed-card hover-target-big transition-opacity duration-200">
                            <FeedCard
                                mediaSrc="/project-covers/88risingthumbnail.mp4"
                                mediaType="video"
                                aspectClass="aspect-[657/366]"
                                meta="Concept — 2023"
                                title="88rising Website Redesign"
                                subtitle="A platform for fans to discover and support 88rising's artist roster."
                                justSeen={lastVisited === '88rising'}
                            />
                        </Link>
                        <div className="feed-card hover-target-big transition-opacity duration-200">
                            <FeedCard
                                mediaSrc="/project-covers/givemeyesterdaythumbnail.png"
                                mediaType="image"
                                aspectClass="aspect-[656/606]"
                                meta="Concept — 2022"
                                title="Exhibition Branding"
                                subtitle="An online preview for an exhibition, enticing visitors to experience the works."
                            />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-8 md:w-1/2 md:gap-6">
                        <Link href="/discord" className="feed-card hover-target-big transition-opacity duration-200">
                            <FeedCard
                                mediaSrc="/project-covers/discordhighlights.mp4"
                                mediaType="video"
                                aspectClass="aspect-[657/797]"
                                meta="Concept — 2026"
                                title="Discord Highlights"
                                subtitle="Surfacing what matters when you've been away from Discord."
                                justSeen={lastVisited === 'discord'}
                            />
                        </Link>
                        <Link href="/blueberry" className="feed-card hover-target-big transition-opacity duration-200">
                            <FeedCard
                                mediaSrc="/project-covers/blueberrytempthumbnail.mp4"
                                mediaType="video"
                                aspectClass="aspect-[657/709]"
                                meta="Blueberry Social — 2025"
                                title="Automating personal social engagement"
                                subtitle="AI-powered marketing for every customer interaction."
                                justSeen={lastVisited === 'blueberry'}
                            />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
