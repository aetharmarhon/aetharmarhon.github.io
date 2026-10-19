import Link from "next/link";
import { Container } from "@/components/ui/container";
export default function NotFound() {
  return <Container className="py-24"><h1 className="text-3xl font-semibold">Page not found</h1><p className="mt-4 text-neutral-600">This page doesn’t exist yet.</p><Link href="/" className="mt-6 inline-block underline underline-offset-4">Return home</Link></Container>;
}
