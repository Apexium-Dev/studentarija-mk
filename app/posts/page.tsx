"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Heart, ArrowRight } from "lucide-react";
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
  likes_count: number;
}

export default function AllPostsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const categories = ["All Posts", "ВЕСТ", "СТИПЕНДИИ", "ДОМОВИ", "НАСТАВА"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Limit to 50 posts for better performance
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) {
          console.error("Fetch error:", error);
          return;
        }

        setPosts(data || []);
        setFilteredPosts(data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery, posts]);

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `пред ${diffMins} мин`;
    if (diffHours < 24) return `пред ${diffHours} ч`;
    if (diffDays < 7) return `пред ${diffDays} дена`;
    return new Date(date).toLocaleDateString("mk-MK");
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ВЕСТ: "bg-green-500 text-white",
      СТИПЕНДИИ: "bg-blue-500 text-white",
      ДОМОВИ: "bg-purple-500 text-white",
      НАСТАВА: "bg-orange-500 text-white",
    };
    return colors[category] || "bg-gray-500 text-white";
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="px-6 py-8 md:px-12 font-sans text-gray-900">
        {/* Hero Heading */}
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Сите <span className="text-green-700">постови</span>
          </h1>
          <p className="mt-4 max-w-sm text-gray-600 font-medium">
            Пронајди ги сите вести и постови за студентски живот
          </p>
        </motion.header>

        {/* Search and Filter */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Search Bar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Пребарај постови..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-white border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                  selectedCategory === category
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {paginatedPosts.map((post, index) => {
                // First post large (if exists)
                if (index === 0) {
                  return (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                      <motion.div
                        className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -4 }}
                      >
                        {post.image_url && (
                          <div className="bg-gray-200 w-full h-64 rounded-2xl mb-4 overflow-hidden">
                            <img
                              loading="lazy"
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded ${getCategoryColor(
                              post.category,
                            )}`}
                          >
                            {post.category}
                          </span>
                          <h3 className="font-bold mt-2 leading-tight text-lg line-clamp-3">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-3">
                            {getRelativeTime(post.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Heart size={12} /> {post.likes_count || 0}
                          </span>
                          <ArrowRight size={14} className="text-gray-300" />
                        </div>
                      </motion.div>
                    </Link>
                  );
                }

                // Second post medium
                if (index === 1) {
                  return (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                      <motion.div
                        className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -4 }}
                      >
                        {post.image_url && (
                          <div className="bg-gray-200 w-full h-64 rounded-2xl mb-4 overflow-hidden">
                            <img
                              loading="lazy"
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded ${getCategoryColor(
                              post.category,
                            )}`}
                          >
                            {post.category}
                          </span>
                          <h3 className="font-bold mt-2 leading-tight text-lg line-clamp-3">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-3">
                            {getRelativeTime(post.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Heart size={12} /> {post.likes_count || 0}
                          </span>
                          <ArrowRight size={14} className="text-gray-300" />
                        </div>
                      </motion.div>
                    </Link>
                  );
                }

                // Rest of the posts - small cards
                return (
                  <Link key={post.id} href={`/posts/${post.id}`}>
                    <motion.div
                      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                      style={{ minHeight: "280px" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ y: -4 }}
                    >
                      {post.image_url && (
                        <div className="bg-gray-200 aspect-square rounded-2xl mb-4 overflow-hidden">
                          <img
                            loading="lazy"
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-1 rounded ${getCategoryColor(
                            post.category,
                          )}`}
                        >
                          {post.category}
                        </span>
                        <h3 className="font-bold mt-2 leading-tight text-base line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-3">
                          {getRelativeTime(post.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Heart size={12} /> {post.likes_count || 0}
                        </span>
                        <ArrowRight size={14} className="text-gray-300" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center gap-2 mt-12 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Previous Button */}
                <motion.button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                >
                  ← Назад
                </motion.button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <motion.button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full font-semibold transition ${
                        currentPage === page
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  ),
                )}

                {/* Next Button */}
                <motion.button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                >
                  Напред →
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg">
              Нема постови во оваа категорија
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
