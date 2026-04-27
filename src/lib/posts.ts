import prisma from "@/src/lib/prisma";

interface PostWithAuthor {
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

interface GetPostsOptions {
  category?: string;
  sort?: "latest" | "oldest";
}

export async function getPublishedPosts({ category, sort = "latest" }: GetPostsOptions = {}): Promise<PostWithAuthor[]> {
  const orderBy = sort === "oldest"
    ? { createdAt: "asc" as const }
    : { createdAt: "desc" as const };

  const where: { status: string; category?: string } = { status: "published" };
  if (category && category !== "all") {
    where.category = category;
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy,
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
    },
  });
  return posts as PostWithAuthor[];
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { status: "published", category: { not: null } },
    select: { category: true },
    distinct: ["category"],
  });
  return posts.map((p) => p.category!).filter((c) => c !== "");
}