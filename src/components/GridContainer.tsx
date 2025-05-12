// GridContainer.tsx
import { motion, HTMLMotionProps } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

// 1) Define your own extra props...
interface ExtraProps {
    footerSpacing?: string
}

// 2) Compose them with the motion.section props
type GridContainerProps = HTMLMotionProps<'section'> & ExtraProps

export default function GridContainer({
                                          children,
                                          className,
                                          footerSpacing,
                                          ...rest
                                      }: GridContainerProps) {
    return (
        <motion.section
            // forward all the motion+HTML props (initial, animate, exit, transition...)
            {...rest}
            className={twMerge(
                'w-full z-10 grid grid-cols-12 grid-gap relative max-w-8xl',
                footerSpacing,
                className
            )}
        >
            {children}
        </motion.section>
    )
}
