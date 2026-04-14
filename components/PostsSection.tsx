"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "./PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

const PostsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="px-4 md:px-8 py-16">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold text-[#1a1a1a] mb-2">
          Последни вести
        </h2>
        <p className="text-gray-500">
          Остани информиран со најновите објави и вести
        </p>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014d2c]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error: {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Нема објави за приказ. Назад скоро!
          </p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default PostsSection;
