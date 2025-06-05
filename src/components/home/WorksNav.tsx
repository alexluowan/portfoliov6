// components/home/WorksNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

// Default works for the main portfolio page
const defaultWorks = [
    { label: '88rising', href: '/88rising' },
    { label: 'Figma', href: '/works/figma' },
    { label: 'Wise', href: '/works/wise' },
    { label: 'Fondazione Prada', href: '/works/fondazione-prada' },
]

// Type for section configuration
export interface Section {
    label: string
    sectionId: string
    href?: string // optional for backward compatibility
}

interface WorksNavProps {
    scrollContainerRef?: React.RefObject<HTMLDivElement | null>
    sections?: Section[]
    showTimeline?: boolean
}

export default function WorksNav({
                                     scrollContainerRef,
                                     sections = [],
                                     showTimeline = false
                                 }: WorksNavProps) {
    const pathname = usePathname()
    const [activeSection, setActiveSection] = useState(sections[0]?.sectionId || '')

    useEffect(() => {
        if (!scrollContainerRef?.current || !showTimeline || sections.length === 0) return

        const scrollContainer = scrollContainerRef.current

        const handleScroll = () => {
            const sectionElements = sections.map(section => ({
                id: section.sectionId,
                element: document.querySelector(`[data-section="${section.sectionId}"]`)
            })).filter(section => section.element)

            let currentSection = sections[0]?.sectionId || ''
            const containerHeight = scrollContainer.clientHeight

            // Find which section is most visible
            for (const section of sectionElements) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect()
                    const containerRect = scrollContainer.getBoundingClientRect()

                    // Calculate position relative to scroll container
                    const elementTop = rect.top - containerRect.top
                    const elementBottom = rect.bottom - containerRect.top

                    // Check if section is in view (at least 30% from top of viewport)
                    if (elementTop <= containerHeight * 0.3 && elementBottom > 0) {
                        currentSection = section.id
                    }
                }
            }

            setActiveSection(currentSection)
        }

        // Initial check
        handleScroll()

        // Add scroll listener
        scrollContainer.addEventListener('scroll', handleScroll)

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [scrollContainerRef, sections, showTimeline])

    // For timeline/section navigation (case study pages)
    if (showTimeline && sections.length > 0) {
        return (
            <nav className="hidden md:flex flex-col m-0 p-0">
                {/*<span className="text-sm m-0 p-0">Timeline</span>*/}
                <ul className="flex flex-col m-0 p-0">
                    {sections.map(({ label, sectionId }) => {
                        const isActive = activeSection === sectionId

                        return (
                            <li key={sectionId} className="m-0 p-0">
                                <button
                                    onClick={() => {
                                        const element = document.querySelector(`[data-section="${sectionId}"]`)
                                        if (element && scrollContainerRef?.current) {
                                            const container = scrollContainerRef.current
                                            const containerRect = container.getBoundingClientRect()
                                            const elementRect = element.getBoundingClientRect()

                                            const targetScrollTop = container.scrollTop +
                                                elementRect.top - containerRect.top - 20

                                            container.scrollTo({
                                                top: targetScrollTop,
                                                behavior: 'smooth'
                                            })
                                        }
                                    }}
                                    className={
                                        isActive
                                            ? 'bg-black text-white inline-block transition-colors m-0 p-0 pr-8 py-[1px] text-left border-none cursor-pointer font-inherit text-sm leading-[18px]'
                                            : 'text-gray-500 hover:bg-black hover:text-white inline-block transition-colors m-0 p-0 pr-8 py-[1px] text-left border-none bg-transparent cursor-pointer font-inherit text-sm leading-[18px]'
                                    }
                                >
                                    {label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }

    // Only show default works navigation on homepage
    if (pathname === '/') {
        return (
            <nav className="hidden md:flex flex-col m-0 p-0">
                <span className="text-sm m-0 p-0">works</span>
                <ul className="flex flex-col m-0 p-0">
                    {defaultWorks.map(({ label, href }) => {
                        const isActive = pathname === href

                        return (
                            <li key={href} className="m-0 p-0">
                                <Link
                                    href={href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={
                                        (isActive
                                                ? 'inline-block bg-black text-white '
                                                : 'inline-block text-gray-500 hover:bg-black hover:text-white'
                                        ) + ' transition-colors m-0 p-0 pr-8 py-[1px]'
                                    }
                                >
                                    {label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }

    // Return nothing for case study pages without timeline
    return null
}