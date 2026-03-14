// components/ProjectCard.tsx
import Image from "next/image";
import { memo, useRef, useEffect } from "react";
import clsx from "clsx";

export type ProjectCardProps = {
    mediaSrc?: string;
    mediaType?: "image" | "video";
    aspect?: "landscape" | "portrait" | "tall" | "square" | "wide";
    title?: string;
    subtitle?: string;
    badges?: string[];
    className?: string;
    bgColor?: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
};

const aspectClasses = {
    landscape: "md:aspect-[5/3]",
    portrait: "md:aspect-[4/5]",
    tall: "md:aspect-[9/16]",
    square: "md:aspect-square",
    wide: "md:aspect-[16/9]",
};

function ProjectCard({
                         mediaSrc,
                         mediaType = "image",
                         aspect = "portrait",
                         title,
                         subtitle,
                         badges = [],
                         className,
                         bgColor,
                         objectFit = "cover",
                         objectPosition,
                     }: ProjectCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // lazy-play video when in view
    useEffect(() => {
        if (mediaType === "video" && videoRef.current) {
            const vid = videoRef.current;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        vid.play().catch(() => {});
                        obs.disconnect();
                    }
                },
                { threshold: 0.5 }
            );
            obs.observe(vid);
            return () => obs.disconnect();
        }
    }, [mediaType]);

    return (
        <div className={clsx("group relative", aspectClasses[aspect], className)}>
            {/* Media — mobile: fixed 4:3 aspect, desktop: fills parent height, shrinks on hover */}
            <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full">
                <div
                    className="relative z-[1] h-full w-full overflow-hidden transition-[height] duration-[167ms] ease-linear md:group-hover:h-[calc(100%-32px)]"
                    style={bgColor ? { backgroundColor: bgColor } : undefined}
                >
                    {mediaSrc && mediaType === "video" ? (
                        <video
                            ref={videoRef}
                            src={mediaSrc}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className={clsx("absolute inset-0 w-full h-full", objectFit === "contain" ? "object-contain" : "object-cover")}
                            style={objectPosition ? { objectPosition } : undefined}
                        />
                    ) : mediaSrc && mediaType === "image" ? (
                        <Image
                            src={mediaSrc}
                            alt={title || "Project thumbnail"}
                            fill
                            style={{ objectFit }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : null}
                </div>
            </div>

            {/* Mobile text — always visible below image */}
            {(title || subtitle) && (
                <div className="relative mt-2 flex flex-col md:hidden">
                    {title && (
                        <p className="text-[15px] leading-[1.25] font-[350]">{title}</p>
                    )}
                    {subtitle && (
                        <p className="text-[15px] leading-[1.25] font-[350] text-gray-500">{subtitle}</p>
                    )}
                </div>
            )}

            {/* Desktop text — absolute bottom, hidden until hover */}
            {(title || subtitle) && (
                <div className="absolute bottom-0 left-0 hidden w-full justify-between gap-x-2 overflow-hidden pt-2 pb-1 opacity-0 duration-[167ms] ease-linear group-hover:opacity-100 group-hover:delay-[167ms] md:flex">
                    {title && (
                        <p className="text-[15px] leading-[1.25] font-[350] truncate">{title}</p>
                    )}
                    {subtitle && (
                        <p className="text-[15px] leading-[1.25] font-[350] text-gray-500 truncate">{subtitle}</p>
                    )}
                </div>
            )}

            {/* Legacy badge support */}
            {!title && badges.length > 0 && (
                <div className="mt-3">
                    {badges.map((tag, i) => (
                        <span
                            key={i}
                            className="inline-block text-sm text-gray-500 mr-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(ProjectCard);
