
const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export interface WorkOut {
id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export async function getWorkOuts(): Promise<WorkOut[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workouts: ${response.status}`);
  }

  const result: unknown = await response.json();

  if (Array.isArray(result)) {
    return result as WorkOut[];
  }

  if (
    result !== null &&
    typeof result === "object" &&
    "data" in result &&
    Array.isArray(result.data)
  ) {
    return result.data as WorkOut[];
  }

  throw new Error("Unexpected API response format.");
}
