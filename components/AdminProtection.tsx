"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader, AlertCircle } from "lucide-react";

interface ProtectedAdminProps {
  children: React.ReactNode;
}

export function AdminProtection({ children }: ProtectedAdminProps) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!authLoading) {
        if (!user) {
          router.push("/login");
          return;
        }

        try {
          const { data, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (error || !data) {
            setIsAdmin(false);
            setTimeout(() => router.push("/"), 2000);
          } else {
            setIsAdmin(true);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
          setTimeout(() => router.push("/"), 2000);
        } finally {
          setLoading(false);
        }
      }
    };

    checkAdminStatus();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader size={32} className="animate-spin text-green-700" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={32} className="text-red-600" />
            <h1 className="text-xl font-bold text-red-900">
              Пристапот е одбиен
            </h1>
          </div>
          <p className="text-red-800">
            Само администраторите имаат пристап до оваа панел.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
