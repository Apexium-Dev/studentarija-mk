"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, LogOut, LogIn, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Почетна" },
    { href: "/scholarships", label: "Стипендии" },
    { href: "/dorms", label: "Домови" },
    { href: "/jsp", label: "ЈСП" },
    { href: "/events", label: "Настани" },
    { href: "/documents", label: "Документи" },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-white to-[#F8FAFC] border-b border-[#E2E8F0] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#166534] to-[#15803d] rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
              <span className="text-white font-bold text-lg">С</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#166534] to-[#15803d] bg-clip-text text-transparent hidden sm:block">
              Студентарија.мк
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#1E293B] rounded-md hover:bg-[#E2E8F0] hover:text-[#166534] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 rounded-lg text-[#1E293B] hover:bg-[#E2E8F0] transition-all duration-200">
              <Search size={20} />
            </button>

            {!loading && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#E2E8F0] transition-all duration-200 border border-[#E2E8F0]"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[#166534] to-[#15803d] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-[#1E293B] truncate max-w-[120px]">
                    {user.email?.split("@")[0]}
                  </span>
                  <ChevronDown
                    size={16}
                    className="hidden sm:block text-[#64748B]"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#E2E8F0]">
                      <p className="text-sm font-semibold text-[#1E293B]">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-all"
                    >
                      <div className="w-4 h-4 bg-[#166534] rounded-full"></div>
                      Профил
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all border-t border-[#E2E8F0]"
                    >
                      <LogOut size={16} />
                      Одјави се
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                disabled={loading}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#166534] to-[#15803d] text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
              >
                <LogIn size={18} />
                Најави се
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1E293B] hover:bg-[#E2E8F0] transition-all"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-[#F8FAFC] to-white border-t border-[#E2E8F0] py-4 px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-[#1E293B] rounded-md hover:bg-[#E2E8F0] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && !user && (
              <button
                onClick={() => {
                  handleLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#166534] to-[#15803d] text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Најави се
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
