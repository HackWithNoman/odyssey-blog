import { getPublishedPosts } from "@/src/lib/posts";
import Blog from "@/components/blog";
import CTA from "@/components/home/cta";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <main>
      <Hero />
      <Blog posts={posts} />
      <Features />
      <Testimonials />
      <CTA />
    </main>
  );
}