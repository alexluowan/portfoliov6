// components/ProjectCard.tsx
import Image from "next/image";
import { memo, useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import clsx from "clsx";

export type ProjectCardProps = {
    mediaSrc?: string;
    mediaType?: "image" | "video";
    badges?: string[];
    className?: string;
};

const containerVariants = {
    rest: {},      // no animation on the container itself
    hover: {},     // just a state trigger for children
};

const badgeVariants = {
    rest: { opacity: 0, y: -20, rotate: -10 },
    hover: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
};

function ProjectCard({
                         mediaSrc,
                         mediaType = "image",
                         badges = [],
                         className,
                     }: ProjectCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const controls = useAnimationControls();

    // Check if device is mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Run on mount
        checkIsMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIsMobile);

        // Clean up
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    // Set animation state based on mobile detection
    useEffect(() => {
        if (isMobile) {
            controls.start("hover");
        } else {
            controls.start("rest");
        }
    }, [isMobile, controls]);

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
        <motion.div
            className={clsx("w-full aspect-video relative overflow-hidden", className)}
            variants={containerVariants}
            initial="rest"
            whileHover="hover"
            animate={isMobile ? "hover" : controls}
        >
            {/* Media */}
            {mediaSrc && mediaType === "video" ? (
                <video
                    ref={videoRef}
                    src={mediaSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : mediaSrc && mediaType === "image" ? (
                <Image
                    src={mediaSrc}
                    alt="Project thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                />
            ) : null}

            {/* Badges only */}
            {badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col z-10 pointer-events-none">
                    {badges.map((tag, i) => (
                        <motion.span
                            key={i}
                            variants={badgeVariants}
                            animate={isMobile ? "hover" : undefined}
                            className="inline-block w-max whitespace-nowrap bg-white text-black text-xs px-2 py-1 shadow"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default memo(ProjectCard);