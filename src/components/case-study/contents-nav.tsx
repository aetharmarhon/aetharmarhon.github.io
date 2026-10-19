"use client";

import { useEffect, useState } from "react";
import { dashboardSections } from "@/data/personalized-dashboards";

export function ContentsNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    let frame = 0;
    function update() {
      let current = dashboardSections[0].id;
      for (const section of dashboardSections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 150) current = section.id;
      }
      setActive(current);
      frame = 0;
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <aside className="case-contents">
      <nav aria-label="Case study contents">
        <p>Contents</p>
        <ol>{dashboardSections.map(({ id, label }) => <li key={id}><a href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a></li>)}</ol>
      </nav>
    </aside>
  );
}
