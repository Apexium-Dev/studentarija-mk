import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type AuthUser = {
  id: string;
  email: string;
  created_at: string;
};

export async function GET(request: Request) {
  try {
    if (!supabaseServiceKey || !supabaseUrl) {
      return NextResponse.json(
        { error: "Service key not configured" },
        { status: 500 },
      );
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: adminCheck, error: adminError } = await supabaseAuth
      .from("admin_users")
      .select("is_admin")
      .eq("user_id", user.id)
      .single();

    if (adminError || !adminCheck?.is_admin) {
      return NextResponse.json(
        { error: "Unauthorized: User is not an admin" },
        { status: 403 },
      );
    }

    const response = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch users",
          details: result.error || result.message,
        },
        { status: response.status },
      );
    }

    if (!result.users || result.users.length === 0) {
      return NextResponse.json([]);
    }

    const authUserIds = (result.users as AuthUser[]).map((u) => u.id);
    const { data: adminUsers } = await supabaseAuth
      .from("admin_users")
      .select("user_id, is_admin")
      .in("user_id", authUserIds);

    const adminMap = new Map(
      (adminUsers || []).map((a) => [a.user_id, a.is_admin]),
    );

    const usersList = (result.users as AuthUser[]).map((u) => ({
      id: u.id,
      email: u.email || "",
      created_at: u.created_at,
      is_admin: adminMap.get(u.id) || false,
    }));

    return NextResponse.json(usersList);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 },
    );
  }
}
