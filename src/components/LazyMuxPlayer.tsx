import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MuxPlayer = dynamic(
    () => import('@mux/mux-player-react'),
    { ssr: false }
)

interface LazyMuxPlayerProps {
    playbackId: string
    streamType?: 'on-demand' | 'live' | 'll-live'
    accentColor?: string
    muted?: boolean
    autoPlay?: boolean
    loop?: boolean
    preferPlayback?: string
    minResolution?: string
    maxResolution?: string
    style?: React.CSSProperties
    metadata?: Record<string, string>
    className?: string
}

export default function LazyMuxPlayer(props: LazyMuxPlayerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className={props.className}>
            {isVisible && (
                <MuxPlayer
                    playbackId={props.playbackId}
                    streamType={props.streamType || 'on-demand'}
                    accentColor={props.accentColor || '#000000'}
                    muted={props.muted !== undefined ? props.muted : true}
                    autoPlay={props.autoPlay !== undefined ? props.autoPlay : true}
                    loop={props.loop !== undefined ? props.loop : true}
                    preferPlayback={props.preferPlayback as any}
                    minResolution={props.minResolution as any}
                    maxResolution={props.maxResolution as any}
                    style={props.style || { height: '100%', width: '100%', objectFit: 'cover' }}
                    metadata={props.metadata}
                />
            )}
        </div>
    )
}
