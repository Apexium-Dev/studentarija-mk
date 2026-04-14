"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, LogOut, LogIn, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth/useAuth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  const menuVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.1 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.15 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.1 } },
  };

  return (
    <nav className="w-full bg-gradient-to-r from-white to-[#F8FAFC] border-b border-[#E2E8F0] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 bg-linear-to-br from-[#166534] to-[#15803d] rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                <span className="text-white font-bold text-lg">С</span>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-[#166534] to-[#15803d] bg-clip-text text-transparent hidden sm:block">
                Студентарија.мк
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[#1E293B] rounded-md hover:bg-[#E2E8F0] hover:text-[#166534] transition-all duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-[#1E293B] hover:bg-[#E2E8F0] transition-all duration-200"
            >
              <Search size={20} />
            </motion.button>

            {!loading && user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#E2E8F0] transition-all duration-200 border border-[#E2E8F0]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-7 h-7 bg-linear-to-br from-[#166534] to-[#15803d] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-[#1E293B] truncate max-w-30">
                    {user.email?.split("@")[0]}
                  </span>
                  <motion.div
                    animate={{ rotate: userMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={16}
                      className="hidden sm:block text-[#64748B]"
                    />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-50"
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                onClick={handleLoginClick}
                disabled={loading}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#166534] to-[#15803d] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={18} />
                Најави се
              </motion.button>
            )}

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1E293B] hover:bg-[#E2E8F0] transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-linear-to-b from-[#F8FAFC] to-white border-t border-[#E2E8F0] py-4 px-4 space-y-2 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-sm font-medium text-[#1E293B] rounded-md hover:bg-[#E2E8F0] transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {!loading && !user && (
                <motion.button
                  onClick={() => {
                    handleLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-linear-to-r from-[#166534] to-[#15803d] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  Најави се
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
