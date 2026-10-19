import type { Metadata } from "next";
import { PersonalizedDashboards } from "@/components/case-study/personalized-dashboards";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { caseStudies } from "@/data/case-studies";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: caseStudies.find((item) => item.slug === slug)?.title ?? "Project not found" };
}
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  if (slug === "personalized-dashboards") return <PersonalizedDashboards />;
  return <Container className="py-16 sm:py-24"><Link href="/" className="text-sm underline underline-offset-4">Back to Home</Link><p className="mt-10 text-sm text-neutral-500">Case study placeholder</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">{study.title}</h1><p className="mt-6 max-w-xl leading-relaxed text-neutral-600">{study.summary} Research, process, designs, and outcomes will be added here.</p></Container>;
}
