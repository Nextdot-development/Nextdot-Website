import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
  rootMargin?: string;
}

// Defers fetching the video source entirely until its container is about to
// enter the viewport, so below-the-fold videos never compete with initial
// page load. Shows the poster (or a neutral fallback) until then.
export const LazyVideo = ({ src, className, poster, rootMargin = "200px" }: LazyVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {shouldLoad ? (
        <video autoPlay loop muted playsInline preload="metadata" poster={poster} className={className}>
          <source src={src} type="video/mp4" />
        </video>
      ) : poster ? (
        <img src={poster} alt="" loading="lazy" decoding="async" className={className} />
      ) : (
        <div className="w-full h-full bg-surface" />
      )}
    </div>
  );
};
