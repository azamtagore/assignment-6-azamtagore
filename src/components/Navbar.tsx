
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Suspense } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedWorkouts } = usePlan();

  const navLinkClass = (active: boolean) =>
    `text-sm font-bold transition ${
      active ? "text-[#baff00]" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d11]/95 text-white backdrop-blur">
 <Suspense fallback= {<div className="h-16 w-full bg-[#0b0d11]/95" />}>
       <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="text-[#baff00]" size={24} />
          <span className="text-xl font-black tracking-tight">
            FIT<span className="text-[#baff00]">LOG</span>
          </span>
        </Link>

        {/* Main navigation */}
        <div className="flex items-center gap-5 sm:gap-8">
          <Link href="/" className={navLinkClass(pathname === "/")}>
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={navLinkClass(pathname.startsWith("/my-plan"))}
          >
            My Plan
          </Link>
        </div>

        {/* Plan and Saved counters */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#15171d] px-3 py-2 transition hover:border-[#baff00]/50"
          >
            <span className="text-sm text-gray-300">Plan</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-[#baff00] px-1.5 text-xs font-black text-black">
              {todaysPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#15171d] px-3 py-2 transition hover:border-[#baff00]/50"
          >
            <span className="text-sm text-gray-300">Saved</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-white/10 px-1.5 text-xs font-black text-white">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </nav>
 </Suspense>
    </header>
  );
}
