// pages/wise.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import WorksNav, {Section} from '@/components/home/WorksNav'
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
                        <h1 className="text-[18px] leading-[1.3] font-light" style={{fontFamily: '"Self Modern"'}}>Wise</h1>

                    </div>
                    <div className="flex items-center gap-x-1">
                        <p className="text-[11px] leading-none font-mono uppercase text-[#999]">UI Design</p>
                        <div className="bg-[#999] h-[2px] w-[2px] rounded-full" />
                        <p className="text-[11px] leading-none font-mono uppercase text-[#999]">2025</p>
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

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
