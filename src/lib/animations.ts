import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const scaleOnHover: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

export const cardTiltHover: Variants = {
  hover: {
    rotateX: 5,
    rotateY: 5,
    transition: { duration: 0.2 },
  },
}
