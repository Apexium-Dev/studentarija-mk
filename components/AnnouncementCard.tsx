"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AnnouncementProps {
  type: "announcement" | "critical";
  title: string;
  description: string;
}

const AnnouncementCard = ({ type, title, description }: AnnouncementProps) => {
  const isCritical = type === "critical";

  return (
    <motion.div
      className={`flex items-center justify-between p-4 rounded-[25px] w-full transition-all cursor-pointer hover:opacity-90 ${
        isCritical ? "bg-[#fce8e8]" : "bg-[#e3f7e9]"
      }`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`p-3 rounded-xl ${isCritical ? "bg-[#ff5252]" : "bg-[#58f18e]"}`}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isCritical ? (
            <span className="text-white">⏱️</span>
          ) : (
            <span className="text-white">📢</span>
          )}
        </motion.div>

        <div>
          <p
            className={`text-[10px] font-bold uppercase tracking-wider ${isCritical ? "text-[#c53030]" : "text-[#2d7a4d]"}`}
          >
            {title}
          </p>
          <p className="text-sm font-bold text-gray-800">{description}</p>
        </div>
      </div>

      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowRight size={20} className="text-gray-700 mr-2" />
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementCard;
