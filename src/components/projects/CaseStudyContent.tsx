import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import MuxPlayer with no SSR to avoid hydration issues
const MuxPlayer = dynamic(
    () => import('@mux/mux-player-react'),
    { ssr: false }
);

interface CaseStudyContentProps {
    subtitle: string;
    title: string;
    description: string;

    // Media options - only provide one of these
    imageSrc?: string;
    videoSrcWebm?: string;
    videoSrcMp4?: string;
    muxPlaybackId?: string;
    muxOptions?: {
        startTime?: number;
        streamType?: 'on-demand' | 'live' | 'll-live';
        placeholder?: string;
        accentColor?: string;
        muted?: boolean;
        autoPlay?: boolean;
        loop?: boolean;
    };
    svgContent?: React.ReactNode;

    // Media properties
    mediaAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    mediaClassName?: string;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({
                                                               subtitle,
                                                               title,
                                                               description,
                                                               imageSrc,
                                                               videoSrcWebm,
                                                               videoSrcMp4,
                                                               muxPlaybackId,
                                                               muxOptions = {},
                                                               svgContent,
                                                               mediaAlt = '',
                                                               imageWidth = 1920,
                                                               imageHeight = 1080,
                                                               mediaClassName = 'mt-[2.5rem]',
                                                           }) => {
    // Render the appropriate media based on what props were provided
    const renderMedia = () => {
        if (imageSrc) {
            return (
                <Image
                    src={imageSrc}
                    alt={mediaAlt}
                    width={imageWidth}
                    height={imageHeight}
                    className={mediaClassName}
                />
            );
        } else if (muxPlaybackId) {
            return (
                <div className={mediaClassName}>
                    <MuxPlayer
                        playbackId={muxPlaybackId}
                        streamType={muxOptions.streamType || 'on-demand'}
                        startTime={muxOptions.startTime}
                        placeholder={muxOptions.placeholder}
                        accentColor={muxOptions.accentColor || '#000000'}
                        muted={muxOptions.muted !== undefined ? muxOptions.muted : true}
                        autoPlay={muxOptions.autoPlay !== undefined ? muxOptions.autoPlay : true}
                        loop={muxOptions.loop !== undefined ? muxOptions.loop : true}

                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                        }}
                        metadata={{
                            video_title: title,
                            player_name: 'CaseStudyContent Mux Player',
                        }}
                    />
                </div>
            );
        } else if (videoSrcWebm || videoSrcMp4) {
            return (
                <video
                    className={mediaClassName}
                    controls={false}
                    autoPlay
                    playsInline
                    muted
                    loop
                >
                    {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
                    {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
                    Your browser does not support the video tag.
                </video>
            );
        } else if (svgContent) {
            return (
                <div className={mediaClassName}>
                    {svgContent}
                </div>
            );
        }

        // Return null if no media is provided
        return null;
    };

    return (
        <div className="max-w-[48.125rem]">
            <h2 className="uppercase">
                {subtitle}
            </h2>
            <h1 className="mt-[1.5rem]">
                {title}
            </h1>
            <p className="text-[#363636] mt-[0.5rem]">
                {description}
            </p>
            {renderMedia()}
        </div>
    );
};

export default CaseStudyContent;