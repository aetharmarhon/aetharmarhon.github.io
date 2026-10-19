import { ProjectGrid } from "@/components/home/project-grid";
import { Hero } from "@/components/home/hero";

export default function HomePage() {
  return (
    <div className="home-shell">
      <Hero />
      <ProjectGrid />
    </div>
  );
}
