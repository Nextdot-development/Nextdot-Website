import { useEffect, useRef } from "react";
import { publicAsset } from "@/lib/utils";
import "./PoweredBySarvam.css";

type Variant = "card" | "portrait" | "backdrop";

interface Props {
  /** `card` renders the badge; `backdrop` renders the artwork only, behind content. */
  variant?: Variant;
  /** Element the pointer is tracked on — defaults to the component itself.
   *  The backdrop wants the whole hero, not just its own box. */
  trackRef?: React.RefObject<HTMLElement>;
  className?: string;
}

// How far the lockup tilts, in degrees. Small on purpose: past this it stops
// reading as depth and starts reading as a gimmick.
const TILT_X = 9;
const TILT_Y = 13;

export default function PoweredBySarvam({ variant = "card", trackRef, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const inner = stage.current;
    const target = trackRef?.current ?? el;
    if (!el || !inner || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Fine pointers only: on touch there is no hover, and every tap would
    // kick the artwork sideways.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = target.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width - 0.5;
        const y = (e.clientY - box.top) / box.height - 0.5;
        inner.style.setProperty("--rx", `${(-y * TILT_X).toFixed(2)}deg`);
        inner.style.setProperty("--ry", `${(x * TILT_Y).toFixed(2)}deg`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      inner.style.setProperty("--rx", "0deg");
      inner.style.setProperty("--ry", "0deg");
    };

    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", reset);
    };
  }, [trackRef]);

  const label = "Powered by Sarvam AI — AI Startup Program";

  return (
    <div
      ref={root}
      className={`sarvam-3d${className ? ` ${className}` : ""}`}
      data-variant={variant}
      // The backdrop is decoration; the card carries the actual statement.
      {...(variant === "backdrop" ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      <div className="sarvam-3d__stage" ref={stage}>
        <span className="sarvam-3d__layer sarvam-3d__disc" />
        <span className="sarvam-3d__layer sarvam-3d__ring">
          <span className="sarvam-3d__dot" />
        </span>
        <span className="sarvam-3d__layer sarvam-3d__blob" />
        {variant !== "backdrop" && (
          <div className="sarvam-3d__layer sarvam-3d__content">
            <span className="sarvam-3d__kicker">Powered by</span>
            <img
              className="sarvam-3d__mark"
              src={publicAsset("images/sarvam_logo.svg")}
              alt="Sarvam AI"
              width={202}
              height={32}
              loading="lazy"
            />
            <span className="sarvam-3d__program">AI Startup Program</span>
          </div>
        )}
      </div>
    </div>
  );
}
