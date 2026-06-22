"use client";

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", emoji: "📊" },
    { href: "/admin/beneficiaries", label: "Beneficiaries", emoji: "👥" },
    { href: "/admin/programs", label: "Programs", emoji: "📦" },
    { href: "/admin/applications", label: "Applications", emoji: "📝" },
    {
      href: "/admin/distribution-logs",
      label: "Distribution Logs",
      emoji: "📤",
    },
    { href: "/admin/reports", label: "Reports", emoji: "📈" },
    { href: "/admin/users", label: "User Management", emoji: "🔒" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-sidebar px-4 py-6 text-sidebar-foreground border-r border-sidebar-border">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-slate-800 flex items-center justify-center text-white">
          DR
        </div>
        <div>
          <div className="text-sm font-semibold">DICT R5</div>
          <div className="text-xs text-slate-300">region5@dict.gov.ph</div>
        </div>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/10"
          >
            <span className="text-lg">{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <hr className="my-4 border-sidebar-border" />
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/10"
        >
          <span className="text-lg">⤓</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
