import Link from "next/link";
import { LayoutDashboard, Plus, FileText, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/add", icon: Plus, label: "Add Post" },
  { href: "/dashboard/manage", icon: FileText, label: "Manage Posts" },
];

function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-card fixed h-full">
        <div className="p-6">
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <nav className="px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-3 right-3">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-full">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64">
        <div className="mx-auto max-w-4xl p-8">{children}</div>
      </main>
    </div>
  );
}

export default dashboardLayout;