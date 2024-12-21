"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HeaderAuth from "../authComponents/header-auth";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#testimonials", label: "Testimonial" },
    { href: "#benefits", label: "Benefits" },
    { href: "#faq", label: "FAQ" },
    { href: "#feedback", label: "Feedback" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-900 backdrop-blur-[20px]">
      <div className="container mx-auto flex h-16 items-baseline justify-between px-4">
        <Link href="/" className="flex items-baseline">
          <span className="h-8 text-4xl">🚗</span>
          <span className="text-xl font-semibold text-white">Parkify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-md font-semibold font-sans text-white hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <HeaderAuth />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden mt-3 text-white">
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <HeaderAuth />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
