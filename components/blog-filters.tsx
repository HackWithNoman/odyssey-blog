"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  status: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface BlogFiltersProps {
  posts: Post[];
  categories: string[];
  selectedCategory?: string;
  selectedSort?: string;
}

const DEFAULT_CATEGORIES = [
  "Technology",
  "Business",
  "Lifestyle",
  "Finance",
  "Health",
  "Science",
];

function BlogFiltersContent({ posts, categories, selectedCategory, selectedSort = "latest" }: BlogFiltersProps) {
  const searchParams = useSearchParams();
  const allCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    window.location.href = `/blog?${params.toString()}`;
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    window.location.href = `/blog?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-16 xl:px-0 mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <h2 className="font-medium text-[1.5rem] tracking-tight">Read Posts</h2>
        <div className="flex gap-3">
          <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          No posts found. Try a different category.
        </p>
      ) : (
        <div className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              className="gap-0 overflow-hidden rounded-lg py-0 shadow-none"
              key={post.id}
            >
              <CardHeader className="relative p-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-video w-full border-b block"
                >
                  <Image
                    alt={post.title}
                    className="object-cover hover:opacity-90 transition-opacity"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={post.coverImage || "/placeholder.jpg"}
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/5 text-primary shadow-none hover:bg-primary/5">
                    {post.category || "General"}
                  </Badge>
                  <span className="font-medium text-muted-foreground text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="mt-4 font-medium text-[1.4rem] text-xl tracking-[-0.02em] hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                <Button
                  asChild
                  className="mt-6 shadow-none"
                  variant="link"
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read more <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogLoading() {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-16 xl:px-0 mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <h2 className="font-medium text-[1.5rem] tracking-tight">Read Posts</h2>
      </div>
      <div className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-muted rounded-lg mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogFilters(props: BlogFiltersProps) {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogFiltersContent {...props} />
    </Suspense>
  );
}