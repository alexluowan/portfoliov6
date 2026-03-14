// pages/index.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import Lenis from '@studio-freight/lenis'

import ProjectCard from '@/components/projects/ProjectCard'
import Link from "next/link";

export default function Home() {
    const [time, setTime] = useState('')

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

    // 1) ref your scroll‐pane
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mainRef.current) return

        // 2) init Lenis on that element
        const lenis = new Lenis({
            wrapper: mainRef.current,
            smoothWheel: true,
        })

        // 3) start the RAF loop
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // 4) cleanup
        return () => lenis.destroy()
    }, [])

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex flex-col">
                <p className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                    Alex Luowan is a product designer with a love for playful interactions and a sharp eye for detail. He is interested in creating digital experiences that feel clear, engaging, and enjoyable for the people using them.
                </p>
                <p className="mt-4 text-[14px] leading-[18px] text-[#575757] font-[350]">
                    Currently, he&apos;s designing <a href="https://athenahq.ai/" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@AthenaHQ</a>.<br/>
                    Previously worked with, <a href="https://www.blaze.ai" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@Blaze.ai</a>, <a href="https://www.phlur.com" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@Phlur</a>, and <a href="https://www.blueberrysocial.com" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#F25410] decoration-[#F25410] hover-target-small">@Blueberry Social</a>
                </p>
                <div className="mt-4 border-t border-[#E0E0E0]"></div>
                <span className="mt-2 text-[11px] leading-[14px] text-[#999999] font-[350]">Other Spaces</span>
                <nav className="mt-1 flex flex-col items-start text-[14px] leading-[18px] font-[350]">
                    <Link href="/about" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out">About Me</Link>
                    <Link href="/friends" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out">Friends</Link>
                    <Link href="/playground" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out">Playground</Link>
                </nav>
                <span className="mt-4 text-[11px] leading-[14px] text-[#999999] font-[350]">Places to find me</span>
                <nav className="mt-1 flex flex-col items-start text-[14px] leading-[18px] font-[350]">
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out">CV</a>
                    <a href="https://www.linkedin.com/in/alexluowan" target="_blank" rel="noreferrer" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out">LinkedIn</a>
                </nav>
                <p className="hidden md:block mt-auto pt-4 text-[12px] leading-[14px] text-[#575757] font-[350]">
                    Vancouver, BC {time}
                </p>
            </aside>

            {/* Main scroll container */}
            <main
                ref={mainRef}
                className="w-full md:overflow-y-auto overflow-hidden relative md:pl-[24px] scrollbar-hidden"
            >
                <div className="feed-grid flex flex-col gap-4 md:flex-row md:gap-2 pt-4 pb-4">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4 md:w-1/2 md:gap-2">
                        <Link href="/discord" className="feed-card hover-target-big transition-opacity duration-200">
                            <ProjectCard
                                mediaSrc="/project-covers/discordcatchup.mp4"
                                mediaType="video"
                                aspect="portrait"
                                objectPosition="center 60%"
                                title="Discord Catchup"
                                subtitle="Product Design – Feature Concept"
                            />
                        </Link>
                        <Link href="/blueberry" className="feed-card hover-target-big transition-opacity duration-200">
                            <ProjectCard
                                mediaSrc="/project-covers/blueberrysizzle.mp4"
                                mediaType="video"
                                aspect="landscape"
                                title="Blueberry Social"
                                subtitle="Case Study – AI Email Agent"
                            />
                        </Link>
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col gap-4 md:w-1/2 md:gap-2">
                        <Link href="/88rising" className="feed-card hover-target-big transition-opacity duration-200">
                            <ProjectCard
                                mediaSrc="/project-covers/88risingthumbnail.mp4"
                                mediaType="video"
                                aspect="wide"
                                title="88rising"
                                subtitle="Product Design – Website Revamp"
                            />
                        </Link>
                        <Link href="/athena" className="feed-card hover-target-big transition-opacity duration-200">
                            <ProjectCard
                                mediaSrc="/project-covers/athenahq.jpg"
                                mediaType="image"
                                aspect="portrait"
                                title="AthenaHQ"
                                subtitle="Product Design – AI Platform"
                            />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
