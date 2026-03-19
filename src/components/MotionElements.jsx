import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react';

/* ---- Shared spring config for luxury feel ---- */
const springReveal = { type: 'spring', damping: 30, stiffness: 120, mass: 0.8 };

/**
 * Scroll-triggered fade-up reveal.
 * Replaces CSS .reveal with a smoother spring animation.
 */
export function Reveal({ children, className = '', delay = 0, direction = 'up', once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px' });
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered children reveal — each child animates in sequence.
 * Replaces CSS [data-animate] with motion stagger.
 */
export function StaggerReveal({ children, className = '', stagger = 0.08 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item for StaggerReveal.
 */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: springReveal },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated counter — number counts up from 0 when in view.
 * Uses motion's animate() for smooth value interpolation.
 */
export function AnimatedNumber({ value, suffix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const prefersReduced = useReducedMotion();

  const numericValue = parseInt(value, 10) || 0;
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  if (isInView && motionValue.get() === 0) {
    animate(motionValue, numericValue, {
      duration: prefersReduced ? 0 : 2,
      ease: [0.16, 1, 0.3, 1],
    });
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/**
 * Page transition wrapper — fades in content on mount.
 */
export function PageTransition({ children }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
