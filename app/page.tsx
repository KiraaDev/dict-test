import AuthButton from "@/components/auth-button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <h1 className="text-4xl font-bold">Beneficiary Management System</h1>
          <p className="mt-2 text-sm opacity-70">
            Manage beneficiaries and assistance categories.
          </p>
        </div>
        <AuthButton />
      </div>
    </main>
  );
}
