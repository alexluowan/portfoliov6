'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import GridContainer from '@/components/GridContainer'
import CaseStudyCard from '@/components/projects/CaseStudyCard'
import CaseStudyContent from '@/components/projects/CaseStudyContent'
import WorksNav, {Section} from '@/components/home/WorksNav'
import AnimatedSection from '@/components/AnimatedSection'
import {heroAnimation, fadeInUp, fadeInUpStagger} from '@/animations/animationVariants'
import Link from 'next/link'

export default function BlueberrySocial() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Context', sectionId: 'context'},
        {label: 'Process', sectionId: 'process'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Impact', sectionId: 'impact'},
        {label: "What's Next", sectionId: 'next'},
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
                    Turn missed comments into sales.
                </p>
                <div className="mt-4">
                    <WorksNav
                        scrollContainerRef={mainRef}
                        sections={sections}
                        showTimeline={true}
                    />
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
                            videoSrcMp4="/project-covers/blueberrysizzle.mp4"
                            title="Designing Blueberry's AI inbox so operators trust automation and turn comments into conversion moments."
                            roles={['Product Designer']}
                            team={['Lauren Liang', 'Keiko Kobayashi', 'Shania Chacon', 'Valerie Peng']}
                            timeline="2025 · 10 Weeks"
                            tools={['Figma', 'V0', 'Prototyping']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        {/* Context Section */}
                        <AnimatedSection
                            data-section="context"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="context"
                                title="Every unanswered comment is a lost sale"
                                description={`It's 11 PM. Maya, a growth lead at a $3M skincare brand, watches a customer ask if her best-seller is back in stock. 47 people are watching. By morning, 12 bought from a competitor who replied first. Maya faces this daily: hundreds of comments across Instagram, Facebook, and TikTok. She's tried hiring more, building internal tools, experimenting with AI. Nothing sticks. AI tools sound robotic. Internal tools can't keep up.`}
                                imageSrc="/work/blueberry/images/unansweredcomment.png"
                                mediaAlt="Unanswered Instagram comment showing lost sales opportunity"
                            />
                            <CaseStudyContent
                                subtitle="so what?"
                                title="This isn't a feature problem. It's a trust problem."
                                description={`We interviewed growth leads at mid-sized eCommerce brands. Every one had tried AI tools. Every one had stopped. Not because of capability. Because of fear. The pattern: AI adoption fails when operators can't see or control what it does.`}
                                svgContent={
                                    <div className="mt-[2.5rem]">
                                        <p className="text-2xl md:text-3xl italic text-[#363636] leading-relaxed">
                                            "Don't fully trust AI yet, but open to automation once I trust it over time."
                                        </p>
                                        <p className="text-sm text-[#999] mt-4">
                                            — Growth Lead, Mid-sized eCommerce Brand
                                        </p>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* Process Section */}
                        <AnimatedSection
                            data-section="process"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="process"
                                title="The pivot that changed everything"
                                description={`Halfway through, everything changed. We'd spent weeks building for startup founders. Then the co-founders came back with new data: mid-sized eCommerce brands were the real opportunity. Our entire ICP flipped. Instead of solo entrepreneurs, we were designing for growth teams at brands doing millions in revenue. We had a choice: panic or adapt. We chose speed. V0 for rapid prototypes. Weekly testing sessions. The goal wasn't perfection. It was reducing ambiguity fast enough to ship something valuable.`}
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
                                        <div className="flex-1 border border-[#E5E5E5] p-6">
                                            <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Discovered</p>
                                            <p className="font-medium text-lg">Mid-sized eComm teams</p>
                                            <p className="text-sm text-[#666] mt-2">$2M+ revenue, high volume, trust-focused</p>
                                        </div>
                                        <div className="hidden md:flex items-center justify-center text-[#999]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 border border-[#000] p-6">
                                            <p className="text-xs text-[#999] uppercase tracking-wider mb-2">Pivoted to</p>
                                            <p className="font-medium text-lg">Trust-first automation</p>
                                            <p className="text-sm text-[#666] mt-2">Visibility, control, reversibility</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="design principle"
                                title="AI assists first. Automates only when trusted."
                                description={`This became our north star. Every feature had to let humans see what AI was doing, understand why, and override it instantly. No black boxes. No "magic." We rejected directions that violated this principle. Each would have shipped faster. Each would have failed in the market.`}
                            />
                        </AnimatedSection>

                        {/* Solution Section */}
                        <AnimatedSection
                            data-section="solution"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="my focus"
                                title="I owned rules, brand voice, and the final inbox"
                                description={`While my teammates tackled onboarding and early inbox explorations, I focused on the features that would make or break trust: the automation rules system, brand voice configuration, and bringing the inbox to its final form. These were the highest-risk areas because they determined whether users would actually flip the switch on automation.`}
                                svgContent={
                                    <div className="flex flex-col gap-8 mt-[2.5rem]">
                                        <img src="/work/blueberry/images/automationruleshowcase.png" alt="Automation rules showcase" className="w-full" />
                                        <img src="/work/blueberry/images/brandvoiceshowcase.png" alt="Brand voice showcase" className="w-full" />
                                        <img src="/work/blueberry/images/finalinboxshowcase.png" alt="Final inbox showcase" className="w-full" />
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="what I rejected"
                                title="Early explorations that didn't work"
                                description={`Two directions I explored and abandoned based on user feedback.`}
                                svgContent={
                                    <div className="flex flex-col gap-12 mt-[2.5rem]">
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Rules that felt like programming</h3>
                                            <p className="text-[#363636] mb-4">My first automation designs looked like logic builders: if/then statements, nested conditions, technical syntax. Users froze. "Rules look a bit intimidating," one participant told us. I was designing for flexibility when I should have been designing for confidence.</p>
                                            <video className="w-full" controls={false} autoPlay playsInline muted loop>
                                                <source src="/work/blueberry/videos/programmablerulesbuilder.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Brand voice: real-time testing split attention</h3>
                                            <p className="text-[#363636] mb-4">I designed a split interface with voice guidelines on the left and live testing on the right. The hypothesis: real-time feedback builds confidence faster. Users got stuck—constant context-switching between typing traits and checking output.</p>
                                            <img src="/work/blueberry/images/brandvoice-exploration1.png" alt="Split interface exploration for brand voice" className="w-full" />
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="what shipped"
                                title="Automation: plain language over technical logic"
                                description={`I borrowed from Apple Shortcuts: rules that read like sentences, not code. "When someone asks about shipping, reply with tracking info." A dedicated builder page replaced cramped modals. Mandatory sandbox testing before going live. Teams could experiment knowing they could always revert. The goal: make automation feel reversible, not permanent.`}
                                videoSrcMp4="/work/blueberry/videos/Automation.mp4"
                                mediaAlt="Blueberry automation rules interface"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Brand voice: showing the AI's reasoning"
                                description={`Early designs hid how AI made decisions. Users didn't trust it. I added inline explanations: why the AI chose specific words, how it applied brand guidelines. Real-time adaptation as users edited. Every suggestion editable and transparent. When one user asked "Can you save multiple brand voices?"—I knew we'd earned enough trust for them to think about scaling.`}
                                videoSrcMp4="/work/blueberry/videos/Brand voice.mp4"
                                mediaAlt="Blueberry brand voice configuration interface"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="The final inbox: scan fast, reply with context"
                                description={`Rows stay collapsed for fast scanning. Click to expand: full comment thread, original post, AI draft with reasoning—all in one view. No tab switching. No split screens. One participant rated it 6.5/7: "Easy to navigate. Each one has good buttons around each section."`}
                                videoSrcMp4="/work/blueberry/videos/inbox.mp4"
                                mediaAlt="Final inbox design with collapsed rows and expandable context"
                            />
                        </AnimatedSection>

                        {/* Impact Section */}
                        <AnimatedSection
                            data-section="impact"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="impact"
                                title="The numbers that matter"
                                description={`Over 10 weeks and 6 testing iterations, we moved the metrics that matter. One participant summarized: "Super easy and it took exactly what you needed." By the end, users weren't just approving AI suggestions. They were asking how to scale them.`}
                                svgContent={
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[2.5rem]">
                                        <div className="border border-[#E5E5E5] p-6 text-center">
                                            <p className="text-3xl font-medium">60 → 80</p>
                                            <p className="text-sm text-[#666] mt-2">SUS Score</p>
                                            <p className="text-xs text-[#999] mt-1">33% improvement</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-6 text-center">
                                            <p className="text-3xl font-medium">72.5</p>
                                            <p className="text-sm text-[#666] mt-2">Avg SUS</p>
                                            <p className="text-xs text-[#999] mt-1">Above 68 benchmark</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-6 text-center">
                                            <p className="text-3xl font-medium">7/7</p>
                                            <p className="text-sm text-[#666] mt-2">Ease Rating</p>
                                            <p className="text-xs text-[#999] mt-1">Final onboarding</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-6 text-center">
                                            <p className="text-3xl font-medium">6</p>
                                            <p className="text-sm text-[#666] mt-2">Test Rounds</p>
                                            <p className="text-xs text-[#999] mt-1">Weekly iterations</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="reflection"
                                title="What this project taught me"
                                description={`Designing the rules and brand voice systems taught me that trust is earned in small moments, not big features. Every decision I made came back to one question: can the user see what's happening and undo it if needed? The best AI tools don't replace humans. They make human judgment faster and more confident. That principle will shape every AI product I work on.`}
                            />
                        </AnimatedSection>

                        {/* What's Next Section */}
                        <AnimatedSection
                            data-section="next"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="what's next"
                                title="Securing the position, then expanding"
                                description={`The MVP shipped. Now the product roadmap focuses on entrenching value before expanding scope. Each phase builds on the trust foundation we established.`}
                                svgContent={
                                    <div className="flex flex-col gap-4 mt-[2.5rem]">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#000] text-white flex items-center justify-center text-sm font-medium">1</div>
                                            <div className="flex-1 border border-[#E5E5E5] p-4">
                                                <p className="font-medium">Sequential rules system</p>
                                                <p className="text-sm text-[#666] mt-1">Clearer automation setup for teams to define and understand their logic</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#E5E5E5] text-[#666] flex items-center justify-center text-sm font-medium">2</div>
                                            <div className="flex-1 border border-[#E5E5E5] p-4">
                                                <p className="font-medium">DM functionality</p>
                                                <p className="text-sm text-[#666] mt-1">Handle private conversations alongside public comments</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#E5E5E5] text-[#666] flex items-center justify-center text-sm font-medium">3</div>
                                            <div className="flex-1 border border-[#E5E5E5] p-4">
                                                <p className="font-medium">Strategic dashboard</p>
                                                <p className="text-sm text-[#666] mt-1">Sentiment trends and engagement analytics</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="let's talk"
                                title="This case study is the highlight reel"
                                description={`The real story has more texture: failed prototypes, scope debates, the moment we almost shipped something that would have tanked trust. If you're building AI products and navigating similar trade-offs, I'd love to compare notes. If you're hiring and want to see how I think through ambiguous problems, let's talk.`}
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
        </GridContainer>
    )
}

