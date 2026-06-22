"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { Beneficiary, ASSISTANCE_CATEGORY } from "@/types/beneficiary";

interface AddBeneficiaryFormProps {
  onSuccess?: (beneficiary: Beneficiary) => void;
}

export default function AddBeneficiaryForm({
  onSuccess,
}: AddBeneficiaryFormProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<ASSISTANCE_CATEGORY[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [formData, setFormData] = useState({
    beneficiary_id: "",
    full_name: "",
    address: "",
    contact_number: "",
    assistance_category_id: 1,
  });

  // Fetch assistance categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("assistance_categories")
          .select("*")
          .order("id", { ascending: true });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setCategories(data || []);
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            assistance_category_id: data[0].id,
          }));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [supabase]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "assistance_category_id" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (
        !formData.beneficiary_id.trim() ||
        !formData.full_name.trim() ||
        !formData.address.trim()
      ) {
        throw new Error("Please fill in all required fields.");
      }

      const { data, error: insertError } = await supabase
        .from("beneficiaries")
        .insert([
          {
            beneficiary_id: formData.beneficiary_id,
            full_name: formData.full_name,
            address: formData.address,
            contact_number: formData.contact_number || null,
            assistance_category_id: formData.assistance_category_id,
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      setSuccess(true);
      setFormData({
        beneficiary_id: "",
        full_name: "",
        address: "",
        contact_number: "",
        assistance_category_id: categories[0]?.id || 1,
      });

      if (onSuccess && data) {
        onSuccess(data as Beneficiary);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  console.log("Form Data:", formData); // Debugging line
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        Add New Beneficiary
      </h2>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
          Beneficiary added successfully!
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Beneficiary ID */}
        <div className="flex flex-col">
          <label
            htmlFor="beneficiary_id"
            className="mb-1 text-sm font-medium text-slate-700"
          >
            Beneficiary ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="beneficiary_id"
            name="beneficiary_id"
            value={formData.beneficiary_id}
            onChange={handleChange}
            placeholder="e.g., BEN-0001"
            required
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Assistance Category */}
        <div className="flex flex-col">
          <label
            htmlFor="assistance_category_id"
            className="mb-1 text-sm font-medium text-slate-700"
          >
            Assistance Category <span className="text-red-500">*</span>
          </label>
          <select
            id="assistance_category_id"
            name="assistance_category_id"
            value={formData.assistance_category_id}
            onChange={handleChange}
            disabled={loadingCategories}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {loadingCategories ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Full Name */}
      <div className="flex flex-col">
        <label
          htmlFor="full_name"
          className="mb-1 text-sm font-medium text-slate-700"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label
          htmlFor="address"
          className="mb-1 text-sm font-medium text-slate-700"
        >
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete address"
          required
          rows={3}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Contact Number */}
      <div className="flex flex-col">
        <label
          htmlFor="contact_number"
          className="mb-1 text-sm font-medium text-slate-700"
        >
          Contact Number
        </label>
        <input
          type="tel"
          id="contact_number"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
          placeholder="e.g., +639171234567"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Beneficiary"}
        </Button>
      </div>
    </form>
  );
}
