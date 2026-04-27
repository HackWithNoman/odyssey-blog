import { getPublishedPosts, getAllCategories } from "@/src/lib/posts";
import BlogFilters from "@/components/blog-filters";

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;
  const sort = (params.sort as "latest" | "oldest") || "latest";

  const posts = await getPublishedPosts({ category, sort });
  const categories = await getAllCategories();

  return <BlogFilters posts={posts} categories={categories} selectedCategory={category} selectedSort={sort} />;
}