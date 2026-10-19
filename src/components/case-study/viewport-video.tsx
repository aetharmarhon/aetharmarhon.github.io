"use client";

import { useEffect, useRef } from "react";

export function ViewportVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    function updatePlayback() {
      if (inView && !document.hidden && !reducedMotion.matches) {
        // Controls remain available if the browser declines automatic playback.
        void video!.play().catch(() => {});
      } else {
        video!.pause();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      updatePlayback();
    }, { threshold: [0, 0.25] });

    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <div className="case-video">
      <video ref={ref} controls muted loop playsInline preload="metadata" width={2940} height={1652} aria-label="Personalized Dashboards final experience walkthrough">
        <source src="/videos/personalized-dashboards-final.mp4" type="video/mp4" />
        Your browser does not support this video. <a href="/videos/personalized-dashboards-final.mp4">Download the walkthrough</a>.
      </video>
    </div>
  );
}
