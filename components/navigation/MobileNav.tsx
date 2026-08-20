"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dash", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/quiz", label: "Quiz", icon: ClipboardCheck },
  { href: "/progress", label: "Progress", icon: TrendingUp },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-2 safe-area-pb">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
