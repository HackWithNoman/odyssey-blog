"use client";

import { Suspense } from "react";
import BlogFiltersContent from "./blog-filters";

interface BlogProps {
  posts: any[];
  categories: string[];
  selectedCategory?: string;
  selectedSort?: string;
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

export default function Blog(props: BlogProps) {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogFiltersContent {...props} />
    </Suspense>
  );
}