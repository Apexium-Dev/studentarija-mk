"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

const AdminPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error("Title and content are required");
      }

      const { error: supabaseError } = await supabase
        .from("posts")
        .insert([
          {
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url || null,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (supabaseError) {
        console.error("Supabase error details:", supabaseError);
        throw new Error(supabaseError.message || JSON.stringify(supabaseError));
      }

      setSuccess(true);
      setFormData({ title: "", content: "", image_url: "" });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null
            ? JSON.stringify(err)
            : "Failed to create post";
      setError(errorMessage);
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="text-[#014d2c] font-semibold hover:underline mb-4 inline-block"
          >
            ← Назад на почетна
          </Link>
          <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-2">
            Администраторски панел
          </h1>
          <p className="text-gray-500">Додај нова објава</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 border border-[#e2e8f0]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Success Message */}
          {success && (
            <motion.div
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Објава успешно креирана!
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✗ {error}
            </motion.div>
          )}

          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              Наслов
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Напиши наслов на објавата"
              className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#014d2c] transition-all"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              Содржина
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Напиши содржина на објавата..."
              rows={6}
              className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#014d2c] transition-all resize-none"
              required
            />
          </div>

          {/* Image URL Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              URL на слика (опционално)
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#014d2c] transition-all"
            />
            <p className="text-xs text-gray-400 mt-2">
              Користи директен линк до слика (напр. од imgur, cloudinary, итн.)
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#014d2c] text-white rounded-lg font-semibold hover:bg-[#013d22] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "Се креира..." : "Креирај објава"}
          </motion.button>
        </motion.form>

        {/* Info Box */}
        <motion.div
          className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="font-semibold text-blue-900 mb-2">💡 Совет:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Нaслов: Користи јасен, кус наслов</li>
            <li>• Содржина: Детално опишување на вестта</li>
            <li>
              • Слика: Копирај директен линк од облачен сервис (imgur, etc.)
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPostForm;
