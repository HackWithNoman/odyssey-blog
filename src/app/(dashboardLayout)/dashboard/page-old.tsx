"use client";

import { signOut, useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;

  // If no session, show nothing (useEffect will handle redirect)
  if (!session) return null;

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {session.user.name || "User"}!</p>
      <p>Email: {session.user.email}</p>
      <button
        onClick={async () => {
          await signOut();
          router.push("/login");
        }}
        className="w-full bg-white text-black border-2 font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
}
