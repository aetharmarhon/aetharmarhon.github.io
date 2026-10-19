"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type CaseStudyImage = {
  src: string; alt: string; width: number; height: number;
  // Screenshot assets already contain a visible icon; these bounds add only its clickable area.
  control?: { right: number; bottom: number; size: number };
};

type Props = { image: CaseStudyImage; label: string; priority?: boolean };

export function ExpandableImage({ image, label, priority = false }: Props) {
  const { control, ...imageProps } = image;
  const controlStyle = control ? { right: `${control.right}%`, bottom: `${control.bottom}%`, width: `${control.size}%` } : undefined;
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const restore = useRef<null | (() => void)>(null);
  const [expanded, setExpanded] = useState(false);
  const titleId = useId();

  useEffect(() => () => { restore.current?.(); }, []);

  function expand() {
    if (!dialog.current || dialog.current.open) return;
    const position = { x: window.scrollX, y: window.scrollY };
    const root = document.documentElement;
    const body = document.body;
    const overflow = root.style.overflow;
    const padding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const bodyPadding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
    root.style.overflow = "hidden";
    restore.current = () => {
      root.style.overflow = overflow;
      body.style.paddingRight = padding;
      // No navigation or hash changes: the reader stays at the same place.
      window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
    };
    setExpanded(true);
    dialog.current.showModal();
  }

  function finishClose() {
    const restoreScroll = restore.current;
    restore.current = null;
    restoreScroll?.();
    trigger.current?.focus({ preventScroll: true });
    setExpanded(false);
  }

  return (
    <>
      <div className="case-media">
        <Image {...imageProps} alt={image.alt} sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1440px) 70vw, 960px" quality={90} preload={priority} />
        <button ref={trigger} type="button" className="case-expand" data-embedded-icon={control ? "true" : undefined} style={controlStyle} onClick={expand} aria-label={`Expand ${label}`} aria-haspopup="dialog">
          {!control && <Maximize2 size={22} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </div>
      <dialog
        ref={dialog}
        className="image-lightbox"
        aria-labelledby={titleId}
        onClose={finishClose}
      >
        <div className="lightbox-frame" style={{
          width: `min(100vw, ${100 * image.width / image.height}dvh)`,
          height: `min(100dvh, ${100 * image.height / image.width}vw)`,
        }}>
          <h2 id={titleId} className="sr-only">{label}</h2>
          {expanded && <Image {...imageProps} alt={image.alt} className="lightbox-image" sizes="100vw" quality={90} loading="eager" />}
          <button type="button" className="lightbox-close" aria-label="Close expanded image" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </div>
      </dialog>
    </>
  );
}
