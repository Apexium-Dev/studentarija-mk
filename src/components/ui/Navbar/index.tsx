'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { GraduationCap, Search, Sun, Globe, UserRound, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from './links'
import AktuelnoDropdown from './AktuelnoDropdown'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
          scrolled
            ? 'bg-[var(--bg-main)]/95 backdrop-blur-md border-b border-[var(--border-main)]'
            : 'bg-[var(--bg-main)] border-b border-[var(--border-main)]'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group mr-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="font-black text-base tracking-tight uppercase text-[var(--text-main)]">
              Студентарија<span className="text-primary">.мк</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            <AktuelnoDropdown />

            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-colors relative',
                    active
                      ? 'text-primary'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
            <button className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
              <Sun className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-black text-[11px] uppercase">
              <Globe className="w-4 h-4" />
            </button>

            <Link
              href="/login"
              className="flex items-center gap-2 h-9 px-4 bg-primary text-dark font-black text-[11px] uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm ml-1"
            >
              <UserRound className="w-3.5 h-3.5" />
              Влез
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden ml-auto w-10 h-10 flex items-center justify-center border border-[var(--border-main)] text-[var(--text-muted)] hover:text-primary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
