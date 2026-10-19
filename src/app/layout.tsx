import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
const inter = localFont({
  src: [
    { path: "../../public/fonts/inter-regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/inter-semibold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Aethar Marhon", template: "%s | Aethar Marhon" },
  description: "A personal UX/UI design portfolio. Case studies coming soon.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={inter.variable}><body className="flex min-h-dvh flex-col font-sans antialiased">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
    <SiteHeader /><main id="main-content" className="flex-1">{children}</main>
  </body></html>;
}
