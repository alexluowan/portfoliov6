// components/home/WorksNav.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// Default works for the main portfolio page
const defaultWorks = [
    { label: '88rising', href: '/88rising' },
    // { label: 'Blaze.ai', href: 'https://www.blaze.ai/' },
    { label: 'Figma', href: '/figma' },
    { label: 'Wise', href: '/wise' },
    // { label: 'Fondazione Prada', href: '/fondazione' },  // Disabled for now
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
    const router = useRouter()
    const pathname = router.pathname
    const [activeSection, setActiveSection] = useState(sections[0]?.sectionId || '')

    useEffect(() => {
        if (!showTimeline || sections.length === 0) return

        const scrollContainer = scrollContainerRef?.current

        const handleScroll = () => {
            const sectionElements = sections.map(section => ({
                id: section.sectionId,
                element: document.querySelector(`[data-section="${section.sectionId}"]`)
            })).filter(section => section.element)

            let currentSection = sections[0]?.sectionId || ''
            const isMobile = window.innerWidth < 768
            const viewportHeight = window.innerHeight

            // Find which section is most visible
            for (const section of sectionElements) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect()
                    
                    if (isMobile) {
                        // Mobile: use window viewport
                        if (rect.top <= viewportHeight * 0.3 && rect.bottom > 0) {
                            currentSection = section.id
                        }
                    } else {
                        // Desktop: use container
                        if (scrollContainer) {
                            const containerRect = scrollContainer.getBoundingClientRect()
                            const containerHeight = scrollContainer.clientHeight
                            const elementTop = rect.top - containerRect.top
                            const elementBottom = rect.bottom - containerRect.top

                            if (elementTop <= containerHeight * 0.3 && elementBottom > 0) {
                                currentSection = section.id
                            }
                        }
                    }
                }
            }

            setActiveSection(currentSection)
        }

        // Initial check
        handleScroll()

        // Add appropriate scroll listener
        const addScrollListener = () => {
            if (window.innerWidth < 768) {
                // Mobile: listen to window scroll
                window.addEventListener('scroll', handleScroll)
                if (scrollContainer) {
                    scrollContainer.removeEventListener('scroll', handleScroll)
                }
            } else {
                // Desktop: listen to container scroll
                if (scrollContainer) {
                    scrollContainer.addEventListener('scroll', handleScroll)
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
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll)
            }
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
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