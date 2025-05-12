// components/WorksNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const works = [
    { label: 'Figma',            href: '/works/figma' },
    { label: '88rising',         href: '/works/88rising' },
    { label: 'Wise',             href: '/works/wise' },
    { label: 'Blaze.ai',         href: '/works/blaze-ai' },
    { label: 'Fondazione Prada', href: '/works/fondazione-prada' },
]

export default function WorksNav() {
    const pathname = usePathname()                       // e.g. "/works" or "/works/figma"
    const activePath = pathname === '/works'             // if at "/works"
        ? works[0].href                                    // → treat as "/works/figma"
        : pathname

    return (
        <nav className="flex flex-col m-0 p-0">
            <span className="text-sm m-0 p-0">works</span>

            <ul className="flex flex-col m-0 p-0">
                {works.map(({ label, href }) => {
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
