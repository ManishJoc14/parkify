"use client";

import { HomeIcon, Settings } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  {
    name: "Parking Spots",
    href: "/admin/parking-spots",
    icon: Settings,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-mont-medium hover:bg-primary/10 hover:text-primary transition-all md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-primary/10 text-primary": pathname.includes(link.href),
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
