"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Bookmark, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  category: string;
  created_at: string;
}

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) {
          console.error("Fetch error:", fetchError);
          setError("Пост не е пронајден");
          return;
        }

        setPost(data);
        setLikes(data.likes_count || 0);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Се случи грешка при преземање на постот");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014d2c]"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-950 mb-4">
            {error || "Пост не е пронајден"}
          </h1>
          <Link
            href="/"
            className="text-green-700 hover:text-green-800 font-semibold"
          >
            Назад на почетна
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Header Section */}
      <motion.header
        className="mx-auto max-w-4xl px-6 pt-8 md:pt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back Button and Category Row */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition text-sm"
            >
              <ArrowLeft size={18} />
              Назад
            </Link>
          </motion.div>

          <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-gray-500 uppercase">
            <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
              {post.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{getRelativeTime(post.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-8 text-gray-950"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {post.title}
        </motion.h1>

        {/* Actions Row */}
        <motion.div
          className="flex items-center justify-end gap-2 border-b border-gray-200 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.button
            className="flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLikes(likes + 1)}
          >
            <Heart size={18} className="text-red-500 fill-red-500" />
            {likes}
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark size={18} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={18} />
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Main Image */}
      <motion.div
        className="mx-auto max-w-4xl px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full rounded-3xl shadow-lg aspect-video object-cover"
          />
        ) : (
          <div className="w-full rounded-3xl shadow-lg aspect-video bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center text-6xl">
            📰
          </div>
        )}
      </motion.div>

      {/* Article Content */}
      <motion.article
        className="mx-auto max-w-4xl px-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {/* Main Content */}
        <div className="text-gray-700 py-8">
          <p className="text-lg leading-relaxed text-gray-800 mb-8 first-letter:capitalize">
            {post.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 mb-16">
            {["#Студенти", "#Вести", `#${post.category}`].map((tag) => (
              <motion.span
                key={tag}
                className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-200 cursor-pointer transition"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
