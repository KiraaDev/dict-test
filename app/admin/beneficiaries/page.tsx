import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import type { Beneficiary } from "@/types/beneficiary";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import AddBeneficiaryForm from "./components/add-beneficiary-form";

export default async function Beneficiaries() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from("beneficiaries").select("*");
  const beneficiaries = (data ?? []) as Beneficiary[];

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Beneficiaries</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
          </DialogTrigger>
          <DialogContent>
            <AddBeneficiaryForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3">Beneficiary ID</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Contact Number</th>
              <th className="px-4 py-3">Category ID</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {beneficiaries.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No beneficiaries found.
                </td>
              </tr>
            ) : (
              beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {beneficiary.beneficiary_id}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {beneficiary.full_name}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {beneficiary.address}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {beneficiary.contact_number ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {beneficiary.assistance_category_id}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {beneficiary.created_at ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
