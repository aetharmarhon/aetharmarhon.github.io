"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
    document.getElementById("case-top")?.focus({ preventScroll: true });
  }

  return (
    <button className="case-back-to-top" type="button" onClick={scrollToTop} aria-label="Back to top" title="Back to top">
      <ArrowUp size={24} strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}
