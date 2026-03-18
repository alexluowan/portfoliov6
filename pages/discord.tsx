// pages/discord.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import WorksNav, {Section} from '@/components/home/WorksNav'
import CaseStudyCard from '@/components/projects/CaseStudyCard'
import CaseStudyContent from '@/components/projects/CaseStudyContent'
import AnimatedSection from '@/components/AnimatedSection'
import {heroAnimation, fadeInUp, fadeInUpStagger} from '@/animations/animationVariants'
import Link from 'next/link'

export default function DiscordCatchup() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Context', sectionId: 'context'},
        {label: 'The Shift', sectionId: 'shift'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Exploration', sectionId: 'exploration'},
        {label: 'Testing', sectionId: 'testing'},
        {label: 'Reflection', sectionId: 'reflection'},
    ]

    useEffect(() => {
        sessionStorage.setItem('lastVisitedCaseStudy', 'discord')
    }, [])

    useEffect(() => {
        const currentRef = mainRef.current
        if (!currentRef) return

        const handleScroll = () => {
            const scrollPosition =
                window.innerWidth < 768 ? window.scrollY : (currentRef?.scrollTop || 0)
            setScrollY(scrollPosition)
        }

        const addScrollListener = () => {
            if (window.innerWidth < 768) {
                window.addEventListener('scroll', handleScroll)
                if (currentRef) {
                    currentRef.removeEventListener('scroll', handleScroll)
                }
            } else {
                if (currentRef) {
                    currentRef.addEventListener('scroll', handleScroll)
                }
                window.removeEventListener('scroll', handleScroll)
            }
        }

        addScrollListener()

        const handleResize = () => {
            addScrollListener()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll)
            }
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (!mainRef.current) return
        const mq = window.matchMedia('(min-width: 1200px)')
        let lenis: Lenis | null = null
        let rafId: number | null = null
        function initLenis() {
            if (!mainRef.current) return
            lenis = new Lenis({wrapper: mainRef.current, smoothWheel: true})
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

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - scrollY / 400)

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            <aside
                className="hidden md:flex w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex-col transition-opacity duration-200 ease-out"
                style={{opacity: sidebarOpacity}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>
                <div className="flex flex-col gap-y-4 mt-6">
                    <div className="flex flex-col">
                        <h1 className="text-[18px] leading-[1.3] font-light" style={{fontFamily: '"Self Modern"'}}>Discord Highlights</h1>

                    </div>
                    <div className="flex items-center gap-x-1">
                        <p className="text-[11px] leading-none font-mono uppercase text-[#999]">Product Design</p>
                    </div>
                </div>
                <div className="mt-8">
                    <WorksNav
                        scrollContainerRef={mainRef}
                        sections={sections}
                        showTimeline={true}
                    />
                </div>
            </aside>

            <main
                ref={mainRef}
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-[70vh] scrollbar-hidden"
            >
                {/* Mobile header */}
                <div className="flex flex-col md:hidden pt-4 pb-4 max-w-[768px] mx-auto w-full">
                    <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                        ← Back
                    </Link>
                    <h1 className="text-[18px] leading-[1.3] font-light mt-4" style={{fontFamily: '"Self Modern"'}}>Discord Highlights</h1>
                </div>

                <div className="flex flex-col gap-y-[6rem]">
                    <motion.div
                        data-section="hero"
                        variants={heroAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <CaseStudyCard
                            videoSrcMp4="/project-covers/discordcatchup.mp4"
                            title="A backlog-triage concept for server-heavy users who fall behind on missed messages."
                            roles={['Product Designer']}
                            team={['Myself']}
                            timeline="3 Weeks"
                            tools={['Figma', 'Prototyping']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        {/* 1. Context */}
                        <AnimatedSection
                            data-section="context"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the problem"
                                title="Server messages stop feeling like conversations and start feeling like backlog"
                                description="DMs are direct, finite, and easy to process. Server activity is not. It spreads across multiple servers and channels, full of low-priority chatter, and much harder to scan once it accumulates. When volume gets too high, users stop trying to catch up altogether."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title=""
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Muting servers</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Muting Discord entirely</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Ignoring notifications</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Mark all as read</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="the question"
                                title=""
                                description=""
                                svgContent={
                                    <div className="border-l-2 border-[#171717] pl-6 py-4">
                                        <p className="text-[18px] leading-[1.5]" style={{fontFamily: '"Self Modern"'}}>
                                            How might we help server-heavy Discord users quickly sort through missed messages without manually catching up on everything?
                                        </p>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 2. The Shift */}
                        <AnimatedSection
                            data-section="shift"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the shift"
                                title="Users were not asking to reconnect. They were trying to reduce effort."
                                description="I originally framed this around helping users reconnect with communities. Research pointed to a more practical truth: they wanted a faster way to decide what deserved attention and what could be safely ignored. That shifted the project from a broad catch-up concept into a focused backlog-triage tool."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title=""
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">DMs come first. Servers come later.</h3>
                                            <p className="text-[#363636] mt-2">Users consistently treated DMs as highest priority. Server activity was dealt with only after, if they had the energy.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Overload pushes users toward avoidance.</h3>
                                            <p className="text-[#363636] mt-2">When unread messages piled up, users stopped engaging. They muted or marked everything as read to make the noise disappear.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Users skim and infer, not read deeply.</h3>
                                            <p className="text-[#363636] mt-2">People relied on quick cues like topic, keywords, and timestamps to decide whether something was worth opening.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Relevance needs user control.</h3>
                                            <p className="text-[#363636] mt-2">Users did not just want less volume. They wanted control over what surfaced, not all-or-nothing muting.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 3. Solution */}
                        <AnimatedSection
                            data-section="solution"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="solution"
                                title="Backlog becomes a sequence of single decisions"
                                description="Instead of a wall of unread content, users see one missed item at a time. A progress count like '4 left' makes catch-up feel finite instead of endless."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: card UI with progress counter</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Support quick judgment, not deep reading"
                                description="Each card includes enough context to make a fast call: open it, dismiss it, or mark it as read. Mark as Read and Not Interested match how users already process overload, but more intentionally."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: triage actions</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Make relevance steerable, not a black box"
                                description="Server and channel-level controls let users shape what appears over time. Highlights makes a good first guess, then lets users guide it."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: relevance controls</p>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 4. Exploration */}
                        <AnimatedSection
                            data-section="exploration"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="exploration"
                                title="Moving the entry point from bottom navbar to sidebar"
                                description="Highlights originally lived in the bottom navbar. But research showed that even DM-heavy users rarely explored beyond their primary navigation path. Moving the entry point to the sidebar made it visible during normal DM usage, increasing the chance of adoption without requiring users to change their habits."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: bottom nav vs sidebar placement</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Full card was too much information"
                                description="The first version showed the full conversation thread inside each card. But Discord is already overwhelming. Showing the entire message context defeated the purpose of reducing overload. I cut the card size in half to surface just enough to make a quick judgment. The undo button was also in an inconvenient spot, making it harder to recover from mistakes."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[4/3] bg-[#E8E8E8] flex items-center justify-center">
                                        <img
                                            src="/work/discord/images/full-card-iteration.png"
                                            alt="Early full-card iteration showing too much conversation context and awkward undo placement"
                                            className="h-[90%] w-auto object-contain"
                                        />
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 5. Testing */}
                        <AnimatedSection
                            data-section="testing"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="testing"
                                title="Testing narrowed both the audience and the product story"
                                description="Some participants primarily used Discord for DMs and had already solved server overload by muting. Those sessions clarified who the feature was not for. The strongest signal came from users in many active servers who frequently fell behind and already relied on crude workarounds."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[2.5rem]">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Audience became narrower</h3>
                                            <p className="text-[#363636] mt-2">From all Discord users to specifically server-heavy users with backlog problems.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Framing shifted</h3>
                                            <p className="text-[#363636] mt-2">Away from "community reconnection" toward practical backlog triage.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Controls mattered more than expected</h3>
                                            <p className="text-[#363636] mt-2">Relevance controls became more important than initially scoped.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Easier to defend as triage</h3>
                                            <p className="text-[#363636] mt-2">The feature became stronger positioned as a triage tool rather than a generic feed.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 5. Reflection */}
                        <AnimatedSection
                            data-section="reflection"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="reflection"
                                title="The framing mattered as much as the UI"
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Users are more pragmatic than expected.</h3>
                                            <p className="text-[#363636] mt-2">I started designing for "reconnection," but users were trying to reduce noise, avoid wasting time, and decide what was worth their attention. That shift made the concept stronger.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">The challenge was not just the interface.</h3>
                                            <p className="text-[#363636] mt-2">It was defining who the feature was for, how it fit alongside notifications, and how to make system-driven relevance feel trustworthy enough to use.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
