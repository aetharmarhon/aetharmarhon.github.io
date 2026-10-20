"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type MouseEvent, type PointerEvent } from "react";

export type CaseStudyImage = {
  src: string; alt: string; width: number; height: number;
  unoptimized?: boolean;
  // Screenshot assets already contain a visible icon; these bounds add only its clickable area.
  control?: { right: number; bottom: number; size: number };
};

type Props = { image: CaseStudyImage; label: string; priority?: boolean };

export function ExpandableImage({ image, label, priority = false }: Props) {
  const { control, ...imageProps } = image;
  const controlStyle = control ? { right: `${control.right}%`, bottom: `${control.bottom}%`, width: `${control.size}%` } : undefined;
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const restore = useRef<null | (() => void)>(null);
  const [expanded, setExpanded] = useState(false);
  const [zoomSize, setZoomSize] = useState<{ width: number; height: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const pan = useRef<{ id: number; x: number; y: number; left: number; top: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const titleId = useId();
  const instructionsId = useId();

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
    setZoomSize(null);
    setDragging(false);
    pan.current = null;
    suppressClick.current = false;
  }

  function toggleZoom(event: MouseEvent<HTMLButtonElement>) {
    if (suppressClick.current) return;
    const view = viewport.current;
    if (!view) return;
    if (zoomSize) {
      setZoomSize(null);
      view.scrollTo({ left: 0, top: 0, behavior: "instant" });
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    // Keyboard activation zooms into the center; a click zooms around the chosen area.
    const point = event.detail === 0 ? { x: 0.5, y: 0.5 } : {
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    };
    const scale = Math.max(2, Math.min(4, image.width / (bounds.width * window.devicePixelRatio)));
    const width = bounds.width * scale;
    const height = width * image.height / image.width;
    setZoomSize({ width, height });
    requestAnimationFrame(() => {
      if (!dialog.current?.open) return;
      view.scrollTo({
        left: point.x * width - view.clientWidth / 2,
        top: point.y * height - view.clientHeight / 2,
        behavior: "instant",
      });
    });
  }

  function startPan(event: PointerEvent<HTMLButtonElement>) {
    if (!zoomSize || !viewport.current || event.button !== 0) return;
    pan.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      left: viewport.current.scrollLeft, top: viewport.current.scrollTop, moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function movePan(event: PointerEvent<HTMLButtonElement>) {
    const start = pan.current;
    if (!start || start.id !== event.pointerId || !viewport.current) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.moved && Math.hypot(dx, dy) < 4) return;
    start.moved = true;
    setDragging(true);
    event.preventDefault();
    viewport.current.scrollTo({ left: start.left - dx, top: start.top - dy, behavior: "instant" });
  }

  function finishPan(event: PointerEvent<HTMLButtonElement>) {
    if (pan.current?.id !== event.pointerId) return;
    suppressClick.current = pan.current.moved;
    pan.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    // A drag's synthetic click must not immediately zoom back out.
    window.setTimeout(() => { suppressClick.current = false; }, 0);
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
          <p id={instructionsId} className="sr-only">Click the image to zoom in. Drag or scroll to explore the enlarged image. Click again to zoom out.</p>
          <div ref={viewport} className="lightbox-viewport">
            {expanded && (
              <button
                type="button"
                className="lightbox-zoom"
                aria-label={zoomSize ? "Zoom out image" : "Zoom in image"}
                aria-pressed={Boolean(zoomSize)}
                aria-describedby={instructionsId}
                data-dragging={dragging || undefined}
                style={{ width: zoomSize?.width ?? "100%", height: zoomSize?.height ?? "100%" }}
                onClick={toggleZoom}
                onPointerDown={startPan}
                onPointerMove={movePan}
                onPointerUp={finishPan}
                onPointerCancel={finishPan}
              >
                <Image {...imageProps} alt={image.alt} className="lightbox-image" sizes="100vw" quality={90} loading="eager" draggable={false} />
              </button>
            )}
          </div>
          <button type="button" className="lightbox-close" aria-label="Close expanded image" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </div>
      </dialog>
    </>
  );
}
