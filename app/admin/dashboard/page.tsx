import React from "react";
import StatCard from "@/components/dashboard/stat-card";
import ActivityFeed from "@/components/dashboard/activity-feed";
import DonutChart from "@/components/dashboard/donut-chart";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Beneficiaries",
      value: "12,840",
      subtitle: "TOTAL BENEFICIARIES",
      delta: "+12%",
    },
    { title: "Total Programs", value: "24", subtitle: "ACTIVE", delta: null },
    {
      title: "Total Applications",
      value: "3,120",
      subtitle: "PENDING: 154",
      delta: null,
    },
    { title: "Approved", value: "2,745", subtitle: "88% Rate", delta: null },
    {
      title: "Released Assistance",
      value: "PHP 4.2M",
      subtitle: "RELEASED ASSISTANCE",
      delta: null,
    },
  ];

  const activities = [
    {
      user: "Juan Dela Cruz",
      action: "Application Submitted",
      program: "Laptop for Students Program",
      date: "Oct 24, 2023 10:24 AM",
      status: "Pending",
    },
    {
      user: "Maria Santos",
      action: "Assistance Released",
      program: "Livelihood Starter Kit",
      date: "Oct 24, 2023 09:15 AM",
      status: "Completed",
    },
    {
      user: "Ricardo Bautista",
      action: "Document Upload",
      program: "Emergency Cash Aid",
      date: "Oct 23, 2023 04:45 PM",
      status: "Action Required",
    },
  ];

  const chart = { total: 3120, approved: 0.55, pending: 0.3, rejected: 0.15 };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">System Overview</h1>
        <p className="text-sm text-slate-600">
          Welcome back, Admin. Here is the latest summary of the Assistance
          Management operations.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={s.value}
            subtitle={s.subtitle}
            delta={s.delta}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Recent Activity Feed</h3>
            <ActivityFeed items={activities} />
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Application Statuses</h3>
            <DonutChart data={chart} />
          </div>
        </div>
      </div>
    </div>
  );
}
