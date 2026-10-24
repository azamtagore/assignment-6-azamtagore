
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  Flame,
  Star,
  X,
  Dumbbell,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const {
    todaysPlan,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [loading, setLoading] = useState(true);

  // Allow the client-side plan context to hydrate from localStorage.
  useEffect(() => {
    setLoading(false);
  }, []);

  const workouts = activeTab === "today" ? todaysPlan : savedWorkouts;

  const metrics = useMemo(
    () => ({
      exercises: todaysPlan.length,
      minutes: todaysPlan.reduce(
        (total, workout) => total + workout.duration,
        0
      ),
      calories: todaysPlan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
      ),
    }),
    [todaysPlan]
  );

  function markAsDone(id: number) {
    removeFromPlan(id);
  }

  return (
    <div className="min-h-screen bg-[#0b0d11] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <header className="mb-9">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#baff00]">
            <span className="h-2 w-2 rounded-full bg-[#baff00]" />
            Your workout log
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            MY <span className="text-[#baff00]">PLAN</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        {/* Metrics */}
        <section
          aria-label="Today's workout metrics"
          className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <MetricCard
            label="Exercises"
            value={metrics.exercises}
            icon={<Dumbbell size={19} />}
            detail="Today's lifts"
          />
          <MetricCard
            label="Minutes"
            value={metrics.minutes}
            icon={<Clock3 size={19} />}
            detail="Total duration"
          />
          <MetricCard
            label="Calories"
            value={metrics.calories}
            icon={<Flame size={19} />}
            detail="Estimated burn"
          />
        </section>

        {/* Tabs */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10">
          <div className="flex gap-6">
            <TabButton
              active={activeTab === "today"}
              onClick={() => setActiveTab("today")}
            >
              Today's Plan
              <span className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-xs">
                {todaysPlan.length}/5
              </span>
            </TabButton>

            <TabButton
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
            >
              <Bookmark size={15} className="mr-2 inline-block" />
              Saved
              <span className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-xs">
                {savedWorkouts.length}
              </span>
            </TabButton>
          </div>
        </div>

        {/* Workout list */}
        {loading ? (
          <div
            role="status"
            className="rounded-2xl border border-white/10 bg-[#15171d] px-6 py-16 text-center text-sm text-gray-400"
          >
            <span className="mx-auto mb-4 block h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-[#baff00]" />
            Loading workouts…
          </div>
        ) : workouts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {workouts.map((workout) => (
              <article
                key={workout.id}
                className="group grid gap-4 rounded-2xl border border-white/10 bg-[#15171d] p-4 transition hover:border-[#baff00]/40 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center sm:p-5"
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden rounded-xl bg-[#22252d] sm:h-28">
                  {workout.image ? (
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 112px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                      <Dumbbell size={30} />
                    </div>
                  )}
                </div>

                {/* Workout information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-lg font-extrabold uppercase tracking-wide sm:text-xl">
                        {workout.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        {workout.equipment || "No equipment specified"}
                      </p>
                    </div>

                    <span className="rounded-md border border-[#baff00]/20 bg-[#baff00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#baff00]">
                      {activeTab === "today" ? "Today's lift" : "Saved"}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={15} className="text-[#baff00]" />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Flame size={15} className="text-[#baff00]" />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Star size={15} className="fill-[#baff00] text-[#baff00]" />
                      {Number(workout.rating).toFixed(1)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#baff00] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-black transition hover:bg-[#d0ff4d]"
                    >
                      View Details
                      <ArrowUpRight size={15} />
                    </Link>

                    {activeTab === "today" && (
                      <button
                        type="button"
                        onClick={() => markAsDone(workout.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-200 transition hover:border-[#baff00]/50 hover:text-[#baff00]"
                      >
                        <Check size={15} />
                        Mark as Done
                      </button>
                    )}

                    <button
                      type="button"
                      aria-label={`Remove ${workout.name}`}
                      title={activeTab === "today" ? "Remove from today's plan" : "Remove from saved"}
                      onClick={() =>
                        activeTab === "today"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Plan limit note */}
        {activeTab === "today" && todaysPlan.length >= 5 && (
          <p className="mt-5 text-sm text-gray-400">
            You have reached today's five-exercise limit. Mark a lift as done or
            remove one before adding another.
          </p>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  detail,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#15171d] p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
          {label}
        </span>
        <span className="text-[#baff00]">{icon}</span>
      </div>

      <p className="mt-4 text-3xl font-black tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative -mb-px flex items-center border-b-2 px-1 pb-4 text-sm font-bold transition ${
        active
          ? "border-[#baff00] text-[#baff00]"
          : "border-transparent text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#15171d]/60 px-6 py-12 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#baff00]/20 bg-[#baff00]/10 text-[#baff00]">
        <Dumbbell size={29} />
      </div>

      <h2 className="text-xl font-black tracking-wide">
        NOTHING HERE YET
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#baff00] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-[#d0ff4d]"
      >
        Go to workouts
        <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}
