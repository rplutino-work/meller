'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.96
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.96,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </motion.div>
  )
}

