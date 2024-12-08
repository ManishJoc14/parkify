"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur-[20px]">
      <div className="container mx-auto flex h-16 items-baseline justify-between px-4">
        <Link href="/" className="flex items-baseline">
          <span className="h-8 text-4xl">🚗</span>
          <span className="text-xl font-semibold">Parkify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="#how-it-works"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#benefits"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Benefits
          </Link>
          <Link
            href="#testimonials"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            Testimonial
          </Link>
          <Link
            href="#faq"
            className="text-md font-semibold font-sans text-secondary-foreground hover:text-primary transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden mt-3">
              <Menu className="h-8 w-8" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/benefits"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Testimonial
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Button
                variant="default"
                asChild
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
