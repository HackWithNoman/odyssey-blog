"use client";

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

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-16 xl:px-0 mt-24">
      <div className="flex items-end justify-between">
        <h2 className="font-medium text-[1.5rem] tracking-tight">Read Posts</h2>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          No posts yet. Check back later!
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
};

export default Blog;