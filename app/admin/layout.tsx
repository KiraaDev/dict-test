import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/types/custom-jwt-payload";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect("/auth/login");
  }

  const decoded = jwtDecode<CustomJwtPayload>(session.access_token);

  const role = decoded.user_role;

  if (role !== "admin") {
    redirect("/");
  }

  return <div className="min-h-screen">{children}</div>;
}
