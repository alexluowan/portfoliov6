// pages/88rising.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const MuxPlayer = dynamic(
    () => import('@mux/mux-player-react'),
    { ssr: false }
)
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
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Current State', sectionId: 'current-state'},
        {label: 'Insight', sectionId: 'insight'},
        {label: 'Principles', sectionId: 'principles'},
        {label: 'Explorations', sectionId: 'explorations'},
        {label: 'Outcome', sectionId: 'outcome'},
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
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-16 scrollbar-hidden"
            >
                {/* Mobile header */}
                <div className="flex flex-col md:hidden pt-4 pb-4 max-w-[768px] mx-auto w-full">
                    <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                        ← Back
                    </Link>
                    <h1 className="text-[18px] leading-[1.3] font-light mt-4" style={{fontFamily: '"Self Modern"'}}>88rising</h1>
                </div>

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

                        {/* 1. Challenge */}
                        <AnimatedSection
                            data-section="challenge"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the challenge"
                                title="Fans can&apos;t find new artists"
                                description="Fans land on the website and bounce. New signings get buried. I led the initial audit and mapped where fans actually spend time vs. where 88rising wanted them, which reframed the brief for the whole team."
                                imageSrc="/work/88rising/88risingchallenge.png"
                                mediaAlt="88rising content fragmentation across platforms"
                            />
                            <CaseStudyContent
                                subtitle="the business problem"
                                title="Growth has flatlined"
                                description="The website wasn&apos;t pulling its weight and new artists weren&apos;t getting the discovery that early stars like Rich Brian and Joji enjoyed. That gap costs streams, ticket sales, and long-term brand momentum."
                                svgContent={
                                    <div className="flex flex-col gap-8 mt-[2rem]">
                                        <div className="relative pb-[1px]">
                                            <div className="flex items-end gap-3">
                                                <div className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full border border-[#171717] bg-[#171717]/5 shrink-0" />
                                                <div className="pb-4">
                                                    <p className="text-lg font-medium tracking-tight leading-none">3 billion views</p>
                                                    <p className="text-[#999] text-sm tracking-tight leading-none mt-1">2016 — 2019</p>
                                                </div>
                                            </div>
                                            <div className="flex items-end gap-4 mt-6 ml-[50%] md:ml-[55%]">
                                                <div className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] rounded-full border border-[#171717] bg-[#171717]/5 shrink-0" />
                                                <div className="pb-1">
                                                    <p className="text-lg font-medium tracking-tight leading-none">0.43 billion views</p>
                                                    <p className="text-[#999] text-sm tracking-tight leading-none mt-1">2020 — 2023</p>
                                                </div>
                                            </div>
                                            <hr className="border-[#171717] mt-6" />
                                        </div>
                                        <div className="border-l-2 border-[#171717] pl-6 py-4">
                                            <p className="text-[18px] leading-[1.5]" style={{fontFamily: '"Self Modern"'}}>
                                                &quot;For Asians, Asian Americans and just Asian youth globally, <span className="font-medium">there&apos;s no real home on the internet</span> or a company consistently putting out things that either include Asian talent or Asian viewpoints in stories.&quot;
                                            </p>
                                            <p className="text-[#999] text-sm mt-4">Sean Miyashiro, Founder of 88rising</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 2. Solution */}
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

                        {/* 3. Current State */}
                        <AnimatedSection
                            data-section="current-state"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="current state"
                                title="The two touchpoints fans have today"
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[1.5rem]">
                                        <div>
                                            <div className="bg-[#F5F5F5] p-6 flex items-center justify-center aspect-square">
                                                <video className="w-full" controls={false} autoPlay playsInline muted loop preload="none">
                                                    <source src="/video/88rising/88risingyoutubefeed.webm" type="video/webm" />
                                                </video>
                                            </div>
                                            <p className="text-[#999] text-sm mt-3">YouTube: scattered across channels, no path between artists.</p>
                                        </div>
                                        <div>
                                            <div className="bg-[#F5F5F5] p-6 flex items-center justify-center aspect-square">
                                                <video className="w-full" controls={false} autoPlay playsInline muted loop preload="none">
                                                    <source src="/video/88rising/88risingcurrentsite.webm" type="video/webm" />
                                                </video>
                                            </div>
                                            <p className="text-[#999] text-sm mt-3">Website: a merch storefront with no artist roster or identity.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 4. Insight */}
                        <AnimatedSection
                            data-section="insight"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the key insight"
                                title="Fans want discovery, not a storefront"
                                description="The team conducted 15 user interviews and received 89 survey responses from casual to die-hard fans about their music habits and perception of 88rising. The findings pointed to a lack of awareness within the fanbase of 88rising&apos;s frequent releases, which directly feeds their decline in popularity."
                                svgContent={
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-[2.5rem]">
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">62%</p>
                                            <p className="text-[#363636] text-sm mt-3">of fans unaware of weekly releases</p>
                                        </div>
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">93%</p>
                                            <p className="text-[#363636] text-sm mt-3">of interviewees unaware of most signed artists</p>
                                        </div>
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">75%</p>
                                            <p className="text-[#363636] text-sm mt-3">believe 88rising is declining in popularity</p>
                                        </div>
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">41%</p>
                                            <p className="text-[#363636] text-sm mt-3">attributed decline to lack of brand engagement</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 5. Principles */}
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

                        {/* 6. Explorations */}
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
                            data-section="outcome"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="outcome"
                                title="What this created"
                                description=""
                                mediaClassName="mt-[1.5rem]"
                                svgContent={
                                    <div className="flex flex-col gap-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-[16px] font-medium">For 88rising</h3>
                                                <p className="text-[#363636] mt-2">A platform that builds a loyal fanbase through deeper song engagement and merch discovery. Lesser-known artists gain visibility by sharing space with headliners, deepening the talent pool while promoting Asian American media to global audiences.</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-medium">For fans</h3>
                                                <p className="text-[#363636] mt-2">A more diverse range of music and artists through enhanced discoverability. Fans gain appreciation for each artist&apos;s creativity, influences, and personal experiences instead of relying on algorithms to surface what they might like.</p>
                                            </div>
                                        </div>
                                        <MuxPlayer
                                            playbackId="DPFJhnJGho7Kmkgj3RAtgsYUeYMP2mEKZCJRpbo6nmQ"
                                            streamType="on-demand"
                                            accentColor="#000000"
                                            muted
                                            autoPlay
                                            loop
                                            preload="none"
                                            preferPlayback="mse"
                                            minResolution="1080p"
                                            maxResolution="2160p"
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                            }}
                                            metadata={{
                                                video_title: '88rising outcome',
                                                player_name: 'Outcome Mux Player',
                                            }}
                                        />
                                    </div>
                                }
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
