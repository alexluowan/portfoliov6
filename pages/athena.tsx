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
        {label: 'Impact', sectionId: 'impact'},
        {label: 'Challenge', sectionId: 'challenge'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Decisions', sectionId: 'decisions'},
        {label: 'Learnings', sectionId: 'learnings'},
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
                        <h1 className="mt-[1.5rem]">This case study is password protected.</h1>
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
                <div className="flex flex-col gap-y-4 pt-6">
                    <h1>AthenaHQ</h1>
                    <p className="caption text-[#5e5e5d]">Product Design</p>
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
                    <h1 className="mt-4">AthenaHQ</h1>
                    <p className="caption text-[#5e5e5d] mt-2">Product Design</p>
                </div>

                <div className="flex flex-col gap-y-[6rem]">
                    <motion.div
                        data-section="hero"
                        variants={heroAnimation}
                        initial="hidden"
                        animate="visible"
                    >
                        <CaseStudyCard
                            videoSrcWebm="/project-covers/athenahqpreview.webm"
                            videoSrcMp4="/project-covers/athenahqpreview.mp4"
                            title="Create a dashboard where every marketer can turn AI visibility data into answers on their own terms."
                            roles={['Product Designer']}
                            team={['1 Designer', '4 Developers']}
                            timeline="5 Weeks"
                            tools={['Figma', 'Claude Code']}
                        />
                    </motion.div>

                    <div className="flex flex-col gap-y-[8rem]">
                        {/* 1. Impact — lead with the business result */}
                        <AnimatedSection
                            data-section="impact"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="Impact"
                                title="Olympus shipped as AthenaHQ's Q1 dashboard redesign"
                                description="Configurable widgets and widget-level export replaced the original fixed layout as the default architecture."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                                        <div>
                                            <h1 className="text-black">2x</h1>
                                            <p className="text-[#5e5e5d] mt-2">Peak daily active users after Olympus shipped. The page users kept leaving became the one they came back to.</p>
                                        </div>
                                        <div>
                                            <h1 className="text-black">25%</h1>
                                            <p className="text-[#5e5e5d] mt-2">Increase in feature adoption from the Proactive Insights Engine.</p>
                                        </div>
                                        <div>
                                            <h1 className="text-black">~2 months</h1>
                                            <p className="text-[#5e5e5d] mt-2">Of engineering time saved by killing a low-impact feature in research before it was built.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 2. Challenge — the problem, who it hit, and the jobs to solve */}
                        <AnimatedSection
                            data-section="challenge"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="The Challenge"
                                title="Users were leaving the dashboard to find answers elsewhere"
                                description="Two signals made the problem concrete. Users were churning off the dashboard onto other pages inside Athena, and the ones who stayed took too long to find what they needed — the answer might be sitting at the very bottom of the page. The dashboard was meant to be home base, but it was the page people left fastest."
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

                                            <div className="absolute left-[4%] top-[8%] max-w-[180px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_24px_56px_rgba(0,0,0,0.28)]">
                                                <p className="caption text-[#5e5e5d]">Problem 01</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">No clear hierarchy. Every module competes for attention.</p>
                                            </div>

                                            <div className="absolute right-[4%] top-[18%] max-w-[190px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_24px_56px_rgba(0,0,0,0.28)]">
                                                <p className="caption text-[#5e5e5d]">Problem 02</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">One long stack of modules. Answers could sit at the very bottom.</p>
                                            </div>

                                            <div className="absolute left-[8%] bottom-[12%] max-w-[190px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_24px_56px_rgba(0,0,0,0.28)]">
                                                <p className="caption text-[#5e5e5d]">Problem 03</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">No role-based path for CMOs, SEOs, or analysts.</p>
                                            </div>

                                            <div className="absolute right-[8%] bottom-[8%] max-w-[210px] border border-[#171717] bg-white/95 px-3 py-2 shadow-[0_24px_56px_rgba(0,0,0,0.28)]">
                                                <p className="caption text-[#5e5e5d]">Problem 04</p>
                                                <p className="mt-1 text-[13px] text-[#171717]">Hard to turn what you see into a report teams can reuse.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <div className="border border-[#E5E5E5] p-4 bg-white">
                                                <p className="caption text-[#5e5e5d]">Scanning</p>
                                                <p className="text-[#363636] mt-2">Finding a single answer could mean scrolling the entire page.</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-4 bg-white">
                                                <p className="caption text-[#5e5e5d]">Investigation</p>
                                                <p className="text-[#363636] mt-2">The same dashboard tried to serve high-level monitoring and deep analysis at once.</p>
                                            </div>
                                            <div className="border border-[#E5E5E5] p-4 bg-white">
                                                <p className="caption text-[#5e5e5d]">Reporting</p>
                                                <p className="text-[#363636] mt-2">There was no clean way to turn insight into an artifact for decks or recurring updates.</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="What users needed"
                                description="The data each person needed depended on their role. The dashboard gave everyone the same fixed page."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="caption text-[#5e5e5d]">CMOs</p>
                                            <p className="text-[#171717] mt-2">Needed a fast pulse on brand momentum without wading through the full system.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="caption text-[#5e5e5d]">SEOs</p>
                                            <p className="text-[#171717] mt-2">Needed prompt-level visibility so they could investigate what changed and why.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="caption text-[#5e5e5d]">Analysts</p>
                                            <p className="text-[#171717] mt-2">Needed reusable outputs they could bring into recurring leadership updates.</p>
                                        </div>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle=""
                                title="Three jobs the redesign had to nail"
                                description="Every design direction was judged against the three things users actually came to the dashboard to do."
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="caption text-[#5e5e5d]">01 — Monitor</p>
                                            <p className="text-[#171717] mt-2">Get a read on brand momentum in seconds, not scrolls.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="caption text-[#5e5e5d]">02 — Investigate</p>
                                            <p className="text-[#171717] mt-2">Dig into what changed and why without leaving the page.</p>
                                        </div>
                                        <div className="border border-[#E5E5E5] p-5 bg-white">
                                            <p className="caption text-[#5e5e5d]">03 — Report</p>
                                            <p className="text-[#171717] mt-2">Turn what you see into something leadership can use.</p>
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
                                subtitle="Solution"
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
                                                <p className="caption text-[#5e5e5d]">Inside Athena</p>
                                                <Image
                                                    src="/work/olympus/images/dashboard.png"
                                                    alt="Athena dashboard widget view"
                                                    width={1920}
                                                    height={1080}
                                                    className="w-full h-auto mt-3"
                                                />
                                            </div>

                                            <div className="flex md:flex-col items-center justify-center gap-3">
                                                <div className="border border-[#171717] bg-white px-4 py-2 caption">
                                                    Export PNG
                                                </div>
                                                <p className="caption text-[#5e5e5d]">then</p>
                                                <div className="border border-[#E5E5E5] bg-white px-4 py-2 caption">
                                                    Drop into deck
                                                </div>
                                            </div>

                                            <div className="relative min-h-[240px] bg-[#F3F1EC] border border-[#E5E5E5] p-4 overflow-hidden">
                                                <p className="caption text-[#5e5e5d]">What export creates</p>
                                                <div className="absolute left-6 top-12 w-[58%] rotate-[-8deg] border border-[#D8D8D8] bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                                                    <div className="h-[74px] bg-[#F7F7F7] border border-[#ECECEC]" />
                                                    <p className="text-[11px] text-[#666] mt-2">Share of voice widget</p>
                                                </div>
                                                <div className="absolute right-6 top-20 w-[56%] rotate-[6deg] border border-[#D8D8D8] bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                                                    <div className="h-[74px] bg-[#F7F7F7] border border-[#ECECEC]" />
                                                    <p className="text-[11px] text-[#666] mt-2">Brand traits widget</p>
                                                </div>
                                                <div className="absolute left-10 bottom-5 right-10 border border-[#D8D8D8] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                                                    <p className="caption text-[#5e5e5d]">Slide deck</p>
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

                        {/* 4. Key Design Decisions */}
                        <AnimatedSection
                            data-section="decisions"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="Key Decisions"
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

                        {/* 5. Learnings */}
                        <AnimatedSection
                            data-section="learnings"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="Learnings"
                                title="What this project taught me"
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Flexibility and usability pull against each other in B2B.</h3>
                                            <p className="text-[#363636] mt-2">Every role wanted more on screen. The hard part was holding the line: strong defaults first, customization as an opt-in, and saying no to configurability that would recreate the clutter we were removing.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Research is cheaper than engineering.</h3>
                                            <p className="text-[#363636] mt-2">A full report-generation flow tested poorly before a line of it was built. Users didn&apos;t want a new artifact — they wanted widgets they could drop into existing decks. Killing it early saved roughly two months of engineering time.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">AI accelerated direction, not decisions.</h3>
                                            <p className="text-[#363636] mt-2">Claude Code helped me move faster through interface directions. The real work was still defining the product logic and the trade-offs worth making.</p>
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
