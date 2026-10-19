import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return <Container className="py-16 sm:py-24"><h1 className="text-4xl font-semibold tracking-tight">About</h1><p className="mt-6 max-w-xl leading-relaxed text-neutral-600">This page will introduce you, your design approach, and your experience. We’ll add your biography and layout using your design references.</p></Container>;
}
