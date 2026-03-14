// pages/friends.tsx
'use client'

import {useEffect, useRef} from 'react'
import Lenis from '@studio-freight/lenis'
import Link from 'next/link'

interface Person {
    name: string
    role: string
    url?: string
}

const mentors: Person[] = [
    {name: 'Russell Taylor', role: 'Design Teacher, forever grateful'},
    {name: 'Kathy Wang', role: 'Co-Founder, Pressclub', url: 'https://www.linkedin.com/in/kathytwang/'},
    {name: 'Jenny Nguyễn', role: 'Designer, Sultans'},
]

const friends: Person[] = [
    {name: 'Justin Yu', role: 'Experience Designer, Konrad Group', url: 'https://justinyu.design/'},
    {name: 'Luke Do', role: 'Junior Product Designer, VGen', url: 'https://luke-do.com/'},
    {name: 'Tristan Turisno', role: 'Associate Experience Designer, Konrad Group'},
    {name: 'Minh Phan', role: 'Head of Growth, Cocreate', url: 'https://www.linkedin.com/in/minhcphan/'},
]

function PersonRow({person}: { person: Person }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 items-baseline py-2 border-b border-[#E0E0E0]">
            {person.url && person.url !== '#' ? (
                <a href={person.url} target="_blank" rel="noreferrer" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    {person.name}
                </a>
            ) : (
                <span className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                    {person.name}
                </span>
            )}
            <span className="hidden md:block text-[12px] leading-[16px] text-[#999999] font-[350]">
                {person.url ? (
                    <a href={person.url} target="_blank" rel="noreferrer" className="w-fit hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                        {person.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                ) : (
                    '—'
                )}
            </span>
            <span className="text-[12px] leading-[16px] text-[#999999] font-[350] text-right">
                {person.role}
            </span>
        </div>
    )
}

export default function Friends() {
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mainRef.current) return
        const lenis = new Lenis({wrapper: mainRef.current, smoothWheel: true})
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex flex-col">
                <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>

                <p className="mt-4 text-[14px] leading-[18px] text-[#575757] font-[350]">
                    People who have shaped the way I think about design, and friends I&apos;m lucky to learn from every day.
                </p>
            </aside>

            {/* Main content */}
            <main
                ref={mainRef}
                className="w-full md:overflow-y-auto overflow-hidden relative pt-4 pb-4 md:pl-[24px] scrollbar-hidden"
            >
                <div className="flex flex-col gap-8">
                    {/* Mentors */}
                    {mentors.length > 0 && (
                        <div>
                            <span className="text-[11px] leading-[14px] text-[#999999] font-[350] uppercase tracking-wide">
                                Mentors
                            </span>
                            <div className="mt-2 flex flex-col">
                                {mentors.map((person, i) => (
                                    <PersonRow key={i} person={person}/>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Friends */}
                    {friends.length > 0 && (
                        <div>
                            <span className="text-[11px] leading-[14px] text-[#999999] font-[350] uppercase tracking-wide">
                                Friends
                            </span>
                            <div className="mt-2 flex flex-col">
                                {friends.map((person, i) => (
                                    <PersonRow key={i} person={person}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
