import { ProjectCard } from "@/components/home/project-card";
import { featuredProjects } from "@/data/case-studies";

export function ProjectGrid() {
  return (
    <section className="project-grid" aria-label="Selected projects">
      {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
    </section>
  );
}
