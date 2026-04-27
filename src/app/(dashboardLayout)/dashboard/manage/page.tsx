"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const categories = [
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "business", label: "Business" },
];

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
  author: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editPost, setEditPost] = useState<Post | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const [deletePost, setDeletePost] = useState<Post | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchPosts();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (post: Post) => {
    setEditPost({ ...post });
    setEditError("");
    setIsEditOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editPost) return;
    setEditError("");
    setIsEditLoading(true);

    try {
      const response = await fetch(`/api/posts/${editPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editPost.title,
          excerpt: editPost.excerpt,
          content: editPost.content,
          coverImage: editPost.coverImage,
          category: editPost.category,
          status: editPost.status,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update post");
      }

      setIsEditOpen(false);
      setEditPost(null);
      fetchPosts();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDeleteConfirm = (post: Post) => {
    setDeletePost(post);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deletePost) return;
    setIsDeleteLoading(true);

    try {
      const response = await fetch(`/api/posts/${deletePost.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete post");
      }

      setIsDeleteOpen(false);
      setDeletePost(null);
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
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
        {isLoading ? (
          <p className="text-muted-foreground py-8 text-center">Loading…</p>
        ) : paginatedPosts.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">No posts found.</p>
        ) : (
          paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1 flex-1 min-w-0 pr-4">
                <p className="font-medium truncate">{post.title}</p>
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
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    title="View"
                    onClick={() => router.push(`/blog/${post.slug}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Edit"
                    onClick={() => handleEdit(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDeleteConfirm(post)}
                  >
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

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          {editPost && (
            <div className="space-y-4">
              {editError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                  {editError}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editPost.title}
                  onChange={(e) =>
                    setEditPost({ ...editPost, title: e.target.value })
                  }
                  disabled={isEditLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Input
                  id="edit-excerpt"
                  value={editPost.excerpt || ""}
                  onChange={(e) =>
                    setEditPost({ ...editPost, excerpt: e.target.value })
                  }
                  disabled={isEditLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-coverImage">Cover Image URL</Label>
                <Input
                  id="edit-coverImage"
                  value={editPost.coverImage || ""}
                  onChange={(e) =>
                    setEditPost({ ...editPost, coverImage: e.target.value })
                  }
                  disabled={isEditLoading}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editPost.category || ""}
                    onValueChange={(val) =>
                      setEditPost({ ...editPost, category: val })
                    }
                    disabled={isEditLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editPost.status}
                    onValueChange={(val) =>
                      setEditPost({ ...editPost, status: val })
                    }
                    disabled={isEditLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  className="min-h-[200px]"
                  value={editPost.content}
                  onChange={(e) =>
                    setEditPost({ ...editPost, content: e.target.value })
                  }
                  disabled={isEditLoading}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isEditLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} disabled={isEditLoading}>
              {isEditLoading ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &ldquo;{deletePost?.title}&rdquo;? This
            action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Page;