
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkOuts } from "@/lib/api";
import WorkOutDetailsActions from "@/components/WorkOutDetailsActions";


export default async function WorkOutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workouts = await getWorkOuts();

  const workout = workouts.find((item) => item.id === Number(id));

  if (!workout) notFound();

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: String(workout.sets) },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: `${workout.rating} / 5` },
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#baff00]"
        >
          <ArrowLeft size={18} />
          Back to workouts
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Workout image */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-[#30343d] bg-[#15171d]">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-[320px] w-full object-cover sm:h-[480px] lg:h-[650px]"
              />
            </div>
          </div>

          {/* Right: Workout information */}
          <section className="py-2">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="badge h-auto rounded-full border-0 bg-[#baff00] px-4 py-3 font-bold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-black uppercase leading-tight tracking-wide sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-4 text-base leading-7 text-[#a0a5b1]">
              {workout.description}
            </p>

            {/* Key specifications */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#30343d] bg-[#15171d]">
              <h2 className="border-b border-[#30343d] px-5 py-4 text-sm font-bold tracking-widest text-[#baff00]">
                KEY SPECS
              </h2>

              <dl>
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between gap-4 px-5 py-3.5 ${index !== specs.length - 1
                        ? "border-b border-[#272b34]"
                        : ""
                      }`}
                  >
                    <dt className="text-xs font-semibold tracking-wider text-[#9299a6] sm:text-sm">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm font-medium text-white sm:text-base">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-lg font-extrabold tracking-widest">
                INSTRUCTIONS
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li key={`${index}-${instruction}`} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#baff00] text-sm font-black text-black">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-[#b0b5c0]">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action buttons */}
            <WorkOutDetailsActions workout={workout} />
          </section>
        </div>
      </div>
    </main>
  );
}