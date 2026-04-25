import Blog from "@/components/blog";
import CTA from "@/components/cta";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/shared/navbar/navbar";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Blog />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
