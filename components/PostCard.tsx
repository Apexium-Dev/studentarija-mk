"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Bookmark } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  category: string;
  created_at: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const getRelativeTime = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `пред ${diffMins} минути`;
    if (diffHours < 24) return `пред ${diffHours} часа`;
    if (diffDays < 7) return `пред ${diffDays} дена`;
    return postDate.toLocaleDateString("mk-MK");
  };

  return (
    <Link href={`/posts/${post.id}`}>
      <motion.div
        className="max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg flex flex-col h-full cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        {/* Image and Category Badge Section */}
        <div className="relative aspect-video overflow-hidden bg-gray-200">
          {post.image_url ? (
            <motion.img
              src={post.image_url}
              alt={post.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-[#e3f7e9] to-[#c8ede1] flex items-center justify-center">
              <span className="text-4xl">📰</span>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute left-4 top-4 rounded-full bg-green-950 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-300">
            {post.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          {/* Relative Time */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} className="text-gray-400" />
            <span>{getRelativeTime(post.created_at)}</span>
          </div>

          {/* Post Title */}
          <h3 className="mb-2 text-2xl font-bold leading-tight text-gray-950 line-clamp-2">
            {post.title}
          </h3>

          {/* Post Description */}
          <p className="mb-6 text-base text-gray-600 line-clamp-2 flex-1">
            {post.content}
          </p>

          {/* Divider */}
          <div className="mb-5 h-px w-full bg-gray-100" />

          {/* Footer Section */}
          <div className="flex items-center justify-between text-gray-700">
            {/* Likes Counter */}
            <motion.button
              className="flex items-center gap-2 text-sm font-medium transition hover:text-red-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={18} className="transition-colors" />
              <span>0</span>
            </motion.button>

            {/* Bookmark Button */}
            <motion.button
              className="text-gray-500 transition hover:text-blue-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PostCard;
