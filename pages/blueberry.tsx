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
        {label: 'Overview', sectionId: 'overview'},
        {label: 'Problem', sectionId: 'problem'},
        {label: 'Brief', sectionId: 'brief'},
        {label: 'Research', sectionId: 'research'},
        {label: 'Direction', sectionId: 'direction'},
        {label: 'Inbox', sectionId: 'inbox'},
        {label: 'Brand Voice', sectionId: 'brand-voice'},
        {label: 'Automation', sectionId: 'automation'},
        {label: 'Final Design', sectionId: 'final-design'},
        {label: 'Outcome', sectionId: 'outcome'},
        {label: 'Retrospective', sectionId: 'retro'},
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
                    The 1:1 AI marketer for B2C brands.
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
                            imageSrc="/project-covers/blueberry-card.svg"
                            title="Designing Blueberry’s AI inbox so operators trust automation and turn comments into conversion moments."
                            roles={['UI & Prototyping Lead']}
                            team={['Lauren Liang', 'Keiko Kobayashi', 'Shania Chacon', 'Valerie Peng']}
                            timeline="2025 · 5 Weeks"
                            tools={['Figma', 'ChatGPT', 'V0']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        <AnimatedSection
                            data-section="overview"
                            className="flex flex-col gap-y-[8rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="introduction"
                                title="Blueberry Social"
                                description={`E-commerce brands still lose sales in Instagram comments. High-intent questions sink between spam, and teams ignore AI when they cannot see or fix its choices. Blueberry turns those comments into revenue with on-voice replies, edits that teach, and automation for routine asks. I led visual design and prototyping, shipped the inbox, brand voice, and automation surfaces, and co-built launch prototypes through a mid-project pivot.`}
                            />
                            <CaseStudyContent
                                subtitle="overview"
                                title="Reply faster, scale safer"
                                description={`The redesign focused on three essentials. A hybrid inbox balances scan speed with context. A brand voice flow learns from real edits. Automation rules keep controls clear and reviews simple. Together they turn comment threads into on-brand revenue moments without risking trust.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="problem"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="problem"
                                title="Unanswered buyers, lost revenue"
                                description={`A single drop can spark five hundred comments in a day. Buyers asking for links or shipping answers get buried under updates and spam. Teams hire more people, reply late, or refuse AI because one public miss can bruise the brand.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="brief"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the brief"
                                title="Build trust in AI replies"
                                description={`How might we help teams trust AI replies enough to hand off customer conversations? We bet that showing the AI's reasoning and making refinements effortless would unlock earlier trust, faster replies, and new revenue hidden in comments.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="research"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="the pivot"
                                title="Same timeline, new product"
                                description={`Midway through, the founders pivoted from Socialite, a social listening tool, to Blueberry Social, a comment manager for e-commerce brands. The five-week deadline held while we rebuilt flows, rewrote UI, and paired with engineers shipping in parallel.`}
                            />
                            <CaseStudyContent
                                subtitle="research and validation"
                                title="What user testing surfaced"
                                description={`Interviews with seven growth marketers exposed three blockers. Hidden context slowed every reply. AI drafts had to sit beside the thread to feel trustworthy. Dense layouts stalled people because no clear first step existed. The takeaway: trust grows when reasoning stays inline and edits land instantly.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="direction"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="design direction"
                                title="Where trust is won or lost"
                                description={`We focused on three surfaces: surface context without overload, let teams shape tone through real edits, and make automation feel safe to enable. Every design choice reinforced visible control.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="inbox"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="exploration — inbox"
                                title="Hybrid inbox: scan fast, reply with context"
                                description={`Showing every comment at once overloaded operators, while one-at-a-time views slowed them down. The final hybrid inbox keeps rows collapsed for scanning, then expands to reveal the thread, AI draft, and source context in one place. Operators move from scan to send without tab hopping.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="brand-voice"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="exploration — brand voice"
                                title="Exploration 1: Real-time preview split attention"
                                description={`A split layout with guidelines on the left and live tests on the right promised instant feedback yet forced constant context switching. People rewrote traits, checked output, and looped, unsure which pane to watch.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Exploration 2: Progressive disclosure worked"
                                description={`Collapsing setup into a single column let teams define tone without distraction. A modal preview showed multiple cases side by side, exposing inconsistencies the split view hid. The clearer flow encouraged deeper, calmer guideline work.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="automation"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="exploration — automation"
                                title="Exploration 1: Rules that read like sentences"
                                description={`Automation logic now reads the way people think: “When someone mentions your brand, then reply.” Plain language with dropdowns blocks vague triggers and mirrors familiar tools like Apple Shortcuts, so non-technical teams know what fires.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Exploration 2: Make complex rules safe"
                                description={`Early modals cramped decisions and hid review. A dedicated builder page gives room to reason through complex triggers, adds a review step before launch, and logs every change so automation can scale without public mistakes.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="final-design"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="final design"
                                title="Onboarding without friction"
                                description={`Paste a store URL and Blueberry pulls the brand name, icon, and connects Meta Business Suite. Teams land inside with their identity already set, so the first reply arrives before friction creeps in.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Flexible, fast inbox"
                                description={`The hybrid inbox keeps the queue light for scanning, expands for context, and adds quick filters across platform and comment type. Inline assist handles rewrite or regenerate before send, making AI help visible and controllable.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Brand voice learned from real edits"
                                description={`Teams define traits in a focused view, preview across scenarios, and pull knowledge from their site to ground responses in real policies. Each edit shapes future drafts, so the AI mirrors tone without long training loops.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Automation with guardrails"
                                description={`A dedicated page lets operators draft sentence-based rules, review the “when → then” logic, and launch with human-in-the-loop defaults. Confidence gates, audit logs, and one-click revert keep experiments safe.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="outcome"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="outcome"
                                title="Adoption and satisfaction up"
                                description={`The shipped MVP grew onboarded brands from one to seven, doubled weekly active users from two to four, raised the SUS score from sixty to eighty, and delivered a pilot CSAT of five out of five. Blueberry kept brand voice intact while making automation usable.`}
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="retro"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="retrospective"
                                title="Prototype to learn, not to impress"
                                description={`Scrappy prototypes surfaced blockers—hidden AI and unclear next steps—days sooner than polished visuals. Next time I would instrument enable-in-first-session, edit distance, and first-reply time even earlier.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Bring engineering in early"
                                description={`Weekly feasibility checks turned safety ideas into shippable constraints. Moving from modals to full pages, setting confidence thresholds, and adding logging all landed because engineering stayed in the room.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Cut scope to raise clarity"
                                description={`Focusing on comments instead of DMs sharpened the hybrid inbox and the learning cues. Future sprints will time-box side bets and end them fast when they dilute the core story.`}
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Design through pivots"
                                description={`The mid-sprint pivot reinforced the value of tackling the riskiest assumptions first. When the market changed, I narrowed in on the blockers research exposed and iterated directly against them.`}
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>
        </GridContainer>
    )
}

