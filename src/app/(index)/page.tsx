// app/page.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

import GridContainer from '@/components/GridContainer'
import ProjectNav from '@/components/home/WorksNav'
import ProfileNav from '@/components/home/ProfileNav'
import ProjectCard from '@/components/projects/ProjectCard'
import Link from "next/link";
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
                    I’m Alex, a product and brand designer focusing on ✷ intuitive interaction flows,
                    ◎ cohesive visual identities, and ✺ inclusive design systems.
                </p>
                <div className="mt-4">
                    <ProjectNav />
                </div>
                <div className="mt-auto">
                    <ProfileNav />
                </div>
            </aside>

            {/* Main scroll container */}
            <main
                ref={mainRef}
                className="
          col-span-1
          md:col-span-10
          md:col-start-4
          /* remove native scrollbars for Lenis */
          overflow-hidden
          mt-4
          relative pb-4

        "
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <Link href="./88rising">
                        <ProjectCard
                            mediaSrc="/project-covers/88risingthumbnail.mp4"
                            mediaType="video"
                            badges={['88rising', 'Product Design – Website Revamp']}
                        />
                        </Link>
                    </div>
                    <div>
                        <ProjectCard
                            mediaSrc="/project-covers/figmaplugindock.jpg"
                            mediaType="image"
                            badges={['Figma', 'UX/UI – Personal Project']}
                        />
                    </div>
                    <ProjectCard
                        mediaSrc="/project-covers/wisethumbnail.png"
                        mediaType="image"
                        badges={['Wise', 'UI – Personal Project']}
                    />
                    <ProjectCard
                        mediaSrc="/project-covers/fondazioneprada.mp4"
                        mediaType="video"
                        badges={['Fondazione Prada', 'Interaction Design – Pre-exhibition Microsite']}
                    />
                    <ProjectCard
                        mediaSrc="/project-covers/freelance.png"
                        mediaType="image"
                        badges={['Freelance Work', 'Product & Brand Design - (2024 - Now)']}
                    />
                    {/* …more ProjectCard components */}
                </div>
            </main>
        </GridContainer>
    )
}
