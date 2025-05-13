// components/WorksNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const works = [
    { label: 'About',  href: './../about' },
    { label: 'Resume', href: '/works/88rising' },
    { label: 'Contact', href: '/works/wise' },
]

export default function ProfileNav() {
    const pathname = usePathname() // e.g. "/works" or "/works/figma" or "/about"

    // if we’re on the about page, strip out About + Resume
    const filteredWorks =
        pathname === '/about'
            ? works.filter(w => !['About', 'Resume'].includes(w.label))
            : works

    // keep your existing active-path logic
    const activePath =
        pathname === '/works'
            ? works[0].href
            : pathname

    return (
        <nav className="flex flex-col m-0 p-0 mb-6">
            <span className="text-sm m-0 p-0"></span>

            <ul className="flex flex-col m-0 p-0">
                {filteredWorks.map(({ label, href }) => {
                    const isActive = href === activePath

                    return (
                        <li key={href} className="m-0 p-0">
                            <Link
                                href={href}
                                aria-current={isActive ? 'page' : undefined}
                                className={
                                    (isActive
                                            ? 'inline-block bg-black text-white '
                                            : 'inline-block text-gray-500 hover:bg-black hover:text-white'
                                    ) +
                                    ' transition-colors m-0 p-0 pr-8 py-[1px]'
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
