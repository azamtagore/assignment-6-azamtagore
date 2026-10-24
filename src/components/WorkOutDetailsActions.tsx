
"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";
import type { WorkOut } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

export default function WorkOutDetailsActions({
  workout,
}: {
  workout: WorkOut;
}) {
  const { addToPlan, saveForLater, isInPlan, isSaved } = usePlan();

  const planned = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className="btn border-0 bg-[#baff00] text-black hover:bg-[#a8e600]"
      >
        {planned ? <Check size={20} /> : <CalendarPlus size={20} />}
        {planned ? "Already in today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        className="btn border border-[#383d47] bg-[#20232b] text-white hover:bg-[#2b303a]"
      >
        {saved ? <Check size={20} /> : <Bookmark size={20} />}
        {saved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
