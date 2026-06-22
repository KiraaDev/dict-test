import {
  Laptop,
  ShieldCheck,
  Wifi,
  Sparkles,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    title: "Tech4ED Regional Grant",
    description:
      "Providing essential hardware and connectivity tools for remote learning hubs and underserved communities.",
    created: "Oct 12, 2023",
    status: "ACTIVE",
    enabled: true,
    icon: Laptop,
    gradient: "from-slate-900 via-slate-800 to-slate-700",
  },
  {
    title: "Digital Careers Upskilling",
    description:
      "Scholarship program for advanced cloud computing and cybersecurity training for local talent.",
    created: "Jan 05, 2024",
    status: "ACTIVE",
    enabled: true,
    icon: ShieldCheck,
    gradient: "from-sky-600 via-sky-500 to-sky-400",
  },
  {
    title: "Rural Broadband Support",
    description:
      "Incentive program for small ISPs to establish community Wi-Fi points in remote barangays.",
    created: "Nov 22, 2022",
    status: "PAUSED",
    enabled: false,
    icon: Wifi,
    gradient: "from-slate-400 via-slate-300 to-slate-200",
  },
  {
    title: "Smart Agri-Tech Pilot",
    description:
      "Assisting local farmer cooperatives with IoT-enabled monitoring systems and precision support.",
    created: "Feb 15, 2024",
    status: "ACTIVE",
    enabled: true,
    icon: Sparkles,
    gradient: "from-amber-500 via-amber-400 to-amber-300",
  },
  {
    title: "Disaster Comms Resiliency",
    description:
      "Support for LGU command centers to upgrade satellite-based emergency communications.",
    created: "May 19, 2023",
    status: "ACTIVE",
    enabled: true,
    icon: ShieldCheck,
    gradient: "from-orange-600 via-orange-500 to-orange-400",
  },
];

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  const Icon = program.icon;

  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${program.gradient} p-5 text-white`}
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-white/10" />
        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15 text-white shadow-sm shadow-slate-900/10">
            <Icon className="h-6 w-6" />
          </div>
          <span
            className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
              program.status === "ACTIVE"
                ? "bg-white/15 text-white"
                : "bg-slate-950/20 text-slate-100"
            }`}
          >
            {program.status}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {program.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {program.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            Created {program.created}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            <span
              className={`h-2.5 w-2.5 rounded-full ${program.enabled ? "bg-emerald-500" : "bg-slate-400"}`}
            />
            {program.enabled ? "Program Enabled" : "Program Disabled"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Manage
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              aria-label="Edit program"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              aria-label="Delete program"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Programs
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Program Management
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Configure and manage regional assistance initiatives across DICT
              programs.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Program
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="rounded-full bg-slate-900 px-4 py-2 text-white shadow-sm shadow-slate-200/40 transition hover:bg-slate-800">
            Programs
          </button>
          <button className="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100">
            Archived
          </button>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-3 lg:grid-cols-2">
        {programs.map((program) => (
          <ProgramCard key={program.title} program={program} />
        ))}

        <button
          type="button"
          className="flex min-h-[24rem] flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-sm shadow-slate-200/60">
            <Plus className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-slate-900">
              Add New Program
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Define a new assistance category or grant initiative.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
