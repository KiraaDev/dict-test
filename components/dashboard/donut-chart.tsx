import React from "react";

export default function DonutChart({
  data,
}: {
  data: { total: number; approved: number; pending: number; rejected: number };
}) {
  const approved = data.approved;
  const pending = data.pending;
  const rejected = data.rejected;
  const approvedPct = Math.round(approved * 100);

  const radius = 40;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;

  const approvedOffset = circumference * (1 - approved);

  return (
    <div className="flex items-center gap-4">
      <svg width={120} height={120} viewBox="0 0 120 120">
        <g transform="translate(60,60)">
          <circle
            r={radius}
            fill="transparent"
            stroke="#E6E7EB"
            strokeWidth={stroke}
          />
          <circle
            r={radius}
            fill="transparent"
            stroke="#10B981"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={approvedOffset}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
        </g>
      </svg>
      <div>
        <div className="text-xl font-semibold">
          {data.total.toLocaleString()}
        </div>
        <div className="text-sm text-slate-600">Total Apps</div>
        <div className="mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />{" "}
            Approved {approvedPct}%
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-slate-400 inline-block" />{" "}
            Pending {Math.round(pending * 100)}%
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />{" "}
            Rejected {Math.round(rejected * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
