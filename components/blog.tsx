import { ChevronRight } from "lucide-react";
import Image from "next/image";
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

import blogPosts from "@/src/blogData";

const Blog = () => {
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

      <div className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card
            className="gap-0 overflow-hidden rounded-lg py-0 shadow-none"
            key={post.title}
          >
            <CardHeader className="relative p-0">
              <div className="relative aspect-video w-full border-b">
                <Image
                  alt={post.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={post.image}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/5 text-primary shadow-none hover:bg-primary/5">
                  {post.category}
                </Badge>
                <span className="font-medium text-muted-foreground text-xs">
                  {post.readTime}
                </span>
              </div>

              <h3 className="mt-4 font-medium text-[1.4rem] text-xl tracking-[-0.02em]">
                {post.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{post.description}</p>

              <Button className="mt-6 shadow-none">
                Read more <ChevronRight />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
