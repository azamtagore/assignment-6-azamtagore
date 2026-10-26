"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { WorkOut } from "@/lib/api";
import { toast } from "react-toastify";

interface PlanContextType {
  todaysPlan: WorkOut[];
  savedWorkouts: WorkOut[];
  addToPlan: (workout: WorkOut) => void;
  saveForLater: (workout: WorkOut) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_KEY = "fitlog-todays-plan";
const SAVED_KEY = "fitlog-saved-workouts";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<WorkOut[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkOut[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load both saved workouts and today's plan from localStorage on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(PLAN_KEY);
      const savedWorkoutsData = localStorage.getItem(SAVED_KEY);

      if (savedPlan) {
        setTodaysPlan(JSON.parse(savedPlan));
      }
      if (savedWorkoutsData) {
        setSavedWorkouts(JSON.parse(savedWorkoutsData));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist state updates to localStorage after initial hydration
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(todaysPlan));
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedWorkouts));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }, [todaysPlan, savedWorkouts, hydrated]);

  const addToPlan = useCallback((workout: WorkOut) => {
    setTodaysPlan((current) => {
      if (current.some((item) => item.id === workout.id)) {
        toast.info("This workout is already in today's plan.");
        return current;
      }

      toast.success("Added to today's plan!");
      return [...current, workout];
    });
  }, []);

  const saveForLater = useCallback((workout: WorkOut) => {
    setSavedWorkouts((current) => {
      if (current.some((item) => item.id === workout.id)) {
        toast.info("This workout is already saved.");
        return current;
      }

      toast.success("Workout saved for later!");
      return [...current, workout];
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setTodaysPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from today's plan.");
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSavedWorkouts((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts.");
  }, []);

  const isInPlan = useCallback(
    (id: number) => todaysPlan.some((item) => item.id === id),
    [todaysPlan],
  );

  const isSaved = useCallback(
    (id: number) => savedWorkouts.some((item) => item.id === id),
    [savedWorkouts],
  );

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}