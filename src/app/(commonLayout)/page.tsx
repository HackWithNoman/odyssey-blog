import Blog from "@/components/blog";
import CTA from "@/components/home/cta";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Blog />
      <Features />
      <Testimonials />
      <CTA />
    </main>
  );
}
