"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in, for staggering siblings. */
  delay?: number;
  /** How far (px) the element travels as it appears. */
  distance?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and slides its children in whenever they scroll into view, in both
 * directions: from below while scrolling down, from above while scrolling up.
 * They fade back out when they leave, so the effect repeats.
 */
export default function Reveal({ children, className, delay = 0, distance = 40 }: Props) {
  const reduceMotion = useReducedMotion();
  // 1 = enter from below (scrolling down), -1 = enter from above (scrolling up).
  const [from, setFrom] = useState<1 | -1>(1);

  const variants: Variants = {
    hidden: (dir: 1 | -1) => ({
      opacity: 0,
      y: reduceMotion ? 0 : dir * distance,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
      transition: { duration: 0.35, ease: EASE },
    }),
    shown: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.2 : 0.75, ease: EASE, delay: reduceMotion ? 0 : delay },
    },
  };

  return (
    <motion.div
      className={className}
      custom={from}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ amount: 0.2 }}
      onViewportLeave={(entry) => {
        // Left through the top edge → it will come back from above.
        if (entry) setFrom(entry.boundingClientRect.top < 0 ? -1 : 1);
      }}
    >
      {children}
    </motion.div>
  );
}
