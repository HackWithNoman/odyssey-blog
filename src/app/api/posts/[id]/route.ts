import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { generateSlug } from "@/src/lib/slug";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: you can only edit your own posts" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, coverImage, category, status } = body;

    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = generateSlug(title);
      const existingSlug = await prisma.post.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title ?? existingPost.title,
        slug,
        excerpt: excerpt !== undefined ? excerpt : existingPost.excerpt,
        content: content ?? existingPost.content,
        coverImage:
          coverImage !== undefined ? coverImage : existingPost.coverImage,
        category: category !== undefined ? category : existingPost.category,
        status: status ?? existingPost.status,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT /api/posts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (existingPost.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: you can only delete your own posts" },
        { status: 403 }
      );
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}