// pages/discord.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import dynamic from 'next/dynamic'
import WorksNav, {Section} from '@/components/home/WorksNav'
import CaseStudyCard from '@/components/projects/CaseStudyCard'
import CaseStudyContent from '@/components/projects/CaseStudyContent'
import AnimatedSection from '@/components/AnimatedSection'
import {heroAnimation, fadeInUp} from '@/animations/animationVariants'
import Link from 'next/link'
import Image from 'next/image'

const DotLottieReact = dynamic(
    () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
    {ssr: false}
)

export default function DiscordCatchup() {
    const mainRef = useRef<HTMLDivElement>(null)
    const [scrollY, setScrollY] = useState<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const sections: Section[] = [
        {label: 'Intro', sectionId: 'hero'},
        {label: 'Mission', sectionId: 'mission'},
        {label: 'Solution', sectionId: 'solution'},
        {label: 'Decisions', sectionId: 'decisions'},
        {label: 'Research', sectionId: 'research'},
        {label: 'Ideation', sectionId: 'ideation'},
        {label: 'Testing', sectionId: 'testing'},
        {label: 'Reflections', sectionId: 'reflection'},
    ]

    useEffect(() => {
        sessionStorage.setItem('lastVisitedCaseStudy', 'discord')
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
        handleScroll()

        const handleResize = () => {
            addScrollListener()
            handleScroll()
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

    const sidebarOpacity = isHovered ? 1 : Math.max(0.4, 1 - scrollY / 400)

    return (
        <div className="flex min-h-0 flex-col gap-x-4 px-4 md:h-screen md:flex-row md:overflow-hidden max-w-[1800px] mx-auto">
            <aside
                className="hidden md:flex w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex-col transition-opacity duration-200 ease-out"
                style={{opacity: sidebarOpacity}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href="/" className="w-fit text-[14px] text-[#575757] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>
                <div className="flex flex-col gap-y-4 pt-6">
                    <h1>Discord Highlights</h1>
                    <p className="caption text-[#5e5e5d]">Product Design / Concept Feature</p>
                </div>
                <div className="pt-8">
                    <WorksNav
                        scrollContainerRef={mainRef}
                        sections={sections}
                        showTimeline={true}
                    />
                </div>
            </aside>

            <main
                ref={mainRef}
                className="relative w-full min-h-0 overflow-hidden pt-4 pb-24 md:pb-[24vh] scrollbar-hidden md:overflow-y-auto"
            >
                {/* Mobile header */}
                <div className="flex flex-col md:hidden pt-4 pb-4 max-w-[768px] mx-auto w-full">
                    <Link href="/" className="w-fit text-[14px] text-[#575757] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                        ← Back
                    </Link>
                    <h1 className="mt-4">Discord Highlights</h1>
                    <p className="caption text-[#5e5e5d] mt-2">Product Design / Concept Feature</p>
                </div>

                {/* Intro / Hero */}
                <motion.section
                    data-section="hero"
                    variants={heroAnimation}
                    initial="hidden"
                    animate="visible"
                >
                    <CaseStudyCard
                        videoSrcWebm="/project-covers/discordhighlights.mp4"
                        videoContainerClassName="w-full aspect-[657/797] overflow-hidden"
                        videoClassName="h-full w-full object-cover object-center"
                        title="700 unread messages. You don't catch up. You just want the number gone."
                        roles={['Product Designer']}
                        team={['Shania Chacon', 'User Testing']}
                        timeline="4 Weeks"
                        tools={['Figma']}
                    />
                </motion.section>

                <div className="h-24" />

                {/* Mission */}
                <div data-section="mission">
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="The Mission"
                            title="Helping server-heavy Discord users decide what's actually worth their time."
                            description="Discord is built around communities but it was never built for coming back to them. Once activity piles up across channels, most users do the same thing: mark all as read without opening a single message. My goal was to design a feature that makes re-entry feel worth it, one decision at a time."
                        />
                    </AnimatedSection>

                    <div className="h-16" />

                    {/* Key Insights — two columns, each pairs text + image */}
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <div className="w-full max-w-[768px] mx-auto">
                            <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="caption text-[#5e5e5d]">Key Insight</p>
                                        <h3 className="text-black">Users have already written off most of their servers.</h3>
                                    </div>
                                    <p className="text-[#5e5e5d]">
                                        Users actively check 3 to 5 servers out of dozens they&apos;ve joined. The rest exist in a permanent backlog that never gets opened. The problem isn&apos;t volume. It&apos;s that the cost of figuring out what matters feels higher than the value of finding out.
                                    </p>
                                    <div className="relative bg-[#f3f3f3] aspect-square overflow-hidden md:mt-auto">
                                        <Image
                                            src="/work/discord/images/relevancyscale.png"
                                            alt="Relevancy scale"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 384px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="caption text-[#5e5e5d]">Key Insight</p>
                                        <h3 className="text-black">When everything looks urgent, nothing gets read.</h3>
                                    </div>
                                    <p className="text-[#5e5e5d]">
                                        An @everyone ping and a direct mention look identical in Discord today. The only way to know if something actually matters is to open it manually. Most people don&apos;t. They mark it read and move on.
                                    </p>
                                    <div className="relative bg-[#f3f3f3] aspect-square overflow-hidden md:mt-auto">
                                        <Image
                                            src="/work/discord/images/annoucementfatigue.png"
                                            alt="Announcement fatigue"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 384px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                <div className="h-16" />

                {/* Solution */}
                <div data-section="solution">
                    {/* Solution 1: Hero screen */}
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Solution"
                            title="One decision at a time."
                            description="Highlights surfaces one missed item at a time. Each card shows who posted, what they said, and how active the thread feels. That gives users enough signal to make a quick call. A visible count like '4 left' makes the backlog feel bounded instead of endless."
                            videoSrcWebm="/work/discord/videos/cardswipe.webm"
                            videoSrcMp4="/work/discord/videos/cardswipe.mov"
                            mediaClassName="mt-6 w-full aspect-[576/568] overflow-hidden bg-[#f3f3f3]"
                            videoClassName="h-full w-full object-cover"
                        />
                    </AnimatedSection>

                    <div className="h-16" />

                    {/* Solution 2: Card detail */}
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Solution"
                            title="Each card gives enough context to act."
                            description="Instead of showing a full conversation, the card previews who posted, what they said, and how active the thread feels. That gives users enough signal to judge relevance without recreating the overload inside the card itself."
                            mediaClassName="mt-6"
                            svgContent={
                                <div className="flex flex-col gap-4">
                                    {['textinput1.png', 'textinput2.png', 'textinput3.png'].map((file) => (
                                        <div key={file} className="relative w-full aspect-[576/568] overflow-hidden bg-[#f3f3f3]">
                                            <Image
                                                src={`/work/discord/images/${file}`}
                                                alt=""
                                                fill
                                                sizes="(max-width: 768px) 100vw, 768px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    </AnimatedSection>

                    <div className="h-16" />

                    {/* Solution 3: Filtering */}
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Solution"
                            title="Users can shape what keeps surfacing."
                            description="Highlights makes an initial relevance guess but users stay in control. Server level and channel level settings let them tune what appears over time instead of relying on a ranking system they can't see or adjust."
                            mediaClassName="mt-6"
                            svgContent={
                                <div className="flex flex-col gap-4">
                                    {['Settings 1.png', 'Settings 2.png', 'Settings 3.png'].map((file) => (
                                        <div key={file} className="relative w-full aspect-[576/568] overflow-hidden bg-[#f3f3f3]">
                                            <Image
                                                src={`/work/discord/images/${encodeURIComponent(file)}`}
                                                alt=""
                                                fill
                                                sizes="(max-width: 768px) 100vw, 768px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    </AnimatedSection>
                </div>

                <div className="h-16" />

                {/* Design Decisions */}
                <div data-section="decisions">
                    {/* Decision: Showing the why */}
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Design Decision"
                            title="Showing the why, not just the what."
                            description="Every card surfaces a reason alongside the message. Not just what was posted, but why Highlights thinks it matters to you. If that reason is wrong, the three dots let you adjust that channel's preferences directly from the card without hunting through settings. Transparency and control in the same gesture."
                            mediaClassName="mt-6"
                            svgContent={
                                <div className="relative w-full aspect-square bg-[#f3f3f3] overflow-hidden">
                                    <Image
                                        src="/work/discord/images/card-anatomy.png"
                                        alt="Card anatomy: server and channel name, attribute line, channel settings"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 768px"
                                        className="object-contain"
                                    />
                                </div>
                            }
                        />
                    </AnimatedSection>
                </div>

                <div className="h-16" />

                {/* Research */}
                <div data-section="research">
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Research"
                            title="Where does re-entry break down?"
                            description="I ran 8 interviews and collected 63 survey responses to understand why server backlogs pile up untouched. It wasn't a notification problem. It was a triage problem."
                            mediaClassName="mt-6"
                            svgContent={
                                <div className="relative w-full aspect-[576/360] bg-[#f3f3f3] overflow-hidden" />
                            }
                        />
                    </AnimatedSection>

                    <div className="h-16" />

                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <div className="w-full max-w-[768px] mx-auto">
                            <p className="caption text-[#5e5e5d]">Research</p>
                            <h2 className="text-black mt-[0.5rem]">Three patterns that shaped the design.</h2>
                            <div className="flex flex-col gap-6 mt-8">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-black">The backlog number itself creates paralysis.</h3>
                                    <p className="text-[#5e5e5d]">Once it crosses a certain threshold, most users stop trying entirely.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-black">People skim. They don&apos;t read.</h3>
                                    <p className="text-[#5e5e5d]">A glance at who posted, a keyword, a timestamp. That&apos;s all it took to decide if something was worth opening.</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-black">Users wanted a say in what surfaced.</h3>
                                    <p className="text-[#5e5e5d]">Less noise wasn&apos;t enough. They wanted to shape what kept appearing without having to mute entire communities.</p>
                                </div>
                            </div>

                            {/* North Star — embedded inside Research */}
                            <div className="mt-10 w-full bg-[#f3f3f3] px-6 py-12 md:py-16 flex flex-col items-center">
                                <div className="w-[180px] h-[180px]">
                                    <DotLottieReact
                                        src="https://lottie.host/29db9a53-397f-4d28-8db2-c91a90faac01/9Jm1Bfvtxd.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <p className="mt-6 text-black font-medium text-center">Our North Star</p>
                                <p className="mt-3 text-[#5e5e5d] text-center max-w-[52ch]">The problem wasn&apos;t missing messages. It was that deciding what&apos;s worth reading felt harder than just giving up.</p>
                            </div>
                        </div>
                    </AnimatedSection>

                </div>

                <div className="h-16" />

                {/* Solution Ideation */}
                <div data-section="ideation">
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Solution Ideation"
                            title="First iteration: right intent, wrong execution."
                            description="The first iteration went full screen. One card, full conversation context, reply input, Skip and Mark as Read at the bottom. Two things broke it in practice. Getting to anything relevant felt slow because the full context recreated the overload inside the card itself. And the button placement didn't account for one-handed use. The actions sat where Discord's native elements already lived, which created confusion about what was part of the feature and what wasn't."
                            mediaClassName="mt-6"
                            svgContent={
                                <div className="relative w-full aspect-[576/568] bg-[#f3f3f3] overflow-hidden">
                                    <Image
                                        src="/work/discord/images/full-card-iteration.png"
                                        alt="First iteration"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 768px"
                                        className="object-contain"
                                    />
                                </div>
                            }
                        />
                    </AnimatedSection>

                    <div className="h-16" />

                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Solution Ideation"
                            title="Faster to skim, harder to trust."
                            description="An earlier exploration used a stacked list view. Users moved through it quickly but felt like they might miss something important. Without enough context per item, skimming fast came at the cost of confidence."
                            mediaClassName="mt-6"
                            svgContent={
                                <div className="relative w-full aspect-[576/568] bg-[#f3f3f3] overflow-hidden">
                                    <Image
                                        src="/work/discord/images/listviewiteration.png"
                                        alt="List view iteration"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 768px"
                                        className="object-contain"
                                    />
                                </div>
                            }
                        />
                    </AnimatedSection>
                </div>

                <div className="h-16" />

                {/* Testing */}
                <div data-section="testing">
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <CaseStudyContent
                            subtitle="Testing"
                            title="&ldquo;Is this not already on Discord?&rdquo;"
                            description="That question came up across multiple sessions without prompting. Participants assumed it must be in beta. One said it looked like it already belonged in the app. That kind of reaction is the closest a concept test can get to a green light."
                        />
                    </AnimatedSection>

                    <div className="h-8" />

                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <div className="w-full max-w-[768px] mx-auto">
                            <p className="text-[#5e5e5d]">The filtering screen scored highest across the board. Users called out the server and channel level granularity as the most useful part. One participant said they would set it up immediately. Another noted that silencing a server without leaving it solved something they had been working around for years.</p>
                            <p className="text-[#5e5e5d] mt-4">The main friction was icon clarity. The lightbulb and fire indicators confused several participants before any context was given. Once explained they landed quickly, but relying on explanation is a gap worth closing in the next iteration.</p>

                            <div className="flex flex-col md:flex-row gap-4 mt-8">
                                <div className="flex-1 flex flex-col gap-2 p-6 bg-[#f3f3f3]">
                                    <p className="caption text-[#5e5e5d]">Highlights average</p>
                                    <h3 className="text-black">4.2/5</h3>
                                </div>
                                <div className="flex-1 flex flex-col gap-2 p-6 bg-[#f3f3f3]">
                                    <p className="caption text-[#5e5e5d]">Filtering average</p>
                                    <h3 className="text-black">4.8/5</h3>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                <div className="h-16" />

                {/* Reflections */}
                <div data-section="reflection">
                    <AnimatedSection variants={fadeInUp} rootMargin="0px 0px -10% 0px">
                        <div className="w-full max-w-[768px] mx-auto">
                            <p className="caption text-[#5e5e5d]">Reflection</p>
                            <h2 className="text-black mt-[0.5rem]">Designing for triage is really designing for trust.</h2>

                            <div className="flex flex-col md:flex-row gap-8 md:gap-4 mt-8">
                                <div className="flex-1 flex flex-col gap-4">
                                    <h3 className="text-black">The framing mattered as much as the interface.</h3>
                                    <p className="text-[#5e5e5d]">
                                        The most important shift in this project wasn&apos;t a design decision. It was realizing the product I was designing wasn&apos;t a catch-up tool. It was a triage tool. That reframe made every subsequent decision easier to justify and harder to second-guess.
                                    </p>
                                </div>
                                <div className="flex-1 flex flex-col gap-4">
                                    <h3 className="text-black">Trust grows when the system is legible.</h3>
                                    <p className="text-[#5e5e5d]">
                                        Users were comfortable with Highlights making an initial guess, but several asked why a specific message was shown to them. The Not Interested signal is a start, but a feature like this only earns long term use if people feel the feed is getting smarter. The ranking logic has to be legible through small signals so users understand why something appeared rather than just accepting that it did.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </main>

            <div className="hidden md:block md:w-[320px] shrink-0" />
        </div>
    )
}
