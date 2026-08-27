"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  scrollOffset?: [string, string];
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="inline-block mr-[0.28em] relative">
      <span className="invisible">{word}</span>
      <motion.span
        className="absolute left-0 top-0 text-[#a9bcbc]"
        style={{ opacity, willChange: "opacity" }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className = "",
  scrollOffset = ["start 0.85", "end 0.3"],
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset as any,
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`${i}-${word}`}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
}
