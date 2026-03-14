// pages/88rising.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import { motion } from 'framer-motion'
import CaseStudyCard from "@/components/projects/CaseStudyCard"
import CaseStudyContent from "@/components/projects/CaseStudyContent"
import WorksNav, {Section} from "@/components/home/WorksNav"
import AnimatedSection from "@/components/AnimatedSection"
import { heroAnimation, fadeInUp, fadeInUpStagger } from "@/animations/animationVariants"
import Link from "next/link"

export default function Rising88() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    // Define sections for this case study
    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Challenge', sectionId: 'challenge'},
        {label: 'Insight', sectionId: 'insight'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Explorations', sectionId: 'explorations'},
        {label: 'Principles', sectionId: 'principles'},
        {label: 'Reflections', sectionId: 'reflections'},
    ]

    useEffect(() => {
        const currentRef = mainRef.current
        if (!currentRef) return

        const handleScroll = () => {
            // Use window scroll on mobile, container scroll on desktop
            const scrollPosition = window.innerWidth < 768 ? window.scrollY : (currentRef?.scrollTop || 0)
            setScrollY(scrollPosition)
        }

        // Add appropriate scroll listener based on screen size
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

        const style = document.createElement('style')
        style.textContent = `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
        `
        document.head.appendChild(style)

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
            document.head.removeChild(style)
        }
    }, [])

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - (scrollY / 400))

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            <aside
                className="w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex flex-col transition-opacity duration-200 ease-out"
                style={{opacity: sidebarOpacity}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>
                <div className="flex flex-col gap-y-4 mt-6">
                    <div className="flex flex-col">
                        <h1 className="text-[18px] leading-[1.3] font-light" style={{fontFamily: '"Self Modern"'}}>88rising</h1>

                    </div>
                    <div className="flex items-center gap-x-1">
                        <p className="text-[11px] leading-none font-mono uppercase text-[#999]">Product Design</p>
                        <div className="bg-[#999] h-[2px] w-[2px] rounded-full" />
                        <p className="text-[11px] leading-none font-mono uppercase text-[#999]">2023</p>
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
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-4 scrollbar-hidden"
            >
                <div className="flex flex-col gap-y-[6rem]">
                    <motion.div 
                        data-section="hero"
                        variants={heroAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <CaseStudyCard
                            videoSrcWebm="/project-covers/88risingthumbnail.webm"
                            videoSrcMp4="/project-covers/88risingthumbnail.mp4"
                            title="Turning 88rising&apos;s website into a discovery engine for fans across Asia."
                            roles={['Product Designer', 'Prototyper', 'Facilitator']}
                            team={['Justin Yu', 'Luke Do', 'Claret Egwim', 'Terrence Xu']}
                            timeline="4 Weeks – 2023"
                            tools={['Figma', 'After Effects', 'Premiere Pro']}
                        />
                    </motion.div>
                    <div className="flex flex-col gap-y-[8rem]">

                        <AnimatedSection 
                            data-section="challenge" 
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the challenge"
                                title="Fans can&apos;t find new artists"
                                description="88rising&apos;s content lives across YouTube, Spotify, Instagram, and TikTok, but their own website is a dead end. Fans land there and bounce. New signings get buried. I led the initial audit and mapped where fans actually spend time vs. where 88rising wanted them, which reframed the brief for the whole team."
                                imageSrc="/work/88rising/88risingchallenge.png"
                                mediaAlt="88rising content fragmentation across platforms"
                            />
                            <CaseStudyContent
                                subtitle="the business problem"
                                title="Growth has flatlined"
                                description="3 billion YouTube views in the first three years, then only 0.43 billion over the next four. The website wasn&apos;t pulling its weight and new artists weren&apos;t getting the discovery that early stars like Rich Brian and Joji enjoyed. That gap costs streams, ticket sales, and long-term brand momentum."
                                imageSrc="/work/88rising/statistics.svg"
                                mediaAlt="88rising YouTube view growth statistics"
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="insight"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the key insight"
                                title="Fans want discovery, not a storefront"
                                description="I ran 8 fan interviews and synthesized 40+ survey responses. The surprise wasn&apos;t that fans felt frustrated. It was how they coped. Most had already given up on the website entirely. One fan told us: &quot;I just wait for the algorithm to show me something.&quot; That reframed our entire direction. We weren&apos;t competing with other music sites. We were competing with passive scrolling."
                                imageSrc="/work/88rising/research.svg"
                                mediaAlt="User research synthesis"
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="solution" 
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="Solution"
                                title="Language-driven discovery"
                                description="I proposed and prototyped the core concept: a landing page built around a mosaic of Asian languages and home countries. Tap a language you relate to, and you instantly see artists who share that cultural backdrop. Heritage becomes a discovery springboard instead of a filter buried in a menu."
                                mediaAlt=""
                                muxPlaybackId="bdeowRPYjuBUoOR3UHW802Ep5SCLTGQ2Rj01DXeBs00qRk"
                                muxOptions={{
                                    accentColor: "#FF0000",
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Culture hubs that surface new talent"
                                description="Selecting a country opens a region hub with every local 88rising act. A side panel spotlights upcoming releases and collaborations. I designed the information hierarchy so lesser-known artists ride the visibility of star talent and fans discover new music without leaving the page."
                                muxPlaybackId="fH005AX8Ie92r77bFsSdK2ze5gKuf37EmG0102YKTUy6Ts"
                                muxOptions={{
                                    accentColor: "#FF0000",
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Artist pages that flex to every vibe"
                                description="Each artist owns a bespoke space with candid photos, bite-sized bios, looping video backdrops, and quick links to songs and merch. I built a modular layout system that adapts to each artist&apos;s energy while staying cohesive across the roster."
                                muxPlaybackId="Vv800mAA1uTn6UaqKOCNDA6kg9AssHIEqNqQ400NsdU004"
                                muxOptions={{
                                    accentColor: "#FF0000",
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="A release calendar fans actually use"
                                description="62% of survey respondents said they miss new drops. I designed a waveform-inspired timeline that visualizes upcoming releases at a glance so fans can preview snippets and set reminders, closing the awareness gap that was costing 88rising streams."
                                muxPlaybackId="6YLpD39o1x01Fl01m01zUbkoI6pY00ENM02LX3CrdPod027QA"
                                muxOptions={{
                                    accentColor: "#FF0000",
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="explorations" 
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="explorations"
                                title="Lat-long navigation"
                                description="An early direction I explored: a stripped-down world map where neon-red bars sit at the actual latitude of each region in the 88rising roster. It tested well conceptually but added friction because fans had to learn a new mental model before discovering anything. We killed it."
                                imageSrc="/work/88rising/exploration1.png"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Raw artist energy over polished bios"
                                description="Another direction I pushed: leading with candid, unfiltered photos instead of stats or press shots. A backyard hose, a beat-up Rubik&apos;s Cube, Brian&apos;s sky-blue coat. This one stuck. It tested strongly because fans bond with personality, not metrics."
                                imageSrc="/work/88rising/exploration2.png"
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="principles"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="design principles"
                                title="Three principles that shaped every decision"
                                description="We first considered the realities of a global, multi‑platform music ecosystem, balancing the needs of fans, artists, and the business before shaping the end‑to‑end experience."
                                imageSrc="/work/88rising/designprinciples.svg"
                                mediaAlt=""
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="reflections" 
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="Reflection"
                                title="What I learned"
                                description=""
                                mediaClassName="mt-[1.5rem]"
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">A bad brief costs more than a late start.</h3>
                                            <p className="text-[#363636] mt-2">We burned four of seven weeks circling the wrong problem. The three-week sprint that followed was the most focused work I&apos;ve done, but only because the wasted time taught us exactly what to cut.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Culture is a design material.</h3>
                                            <p className="text-[#363636] mt-2">Using language and geography as navigation wasn&apos;t a styling choice. It came directly from how fans already talk about 88rising artists. The best design decisions came from listening to the community, not inventing for them.</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Want to hear more?"
                                description="This case study is the highlight reel. If you&apos;d like the full story including the detours, debates, and decisions that didn&apos;t make the cut, let&apos;s chat."
                                muxPlaybackId="zXbKAQgr5YArc01ssVta1T4sRCeovGsk01pIerilmstCk"
                                muxOptions={{
                                    accentColor: "#FF0000",
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
