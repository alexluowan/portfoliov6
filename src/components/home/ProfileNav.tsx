// components/ProfileNav.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'

const works = [
    // { label: 'About',  href: '/about' },  // Disabled for now
    { label: 'Resume', href: '/resume.pdf'},
    { label: 'Contact', href: 'mailto:aaluowan@gmail.com' },
]

export default function ProfileNav() {
    const router = useRouter()
    const pathname = router.pathname // e.g. "/works" or "/works/figma" or "/about"

    // if we're on the about page, strip out Resume (About is already disabled)
    const filteredWorks =
        pathname === '/about'
            ? works.filter(w => !['Resume'].includes(w.label))
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
