import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("User:", user);
  console.log("Error:", error);

  return (
    <div>
      <h1>Home Page</h1>
      {user ? <h1>{user.email}</h1> : <h1>Not logged in</h1>}
      {error && <p>{error.message}</p>}
    </div>
  );
}