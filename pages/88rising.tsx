// pages/88rising.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import { motion } from 'framer-motion'
import GridContainer from '@/components/GridContainer'
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
            if (currentRef) {
                setScrollY(currentRef.scrollTop)
            }
        }

        currentRef.addEventListener('scroll', handleScroll)

        const style = document.createElement('style')
        style.textContent = `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
        `
        document.head.appendChild(style)

        const handleResize = () => {
            // Nothing to do but kept for possible future use
        }

        window.addEventListener('resize', handleResize)

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll)
            }
            window.removeEventListener('resize', handleResize)
            document.head.removeChild(style)
        }
    }, [])

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - (scrollY / 400))

    return (
        <GridContainer
            className="
                grid
                grid-cols-1
                md:grid-cols-12
                md:h-screen
                md:overflow-hidden
                gap-4
            "
        >
            <aside
                className="flex flex-col h-full col-span-1 md:col-span-2 md:sticky md:top-0 mt-4 bg-white transition-opacity duration-200 ease-out"
                style={{opacity: sidebarOpacity}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href="/">
                    <p>Alex Luowan</p>
                </Link>
                <p className="mt-4">
                    Turning 88rising&apos;s website into a backstage pass for every fan.
                </p>
                <div className="mt-4">
                    <WorksNav
                        scrollContainerRef={mainRef}
                        sections={sections}
                        showTimeline={true}
                    />
                </div>
                <div className="mt-auto">
                </div>
            </aside>

            <main
                ref={mainRef}
                className="
                    col-span-1
                    md:col-span-6
                    md:col-start-4
                    overflow-auto
                    mt-4
                    relative pb-4
                    h-full
                    scrollbar-hide
                "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
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
                            title="Reimagining 88rising&apos;s website experience for fans to engage with their favourite artists and stay informed."
                            roles={['Product Designer', 'Prototyper', 'Facilitator']}
                            team={['Justin Yu', 'Luke Do', 'Claret Egwim', 'Terrence Xu']}
                            timeline="4 Weeks – 2023"
                            client="88rising (Mock)"
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
                                title="Difficulty In Discovering Artists and Content"
                                description="Fans struggle to discover new music and connect with artists because content is scattered across platforms. This fragmentation disengages fans, blocking immersion in the 88rising ecosystem and eroding brand loyalty. When discovery stalls, the mission of amplifying Asian voices stalls too."
                                imageSrc="/work/88rising/88risingchallenge.png"
                                mediaAlt="88rising logo with social media icons"
                            />
                            <CaseStudyContent
                                subtitle="the business problem"
                                title="Why 88rising Should Care"
                                description="88rising racked up 3 B YouTube views in its first three years, yet has added only 0.43 B over the last four. A discovery‑poor web presence means new signings don't get the reach early stars enjoyed, costing streams, ticket sales, and long‑term brand momentum."
                                imageSrc="/work/88rising/statistics.svg"
                                mediaAlt="88rising logo with social media icons"
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="insight"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the key insight"
                                title="Identifying Core Frustrations"
                                description="Interviews and surveys showed fans felt frustrated by fragmented content and limited interaction with artists, craving an effortless discovery experience. These insights clearly pointed to one need: fans seek discovery, not a storefront."
                                imageSrc="/work/88rising/research.svg"
                                mediaAlt=""
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="solution" 
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="Solution"
                                title="Language-Driven Discovery"
                                description="The landing page greets fans with a mosaic of Asian languages and their home countries. By tapping a language they relate to, users instantly see artists who share that cultural backdrop; turning heritage into a discovery springboard."
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
                                title="Culture Hubs & Upcoming Releases"
                                description="Selecting a country opens a region hub listing every local 88rising act, while a side panel spotlights upcoming releases and high‑profile collaborations. Lesser‑known artists ride the wave of star talent, giving fans fresh music without leaving the page."
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
                                title="Adaptable Individuality - Immersive Artists Pages"
                                description="Each artist owns a bespoke space: stacked candid photos, bite‑sized bios, looping video backdrops, and quick links to songs and merch. The layout flexes to every vibe yet remains part of one cohesive system—deepening connection without confusion."
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
                                title="Behind the Beat — Waveform Release Calendar"
                                description="A linear, waveform‑inspired timeline visualizes future drops at a glance. Fans can preview snippets and set reminders, closing the awareness gap that 62 % of survey respondents cited and boosting anticipation for new music."
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
                                title="Pinpointing Nations with Lat-Long "
                                description="We recast the landing page as a stripped-down world map. Each neon-red bar sits at the actual latitude of a region that feeds the 88rising roster, turning raw co-ordinates into a visual navigation system. By starting discovery with place and lighting up the local word for rise in each block—we remind fans that the label&apos;s heartbeat is pan-Asian, not platform-first."
                                imageSrc="/work/88rising/exploration1.png"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Unfiltered Artists Energy"
                                description="Fans don&apos;t bond with stats, they bond with snapshots of real life. A backyard hose, a beat-up Rubik&apos;s Cube, and Brian&apos;s sky-blue coat say more than any metric, turning casual scrollers into curious fans eager to dive into music, merch, and more."
                                imageSrc="/work/88rising/exploration2.png"
                            />
                        </AnimatedSection>

                        <AnimatedSection 
                            data-section="principles"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="design principles"
                                title="Based on the insights we gathered, we asked a simple question: what must this experience do for fans and for 88rising to truly win? Those answers became three guiding principles."
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
                                subtitle="Reflections"
                                title="Key Takeaways & Fixes"
                                description="Seven weeks sounded roomy until we spent four hunting for the perfect brief and were left with just three to launch. That squeeze forced ruthless focus. We trimmed every nice-to-have and doubled down on what matters most to fans: stumbling onto their next favourite artist. The result? A story-first interface with crisp visuals, micro-interactions, and plain-spoken copy that sparks a real fan-artist connection. The sprint was a gut-check reminder that design isn&apos;t linear; it&apos;s about steering through detours and making every pixel earn its place."
                                imageSrc="/work/88rising/ripruss.png"
                                mediaAlt=""
                            />
                            <CaseStudyContent
                                subtitle="Reach out"
                                title="Want the inside scoop? Let&apos;s chat"
                                description="Getting here was anything but linear. If you&apos;d like the full story twists, turns, and aha moments let&apos;s hop on a quick call :) "
                                mediaAlt=""
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
        </GridContainer>
    )
}
