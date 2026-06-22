import AssistanceCategoryTable from "@/components/assistance-category-table";
import { createClient } from "@/lib/supabase/server";
import { ASSISTANCE_CATEGORY } from "@/types/beneficiary";
import { cookies } from "next/headers";

export default async function Admin() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from("assistance_categories").select("*");

  const assistanceCategories = data as ASSISTANCE_CATEGORY[] | [];

  return (
    <>
      Total {assistanceCategories?.length}
      <AssistanceCategoryTable data={assistanceCategories ?? []} />
    </>
  );
}
