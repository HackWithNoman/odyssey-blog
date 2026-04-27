import prisma from "@/src/lib/prisma";

export async function getPublishedPosts() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
    },
  });
  return posts;
}