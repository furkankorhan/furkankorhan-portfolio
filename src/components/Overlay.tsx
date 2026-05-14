"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export function Overlay({ scrollYProgress }: OverlayProps) {
  // H1 block: visible from 0–20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -80]);

  // Transition text 1: 30–50%
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.52], [60, -60]);

  // Transition text 2: 60–80%
  const opacity3 = useTransform(scrollYProgress, [0.58, 0.63, 0.73, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.58, 0.82], [60, -60]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none select-none">
      {/* H1 — main identity block */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex items-center justify-center px-6 py-8"
      >
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
            Furkan Korhan.
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-2xl text-white/65 font-medium tracking-wide drop-shadow-md">
            Technik&nbsp;verstehen.&nbsp; Probleme&nbsp;lösen.&nbsp; Weiterlernen.
          </p>
        </div>
      </motion.div>

      {/* Transition text 1 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 md:px-24"
      >
        <p
          aria-hidden="true"
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg max-w-xs sm:max-w-sm md:max-w-xl"
        >
          Software entwickeln.
        </p>
      </motion.div>

      {/* Transition text 2 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end px-6 sm:px-12 md:px-24"
      >
        <p
          aria-hidden="true"
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-right leading-tight drop-shadow-lg max-w-xs sm:max-w-sm md:max-w-xl"
        >
          Systeme verstehen.
        </p>
      </motion.div>
    </div>
  );
}
