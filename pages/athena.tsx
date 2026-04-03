// pages/athena.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import WorksNav, {Section} from '@/components/home/WorksNav'
import CaseStudyCard from '@/components/projects/CaseStudyCard'
import CaseStudyContent from '@/components/projects/CaseStudyContent'
import AnimatedSection from '@/components/AnimatedSection'
import {heroAnimation, fadeInUp, fadeInUpStagger} from '@/animations/animationVariants'
import Link from 'next/link'
import Image from 'next/image'
import ImageCarousel from '@/components/projects/ImageCarousel'
import {refreshCursor} from '@/cursor/useCursor'

export default function AthenaHQ() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)
    // const [isUnlocked, setIsUnlocked] = useState(true)
    // const [password, setPassword] = useState('')
    // const [error, setError] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Before', sectionId: 'before'},
        {label: 'Context', sectionId: 'context'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Exploration', sectionId: 'exploration'},
        {label: 'Precedent', sectionId: 'precedent'},
        {label: 'Decisions', sectionId: 'decisions'},
        {label: 'Outcome', sectionId: 'outcome'},
        {label: 'Reflection', sectionId: 'reflection'},
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
        sessionStorage.setItem('lastVisitedCaseStudy', 'athena')
    }, [])

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - scrollY / 400)

    /*
    // Password protection — commented out
    const [shake, setShake] = useState(false)
    const [errorIndex, setErrorIndex] = useState(0)
    const [failCount, setFailCount] = useState(0)
    const [bouncing, setBouncing] = useState(false)
    const [btnPos, setBtnPos] = useState({ x: 0, y: 0 })
    const [btnVel, setBtnVel] = useState({ dx: 3, dy: 2 })
    const btnRef = useRef<HTMLButtonElement>(null)
    const rafRef = useRef<number | null>(null)
    const posRef = useRef({ x: 0, y: 0 })
    const velRef = useRef({ dx: 3, dy: 2 })

    const errorMessages = [
        "Incorrect password.",
        "You sure you're on the right page?",
        "Still not it.",
        "Nope. Try asking nicely.",
        "That's not even close.",
        "At this point, just email me.",
        "I admire the persistence.",
        "Okay this is getting awkward.",
        "Last hint: it's not 'password123'.",
        "...you're still here?",
    ]

    useEffect(() => {
        if (!bouncing) return

        posRef.current = { x: window.innerWidth / 2 - 40, y: window.innerHeight / 2 }
        velRef.current = { dx: 3 + Math.random() * 2, dy: 2 + Math.random() * 2 }

        function animate() {
            const btn = btnRef.current
            if (!btn) return

            const w = btn.offsetWidth
            const h = btn.offsetHeight
            let { x, y } = posRef.current
            let { dx, dy } = velRef.current

            x += dx
            y += dy

            if (x <= 0 || x + w >= window.innerWidth) {
                dx = -dx
                x = x <= 0 ? 0 : window.innerWidth - w
            }
            if (y <= 0 || y + h >= window.innerHeight) {
                dy = -dy
                y = y <= 0 ? 0 : window.innerHeight - h
            }

            posRef.current = { x, y }
            velRef.current = { dx, dy }
            setBtnPos({ x, y })

            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [bouncing])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'platoisthegoat') {
            setIsUnlocked(true)
            setError(false)
            setBouncing(false)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            setTimeout(() => refreshCursor(), 100)
        } else {
            const newCount = failCount + 1
            setFailCount(newCount)
            setError(true)
            setShake(true)
            setErrorIndex((prev) => (prev + 1) % errorMessages.length)
            setTimeout(() => setShake(false), 600)
            if (newCount >= 5) {
                setBouncing(true)
                setTimeout(() => {
                    refreshCursor()
                    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 0, clientY: 0 }))
                    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }))
                }, 100)
            }
        }
    }

    if (!isUnlocked) {
        return (
            <div className="px-4 h-screen max-w-[1800px] mx-auto relative">
                <Link href="/" className="absolute top-4 left-4 w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>
                <main className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col">
                        <h2 className="uppercase">Protected</h2>
                        <h1 className="mt-[1.5rem]" style={{fontFamily: '"Self Modern"'}}>This case study is password protected.</h1>
                        <p className="text-[#363636] mt-[0.5rem]">Enter the password to continue.</p>
                        <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                                placeholder="Password"
                                className="border border-[#E5E5E5] px-3 py-2 text-[14px] font-[350] outline-none focus:border-[#171717] transition-colors"
                            />
                            {!bouncing && (
                                <button
                                    type="submit"
                                    className={`px-4 py-2 text-white text-[14px] font-[350] transition-colors hover-target-small ${error ? 'bg-[#F25410]' : 'bg-[#171717] hover:bg-[#333]'} ${shake ? 'animate-shake' : ''}`}
                                >
                                    Enter
                                </button>
                            )}
                        </form>
                        {bouncing && (
                            <button
                                ref={btnRef}
                                type="button"
                                onClick={() => {
                                    if (password === 'platoisthegoat') {
                                        setIsUnlocked(true)
                                        setBouncing(false)
                                        if (rafRef.current) cancelAnimationFrame(rafRef.current)
                                        setTimeout(() => refreshCursor(), 100)
                                    }
                                }}
                                className="fixed z-50 px-4 py-2 bg-[#F25410] text-white text-[14px] font-[350]"
                                style={{ left: btnPos.x, top: btnPos.y }}
                            >
                                Enter
                            </button>
                        )}
                        {error && (
                            <p className="mt-2 text-[13px] text-[#F25410] font-[350]">{errorMessages[errorIndex]}</p>
                        )}
                    </div>
                </main>
            </div>
        )
    }
    */

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
                        <h1 className="text-[18px] leading-[1.3] font-light" style={{fontFamily: '"Self Modern"'}}>AthenaHQ</h1>

                    </div>
                    <div className="flex items-center gap-x-1">
                        <p className="text-[11px] leading-none font-mono uppercase text-[#999]">Product Design</p>
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
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-[70vh] scrollbar-hidden"
            >
                {/* Mobile header */}
                <div className="flex flex-col md:hidden pt-4 pb-4 max-w-[768px] mx-auto w-full">
                    <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                        ← Back
                    </Link>
                    <h1 className="text-[18px] leading-[1.3] font-light mt-4" style={{fontFamily: '"Self Modern"'}}>AthenaHQ</h1>
                </div>

                <div className="flex flex-col gap-y-[6rem]">
                    <motion.div
                        data-section="hero"
                        variants={heroAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <CaseStudyCard
                            videoSrcMp4="/project-covers/athenahqpreview.mp4"
                            title="Designing a modular dashboard for marketers who need to monitor, interpret, and present AI visibility data."
                            roles={['Product Designer']}
                            team={['1 Designer', '4 Developers']}
                            timeline="5 Weeks"
                            tools={['Figma', 'Claude Code']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        {/* 1. Before — establish the problem visually */}
                        <AnimatedSection
                            data-section="before"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="before"
                                title="The original dashboard felt dense before users even knew where to look"
                                description="The problem was not a lack of data. It was that everything arrived at once: weak hierarchy, too many competing modules, and no clear path from monitoring to reporting."
                                svgContent={
                                    <div className="mt-[2.5rem]">
                                        <div className="relative overflow-hidden border border-[#E5E5E5] bg-[#FAFAFA]">
                                            <Image
                                                src="/work/olympus/images/old-dashboard.png"
                                                alt="Original Athena dashboard showing a dense wall of charts and tables"
                                                width={1920}
                                                height={1080}
                                                className="w-full h-auto"
                                            />

                                            <div className="absolute left-[4%] top-[8%] max-w-[180px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                                <p className="text-[11px] font-mono uppercase text-[#999]">Problem 01</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">No clear hierarchy. Every module competes for attention.</p>
                                            </div>

                                            <div className="absolute right-[4%] top-[18%] max-w-[190px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                                <p className="text-[11px] font-mono uppercase text-[#999]">Problem 02</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">Too many chart types and tables stacked at once.</p>
                                            </div>

                                            <div className="absolute left-[8%] bottom-[12%] max-w-[190px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                                <p className="text-[11px] font-mono uppercase text-[#999]">Problem 03</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">No role-based path for CMOs, SEOs, or analysts.</p>
                                            </div>

                                            <div className="absolute right-[8%] bottom-[8%] max-w-[210px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                                <p className="text-[11px] font-mono uppercase text-[#999]">Problem 04</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">Hard to turn what you see into a report teams can reuse.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <div className="border border-[#E5E5E5] p-4 bg-white">
                                                <p className="text-[12px] font-mono uppercase text-[#999]">Scanning</p>
                                                <p className="text-[#363636] mt-2">Users had to decode the layout before they could understand the data.</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-4 bg-white">
                                                <p className="text-[12px] font-mono uppercase text-[#999]">Investigation</p>
                                                <p className="text-[#363636] mt-2">The same dashboard tried to serve high-level monitoring and deep analysis at once.</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-4 bg-white">
                                                <p className="text-[12px] font-mono uppercase text-[#999]">Reporting</p>
                                                <p className="text-[#363636] mt-2">There was no clean way to turn insight into an artifact for decks or recurring updates.</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 2. Context — build tension */}
                        <AnimatedSection
                            data-section="context"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="context"
                                title="Different stakeholders, different needs, one dashboard"
                                description="Athena had strong AI visibility data, but one fixed dashboard was forcing very different users into the same workflow. As the product matured, the real challenge was not getting more data on screen. It was helping each role get to the job they came to do faster."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="What users needed"
                                description="The same product had to support fast executive monitoring, deeper investigation, and repeatable reporting."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">CMOs</p>
                                            <p className="text-[#171717] mt-2">Needed a fast pulse on brand momentum without wading through the full system.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">SEOs</p>
                                            <p className="text-[#171717] mt-2">Needed prompt-level visibility so they could investigate what changed and why.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="text-[12px] font-mono uppercase text-[#999]">Analysts</p>
                                            <p className="text-[#171717] mt-2">Needed reusable outputs they could bring into recurring leadership updates.</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Signal from research"
                                description="One interview line captured the gap between having data and actually being able to use it."
                                svgContent={
                                    <div className="border-l-2 border-[#171717] pl-6 py-4">
                                        <p className="text-[18px] leading-[1.5]" style={{fontFamily: '"Self Modern"'}}>
                                            &ldquo;I&apos;ve got all the instruments that I need. But I gotta put together a symphony now.&rdquo;
                                        </p>
                                        <p className="text-[#999] text-sm mt-4">CMO, Coinbase Canada</p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Design goals"
                                description="I reframed the opportunity around the three jobs the dashboard actually needed to support: quick monitoring, deeper investigation, and easier reporting."
                                svgContent={
                                    <div className="flex flex-col gap-y-6">
                                        <div className="border-l-2 border-[#171717] pl-6 py-4">
                                            <p className="text-[18px] leading-[1.5]" style={{fontFamily: '"Self Modern"'}}>
                                                How might we turn Athena&apos;s AI visibility data into a dashboard that supports quick monitoring, deeper investigation, and easier reporting?
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-[16px] font-medium">Compare the right slices of data</h3>
                                                <p className="text-[#363636] mt-2">Make it easy to shift between brand terms, products, markets, and growth signals.</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-medium">Create a simple reporting rhythm</h3>
                                                <p className="text-[#363636] mt-2">Support a repeatable flow from data point to insight to next action.</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-medium">Export cleanly into decks and docs</h3>
                                                <p className="text-[#363636] mt-2">Help teams move useful evidence out of the dashboard without reformatting it by hand.</p>
                                            </div>
                                            <div>
                                                <h3 className="text-[16px] font-medium">Create a shared source of truth</h3>
                                                <p className="text-[#363636] mt-2">Give different roles one system they can trust even if they use it in different ways.</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 3. Solution — the payoff */}
                        <AnimatedSection
                            data-section="solution"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="solution"
                                title="A strong default that works out of the box"
                                description="Olympus opens with a structured overview: key metrics first, deeper modules below. Users can get oriented immediately without configuring anything."
                                imageSrc="/work/olympus/images/dashboard.png"
                                mediaAlt="Olympus default dashboard showing share of voice, brand traits, citation rate, and model-level visibility"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="One system for different views and roles"
                                description="Rather than creating separate dashboards for CMOs, SEOs, and PMMs, the system lets teams select, reorder, and remove widgets to match the questions they care about most."
                                imageSrc="/work/olympus/images/dashboard-settings.png"
                                mediaAlt="Dashboard settings panel showing selected and configurable widget modules"
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="From dashboard to presentation in one click"
                                description="The key feature was not the export button itself. It was the artifact users got from it: clean widget graphics they could drop straight into decks and recurring updates. Reset kept that workflow low-risk."
                                svgContent={
                                    <div className="mt-[2.5rem] border border-[#E5E5E5] bg-[#FAFAFA] p-4 md:p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_auto_1fr] gap-4 md:gap-6 items-center">
                                            <div className="bg-white border border-[#E5E5E5] p-3">
                                                <p className="text-[11px] font-mono uppercase text-[#999]">Inside Athena</p>
                                                <Image
                                                    src="/work/olympus/images/dashboard.png"
                                                    alt="Athena dashboard widget view"
                                                    width={1920}
                                                    height={1080}
                                                    className="w-full h-auto mt-3"
                                                />
                                            </div>

                                            <div className="flex md:flex-col items-center justify-center gap-3">
                                                <div className="border border-[#171717] bg-white px-4 py-2 text-[12px] font-mono uppercase tracking-wide">
                                                    Export PNG
                                                </div>
                                                <div className="text-[#999] text-[12px] font-mono uppercase">then</div>
                                                <div className="border border-[#E5E5E5] bg-white px-4 py-2 text-[12px] font-mono uppercase tracking-wide">
                                                    Drop into deck
                                                </div>
                                            </div>

                                            <div className="relative min-h-[240px] bg-[#F3F1EC] border border-[#E5E5E5] p-4 overflow-hidden">
                                                <p className="text-[11px] font-mono uppercase text-[#999]">What export creates</p>
                                                <div className="absolute left-6 top-12 w-[58%] rotate-[-8deg] border border-[#D8D8D8] bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                                                    <div className="h-[74px] bg-[#F7F7F7] border border-[#ECECEC]" />
                                                    <p className="text-[11px] text-[#666] mt-2">Share of voice widget</p>
                                                </div>
                                                <div className="absolute right-6 top-20 w-[56%] rotate-[6deg] border border-[#D8D8D8] bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                                                    <div className="h-[74px] bg-[#F7F7F7] border border-[#ECECEC]" />
                                                    <p className="text-[11px] text-[#666] mt-2">Brand traits widget</p>
                                                </div>
                                                <div className="absolute left-10 bottom-5 right-10 border border-[#D8D8D8] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                                                    <p className="text-[11px] font-mono uppercase text-[#999]">Slide deck</p>
                                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                                        <div className="h-[56px] bg-[#F7F7F7] border border-[#ECECEC]" />
                                                        <div className="h-[56px] bg-[#F7F7F7] border border-[#ECECEC]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 4. Exploration — a direction we cut */}
                        <AnimatedSection
                            data-section="exploration"
                            variants={fadeInUp}
                        >
                            <div className="w-full max-w-[768px] mx-auto">
                                <h2 className="uppercase font-mono text-[12px]">Exploration</h2>
                                <h1 className="mt-[1.5rem]" style={{fontFamily: '"Self Modern"'}}>Full report generation was too heavy</h1>
                                <p className="text-[#363636] mt-[0.5rem] max-w-[60ch]">We explored a multi-step flow for generating PDF reports from dashboard data: pick a goal, select focus areas, and export a formatted document. But the workflow was too tedious. Users didn't want a new artifact. They wanted to pull specific widgets into existing decks and docs. That insight pushed export toward the simpler widget-level action instead.</p>
                                <ImageCarousel
                                    className="mt-[2.5rem]"
                                    slides={[
                                        { src: '/work/olympus/images/report-goal.png', alt: 'Report goal selection with templates', label: 'Choose a report goal' },
                                        { src: '/work/olympus/images/report-templates.png', alt: 'Report templates and custom prompt', label: 'Templates or write your own' },
                                        { src: '/work/olympus/images/report-prompt.png', alt: 'Custom prompt input for report generation', label: 'Custom prompt input' },
                                        { src: '/work/olympus/images/report-focus.png', alt: 'Focus areas selection with draggable modules', label: 'Select focus areas' },
                                        { src: '/work/olympus/images/report-output.png', alt: 'Generated report with high-impact insights', label: 'Generated report output' },
                                    ]}
                                />
                            </div>
                        </AnimatedSection>

                        {/* 5. Precedent — industry validation */}
                        <AnimatedSection
                            data-section="precedent"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="precedent"
                                title="This pattern already works at scale"
                                description="Stripe and Shopify both use modular, customizable dashboards. Strong defaults with the ability to add, remove, and rearrange widgets."
                            />
                            <div className="w-full max-w-[768px] mx-auto">
                                <h3 className="text-[16px] font-medium">Stripe</h3>
                                <p className="text-[#363636] mt-[0.5rem] max-w-[60ch]">Default overview with + Add and Edit controls. Edit mode lets users remove widgets. + Add opens a picker to pull in new ones.</p>
                                <ImageCarousel
                                    className="mt-[2.5rem]"
                                    slides={[
                                        { src: '/work/olympus/images/precedent/stripe-default.png', alt: 'Stripe default dashboard overview', label: 'Default dashboard' },
                                        { src: '/work/olympus/images/precedent/stripe-edit.png', alt: 'Stripe edit mode with removable widgets', label: 'Edit mode' },
                                        { src: '/work/olympus/images/precedent/stripe-add.png', alt: 'Stripe widget picker modal', label: 'Add widgets from picker' },
                                    ]}
                                />
                            </div>
                            <div className="w-full max-w-[768px] mx-auto">
                                <h3 className="text-[16px] font-medium">Shopify</h3>
                                <p className="text-[#363636] mt-[0.5rem] max-w-[60ch]">Users can drag, reposition, and resize displayed analytics to their liking.</p>
                                <Image src="/work/olympus/images/precedent/shopify-customize.png" alt="Shopify analytics library for drag, reposition, and resize" width={0} height={0} sizes="100vw" className="w-full h-auto mt-[2.5rem]" />
                                <p className="text-[12px] text-[#999] font-mono mt-2">Analytics dashboard customization</p>
                            </div>
                        </AnimatedSection>

                        {/* 4. Key Design Decisions */}
                        <AnimatedSection
                            data-section="decisions"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="key decisions"
                                title=""
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Useful by default, customizable when needed</h3>
                                            <p className="text-[#363636] mt-2">The dashboard has to feel useful before anyone touches settings. Customization is additive, not required.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Each widget helps tell the story</h3>
                                            <p className="text-[#363636] mt-2">Each module plays a role: summarize, compare, track momentum, or investigate. The point was not just to show data, but to make it easier to communicate.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Communication over analysis</h3>
                                            <p className="text-[#363636] mt-2">The biggest unmet need was getting insights out of the product and into decks, docs, and recurring updates.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Safe to experiment</h3>
                                            <p className="text-[#363636] mt-2">Reset returns users to a known baseline. Flexibility should feel approachable, not risky.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 4. Outcome */}
                        <AnimatedSection
                            data-section="outcome"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="outcome"
                                title="From vision to roadmap"
                                description="The Olympus concept became the foundation for AthenaHQ's Q1 dashboard redesign. Configurable widgets and the export workflow shipped as the default architecture, replacing the original fixed layout."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                                        <div>
                                            <h3 className="text-[32px] font-light leading-none" style={{fontFamily: '"Self Modern"'}}>2x</h3>
                                            <p className="text-[#363636] mt-2">Peak daily active users after the modular Olympus dashboard shipped.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[32px] font-light leading-none" style={{fontFamily: '"Self Modern"'}}>25%</h3>
                                            <p className="text-[#363636] mt-2">Increase in feature adoption from the Proactive Insights Engine, which translated complex AI signals into actionable guidance.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[32px] font-light leading-none" style={{fontFamily: '"Self Modern"'}}>~2 months</h3>
                                            <p className="text-[#363636] mt-2">Of engineering time saved by pivoting through user research before building a low-impact feature.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 5. Reflection */}
                        <AnimatedSection
                            data-section="reflection"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="reflection"
                                title="A dashboard is rarely just a dashboard"
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Dashboards sit inside workflows.</h3>
                                            <p className="text-[#363636] mt-2">The hardest part was not choosing which charts to show. It was figuring out how one system could stay coherent while serving different stakeholders and supporting the stories they need to tell.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">AI accelerated direction, not decisions.</h3>
                                            <p className="text-[#363636] mt-2">Claude Code helped me move faster through interface directions. But the real work was defining product logic, user needs, and the kind of experience Athena needed to become.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
