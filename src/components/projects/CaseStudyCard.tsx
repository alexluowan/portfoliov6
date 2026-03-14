import React from 'react';
import Image from 'next/image';

interface CaseStudyCardProps {
    videoSrcWebm?: string;
    videoSrcMp4?: string;
    imageSrc?: string;
    title: string;
    roles: string[];
    team: string[];
    timeline: string;
    tools: string[];
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
                                                         videoSrcWebm,
                                                         videoSrcMp4,
                                                         imageSrc,
                                                         title,
                                                         roles,
                                                         team,
                                                         timeline,
                                                         tools,
                                                     }) => (
    <div className="w-full max-w-[768px] mx-auto">
        <div className="w-full">
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={title}
                    width={1920}
                    height={1080}
                    className="w-full object-cover"
                />
            ) : (
                <video
                    className="w-full"
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
            )}
        </div>
        <h1 className="mt-[2rem]" style={{fontFamily: '"Self Modern"'}}>{title}</h1>
        <div className="flex flex-wrap mt-[0.75rem]">
            <div className="w-1/2 md:w-1/4 pr-4 mb-4">
                <h4 className="font-mono text-[12px]">ROLE</h4>
                {roles.map(role => (
                    <p key={role}>{role}</p>
                ))}
            </div>
            <div className="w-1/2 md:w-1/4 pr-4 mb-4">
                <h4 className="font-mono text-[12px]">TEAM</h4>
                {team.map(member => (
                    <p key={member}>{member}</p>
                ))}
            </div>
            <div className="w-1/2 md:w-1/4 pr-4 mb-4">
                <h4 className="font-mono text-[12px]">TIMELINE</h4>
                <p>{timeline}</p>
            </div>
            <div className="w-1/2 md:w-1/4 mb-4">
                <h4 className="font-mono text-[12px]">TOOLS</h4>
                {tools.map(tool => (
                    <p key={tool}>{tool}</p>
                ))}
            </div>
        </div>
    </div>
);

export default CaseStudyCard;
