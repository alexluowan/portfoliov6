// pages/athena.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import Lenis from '@studio-freight/lenis'
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
    const [isUnlocked, setIsUnlocked] = useState(true)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Context', sectionId: 'context'},
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
        if (isUnlocked) {
            sessionStorage.setItem('lastVisitedCaseStudy', 'athena')
        }
    }, [isUnlocked])

    useEffect(() => {
        if (!mainRef.current) return
        const mq = window.matchMedia('(min-width: 1200px)')
        let lenis: Lenis | null = null
        let rafId: number | null = null
        function initLenis() {
            if (!mainRef.current) return
            lenis = new Lenis({wrapper: mainRef.current, smoothWheel: true})
            function raf(time: number) {
                lenis!.raf(time)
                rafId = requestAnimationFrame(raf)
            }
            rafId = requestAnimationFrame(raf)
        }
        function destroyLenis() {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = null
            lenis?.destroy()
            lenis = null
        }
        function handleChange() {
            if (mq.matches) {
                if (!lenis) initLenis()
            } else {
                destroyLenis()
            }
        }
        handleChange()
        mq.addEventListener('change', handleChange)
        return () => {
            mq.removeEventListener('change', handleChange)
            destroyLenis()
        }
    }, [])

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - scrollY / 400)

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

        // Start from center-ish
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
                    // Force cursor out of stuck hover state by dispatching a synthetic pointer event
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
                        <h1 className="text-[18px] leading-[1.3] font-light" style={{fontFamily: '"Self Modern"'}}>Olympus</h1>

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
                    <h1 className="text-[18px] leading-[1.3] font-light mt-4" style={{fontFamily: '"Self Modern"'}}>Olympus</h1>
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
                        {/* 1. Solution — lead with the work */}
                        <AnimatedSection
                            data-section="solution"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUpStagger}
                        >
                            <CaseStudyContent
                                subtitle="before"
                                title="The original dashboard was overwhelming"
                                description="Everything on one page, no hierarchy, no way to customize. Users were bouncing off the dashboard more than they were staying on it."
                                imageSrc="/work/olympus/images/old-dashboard.png"
                                mediaAlt="Original Olympus dashboard showing an overwhelming wall of charts and data"
                            />
                            <CaseStudyContent
                                subtitle="after"
                                title="A strong default that works out of the box"
                                description="Olympus opens with a structured overview: key metrics at the top, deeper modules below. Users get oriented immediately without needing to configure anything."
                                imageSrc="/work/olympus/images/dashboard.png"
                                mediaAlt="Olympus default dashboard showing share of voice, brand traits, citation rate, and model-level visibility"
                            />
                            <CaseStudyContent
                                subtitle="configurable modules"
                                title="One system, different views for different roles"
                                description="Rather than separate dashboards for CMOs, SEOs, and PMMs, users select, reorder, and remove widgets to match the questions they care about most."
                                imageSrc="/work/olympus/images/dashboard-settings.png"
                                mediaAlt="Dashboard settings panel showing selected and configurable widget modules"
                            />
                            <CaseStudyContent
                                subtitle="export & reset"
                                title="From dashboard to presentation in one click"
                                description="CMOs and SEOs don't just consume data inside the product. They carry it into decks and recurring updates. Export lets them package specific widgets directly. Reset keeps customization low-risk."
                                imageSrc="/work/olympus/images/export-reset.png"
                                mediaAlt="Export and reset controls for dashboard widgets"
                            />
                        </AnimatedSection>

                        {/* 2. Context — the problem and insight */}
                        <AnimatedSection
                            data-section="context"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="context"
                                title="Different stakeholders, different needs, one dashboard"
                                description="Athena already surfaced powerful AI visibility data. But as the product matured, a tension emerged: CMOs wanted a quick pulse on brand momentum. SEOs wanted prompt-level detail. Analysts needed to package everything into recurring leadership updates. A single fixed dashboard was too generic for some and too dense for others."
                            />
                            <CaseStudyContent
                                subtitle=""
                                title=""
                                description=""
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
                                subtitle="the question"
                                title=""
                                description=""
                                svgContent={
                                    <div className="border-l-2 border-[#171717] pl-6 py-4">
                                        <p className="text-[18px] leading-[1.5]" style={{fontFamily: '"Self Modern"'}}>
                                            How might we design a dashboard that supports different stakeholder needs while making it easier to turn monitoring into a repeatable story teams can share?
                                        </p>
                                    </div>
                                }
                            />
                            <CaseStudyContent
                                subtitle="what customers needed"
                                title=""
                                description=""
                                svgContent={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[16px] font-medium">Different slices of data</h3>
                                            <p className="text-[#363636] mt-2">By brand terms, growth terms, products, and markets.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">A simple reporting rhythm</h3>
                                            <p className="text-[#363636] mt-2">Data point, insight, next action.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Easy to export</h3>
                                            <p className="text-[#363636] mt-2">Screenshot, export, drop into a deck.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">A central source of truth</h3>
                                            <p className="text-[#363636] mt-2">Shapes how the org understands progress.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </AnimatedSection>

                        {/* 3. Precedent — industry validation */}
                        <AnimatedSection
                            data-section="precedent"
                            className="flex flex-col gap-y-[4rem]"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="precedent"
                                title="This pattern already works at scale"
                                description="Stripe and Shopify both use modular, customizable dashboards — strong defaults with the ability to add, remove, and rearrange widgets."
                            />
                            <div className="w-full max-w-[768px] mx-auto">
                                <h2 className="uppercase font-mono text-[12px]">Stripe</h2>
                                <p className="text-[#363636] mt-[0.5rem] max-w-[60ch]">Default overview with + Add and Edit controls. Edit mode lets users remove widgets. + Add opens a picker to pull in new ones.</p>
                                <ImageCarousel
                                    className="mt-[2.5rem]"
                                    slides={[
                                        { src: '/work/olympus/images/precedent/stripe-default.png', alt: 'Stripe default dashboard overview', label: 'Default dashboard' },
                                        { src: '/work/olympus/images/precedent/stripe-edit.png', alt: 'Stripe edit mode with removable widgets', label: 'Edit mode — remove widgets' },
                                        { src: '/work/olympus/images/precedent/stripe-add.png', alt: 'Stripe widget picker modal', label: 'Add widgets from picker' },
                                    ]}
                                />
                            </div>
                            <div className="w-full max-w-[768px] mx-auto">
                                <h2 className="uppercase font-mono text-[12px]">Shopify</h2>
                                <p className="text-[#363636] mt-[0.5rem] max-w-[60ch]">Analytics with a Customize button that opens a categorized Metrics Library sidebar.</p>
                                <ImageCarousel
                                    className="mt-[2.5rem]"
                                    slides={[
                                        { src: '/work/olympus/images/precedent/shopify-default.png', alt: 'Shopify analytics dashboard', label: 'Analytics default' },
                                        { src: '/work/olympus/images/precedent/shopify-customize.png', alt: 'Shopify metrics library sidebar', label: 'Metrics library customization' },
                                    ]}
                                />
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
                                            <h3 className="text-[16px] font-medium">Default-first customization</h3>
                                            <p className="text-[#363636] mt-2">The dashboard has to feel useful before anyone touches settings. Customization is additive, not required.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-medium">Widgets as narrative blocks</h3>
                                            <p className="text-[#363636] mt-2">Each module plays a role in a story: summarize, compare, track momentum, or investigate. Not just data, but meaning.</p>
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
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="outcome"
                                title="From vision to roadmap"
                                description="The Olympus concept was adopted as the foundation for AthenaHQ's Q1 dashboard redesign. Configurable widgets and the export workflow shipped as the default architecture, replacing the original fixed layout."
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
