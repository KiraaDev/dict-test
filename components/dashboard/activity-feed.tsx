import React from "react";

type Item = {
  user: string;
  action: string;
  program: string;
  date: string;
  status: string;
};

export default function ActivityFeed({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-slate-100">
      {items.map((it, idx) => (
        <div key={idx} className="flex items-start gap-4 py-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-700">
            {it.user
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-900">{it.user}</div>
            <div className="text-xs text-slate-500">
              {it.action} — {it.program}
            </div>
          </div>
          <div className="text-xs text-slate-500 text-right">
            <div>{it.date}</div>
            <div className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
              {it.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
