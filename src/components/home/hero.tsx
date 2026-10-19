import { PortraitLink } from "@/components/home/portrait-link";

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <div className="hero-heading-row">
          <h1 id="hero-heading">im aethar!</h1>
          <PortraitLink />
        </div>
        <p>a curious designer (looking for full-time opportunities)!</p>
      </div>
    </section>
  );
}
