"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage({
        type: "error",
        text: "Пожалуста внесете валидна емаил адреса",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subs")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          setMessage({
            type: "error",
            text: "Оваа емаил адреса е веќе претплатена",
          });
        } else {
          setMessage({
            type: "error",
            text: "Се случи грешка. Пробајте повторно.",
          });
        }
      } else {
        setMessage({
          type: "success",
          text: "Успешно сте се претплатиле! 🎉",
        });
        setEmail("");
        setTimeout(() => setMessage(null), 4000);
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      setMessage({
        type: "error",
        text: "Се случи грешка. Пробајте повторно.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="my-16 px-4 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl md:rounded-[40px] bg-linear-to-br from-green-700 to-green-900 p-6 sm:p-10 md:p-16 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content: Text & Input */}
          <div className="w-full">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Останете
              <br className="block" />
              <span className="bg-linear-to-r from-green-300 to-green-200 bg-clip-text text-transparent">
                информирани
              </span>
            </motion.h2>

            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-green-100/85 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Добијте вести директно во вашиот пост. Придружи се со хиљади
              студенти.
            </motion.p>

            {/* Form Section */}
            <motion.form
              onSubmit={handleSubmit}
              className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="email"
                placeholder="Вашата емаил адреса"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full rounded-full border border-white/20 bg-white/10 py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-white placeholder-green-200/50 outline-none backdrop-blur-sm focus:border-green-400 focus:ring-2 focus:ring-green-400/30 disabled:opacity-50 transition"
              />
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-full bg-[#64FF8E] px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-[#065F32] transition hover:bg-white hover:shadow-lg disabled:opacity-50 active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Чека..." : "Претплати се"}
              </motion.button>
            </motion.form>

            {/* Status Message */}
            {message && (
              <motion.div
                className={`mt-4 px-4 py-3 rounded-full text-xs sm:text-sm font-semibold text-center ${
                  message.type === "success"
                    ? "bg-green-400/20 text-green-200 border border-green-400/50"
                    : "bg-red-400/20 text-red-200 border border-red-400/50"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message.text}
              </motion.div>
            )}
          </div>

          {/* Right Content: Phone Mockup Image - Hidden on mobile, shown on md+ */}
          <motion.div
            className="hidden md:flex relative justify-center md:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 lg:w-72">
              {/* Phone Mockup Image */}
              <motion.img
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800"
                alt="Studentarija App Mockup"
                className="relative z-10 rounded-[2.5rem] shadow-2xl"
                whileHover={{ rotate: 3, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
              {/* Subtle Glow behind the phone */}
              <motion.div
                className="absolute inset-0 z-0 bg-green-400/30 blur-[80px]"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterCTA;
