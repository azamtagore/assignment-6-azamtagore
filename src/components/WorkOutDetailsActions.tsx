
"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import type { WorkOut } from "@/lib/api";

interface WorkOutDetailsActionsProps {
  workout: WorkOut;
}

export default function WorkOutDetailsActions({
  workout,
}: WorkOutDetailsActionsProps) {
  const {
    addToPlan,
    saveForLater,
    isInPlan,
    isSaved,
    todaysPlan,
  } = usePlan();

  const alreadyAdded = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planIsFull = todaysPlan.length >= 5;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        disabled={alreadyAdded || planIsFull}
        onClick={() => addToPlan(workout)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#baff00] px-4 py-3 font-bold text-black transition hover:bg-[#d0ff4d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadyAdded ? <Check size={18} /> : <CalendarPlus size={18} />}
        {alreadyAdded
          ? "Added to Today's Plan"
          : planIsFull
            ? "Plan Full (5/5)"
            : "Add to Today's Plan"}
      </button>

      <button
        type="button"
        disabled={alreadySaved}
        onClick={() => saveForLater(workout)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 font-bold text-white transition hover:border-[#baff00] hover:text-[#baff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {alreadySaved ? <Check size={18} /> : <Bookmark size={18} />}
        {alreadySaved ? "Saved for Later" : "Save for Later"}
      </button>
    </div>
  );
}
