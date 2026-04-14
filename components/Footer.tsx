"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "За нас", href: "/about" },
    { label: "Постови", href: "/posts" },
    { label: "Контакт", href: "/contact" },
    { label: "Политика", href: "/privacy" },
  ];

  const socialLinks = [
    {
      icon: Mail,
      label: "Instagram",
      href: "https://www.instagram.com/studentarijamk/",
      customSvg: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:studentarijamkd@gmail.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="w-full bg-white">
      <div className="w-full h-px bg-gray-200" />
      <motion.div
        className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-14 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Studentarija Logo"
                className="w-12 h-12"
              />
              <h3 className="font-black text-xl text-gray-900">
                Студентарија.мк
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Центар за студентски вести, вести и ажурирања за целиот студентски
              живот.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-700 rounded-full"></span>
              Брзи линкови
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-green-700 font-medium transition flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-700 rounded-full"></span>
              Контакт
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-green-700 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </p>
                  <a
                    href="mailto:studentarijamkd@gmail.com"
                    className="text-gray-900 font-semibold hover:text-green-700 transition"
                  >
                    studentarijamkd@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-green-700 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Локација
                  </p>
                  <p className="text-gray-900 font-semibold">Скопје, МК</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-700 rounded-full"></span>
              Следи нас
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-700 hover:bg-green-700 hover:border-green-700 hover:text-white transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    {social.customSvg ? social.customSvg : <Icon size={18} />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer - Compact */}
        <motion.div className="text-center space-y-3" variants={itemVariants}>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs md:text-sm text-gray-600">
            <p>
              © {currentYear}{" "}
              <span className="font-bold text-gray-900">studentarijamk</span>
            </p>
            <span className="hidden md:inline text-gray-300">•</span>
            <a
              href="/privacy"
              className="hover:text-green-700 transition font-medium"
            >
              Приватност
            </a>
            <span className="hidden md:inline text-gray-300">•</span>
            <a
              href="/terms"
              className="hover:text-green-700 transition font-medium"
            >
              Услови
            </a>
          </div>

          <motion.div
            className="text-xs text-gray-500 pt-2"
            whileHover={{ scale: 1.02 }}
          >
            Направено од{" "}
            <a
              href="https://www.instagram.com/apexiumdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 font-bold hover:underline"
            >
              Apexium Dev
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
