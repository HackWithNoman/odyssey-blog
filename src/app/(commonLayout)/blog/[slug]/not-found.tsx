import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-4">
        Post Not Found
      </h2>
      <p className="text-muted-foreground mb-8">
        The post you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/blog">Back to Blog</Link>
      </Button>
    </div>
  );
}