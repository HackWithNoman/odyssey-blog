import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/src/lib/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "published" },
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      {post.coverImage && (
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            alt={post.title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            src={post.coverImage}
            priority
          />
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        {post.category && (
          <Badge variant="secondary">{post.category}</Badge>
        )}
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-6">
        {post.title}
      </h1>

      {post.author && (
        <div className="flex items-center gap-3 mb-8 pb-8 border-b">
          {post.author.image ? (
            <Image
              alt={post.author.name}
              className="rounded-full object-cover"
              width={40}
              height={40}
              src={post.author.image}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">Author</p>
          </div>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}