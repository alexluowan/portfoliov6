'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import CaseStudyCard from '@/components/projects/CaseStudyCard'
import CaseStudyContent from '@/components/projects/CaseStudyContent'
import WorksNav, {Section} from '@/components/home/WorksNav'
import AnimatedSection from '@/components/AnimatedSection'
import {heroAnimation, fadeInUp, fadeInUpStagger} from '@/animations/animationVariants'
import Link from 'next/link'
import Image from 'next/image'

export default function BlueberrySocial() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Explorations', sectionId: 'explorations'},
        {label: 'Context', sectionId: 'context'},
        {label: 'Pivot', sectionId: 'pivot'},
        {label: 'Impact', sectionId: 'impact'},
        {label: 'Reflection', sectionId: 'reflection'},
    ]

    useEffect(() => {
        sessionStorage.setItem('lastVisitedCaseStudy', 'blueberry')
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
                <div className="flex flex-col gap-y-4 pt-6">
                    <h1>Blueberry</h1>
                    <p className="caption text-[#5e5e5d]">Product Design · 2025</p>
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
                    <h1 className="mt-4">Blueberry</h1>
                    <p className="caption text-[#5e5e5d] mt-2">Product Design · 2025</p>
                </div>

                <div className="flex flex-col gap-y-[6rem]">
                    <motion.div
                        data-section="hero"
                        variants={heroAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <CaseStudyCard
                            videoSrcWebm="/project-covers/blueberrysizzle.webm"
                            videoSrcMp4="/project-covers/blueberrysizzle.mp4"
                            title="Building trust into AI-powered comment management for eCommerce brands."
                            roles={['Product Designer']}
                            team={['Lauren Liang', 'Keiko Kobayashi', 'Shania Chacon', 'Valerie Peng']}
                            timeline="2025 · 10 Weeks"
                            tools={['Figma', 'V0', 'Prototyping']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        {/* 1. Solution — show the work first */}
                        <AnimatedSection
                            data-section="solution"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="my focus"
                                title="I owned rules, brand voice, and the final inbox"
                                description={`I focused on the highest-risk areas: the features that determined whether the AI's output would be reliable enough for operators to trust with real customers.`}
                                svgContent={
                                    <div className="flex flex-col gap-8 mt-[2.5rem]">
                                        <Image src="/work/blueberry/images/automationruleshowcase.png" alt="Automation rules showcase" width={0} height={0} sizes="100vw" className="w-full h-auto" />
                                        <Image src="/work/blueberry/images/brandvoiceshowcase.png" alt="Brand voice showcase" width={0} height={0} sizes="100vw" className="w-full h-auto" />
                                        <Image src="/work/blueberry/images/finalinboxshowcase.png" alt="Final inbox showcase" width={0} height={0} sizes="100vw" className="w-full h-auto" />
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="what shipped"
                                title="Automation: plain language over technical logic"
                                description={`Rules that read like sentences, not code. "When someone asks about shipping, reply with tracking info." A dedicated builder with mandatory sandbox testing before going live.`}
                                videoSrcMp4="/work/blueberry/videos/Automation.mp4"
                                mediaAlt="Blueberry automation rules interface"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Brand voice: natural language over rigid controls"
                                description={`Describe the tone you want in natural language, then preview how responses sound. No rigid sliders or dropdowns.`}
                                videoSrcMp4="/work/blueberry/videos/Brand voice.mp4"
                                mediaAlt="Blueberry brand voice configuration interface"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="The final inbox: scan fast, reply with context"
                                description={`Rows stay collapsed for fast scanning. Click to expand: full comment thread, original post, and AI draft with reasoning, all in one view.`}
                                videoSrcMp4="/work/blueberry/videos/inbox.mp4"
                                mediaAlt="Final inbox design with collapsed rows and expandable context"
                            />
                        </AnimatedSection>

                        {/* 2. Explorations — what didn't work */}
                        <AnimatedSection
                            data-section="explorations"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="explorations"
                                title="Early directions I killed"
                                description={`Two directions I explored and abandoned based on user feedback.`}
                                svgContent={
                                    <div className="flex flex-col gap-12 mt-[2.5rem]">
                                        <div>
                                            <h3 className="text-[16px] font-medium mb-2">Rules that felt like programming</h3>
                                            <p className="text-[#363636] mb-4">My first designs looked like logic builders with if/then statements. Users froze. I was designing for flexibility when I should have been designing for confidence.</p>
                                            <video className="w-full" controls={false} autoPlay playsInline muted loop>
                                                <source src="/work/blueberry/videos/programmablerulesbuilder.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium mb-2">Brand voice: real-time testing split attention</h3>
                                            <p className="text-[#363636] mb-4">A split interface with voice guidelines on the left and live testing on the right. Users got stuck constantly context-switching.</p>
                                            <Image src="/work/blueberry/images/brandvoice-exploration1.png" alt="Split interface exploration for brand voice" width={0} height={0} sizes="100vw" className="w-full h-auto" />
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 3. Context — the problem */}
                        <AnimatedSection
                            data-section="context"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="context"
                                title="Every unanswered comment is a lost sale"
                                description={`A customer asks if a best-seller is back in stock. 47 people are watching. By morning, 12 bought from a competitor who replied first.`}
                                imageSrc="/work/blueberry/images/unansweredcomment.png"
                                mediaAlt="Unanswered Instagram comment showing lost sales opportunity"
                            />
                            <CaseStudyContent
                                subtitle="the real problem"
                                title="It's not capability. It's reliability."
                                description={`Every growth lead we interviewed had tried AI tools and stopped. The output was unreliable and they couldn't trust it to represent their brand.`}
                                svgContent={
                                    <div className="border-l-2 border-[#171717] pl-6 py-4 mt-[2.5rem]">
                                        <p className="text-[18px] leading-[1.5]">
                                            &ldquo;Don&apos;t fully trust AI yet, but open to automation once I trust it over time.&rdquo;
                                        </p>
                                        <p className="text-[#999] text-sm mt-4">Growth Lead, $3M DTC skincare brand</p>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 4. Pivot */}
                        <AnimatedSection
                            data-section="pivot"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the pivot"
                                title="Our entire ICP flipped halfway through"
                                description={`Mid-project, we learned mid-sized eCommerce teams were the real opportunity, not startup founders. We chose speed: V0 for rapid prototypes, weekly testing, and reducing ambiguity fast enough to ship.`}
                                svgContent={
                                    <div className="flex flex-col md:flex-row gap-4 mt-[2.5rem]">
                                        <div className="flex-1 border border-[#E5E5E5] p-6">
                                            <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Assumed</p>
                                            <p className="font-medium text-lg">Startup founders</p>
                                            <p className="text-sm text-[#666] mt-2">Solo operators, low volume, price-sensitive</p>
                                        </div>
                                        <div className="hidden md:flex items-center justify-center text-[#999]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 border border-[#000] p-6">
                                            <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Discovered</p>
                                            <p className="font-medium text-lg">Mid-sized eComm teams</p>
                                            <p className="text-sm text-[#666] mt-2">$2M+ revenue, high volume, trust-focused</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="design principle"
                                title="AI assists first. Automates only when trusted."
                                description={`Every feature had to guarantee the AI's output was consistent, on-brand, and something operators would confidently send to real customers.`}
                            />
                        </AnimatedSection>

                        {/* 5. Impact */}
                        <AnimatedSection
                            data-section="impact"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="impact"
                                title="The numbers that matter"
                                description={`Over 10 weeks and 6 testing iterations. By the end, users weren't just approving AI suggestions. They were asking how to scale them.`}
                                svgContent={
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-[2.5rem]">
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">33%</p>
                                            <p className="text-[#363636] text-sm mt-3">improvement in usability score</p>
                                        </div>
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">72.5</p>
                                            <p className="text-[#363636] text-sm mt-3">average SUS score, above industry benchmark</p>
                                        </div>
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">7/7</p>
                                            <p className="text-[#363636] text-sm mt-3">ease rating on final onboarding</p>
                                        </div>
                                        <div>
                                            <p className="text-[48px] leading-none tracking-tight">6</p>
                                            <p className="text-[#363636] text-sm mt-3">weekly testing rounds</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 6. Reflection */}
                        <AnimatedSection
                            data-section="reflection"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="reflection"
                                title="What I learned"
                                description=""
                                mediaClassName="mt-[1.5rem]"
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Reliability beats intelligence.</h3>
                                            <p className="text-[#363636] mt-2">Users don't care how smart the AI is. They care whether it sounds like their brand every single time. Consistent, predictable output is what earns the trust to automate.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Pivots are a design skill.</h3>
                                            <p className="text-[#363636] mt-2">When our ICP flipped mid-project, the instinct was to start over. Instead we identified what transferred and what didn't, then moved fast on the delta. Speed came from clarity, not panic.</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Want to hear more?"
                                description={`This case study is the highlight reel. The real story has more texture: failed prototypes, scope debates, and the moment we almost shipped something that would have tanked trust. If you want the full picture, let's chat.`}
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
