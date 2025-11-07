// pages/wise.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import GridContainer from '@/components/GridContainer'
import WorksNav, {Section} from '@/components/home/WorksNav'
import ProfileNav from '@/components/home/ProfileNav'
import CaseStudyCard from '@/components/projects/CaseStudyCard'
import CaseStudyContent from '@/components/projects/CaseStudyContent'
import AnimatedSection from '@/components/AnimatedSection'
import {heroAnimation, fadeInUp} from '@/animations/animationVariants'
import Link from 'next/link'

export default function WiseCaseStudy() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Overview', sectionId: 'overview'},
        {label: 'Borrower Flow', sectionId: 'borrower-flow'},
        {label: 'Recipient View', sectionId: 'recipient-view'},
    ]

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
        const lenis = new Lenis({wrapper: mainRef.current, smoothWheel: true})
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - scrollY / 400)

    return (
        <GridContainer
            className="
                grid
                grid-cols-1
                md:grid-cols-12
                md:h-screen
                md:overflow-hidden
                min-h-screen
                gap-4
                mobile-native-scroll
            "
        >
            <aside
                className="flex flex-col h-full col-span-1 md:col-span-2 md:sticky md:top-0 md:h-screen mt-4 bg-white transition-opacity duration-200 ease-out"
                style={{opacity: sidebarOpacity}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href="/">
                    <p>Alex Luowan</p>
                </Link>
                <p className="mt-4">
                    Splitting group expenses across different countries and currencies.
                </p>
                <div className="mt-4">
                    <WorksNav
                        scrollContainerRef={mainRef}
                        sections={sections}
                        showTimeline={true}
                    />
                </div>
                <div className="mt-auto">
                    <ProfileNav />
                </div>
            </aside>

            <main
                ref={mainRef}
                className="
                    col-span-1
                    md:col-span-9
                    md:col-start-4
                    overflow-visible
                    md:overflow-auto
                    mt-4
                    relative pb-4
                    h-auto
                    md:h-screen
                    md:scrollbar-hide
                "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
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
                            imageSrc="/project-covers/wisethumbnail.png"
                            title="Splitting group expenses across different countries and currencies."
                            roles={['UI Designer']}
                            team={['Myself']}
                            timeline="2025 - 1 Week"
                            tools={['Figma', 'Jitter']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        <AnimatedSection
                            data-section="overview"
                            variants={fadeInUp}
                            className="flex flex-col gap-y-[4rem]"
                        >
                            <CaseStudyContent
                                subtitle="overview"
                                title="A lightweight, integrated split"
                                description={`Wise makes international payments simple, but it doesn't help when people need to split and settle costs across borders. This exploration introduces a lightweight bill-splitting feature so that friends, families, and teams can settle shared costs without leaving Wise or juggling spreadsheets.`}
                            />
                            <CaseStudyContent
                                subtitle="note"
                                title="Personal design exercise"
                                description={`This project is not associated with the company Wise. It was completed independently as a personal design exercise to explore how multi-currency expense splitting could feel inside the Wise ecosystem.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="borrower-flow"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="prototype"
                                title="Borrower flow"
                                description="Creating and sharing a multi-currency split without leaving Wise."
                                videoSrcMp4="/work/wise/borrowerflow.mp4"
                                mediaClassName="mt-[2.5rem] rounded-lg overflow-hidden"
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="recipient-view"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="prototype"
                                title="Recipient view"
                                description="Tracking owed amounts, currencies, and payback status from the participant side."
                                videoSrcMp4="/work/wise/recipient.mp4"
                                mediaClassName="mt-[2.5rem] rounded-lg overflow-hidden"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
        </GridContainer>
    )
}
