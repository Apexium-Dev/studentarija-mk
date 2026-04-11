"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-[#E2E8F0]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-[#166534]">
            Студентарија.мк
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1E293B]">
          <Link href="/">Почетна</Link>
          <Link href="/scholarships">Стипендии</Link>
          <Link href="/dorms">Домови</Link>
          <Link href="/jsp">ЈСП</Link>
          <Link href="/events">Настани</Link>
          <Link href="/documents">Документи</Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-[#F8FAFC]">
            <Search size={18} className="text-[#1E293B]" />
          </button>

          <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-[#E2E8F0] hover:bg-[#F8FAFC] transition">
            <User size={18} className="text-[#1E293B]" />
          </button>

          <button className="bg-[#4ADE80] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#22c55e] transition">
            Најави се
          </button>

          <button
            className="md:hidden text-[#1E293B] text-xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm text-[#1E293B]">
          <Link href="/">Почетна</Link>
          <Link href="/scholarships">Стипендии</Link>
          <Link href="/dorms">Домови</Link>
          <Link href="/jsp">ЈСП</Link>
          <Link href="/events">Настани</Link>
          <Link href="/documents">Документи</Link>
          <Link href="/profile">Профил</Link>
        </div>
      )}
    </nav>
  );
}
