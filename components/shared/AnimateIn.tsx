"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { fadeInUp } from "@/lib/animations";
import type { Variants } from "framer-motion";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function AnimateIn({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: AnimateInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const mergedVariants: Variants = {
    ...variants,
    visible: {
      ...(variants.visible as object),
      transition: {
        ...((variants.visible as { transition?: object })?.transition ?? {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={mergedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
