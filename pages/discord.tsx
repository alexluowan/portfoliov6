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
                            videoSrcWebm="/project-covers/discordcatchup.webm"
                            videoSrcMp4="/project-covers/discordcatchup.mp4"
                            title="Discord works well when you're already in the moment. The problem starts when you come back later and there's too much to sort through."
                            roles={['Product Designer', 'Prototyper']}
                            team={['Shania Chacon']}
                            timeline="3 Weeks"
                            tools={['Figma']}
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
                                title="You open Discord after a weekend away. 47 unread channels across 8 servers."
                                description="You skim two, skip the rest, and hit 'Mark All as Read.' Server activity isn't like DMs — it piles up fast, mixes signal with noise, and past a certain point, most people just stop trying."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title=""
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Muting servers</p>
                                            <p className="text-[12px] text-[#999] mt-1">Silence everything, lose the signal too</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Muting Discord entirely</p>
                                            <p className="text-[12px] text-[#999] mt-1">The nuclear option</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Ignoring notifications</p>
                                            <p className="text-[12px] text-[#999] mt-1">Out of sight, out of mind</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[14px] font-medium">Mark all as read</p>
                                            <p className="text-[12px] text-[#999] mt-1">Inbox zero, context zero</p>
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
                                title="I went into interviews asking how people reconnect with communities. Nobody answered that question."
                                description="They kept describing the same thing: open Discord, see the wall of unread, close it. They weren't trying to reconnect — they were trying to make the noise stop. That shifted the project from a catch-up feature into a triage tool."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title=""
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">DMs always came first.</h3>
                                            <p className="text-[#363636] mt-2">Every participant checked DMs before anything else. Server activity was something they got to later — if they had the energy left.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Too much unread led to giving up.</h3>
                                            <p className="text-[#363636] mt-2">Nobody carefully caught up. They muted, ignored, or marked everything as read just to make the backlog disappear.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">People skim. They don't read.</h3>
                                            <p className="text-[#363636] mt-2">A glance at who posted, a keyword, a timestamp — that's all it took for users to decide if something was worth opening.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Users wanted a say in what surfaced.</h3>
                                            <p className="text-[#363636] mt-2">Less noise wasn't enough. They wanted to shape what kept appearing — without having to mute entire communities.</p>
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
                                title="One card at a time. One decision at a time."
                                description="Highlights surfaces one missed item at a time. Open, dismiss, or mark as read — then move on. A count like '4 left' makes the whole thing feel finite."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: card UI with progress counter</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Enough context to judge, not enough to overwhelm"
                                description="Each card shows who said what and the tone of the conversation — enough to make a quick call without opening the full thread."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: triage actions</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Relevance you can steer, not a black box"
                                description="Highlights makes a first guess, then gives users server-level and channel-level controls to shape what keeps surfacing over time."
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
                                title="The entry point assumed users would go looking for it. They wouldn't."
                                description="Highlights originally lived in the bottom navbar. During testing, people went straight to DMs and never looked down. I moved it into the sidebar — where users already were, not where I wanted them to go."
                                svgContent={
                                    <div className="mt-[2.5rem] w-full aspect-[16/10] bg-[#F5F5F5] flex items-center justify-center">
                                        <p className="text-[14px] text-[#999] font-mono">Screen placeholder: bottom nav vs sidebar placement</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="The first card design recreated the problem it was trying to solve"
                                description="Full conversation threads inside each card felt like opening a channel all over again. Cutting the card in half forced the design to show just enough to judge relevance."
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
                                title="Testing didn't just validate the design. It told me who this wasn't for."
                                description="DM-first users had already solved overload by muting everything — Highlights didn't click for them. The strongest signal came from server-heavy users who fall behind often and already rely on blunt workarounds. Once I stopped designing for everyone, the concept got sharper."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[2.5rem]">
                                        <div>
                                            <h3 className="text-[16px] font-medium">The audience got smaller — and sharper.</h3>
                                            <p className="text-[#363636] mt-2">From "all Discord users" to server-heavy users who regularly fall behind and resort to blunt workarounds.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">The story changed.</h3>
                                            <p className="text-[#363636] mt-2">This wasn't about reconnecting with communities. It was about giving people a faster way to decide what matters.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Relevance controls weren't a nice-to-have.</h3>
                                            <p className="text-[#363636] mt-2">Users didn't just want less noise — they wanted a say in what kept surfacing. That made controls core, not optional.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Triage, not feed.</h3>
                                            <p className="text-[#363636] mt-2">Framing it as a triage tool made every design decision easier to justify than calling it a catch-up feature.</p>
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
                                title="The framing mattered as much as the interface"
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">The problem wasn't what I thought it was.</h3>
                                            <p className="text-[#363636] mt-2">Users weren't trying to reconnect. They were trying to reduce effort. Designing for triage instead of catch-up made every decision easier to make.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">The hardest part wasn't the UI.</h3>
                                            <p className="text-[#363636] mt-2">It was defining who this was for, how it fit alongside notifications, and making system-driven relevance feel trustworthy enough to use.</p>
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
