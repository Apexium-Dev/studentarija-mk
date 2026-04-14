"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <section className="px-4 md:px-8 py-4 h-[calc(100vh-4rem)]">
      <div className="relative w-full h-full bg-[#f3f6f4] rounded-[45px] overflow-hidden flex flex-col md:flex-row">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#22c55e] opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-[#014d2c] opacity-5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          className="flex-1 p-8 md:p-14 flex flex-col justify-center z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-full px-4 py-1.5 text-sm font-semibold text-[#166534] shadow-sm w-fit mb-6"
            variants={itemVariants}
          >
            <motion.span
              className="w-2 h-2 bg-[#22c55e] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Платформа за студенти во Македонија
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight"
            variants={itemVariants}
          >
            Се што им <br />е{" "}
            <span className="relative inline-block">
              <span className="text-[#22c55e]">потребно</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6 Q100 0 200 6"
                  stroke="#22c55e"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            <br />
            на студентите
          </motion.h1>

          <motion.p
            className="mt-4 text-gray-500 text-base md:text-lg max-w-md leading-relaxed"
            variants={itemVariants}
          >
            Стипендии, сместување, настани, попусти и многу повеќе &mdash;
            твојот краен водич низ академскиот живот во Македонија.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            variants={itemVariants}
          >
            <motion.button
              className="group flex items-center gap-2 bg-[#014d2c] text-white px-7 py-3 rounded-full font-bold text-base hover:bg-[#013d22] hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Истражи сега
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.button>
            <motion.button
              className="flex items-center gap-2 bg-white text-gray-900 px-7 py-3 rounded-full font-bold text-base border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Најнови информации
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-3"
            variants={itemVariants}
          >
            <div className="flex -space-x-2">
              {["#a7f3d0", "#6ee7b7", "#34d399", "#10b981"].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-[#1a1a1a]">10,000+</span> студенти
              го користат секој ден
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 relative min-h-75 md:min-h-full"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-[#f3f6f4] via-[#f3f6f4]/20 to-transparent z-10 hidden md:block" />
          <div className="absolute inset-0 bg-linear-to-t from-[#f3f6f4]/60 to-transparent z-10 md:hidden" />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Студенти кои соработуваат"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <motion.div
            className="absolute top-8 right-6 z-20 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-[#e2e8f0]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-[#dcfce7] rounded-xl flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Активни следбеници
              </p>
              <p className="text-lg font-extrabold text-[#014d2c]">60k+</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
