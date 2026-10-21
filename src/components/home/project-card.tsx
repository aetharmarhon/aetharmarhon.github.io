"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue } from "motion/react";
import { useRef, type PointerEvent } from "react";
import type { FeaturedProject } from "@/data/case-studies";

export function ProjectCard({ project }: { project: FeaturedProject }) {
  const bubble = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const href = `/work/${project.slug}`;

  function moveBubble(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const bubbleWidth = bubble.current?.offsetWidth ?? 280;
    const bubbleHeight = bubble.current?.offsetHeight ?? 36;
    // Keep the destination label within the card, including at viewport edges.
    const inset = bubbleWidth / 2 + 8;
    x.set(Math.max(inset, Math.min(event.clientX - bounds.left, bounds.width - inset)));
    y.set(Math.max(0, Math.min(event.clientY - bounds.top, bounds.height - bubbleHeight - 20)));
    event.currentTarget.dataset.pointer = "true";
  }

  const cardProps = {
    className: "project-card",
    "aria-labelledby": `${project.slug}-title`,
    "data-coming-soon": project.comingSoon || undefined,
    onPointerEnter: moveBubble,
    onPointerMove: moveBubble,
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") delete event.currentTarget.dataset.pointer;
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => { delete event.currentTarget.dataset.pointer; },
    onPointerCancel: (event: PointerEvent<HTMLElement>) => { delete event.currentTarget.dataset.pointer; },
  };

  const content = (
    <>
      <div className="project-card-content">
        <div className="project-card-image">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            unoptimized={project.image.unoptimized}
            style={project.image.cropScale ? { transform: `scale(${project.image.cropScale})` } : undefined}
            quality={90}
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1706px) 42vw, 708px"
          />
        </div>
        <p className="project-card-summary">{project.summary}</p>
        <h2 id={`${project.slug}-title`} className="project-card-title">
          {project.title}
          {!project.comingSoon && <ArrowUpRight className="project-card-touch-arrow" size={20} aria-hidden="true" />}
        </h2>
      </div>
      <motion.span ref={bubble} className="project-cursor" style={{ x, y }} aria-hidden="true">
        <span>{project.hoverLabel ?? href}</span>
        {!project.hideHoverArrow && <ArrowUpRight size={18} strokeWidth={1.7} />}
      </motion.span>
    </>
  );

  return project.comingSoon
    ? <article {...cardProps}>{content}</article>
    : <Link href={href} {...cardProps}>{content}</Link>;
}
