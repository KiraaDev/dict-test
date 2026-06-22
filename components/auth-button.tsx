"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/type/custom-jwt-payload";

export default function AuthButton() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setRole(null);
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<CustomJwtPayload>(session.access_token);

      setRole(decoded.user_role ?? null);
      setLoading(false);
    };

    getUserRole();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border px-6 py-3 text-sm opacity-70">
        Loading...
      </div>
    );
  }

  if (!role) {
    return (
      <Link
        href="/auth/login"
        className="rounded-lg border px-6 py-3 font-medium shadow-sm transition hover:shadow"
      >
        Go to Login Page
      </Link>
    );
  }

  if (role === "admin") {
    return (
      <Link
        href="/admin"
        className="rounded-lg border px-6 py-3 font-medium shadow-sm transition hover:shadow"
      >
        Go to Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/resident"
      className="rounded-lg border px-6 py-3 font-medium shadow-sm transition hover:shadow"
    >
      Go to Resident Page
    </Link>
  );
}