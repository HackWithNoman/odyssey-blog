"use client";

import { FileText, Users, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Posts", value: "24", icon: FileText },
  { label: "Total Authors", value: "8", icon: Users },
  { label: "Total Views", value: "12.5K", icon: Eye },
  { label: "This Month", value: "+18%", icon: TrendingUp },
];

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 16",
    excerpt: "Learn the fundamentals of Next.js 16 and how to build modern web applications.",
    status: "published",
    date: "2026-04-27",
    views: 1250,
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    excerpt: "A deep dive into React Server Components and their benefits.",
    status: "published",
    date: "2026-04-25",
    views: 980,
  },
  {
    id: 3,
    title: "Building Accessible User Interfaces",
    excerpt: "Best practices for creating accessible web applications.",
    status: "draft",
    date: "2026-04-24",
    views: 0,
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox.",
    status: "published",
    date: "2026-04-22",
    views: 2100,
  },
  {
    id: 5,
    title: "Performance Optimization Techniques",
    excerpt: "Tips and tricks to optimize your web application performance.",
    status: "draft",
    date: "2026-04-20",
    views: 0,
  },
];

function Page() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your blog.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium leading-none">{post.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={post.status === "published" ? "default" : "secondary"}
                  >
                    {post.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.views > 0 ? `${post.views.toLocaleString()} views` : "—"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {post.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;