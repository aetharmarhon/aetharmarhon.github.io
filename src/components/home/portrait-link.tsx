"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue } from "motion/react";
import { useRef, type PointerEvent } from "react";

export function PortraitLink() {
  const bubble = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function moveBubble(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(max-width: 1024px)").matches) {
      delete event.currentTarget.dataset.pointer;
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const bubbleWidth = bubble.current?.offsetWidth ?? 180;
    // Match the bubble’s 80% horizontal offset while keeping it on screen.
    const minX = bubbleWidth * 0.8 + 8 - bounds.left;
    const maxX = window.innerWidth - bounds.left - bubbleWidth * 0.2 - 8;
    x.set(Math.max(minX, Math.min(event.clientX - bounds.left, maxX)));
    y.set(event.clientY - bounds.top);
    event.currentTarget.dataset.pointer = "true";
  }

  return (
    <a
      className="portrait-link"
      href="https://www.linkedin.com/in/aetharmarhon/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Connect with Aethar on LinkedIn (opens in a new tab)"
      onPointerEnter={moveBubble}
      onPointerMove={moveBubble}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") delete event.currentTarget.dataset.pointer;
      }}
      onPointerCancel={(event) => { delete event.currentTarget.dataset.pointer; }}
      onPointerLeave={(event) => { delete event.currentTarget.dataset.pointer; }}
    >
      <Image
        className="portrait-image"
        src="/images/aethar-portrait.webp"
        alt="Aethar Marhon"
        width={388}
        height={388}
        sizes="(max-width: 705px) 72px, (max-width: 1640px) calc(20vw - 69px), 259px"
        preload
      />
      <motion.span ref={bubble} className="connect-cursor" style={{ x, y }} aria-hidden="true">
        <span>Connect with me!</span>
        <ArrowUpRight strokeWidth={1.7} />
      </motion.span>
    </a>
  );
}
