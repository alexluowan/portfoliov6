// pages/fondazione.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import GridContainer from '@/components/GridContainer'
import CaseStudyCard from "@/components/projects/CaseStudyCard"
import CaseStudyContent from "@/components/projects/CaseStudyContent"
import WorksNav, {Section} from "@/components/home/WorksNav"
import Link from "next/link"

export default function Fondazione() {
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
                    Creating an immersive pre-exhibition microsite for Fondazione Prada.
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
                    <div data-section="hero">
                        <CaseStudyCard
                            videoSrcMp4="/project-covers/fondazioneprada.mp4"
                            title="Designing an immersive pre-exhibition microsite for Fondazione Prada to engage visitors before they arrive."
                            roles={['Interaction Designer', 'Prototyper']}
                            team={['Alex Luowan']}
                            timeline="2 Weeks – 2023"
                            client="Fondazione Prada (Mock)"
                            tools={['Figma', 'After Effects', 'Premiere Pro']}
                        />
                    </div>
                    <div className="flex flex-col gap-y-[8rem]">

                        <div data-section="challenge">
                            <CaseStudyContent
                                subtitle="the challenge"
                                title="Creating Pre-Exhibition Engagement"
                                description="Museums and galleries often struggle to create meaningful engagement with visitors before they arrive at exhibitions. The challenge was to design a microsite that would build anticipation and provide context for the Fondazione Prada exhibition experience."
                                imageSrc="/work/88rising/88risingchallenge.png"
                                mediaAlt="Fondazione Prada exhibition space"
                            />
                        </div>

                        <div data-section="insight">
                            <CaseStudyContent
                                subtitle="the key insight"
                                title="Understanding Visitor Journey"
                                description="Research showed that visitors who engaged with pre-exhibition content had a more meaningful and connected experience during their actual visit. The key was to create an immersive digital experience that would complement the physical exhibition."
                                imageSrc="/work/88rising/research.svg"
                                mediaAlt=""
                            />
                        </div>

                        <div data-section="solution" className="flex flex-col gap-y-[4rem]">
                            <CaseStudyContent
                                subtitle="Solution"
                                title="Immersive Digital Experience"
                                description="The microsite features an interactive timeline that guides visitors through the exhibition's key themes and artworks. By providing context and building anticipation, visitors arrive with a deeper understanding and appreciation for the work they're about to see."
                                mediaAlt=""
                                muxPlaybackId="bdeowRPYjuBUoOR3UHW802Ep5SCLTGQ2Rj01DXeBs00qRk"
                                muxOptions={{
                                    accentColor: "#000000",
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                        </div>

                        <div data-section="reflections">
                            <CaseStudyContent
                                subtitle="Reflections"
                                title="Key Takeaways"
                                description="This project demonstrated the power of digital experiences in enhancing physical exhibitions. The microsite successfully bridged the gap between digital and physical spaces, creating a more cohesive visitor experience."
                                imageSrc="/work/88rising/ripruss.png"
                                mediaAlt=""
                            />
                        </div>
                    </div>
                </div>
            </main>
        </GridContainer>
    )
}
