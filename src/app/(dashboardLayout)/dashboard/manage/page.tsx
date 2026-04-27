"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 16",
    excerpt: "Learn the fundamentals of Next.js 16 and how to build modern web applications.",
    status: "published",
    date: "2026-04-27",
    views: 1250,
    category: "technology",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    excerpt: "A deep dive into React Server Components and their benefits.",
    status: "published",
    date: "2026-04-25",
    views: 980,
    category: "technology",
  },
  {
    id: 3,
    title: "Building Accessible User Interfaces",
    excerpt: "Best practices for creating accessible web applications.",
    status: "draft",
    date: "2026-04-24",
    views: 0,
    category: "technology",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox.",
    status: "published",
    date: "2026-04-22",
    views: 2100,
    category: "technology",
  },
  {
    id: 5,
    title: "Performance Optimization Techniques",
    excerpt: "Tips and tricks to optimize your web application performance.",
    status: "draft",
    date: "2026-04-20",
    views: 0,
    category: "technology",
  },
  {
    id: 6,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies in web dev.",
    status: "published",
    date: "2026-04-18",
    views: 890,
    category: "technology",
  },
];

function Page() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Manage Posts</h2>
        <p className="text-muted-foreground mt-1">
          View, edit, and delete your blog posts.
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {paginatedPosts.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            No posts found.
          </p>
        ) : (
          paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1 flex-1 min-w-0 pr-4">
                <p className="font-medium truncate">{post.title}</p>
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
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {post.date}
                </span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {post.views > 0 ? `${post.views.toLocaleString()} views` : "—"}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" title="View">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-3 text-sm">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Page;