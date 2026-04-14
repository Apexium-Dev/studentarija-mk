"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    icon: "🎓",
    title: "Стипендии",
    href: "/scholarships",
    color: "bg-yellow-50 group-hover:bg-yellow-100",
  },
  {
    id: 2,
    icon: "🏠",
    title: "Студентски домови",
    href: "/dorms",
    color: "bg-blue-50 group-hover:bg-blue-100",
  },
  {
    id: 3,
    icon: "🚌",
    title: "ЈСП",
    href: "/jsp",
    color: "bg-orange-50 group-hover:bg-orange-100",
  },
  {
    id: 4,
    icon: "🚇",
    title: "Транспорт",
    href: "/transport",
    color: "bg-purple-50 group-hover:bg-purple-100",
  },
  {
    id: 5,
    icon: "📅",
    title: "Настани",
    href: "/events",
    color: "bg-pink-50 group-hover:bg-pink-100",
  },
  {
    id: 6,
    icon: "📄",
    title: "Документи",
    href: "/documents",
    color: "bg-cyan-50 group-hover:bg-cyan-100",
  },
  {
    id: 7,
    icon: "❓",
    title: "FAQ",
    href: "/faq",
    color: "bg-green-50 group-hover:bg-green-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export default function QuickNavigation() {
  return (
    <section className="px-4 md:px-8 py-10">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
          Брза навигација
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Најди го точно тоа што ти е потребно
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={cardVariants}>
            <Link
              href={cat.href}
              className="group bg-white border border-[#e2e8f0] rounded-[20px] p-4 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-md cursor-pointer h-full"
            >
              <motion.div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${cat.color} bg-gray-50`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{cat.icon}</span>
              </motion.div>
              <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                {cat.title}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
