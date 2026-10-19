"use client";
import { motion, useReducedMotion } from "motion/react";
export function FadeIn({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <motion.div initial={false} whileInView={reducedMotion ? undefined : { opacity: [0.8, 1], y: [6, 0] }} viewport={{ once: true }} transition={{ duration: 0.3 }}>{children}</motion.div>;
}
