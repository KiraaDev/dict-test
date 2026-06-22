import { ASSISTANCE_CATEGORY } from "@/types/beneficiary";

type AssistanceCategoryTableProps = {
  data: ASSISTANCE_CATEGORY[];
};

export default function AssistanceCategoryTable({
  data,
}: AssistanceCategoryTableProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assistance Categories</h1>
        <p className="mt-2 text-sm">
          Manage and view available assistance categories.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="rounded-lg border p-6 text-center">
          <p>No assistance categories found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Category Name</th>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>

            <tbody>
              {data.map((ac) => (
                <tr key={ac.id}>
                  <td className="border px-4 py-2">{ac.id}</td>
                  <td className="border px-4 py-2">{ac.category_name}</td>
                  <td className="border px-4 py-2">
                    {ac.description || "No description available"}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(ac.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
