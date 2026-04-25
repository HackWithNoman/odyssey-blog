"use client"

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useEffect, useState } from "react";
import Link from "next/link";


const Navbar = () => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background z-50">
      <div className="mx-auto flex h-full items-center justify-between px-4">

        <Link href={'/'}>
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Button
            className="hidden rounded-full sm:inline-flex"
            variant="outline"
            asChild
          >
            <Link href={'/login'}>
              Login
            </Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link href={'/register'}>
              Become an Author
            </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            {mounted && <NavigationSheet />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
