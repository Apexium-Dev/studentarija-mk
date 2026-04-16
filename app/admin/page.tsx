"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { AdminProtection } from "@/components/AdminProtection";
import { useAuth } from "@/lib/auth/useAuth";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  Settings,
  User,
  LogOut,
  Search,
  Bell,
  HelpCircle,
  Plus,
  Upload,
  AlertCircle,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors ${
      active
        ? "bg-emerald-50 text-emerald-600"
        : "text-slate-500 hover:bg-slate-50"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
  growth,
  colorClass,
}: {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
  growth: string;
  colorClass: string;
}) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 flex-1">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={20} className="text-white" />
      </div>
      <span className="text-emerald-500 text-sm font-bold">+{growth}%</span>
    </div>
    <p className="text-slate-400 text-sm">{label}</p>
    <p className="text-3xl font-bold text-slate-800">{value}</p>
  </div>
);

const AdminPostForm = () => {
  useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    category: "ВЕСТ",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "posts" | "users">(
    "dashboard",
  );
  const [postCount, setPostCount] = useState(0);
  const [recentPosts, setRecentPosts] = useState<
    Array<{ id: string; title: string; category: string; created_at: string }>
  >([]);
  const [users, setUsers] = useState<
    Array<{ id: string; email: string; created_at: string; is_admin: boolean }>
  >([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [dailyEngagement, setDailyEngagement] = useState(0);
  const [engagementTrend, setEngagementTrend] = useState(true); // true = above average
  const [weeklyData, setWeeklyData] = useState<
    { date: string; count: number; percentage: number }[]
  >([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(6); // today is last bar
  const [selectedDayDetail, setSelectedDayDetail] = useState<{
    count: number;
    percentage: number;
    dateStr: string;
  } | null>(null);

  const categories = ["ВЕСТ", "СТИПЕНДИИ", "ДОМОВИ", "НАСТАВА"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: postCount } = await supabase
          .from("posts")
          .select("id", { count: "exact" });

        const { count: userCount } = await supabase
          .from("users")
          .select("id", { count: "exact" });

        const { data: posts } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        // Fetch weekly data (last 7 days)
        const weeklyPostCounts: {
          date: string;
          count: number;
          percentage: number;
        }[] = [];
        let totalPostsLastWeek = 0;
        let avgDailyPosts = 0;

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          date.setHours(0, 0, 0, 0);
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);

          const { count: dayPostCount } = await supabase
            .from("posts")
            .select("id", { count: "exact" })
            .gte("created_at", date.toISOString())
            .lt("created_at", nextDay.toISOString());

          weeklyPostCounts.push({
            date: date.toISOString().split("T")[0],
            count: dayPostCount || 0,
            percentage: 0,
          });
          totalPostsLastWeek += dayPostCount || 0;
        }

        avgDailyPosts = Math.round(totalPostsLastWeek / 7);

        // Calculate percentages
        const dataWithPercentages = weeklyPostCounts.map((d) => ({
          ...d,
          percentage:
            avgDailyPosts > 0
              ? Math.min(100, Math.round((d.count / avgDailyPosts) * 100))
              : 0,
        }));

        setWeeklyData(dataWithPercentages);
        setSelectedDayIndex(6);
        const todayData = dataWithPercentages[6];
        setSelectedDayDetail({
          count: todayData.count,
          percentage: todayData.percentage,
          dateStr: new Date(todayData.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        });

        setPostCount(postCount || 0);
        setStudentCount(userCount || 0);
        setDailyEngagement(todayData.percentage);
        setEngagementTrend(todayData.count >= avgDailyPosts);
        setRecentPosts(posts || []);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [success]);

  const handleBarClick = (index: number) => {
    if (!weeklyData || weeklyData.length === 0) return;

    const data = weeklyData[index];
    if (!data) return;

    setSelectedDayIndex(index);
    setSelectedDayDetail({
      count: data.count,
      percentage: data.percentage,
      dateStr: new Date(data.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  };

  const navigateDate = (direction: 1 | -1) => {
    const newIndex = Math.max(0, Math.min(6, selectedDayIndex + direction));
    handleBarClick(newIndex);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        const usersList = await response.json();

        if (Array.isArray(usersList)) {
          setUsers(usersList);
        } else if (usersList.error) {
          throw new Error(usersList.error);
        }
      } catch {
        try {
          const { data: users, error: usersError } = await supabase
            .from("users")
            .select("id, email, created_at");

          const { data: adminUsers } = await supabase
            .from("admin_users")
            .select("user_id, is_admin");

          if (users && users.length > 0) {
            const adminMap = new Map(
              (adminUsers || []).map((a) => [a.user_id, a.is_admin]),
            );

            const usersList = users.map((u) => ({
              id: u.id,
              email: u.email,
              created_at: u.created_at,
              is_admin: adminMap.get(u.id) || false,
            }));
            setUsers(usersList);
          }
        } catch {
          // Both API and fallback failed
        }
      } finally {
        setUsersLoading(false);
      }
    };

    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await supabase.from("admin_users").delete().eq("user_id", userId);
      } else {
        await supabase
          .from("admin_users")
          .insert([{ user_id: userId, is_admin: true }]);
      }

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, is_admin: !currentStatus } : u,
        ),
      );
    } catch (err) {
      console.error("Error toggling admin status:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
            category: formData.category,
            created_at: new Date().toISOString(),
            likes_count: 0,
          },
        ])
        .select();

      if (supabaseError) {
        console.error("Supabase error details:", supabaseError);
        throw new Error(supabaseError.message || JSON.stringify(supabaseError));
      }

      setSuccess(true);
      setFormData({ title: "", content: "", image_url: "", category: "ВЕСТ" });
      setActiveTab("dashboard");

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
    <AdminProtection>
      <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-6">
          <div className="mb-10">
            <h1 className="text-xl font-black tracking-tight">Scholar Pulse</h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarItem
              icon={FileText}
              label="Posts"
              active={activeTab === "posts"}
              onClick={() => setActiveTab("posts")}
            />
            <SidebarItem icon={ImageIcon} label="Media" />
            <SidebarItem
              icon={Users}
              label="Users"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>

          <div className="border-t border-slate-100 pt-6 space-y-2">
            <SidebarItem icon={User} label="Profile" />
            <SidebarItem icon={LogOut} label="Logout" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <header className="flex justify-between items-center mb-10">
                <div className="relative w-96">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search analytics..."
                    className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Bell
                    size={20}
                    className="text-slate-400 cursor-pointer hover:text-slate-600 transition"
                  />
                  <HelpCircle
                    size={20}
                    className="text-slate-400 cursor-pointer hover:text-slate-600 transition"
                  />
                  <motion.button
                    onClick={() => setActiveTab("posts")}
                    className="bg-emerald-400 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center hover:bg-emerald-500 transition-all space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    <span>Create New</span>
                  </motion.button>
                </div>
              </header>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-slate-500 max-w-2xl">
                  Monitor your platform&apos;s pulse. Real-time insights into
                  student engagement and content growth.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex space-x-6 mb-10">
                <StatCard
                  icon={FileText}
                  label="Total Posts"
                  value={postCount.toString()}
                  growth="12.5"
                  colorClass="bg-emerald-400"
                />
                <StatCard
                  icon={Users}
                  label="Active Students"
                  value={studentCount.toLocaleString()}
                  growth="8.2"
                  colorClass="bg-indigo-400"
                />
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Recent Activity</h3>
                    <button className="text-emerald-500 text-sm font-bold hover:underline">
                      View all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentPosts.length > 0 ? (
                      recentPosts.map((post, i) => (
                        <motion.div
                          key={i}
                          className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-50 hover:border-slate-100 transition"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100" />
                            <div>
                              <p className="text-sm font-bold">{post.title}</p>
                              <p className="text-xs text-slate-400 italic">
                                Posted in {post.category}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="bg-white p-4 rounded-2xl text-center text-slate-400">
                        No posts yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance & Growth */}
                <div className="space-y-6">
                  {/* Performance Card */}
                  <div className="bg-slate-900 text-white p-6 rounded-[2.5rem]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs opacity-60 mb-1">
                          Daily Engagement
                        </p>
                        <p className="text-4xl font-bold">
                          {selectedDayDetail?.percentage || dailyEngagement}%
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateDate(-1)}
                          disabled={selectedDayIndex === 0}
                          className="p-1 hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={() => navigateDate(1)}
                          disabled={selectedDayIndex === 6}
                          className="p-1 hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs mb-4 text-slate-300">
                      {selectedDayDetail?.dateStr} •{" "}
                      {selectedDayDetail?.count || 0} posts
                    </p>
                    <p
                      className={`text-xs mb-6 font-semibold ${
                        (selectedDayDetail?.percentage || 0) >= 100
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {(selectedDayDetail?.percentage || 0) >= 100
                        ? "↗ Above average"
                        : "↘ Below average"}
                    </p>

                    {/* Interactive Chart Bars */}
                    <div className="flex items-end justify-between h-20 mb-6 gap-1">
                      {weeklyData && weeklyData.length > 0 ? (
                        weeklyData.map((day, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleBarClick(i)}
                            disabled={!weeklyData || weeklyData.length === 0}
                            className={`w-full rounded-lg transition-all cursor-pointer ${
                              selectedDayIndex === i
                                ? "bg-emerald-400"
                                : "bg-slate-700 hover:bg-slate-600"
                            }`}
                            style={{
                              height: `${Math.max(10, day.percentage)}%`,
                            }}
                            whileHover={{ scale: 1.1 }}
                            title={`${day.date}: ${day.count} posts (${day.percentage}%)`}
                          />
                        ))
                      ) : (
                        <div className="w-full flex items-center justify-center text-xs text-slate-500">
                          Loading chart...
                        </div>
                      )}
                    </div>
                    <p className="text-xs opacity-50 text-center mb-4">
                      Last 7 days
                    </p>
                    <button className="w-full bg-white/10 py-2 rounded-2xl text-xs font-bold hover:bg-white/20 transition-colors">
                      View Full Analytics
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8">Create New Post</h2>

              <div className="max-w-4xl">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100"
                >
                  {/* Success Message */}
                  {success && (
                    <motion.div
                      className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 flex items-center space-x-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span>✓</span>
                      <span>Post created successfully!</span>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Title Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter post title..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                      required
                    />
                  </div>

                  {/* Category Select */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content Textarea */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your post content..."
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Image URL Input */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Use direct image link from cloud services (imgur,
                      cloudinary, etc.)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-emerald-400 text-white rounded-xl font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    <Upload size={18} />
                    <span>{loading ? "Creating..." : "Create Post"}</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8">Manage Users</h2>

              <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
                {usersLoading ? (
                  <div className="text-center py-12 text-slate-400">
                    Loading users...
                  </div>
                ) : users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">
                            Email
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">
                            Joined
                          </th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">
                            Status
                          </th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, idx) => (
                          <motion.tr
                            key={user.id}
                            className="border-b border-slate-100 hover:bg-slate-50 transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                  <User
                                    size={16}
                                    className="text-emerald-600"
                                  />
                                </div>
                                <span className="font-medium text-slate-900">
                                  {user.email}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-600">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                  user.is_admin
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {user.is_admin ? "Admin" : "User"}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <motion.button
                                onClick={() =>
                                  toggleAdminStatus(user.id, user.is_admin)
                                }
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                  user.is_admin
                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {user.is_admin ? "Remove Admin" : "Make Admin"}
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    No users found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </AdminProtection>
  );
};

export default AdminPostForm;
