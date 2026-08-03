import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MOBILE_BREAKPOINT = 768;

function shouldShowCursor() {
  if (typeof window === 'undefined') return false;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isNarrowViewport = window.innerWidth < MOBILE_BREAKPOINT;
  return !isCoarsePointer && !isNarrowViewport;
}

export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Re-check on resize/orientation change so the cursor never gets stuck
  // showing (or hiding) when the viewport crosses the mobile breakpoint,
  // e.g. when testing via a resizable desktop browser window.
  useEffect(() => {
    const sync = () => setEnabled(shouldShowCursor());
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled]);

  // Never render on touch/narrow viewports, and never render before the
  // real mouse position is known (avoids a frozen dot flashing at 0,0).
  if (!enabled || !hasMoved) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-blue-600 rounded-full pointer-events-none z-[9999] mix-blend-multiply"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-blue-400/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
};
