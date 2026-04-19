// components/projects/FeedCard.tsx
import Image from "next/image";
import { memo, useRef, useEffect } from "react";
import clsx from "clsx";

export type FeedCardProps = {
    mediaSrc: string;
    mediaType?: "image" | "video";
    meta?: string;
    title: string;
    subtitle?: string;
    aspectClass?: string;
    bgColor?: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
    justSeen?: boolean;
    mediaClassName?: string;
};

function FeedCard({
    mediaSrc,
    mediaType = "image",
    meta,
    title,
    subtitle,
    aspectClass = "aspect-[4/5]",
    bgColor,
    objectFit = "cover",
    objectPosition,
    justSeen = false,
    mediaClassName,
}: FeedCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

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
        <div className="group flex w-full flex-col">
            <div
                className={clsx(
                    "relative w-full overflow-hidden",
                    aspectClass,
                    mediaClassName
                )}
                style={bgColor ? { backgroundColor: bgColor } : undefined}
            >
                {justSeen && (
                    <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black/40 pointer-events-none">
                        <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/80">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                            Just Seen
                        </span>
                    </div>
                )}
                {mediaType === "video" ? (
                    <video
                        ref={videoRef}
                        src={mediaSrc}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className={clsx(
                            "absolute inset-0 h-full w-full",
                            objectFit === "contain" ? "object-contain" : "object-cover"
                        )}
                        style={objectPosition ? { objectPosition } : undefined}
                    />
                ) : (
                    <Image
                        src={mediaSrc}
                        alt={title}
                        fill
                        style={{ objectFit, objectPosition }}
                        sizes="(max-width: 1200px) 100vw, 50vw"
                    />
                )}
            </div>

            <div className="mt-4 flex flex-col gap-[4px]">
                {meta && (
                    <p className="text-[12px] leading-[16px] font-[350] text-black">
                        {meta}
                    </p>
                )}
                <p className="text-[24px] leading-[30px] font-[400] text-black">
                    {title}
                </p>
                {subtitle && (
                    <p className="text-[14px] leading-[20px] font-[400] text-[#5e5e5d]">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

export default memo(FeedCard);
