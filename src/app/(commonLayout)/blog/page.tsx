import { getPublishedPosts } from "@/src/lib/posts";
import Blog from "@/components/blog";

export default async function Page() {
  const posts = await getPublishedPosts();

  return <Blog posts={posts} />;
}