import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  SiDribbble,
  SiGithub,
  SiTwitch,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Logo } from "../shared/navbar/logo";

const footerLinks = [
  {
    title: "Authors",
    href: "/authors",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="grow bg-muted" />
      <footer className="border-t">
        <div className="mx-auto max-w-(--breakpoint-xl)">
          <div className="flex flex-col items-center justify-start py-12">
            {/* Logo */}
            <Link href={"/"}>
              <Logo />
            </Link>

            <ul className="mt-6 flex flex-wrap items-center gap-4">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    className="text-muted-foreground hover:text-foreground"
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Blogium
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="/" target="_blank">
                <SiX className="h-5 w-5" />
              </Link>
              <Link href="/" target="_blank">
                <SiDribbble className="h-5 w-5" />
              </Link>
              <Link href="/" target="_blank">
                <SiTwitch className="h-5 w-5" />
              </Link>
              <Link href="/" target="_blank">
                <SiGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
