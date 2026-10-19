"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname().replace(/\/$/, "") || "/";

  if (pathname === "/work/personalized-dashboards") return null;

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="pill-nav">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>work</Link>
        <a
          className="nav-resume"
          href="https://drive.google.com/file/d/1MWG5GFB9cEwvDoyOCb8hneainMusSWPW/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume (opens in a new tab)"
        >
          resume
          <span className="nav-resume-icon" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={1.7} />
          </span>
        </a>
      </nav>
    </header>
  );
}
