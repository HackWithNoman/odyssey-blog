"use client";

import { useState, useEffect } from "react";
import { FileText, FilePlus, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  status: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const draftPosts = posts.filter((p) => p.status === "draft").length;

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchPosts();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: "Total Posts", value: totalPosts.toString(), icon: FileText },
    { label: "Published", value: publishedPosts.toString(), icon: CheckCircle },
    { label: "Drafts", value: draftPosts.toString(), icon: FilePlus },
    { label: "Last Updated", value: "Today", icon: Clock },
  ];

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
          {isLoading ? (
            <p className="text-muted-foreground py-8 text-center">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No posts yet. Create your first post!
            </p>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{post.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.excerpt || "No excerpt"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={post.status === "published" ? "default" : "secondary"}
                    >
                      {post.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;