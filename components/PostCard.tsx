"use client";

import React from "react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const publishDate = new Date(post.created_at).toLocaleDateString("mk-MK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#e2e8f0] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Image */}
      {post.image_url && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <motion.img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold text-[#1a1a1a] mb-2 line-clamp-2 hover:text-[#014d2c] transition-colors"
          whileHover={{ x: 4 }}
        >
          {post.title}
        </motion.h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
          <div>
            <p className="text-xs text-gray-400">{publishDate}</p>
          </div>
          <motion.button
            className="px-4 py-2 bg-[#014d2c] text-white rounded-lg text-sm font-semibold hover:bg-[#013d22] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Прочитај
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
