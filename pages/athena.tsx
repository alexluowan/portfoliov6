// pages/athena.tsx
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
import {refreshCursor} from '@/cursor/useCursor'

export default function AthenaHQ() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Overview', sectionId: 'overview'},
        {label: 'Process', sectionId: 'process'},
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
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-16 scrollbar-hidden"
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
                            title="Designing the AI platform that helps teams work smarter."
                            roles={['Product Designer']}
                            team={['AthenaHQ']}
                            timeline="Ongoing"
                            tools={['Figma']}
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
                                title="AthenaHQ"
                                description="Coming soon."
                            />
                        </AnimatedSection>

                        <AnimatedSection
                            data-section="process"
                            variants={fadeInUp}
                        >
                            <CaseStudyContent
                                subtitle="process"
                                title="Design Process"
                                description="Coming soon."
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </main>

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
