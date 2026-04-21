"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/academia", label: "Academia" },
  { href: "/sobre", label: "Sobre Arcode" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/arcode-icon.png"
              alt="Arcode"
              width={32}
              height={32}
              className="rounded-md w-8 h-8 object-contain"
            />
            <span className="font-semibold text-lg text-[#0a1628]" style={{ fontFamily: "var(--font-geist)" }}>
              Arcode
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contacto"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              )}
            >
              Demo gratuita
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden" aria-label="Abrir menú">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <SheetClose key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center px-4 py-3 text-base font-medium rounded-lg hover:bg-[#f8fafc] transition-colors w-full"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 px-4">
                  <SheetClose>
                    <Link
                      href="/contacto"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants(),
                        "w-full rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                      )}
                    >
                      Demo gratuita
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
