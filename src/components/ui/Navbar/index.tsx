'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks } from './links'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
            ? 'bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-main)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-primary flex items-center justify-center">
              <span className="text-dark font-black text-xs">С</span>
            </div>
            <span className="font-black text-base tracking-tighter uppercase text-[var(--text-main)] group-hover:text-primary transition-colors">
              Студентарија<span className="text-primary">.мк</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
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
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/brucosi"
              className="hidden md:flex h-9 px-5 bg-primary items-center font-black text-[11px] uppercase tracking-widest text-dark hover:bg-primary/90 transition-colors"
            >
              За Брукоши
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-[var(--border-main)] text-[var(--text-muted)] hover:text-primary transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
