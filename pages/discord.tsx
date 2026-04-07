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
        {label: 'Problem', sectionId: 'context'},
        {label: 'Learnings', sectionId: 'shift'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Iteration', sectionId: 'exploration'},
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
                            title="Most Discord users do not catch up on missed server activity. They just want the backlog to go away."
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
                                description="You skim two channels, skip the rest, and hit 'Mark All as Read.' Server activity piles up fast, mixes signal with noise, and past a certain point most people stop trying to catch up."
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
                                            How might we help server-heavy Discord users quickly sort through missed activity and decide what deserves attention first?
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
                                subtitle="key learning"
                                title="My initial framing was wrong."
                                description="I started by assuming the problem was about helping people reconnect with their communities. Interviews showed something more practical: when unread server activity piles up, most people are not trying to reconnect. They are trying to reduce effort and get back to a manageable state."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="That shifted the concept from catch-up to quick sorting."
                                description="Instead of designing a better way to read everything, I focused on helping people make faster decisions: open it now, skip it, or clear it and move on. That change made the product direction sharper and the interface easier to justify."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="border border-[#E5E5E5] p-5">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">Initial assumption</p>
                                            <h3 className="text-[16px] font-medium mt-3">People want help catching up with their communities.</h3>
                                            <p className="text-[#363636] mt-2">This framing pointed toward a reading and summarization problem.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">What I learned</p>
                                            <h3 className="text-[16px] font-medium mt-3">People want help deciding what is worth their time.</h3>
                                            <p className="text-[#363636] mt-2">This reframed the product as a way to quickly sort through what matters, not a full catch-up system.</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="research learnings"
                                title="Four patterns kept repeating."
                                description="The methods mattered less than the consistency of what people described. These patterns directly shaped the feature."
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
                                description="Highlights surfaces one missed item at a time. Each card supports a quick decision: open the thread, dismiss it, or mark it as read and move on. A visible count like '4 left' makes the backlog feel bounded instead of endless."
                                videoSrcMp4="/work/discord/videos/cardswipe.mov"
                                mediaClassName="mt-[2.5rem] w-full aspect-[16/10] object-cover bg-[#F5F5F5]"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Each card gives just enough context to act."
                                description="Instead of showing a full conversation, the card previews who posted, what they said, and how active the thread feels. That gives users enough signal to judge relevance without recreating the overload inside the card itself."
                                videoSrcMp4="/work/discord/videos/chatscrollthrough.mov"
                                mediaClassName="mt-[2.5rem] w-full aspect-[16/10] object-cover bg-[#F5F5F5]"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Users can shape what keeps surfacing."
                                description="Highlights makes an initial relevance guess, but users stay in control. Server-level and channel-level settings let them tune what appears over time instead of relying on a hidden ranking system."
                                videoSrcMp4="/work/discord/videos/settings.mov"
                                mediaClassName="mt-[2.5rem] w-full aspect-[16/10] object-cover bg-[#F5F5F5]"
                            />
                        </AnimatedSection>

                        {/* 4. Exploration */}
                        <AnimatedSection
                            data-section="exploration"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="iteration"
                                title="The first concept assumed people would go looking for the feature. They did not."
                                description="Highlights originally lived in the bottom navigation. During testing, people went straight to DMs and never looked down for it. Moving the entry point into the sidebar matched where users already were instead of asking them to learn a new behavior."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">What I tried</p>
                                            <p className="text-[14px] mt-2">Placed Highlights in the bottom nav as a dedicated destination.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">What happened</p>
                                            <p className="text-[14px] mt-2">Participants defaulted to DMs and missed the feature entirely.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-4">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">What changed</p>
                                            <p className="text-[14px] mt-2">Moved entry into the sidebar so it sat closer to existing server behavior.</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="The first card design recreated the same overload it was supposed to reduce."
                                description="The problem was not just volume. The hierarchy was unclear. There was too much metadata, too many competing icons, and not enough visual focus on what users actually needed to decide. Instead of feeling fast, the card felt noisy and confusing."
                                svgContent={
                                    <div className="flex flex-col gap-y-6">
                                        <div className="mt-[2.5rem] w-full aspect-[4/3] bg-[#E8E8E8] flex items-center justify-center">
                                            <img
                                                src="/work/discord/images/full-card-iteration.png"
                                                alt="Early full-card iteration showing too much conversation context and awkward undo placement"
                                                className="h-[90%] w-auto object-contain"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="border border-[#E5E5E5] p-4">
                                                <p className="text-[12px] font-mono uppercase text-[#999]">Issue 1</p>
                                                <p className="text-[14px] mt-2">The visual hierarchy was weak, so it was hard to tell what mattered first at a glance.</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-4">
                                                <p className="text-[12px] font-mono uppercase text-[#999]">Issue 2</p>
                                                <p className="text-[14px] mt-2">Extra metadata and UI details added noise instead of helping people make a quick decision.</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-4">
                                                <p className="text-[12px] font-mono uppercase text-[#999]">Issue 3</p>
                                                <p className="text-[14px] mt-2">Icons like the lightbulb and flame suggested importance, but people did not understand what they meant.</p>
                                            </div>
                                        </div>
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
                                title="Testing did more than validate the feature. It clarified the audience."
                                description="DM-first users had already solved overload by muting most of Discord, so Highlights did not resonate with them. The strongest signal came from server-heavy users who fall behind often and already rely on blunt workarounds. Once I stopped designing for everyone, the concept got sharper."
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
                                            <h3 className="text-[16px] font-medium">Decision tool, not feed.</h3>
                                            <p className="text-[#363636] mt-2">Framing it as a tool for making quick decisions made every design choice easier to justify than calling it a catch-up feature.</p>
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
                                            <p className="text-[#363636] mt-2">Users were not trying to reconnect. They were trying to reduce effort. Designing for quick sorting instead of catch-up made product choices, interaction patterns, and prioritization much clearer.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">The hardest part wasn't the UI.</h3>
                                            <p className="text-[#363636] mt-2">It was defining who this was for, where it should live in the product, and how to make system-driven relevance feel transparent enough to trust.</p>
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
