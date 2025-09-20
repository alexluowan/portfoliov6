import React from 'react'
import { motion, Variants } from 'framer-motion'
import { useIntersectionObserver } from '../animations/useIntersectionObserver'

interface AnimatedSectionProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
  threshold?: number
  rootMargin?: string
  'data-section'?: string
}

export default function AnimatedSection({
  children,
  variants,
  className = '',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  'data-section': dataSection,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  // Default variants if none provided
  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      },
    },
  }

  const animationVariants = variants || defaultVariants

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      className={className}
      data-section={dataSection}
    >
      {children}
    </motion.div>
  )
}
