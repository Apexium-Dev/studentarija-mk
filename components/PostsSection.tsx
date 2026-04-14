"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PostCard from "./PostCard";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  category: string;
  created_at: string;
}

const PostsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (fetchError) {
          console.error("Fetch error:", fetchError);
          setError("Не можеше да се преземат постовите");
          return;
        }

        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Се случи грешка при преземање на постовите");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014d2c]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 flex items-baseline justify-between"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-950">
            Најнови објави
          </h2>
          <Link
            href="/posts"
            className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1.5 transition-colors"
          >
            Види сите постови <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg">Нема достапни постови</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PostsSection;
