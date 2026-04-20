import React from 'react';
import Image from 'next/image';
import AutoplayVideo from './AutoplayVideo';

interface CaseStudyCardProps {
    videoSrcWebm?: string;
    videoSrcMp4?: string;
    imageSrc?: string;
    videoContainerClassName?: string;
    videoClassName?: string;
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
                                                         videoContainerClassName,
                                                         videoClassName,
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
                    sizes="(max-width: 768px) calc(100vw - 2rem), 768px"
                    className="w-full object-cover"
                />
            ) : (
                <AutoplayVideo
                    className={videoContainerClassName || 'w-full'}
                    videoClassName={videoClassName}
                    videoSrcWebm={videoSrcWebm}
                    videoSrcMp4={videoSrcMp4}
                    preload="metadata"
                    eager={true}
                />
            )}
        </div>
        <h2 className="mt-[2rem] text-black">{title}</h2>
        <div className="flex flex-wrap gap-y-4 mt-4">
            <div className="w-1/2 md:w-1/4 pr-4 flex flex-col gap-y-2">
                <p className="caption text-[#5e5e5d]">Role</p>
                <div className="flex flex-col">
                    {roles.map(role => (
                        <p key={role} className="text-[#5e5e5d]">{role}</p>
                    ))}
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 pr-4 flex flex-col gap-y-2">
                <p className="caption text-[#5e5e5d]">Team</p>
                <div className="flex flex-col">
                    {team.map(member => (
                        <p key={member} className="text-[#5e5e5d]">{member}</p>
                    ))}
                </div>
            </div>
            <div className="w-1/2 md:w-1/4 pr-4 flex flex-col gap-y-2">
                <p className="caption text-[#5e5e5d]">Timeline</p>
                <p className="text-[#5e5e5d]">{timeline}</p>
            </div>
            <div className="w-1/2 md:w-1/4 flex flex-col gap-y-2">
                <p className="caption text-[#5e5e5d]">Tools</p>
                <div className="flex flex-col">
                    {tools.map(tool => (
                        <p key={tool} className="text-[#5e5e5d]">{tool}</p>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default CaseStudyCard;
