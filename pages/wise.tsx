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
        {label: 'Context', sectionId: 'context'},
        {label: 'Opportunity', sectionId: 'opportunity'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Validation', sectionId: 'validation'},
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
                    md:col-span-8
                    md:col-start-4
                    overflow-visible
                    md:overflow-auto
                    mt-4
                    relative pb-24
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
                            title="Identifying a product gap in Wise's ecosystem—validated when they shipped it 3 months later."
                            roles={['Product Thinking', 'UI Design']}
                            team={['Myself']}
                            timeline="Jan 2025 · 1 Week"
                            tools={['Figma', 'Jitter']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        <AnimatedSection
                            data-section="context"
                            variants={fadeInUp}
                            className="flex flex-col gap-y-[4rem]"
                        >
                            <CaseStudyContent
                                subtitle="context"
                                title="International trips create multi-currency chaos"
                                description={`You're on a group trip across Europe. One friend pays for dinner in euros. Another covers the Airbnb in pounds. Someone else handles the car rental in Swiss francs. By the end, everyone's tracking debts in spreadsheets, converting currencies manually, and sending money through three different apps. Wise already handles the currency conversion—but forces groups to leave the app to figure out who owes what.`}
                            />
                            <CaseStudyContent
                                subtitle="note"
                                title="Personal design exercise"
                                description={`This project was completed independently as a product exploration. I identified what felt like a gap in Wise's ecosystem and designed a solution to test my hypothesis.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="opportunity"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="opportunity"
                                title="Why this fits Wise's business"
                                description={`Wise already owns the hardest part: instant, low-fee currency conversion across 40+ currencies. But users still leave the app for Splitwise or spreadsheets when traveling with friends. Every time they leave, Wise loses transaction volume and risks users discovering competitors.`}
                                svgContent={
                                    <div className="flex flex-col gap-6 mt-[2.5rem]">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1 border border-[#E5E5E5] p-6">
                                                <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Problem</p>
                                                <p className="font-medium">Users leave for Splitwise</p>
                                                <p className="text-sm text-[#666] mt-2">During high-value moments like trips, Wise loses the transaction to competitors</p>
                                            </div>
                                            <div className="hidden md:flex items-center justify-center text-[#999]">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1 border border-[#000] p-6">
                                                <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Opportunity</p>
                                                <p className="font-medium">Native split keeps users in-app</p>
                                                <p className="text-sm text-[#666] mt-2">Capture the full transaction chain from expense to settlement</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="border border-[#E5E5E5] p-5">
                                                <p className="text-2xl font-medium">1</p>
                                                <p className="text-sm text-[#666] mt-2">Ecosystem lock-in during high-value moments</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-5">
                                                <p className="text-2xl font-medium">2</p>
                                                <p className="text-sm text-[#666] mt-2">Increased transaction frequency as friends settle up</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-5">
                                                <p className="text-2xl font-medium">3</p>
                                                <p className="text-sm text-[#666] mt-2">Viral growth when non-users receive split requests</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="solution"
                            variants={fadeInUp}
                            className="flex flex-col gap-y-[4rem]"
                        >
                            <CaseStudyContent
                                subtitle="solution"
                                title="Borrower flow: create and share a split"
                                description={`Creating a multi-currency split without leaving Wise. The owner sets up a group, adds expenses in any currency, and assigns who owes what. Wise handles the conversion math automatically. Invites go out via link—recipients don't need a Wise account to see what they owe.`}
                                videoSrcMp4="/work/wise/borrowerflow.mp4"
                                mediaClassName="mt-[2.5rem] rounded-lg overflow-hidden"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Recipient view: see what you owe"
                                description={`Participants see their balance in their preferred currency, track individual expenses, and settle with one tap. The interface shows the conversion rate so nothing feels hidden. Non-Wise users can pay via bank transfer; Wise users settle instantly.`}
                                videoSrcMp4="/work/wise/recipient.mp4"
                                mediaClassName="mt-[2.5rem] rounded-lg overflow-hidden"
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="validation"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="validation"
                                title="Wise shipped a similar feature 3 months later"
                                description={`In April 2025, Wise launched "Spend with Others"—a group spending feature that lets up to five people share expenses across 40 currencies. The core insight was the same: Wise already handles multi-currency payments, so splitting should live there too. I didn't predict their exact implementation, but the product gap I identified turned out to be real.`}
                                svgContent={
                                    <div className="mt-[2.5rem] border border-[#E5E5E5] p-6">
                                        <p className="text-sm text-[#999] uppercase tracking-wider mb-2">What Wise shipped (April 2025)</p>
                                        <p className="font-medium text-lg">"Spend with Others"</p>
                                        <p className="text-[#363636] mt-2">Groups of up to 5 people, digital cards for each member, spending across 160 countries and 40 currencies. Initially available in UK, EU, Switzerland, Australia, New Zealand, and Singapore.</p>
                                    </div>
                                }
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
        </GridContainer>
    )
}
