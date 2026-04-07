// pages/about.tsx
'use client'

import Link from 'next/link'
import BouncingMedia from '@/components/BouncingMedia'

export default function About() {
    const mediaItems = [
        { src: '/about-images/faceprofile.jpg', type: 'image' as const, alt: 'Alex Luowan' },
        { src: '/about-images/flyfishing.webm', type: 'video' as const, alt: 'Fly fishing' },
        { src: '/about-images/designsprintbox.webm', type: 'video' as const, alt: 'Design sprint' },
        { src: '/about-images/Ree.mp4', type: 'video' as const, alt: 'Ree' },
    ]

    return (
        <div className="flex flex-col gap-x-4 px-4 md:flex-row md:h-screen md:overflow-hidden max-w-[1800px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full shrink-0 pt-4 md:sticky md:top-0 md:h-svh md:w-[320px] md:py-4 flex flex-col">
                <Link href="/" className="w-fit text-[14px] leading-[18px] text-[#575757] font-[350] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">
                    ← Back
                </Link>

                <div className="flex flex-col gap-3 mt-4">
                    <p className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                        Hi, I&apos;m Alex. I&apos;m a product designer with a love for playful interactions and a sharp eye for detail.
                    </p>
                    <p className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                        Born in Vancouver, grew up in Surrey. I started out in computer science but quickly realized I cared more about how things looked and felt than how they compiled, so I switched to design full time.
                    </p>
                    <p className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                        Currently, I&apos;m designing at AthenaHQ. Before that, I apprenticed at Blueberry Social and worked as a fractional designer with Blaze.ai and Phlur, helping shape products that feel clear, engaging, and enjoyable for the people using them.
                    </p>
                    <p className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                        Outside of design, you&apos;ll find me fly fishing, lifting, playing guitar, or out with my camera. I also spend way too much time prototyping and learning front-end development to bring ideas to life.
                    </p>
                    <p className="text-[14px] leading-[18px] text-[#575757] font-[350]">
                        Always down for coffee or a design jam, feel free to reach out.
                    </p>
                </div>

                <div className="mt-4 border-t border-[#E0E0E0]"></div>
                <span className="mt-2 text-[11px] leading-[14px] text-[#999999] font-[350]">Get in touch</span>
                <nav className="mt-1 flex flex-col items-start text-[14px] leading-[18px] font-[350]">
                    <a href="mailto:alexluowan@gmail.com" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">Email</a>
                    <a href="https://www.linkedin.com/in/alexluowan" target="_blank" rel="noreferrer" className="w-fit text-[#575757] py-[1px] hover:text-[#F25410] transition-colors duration-200 ease-in-out hover-target-small">LinkedIn</a>
                </nav>
            </aside>

            {/* Main content - bouncing media */}
            <main className="w-full overflow-hidden relative md:pl-[24px] h-[60vh] md:h-full">
                <BouncingMedia
                    items={mediaItems}
                    mediaWidth={360}
                    mediaHeight={270}
                    speed={0.7}
                />
            </main>
        </div>
    )
}
