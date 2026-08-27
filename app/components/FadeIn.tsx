"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  className?: string;
}

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  scale,
  className = "",
}: FadeInProps) {
  const initial: Record<string, number> = { opacity: 0 };
  if (x !== 0) initial.x = x;
  if (y !== 0) initial.y = y;
  if (scale !== undefined) initial.scale = scale;

  const animate: Record<string, number> = { opacity: 1 };
  if (x !== 0) animate.x = 0;
  if (y !== 0) animate.y = 0;
  if (scale !== undefined) animate.scale = 1;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: smoothEase }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
