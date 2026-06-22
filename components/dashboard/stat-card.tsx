import React from "react";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  delta?: string | null;
};

export default function StatCard({ title, value, subtitle, delta }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500">{subtitle}</div>
          <div className="text-xl font-semibold text-slate-900">{value}</div>
        </div>
        {delta && (
          <div className="text-sm text-green-600 font-medium">{delta}</div>
        )}
      </div>
      <div className="mt-2 text-sm text-slate-600">{title}</div>
    </div>
  );
}
