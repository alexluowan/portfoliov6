// app/page.tsx
'use client'

import {useEffect, useRef} from 'react'
import Lenis from '@studio-freight/lenis'

import GridContainer from '@/components/GridContainer'
// import Link from "next/link";
import CaseStudyCard from "@/components/projects/CaseStudyCard";
import CaseStudyContent from "@/components/projects/CaseStudyContent";


export default function Home() {
    // 1) ref your scroll‐pane
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mainRef.current) return

        // 2) init Lenis on that element
        const lenis = new Lenis({
            // tells Lenis to listen on your element instead of `window`
            wrapper: mainRef.current,
            // smooth scrolling
            smoothWheel: true,
            // you can tweak the easing
            // easing: t => t,
        })

        // 3) start the RAF loop
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // 4) cleanup
        return () => lenis.destroy()
    }, [])

    return (
        <GridContainer
            className="
        grid
        grid-cols-1
        md:grid-cols-12
        md:h-screen
        /* remove native overflow so Lenis can take over */
        md:overflow-hidden
        gap-4
      "
        >
            {/* Sidebar */}
            <aside className="flex flex-col h-full col-span-1 md:col-span-2 md:sticky md:top-0 mt-4 bg-white">
                <p>Alex Luowan</p>
                <p className="mt-4">
                    Turning 88rising’s website into a backstage pass for every fan.
                </p>
                <div className="mt-4">
                </div>
                <div className="mt-auto">
                </div>
            </aside>

            {/* Main scroll container */}
            <main
                ref={mainRef}
                className="
          col-span-1
          md:col-span-6
          md:col-start-4
          /* remove native scrollbars for Lenis */
          overflow-hidden
          mt-4
          relative pb-4

        "
            >

                <div className="flex flex-col gap-y-[8rem]">
                    <CaseStudyCard
                        videoSrcWebm="/project-covers/88risingthumbnail.webm"
                        videoSrcMp4="/project-covers/88risingthumbnail.mp4"
                        title="Reimagining 88rising’s website experience for fans to engage with their favourite artists and stay informed."
                        roles={['Product Designer', 'Prototyper', 'Facilitator']}
                        team={['Justin Yu', 'Luke Do', 'Claret Egwim', 'Terrence Xu']}
                        timeline="4 Weeks – 2023"
                        client="88rising (Mock)"
                        tools={['Figma', 'After Effects', 'Premiere Pro']}
                    />
                    <CaseStudyContent
                        subtitle="the challenge"
                        title="Difficulty In Discovering Artists and Content"
                        description="Fans struggle to discover new music and connect with artists because content is scattered across platforms. This fragmentation disengages fans, blocking immersion in the 88rising ecosystem and eroding brand loyalty. When discovery stalls, the mission of amplifying Asian voices stalls too."
                        imageSrc="/work/88rising/88risingchallenge.png"
                        mediaAlt="88rising logo with social media icons"
                    />

                    <CaseStudyContent
                        subtitle="the business problem"
                        title="Why 88rising Should Care"
                        description="88rising shattered stereotypes, putting Asian voices on the global stage and racking up 3 B
                    YouTube views in its first three years, but growth has crawled to just 0.43 B since as a discovery-poor
                    web presence starves today’s rookies of the spotlight that fueled the early cultural wave, draining streams,
                    ticket sales, and brand momentum."

                        imageSrc="/work/88rising/statistics.svg"
                        mediaAlt=""
                    />

                    <CaseStudyContent
                        subtitle="the key insight"
                        title="Identifying Core Frustrations"
                        description="Interviews and surveys showed fans felt frustrated by fragmented content and limited interaction with artists, craving an effortless discovery experience. These insights clearly pointed to one need: fans seek discovery, not a storefront."
                        imageSrc="/work/88rising/research.svg"
                        mediaAlt=""
                    />
                    <div className="flex flex-col gap-y-[4rem]">
                        <CaseStudyContent
                            subtitle="Solution"
                            title="Language-Driven Discovery"
                            description="The landing page greets fans with a mosaic of Asian languages and their home countries. By tapping a language they relate to, users instantly see artists who share that cultural backdrop; turning heritage into a discovery springboard."
                            mediaAlt=""
                            muxPlaybackId="bdeowRPYjuBUoOR3UHW802Ep5SCLTGQ2Rj01DXeBs00qRk"
                            muxOptions={{
                                accentColor: "#FF0000",
                                autoPlay: true,
                                muted: true,
                                loop: true,
                            }}
                        />
                        <CaseStudyContent
                            subtitle=""
                            title="Culture Hubs & Upcoming Releases"
                            description="Selecting a country opens a region hub listing every local 88rising act, while a side panel spotlights upcoming releases and high‑profile collaborations. Lesser‑known artists ride the wave of star talent, giving fans fresh music without leaving the page."
                            muxPlaybackId="fH005AX8Ie92r77bFsSdK2ze5gKuf37EmG0102YKTUy6Ts"
                            muxOptions={{
                                accentColor: "#FF0000",
                                autoPlay: true,
                                muted: true,
                                loop: true,
                            }}
                        />
                        <CaseStudyContent
                            subtitle=""
                            title="Adaptable Individuality - Immersive Artists Pages"
                            description="Each artist owns a bespoke space: stacked candid photos, bite‑sized bios, looping video backdrops, and quick links to songs and merch. The layout flexes to every vibe yet remains part of one cohesive system—deepening connection without confusion."
                            muxPlaybackId="fH005AX8Ie92r77bFsSdK2ze5gKuf37EmG0102YKTUy6Ts"
                            muxOptions={{
                                accentColor: "#FF0000",
                                autoPlay: true,
                                muted: true,
                                loop: true,
                            }}
                        />
                        <CaseStudyContent
                            subtitle=""
                            title="Behind the Beat — Waveform Release Calendar"
                            description="A linear, waveform‑inspired timeline visualizes future drops at a glance. Fans can preview snippets and set reminders, closing the awareness gap that 62 % of survey respondents cited and boosting anticipation for new music."
                            muxPlaybackId="6YLpD39o1x01Fl01m01zUbkoI6pY00ENM02LX3CrdPod027QA"
                            muxOptions={{
                                accentColor: "#FF0000",
                                autoPlay: true,
                                muted: true,
                                loop: true,
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-y-[4rem]">
                        <CaseStudyContent
                            subtitle="explorations"
                            title="Pinpointing Nations with Lat-Long "
                            description="We recast the landing page as a stripped-down world map. Each neon-red bar sits at the actual latitude of a region that feeds the 88rising roster, turning raw co-ordinates into a visual navigation system. By starting discovery with place and lighting up the local word for “rise” in each block—we remind fans that the label’s heartbeat is pan-Asian, not platform-first."
                            imageSrc="/work/88rising/exploration1.png"
                        />
                        <CaseStudyContent
                            subtitle=""
                            title="Unfiltered Artists Energy"
                            description="Fans don’t bond with stats, they bond with snapshots of real life. A backyard hose, a beat-up Rubik’s Cube, and Brian’s sky-blue coat say more than any metric, turning casual scrollers into curious fans eager to dive into music, merch, and more."
                            imageSrc="/work/88rising/exploration2.png"
                        />
                    </div>
                    <CaseStudyContent
                        subtitle="design principles"
                        title="Based on the insights we gathered, we asked a simple question: what must this experience do for fans and for 88rising to truly win? Those answers became three guiding principles."
                        description="We first considered the realities of a global, multi‑platform music ecosystem, balancing the needs of fans, artists, and the business before shaping the end‑to‑end experience."
                        imageSrc="/work/88rising/designprinciples.svg"
                        mediaAlt=""
                    />
                    <CaseStudyContent
                        subtitle="Reflections"
                        title="Key Takeaways & Fixes"
                        description="Seven weeks sounded roomy until we spent four hunting for the “perfect” brief and were left with just three to launch. That squeeze forced ruthless focus. We trimmed every nice-to-have and doubled down on what matters most to fans: stumbling onto their next favourite artist. The result? A story-first interface with crisp visuals, micro-interactions, and plain-spoken copy that sparks a real fan-artist connection. The sprint was a gut-check reminder that design isn’t linear; it’s about steering through detours and making every pixel earn its place."
                        imageSrc="/work/88rising/ripruss.png"
                        mediaAlt=""
                    />
                    <CaseStudyContent
                        subtitle="Reach out"
                        title="Want the inside scoop? Let's chat"
                        description="Getting here was anything but linear. If you’d like the full story twists, turns, and aha moments let’s hop on a quick call :) "
                        mediaAlt=""
                        muxPlaybackId="zXbKAQgr5YArc01ssVta1T4sRCeovGsk01pIerilmstCk"
                        muxOptions={{
                            accentColor: "#FF0000",
                            autoPlay: true,
                            muted: true,
                            loop: true,
                        }}
                    />
                </div>
            </main>
        </GridContainer>
    )
}
