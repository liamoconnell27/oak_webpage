"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Pages: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  Services: [
    { name: "Structural Design", href: "/services" },
    { name: "Structural Analysis", href: "/services" },
    { name: "Foundation Engineering", href: "/services" },
    { name: "Building Inspections", href: "/services" },
    { name: "Construction Administration", href: "/services" },
  ],
  Contact: [
    { name: "person@gmail.com", href: "mailto:person@gmail.com" },
    { name: "(610) 555-0100", href: "tel:6105550100" },
    { name: "Ardmore, PA 19003", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-display">OAK Engineering</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Structural engineering services for residential, commercial, and institutional projects across the Greater Philadelphia region.
              </p>
              <p className="text-xs font-mono text-muted-foreground/60">
                Licensed Professional Engineer<br />
                Commonwealth of Pennsylvania
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-mono text-muted-foreground/60 tracking-wider uppercase mb-6">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        {link.href.startsWith("mailto") && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OAK Engineering. All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground/40">
            Ardmore, PA — Serving Greater Philadelphia
          </p>
        </div>
      </div>
    </footer>
  );
}
