import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const footerSections = [
  {
    heading: "Platform",
    links: ["Features", "Pricing", "Mobile App"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t mt-16"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}>
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Top section — brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <p className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>
              AthleteX
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your personalised sports feed. Follow athletes, get updates, stay connected.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <p className="text-xs font-semibold mb-3 uppercase tracking-wider"
                 style={{ color: "var(--text-primary)" }}>
                {section.heading}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs transition hover:opacity-80"
                       style={{ color: "var(--text-secondary)" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
             style={{ borderColor: "var(--border-default)" }}>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            © 2025 AthleteX. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#"
                 className="transition hover:opacity-80"
                 style={{ color: "var(--text-faint)" }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
