
import type { WorkOut } from "@/lib/api";
import { Clock3, Flame, Star } from "lucide-react";

interface WorkOutCardProps {
  workout: WorkOut;
}

export default function WorkOutCard({ workout }: WorkOutCardProps) {
  const title = workout.name ?? "Walking Lunge";
  const description =
    workout.equipment ?? "Bells";
  const image = workout.image ?? "/workout-placeholder.jpg";
  const category = workout.muscleGroups?.[0] ?? "LEGS";
  const duration = workout.duration ?? "18 min";

  // Add these properties to your API type if your API provides them.
  const calories =
    "calories" in workout ? workout.calories : 170;
  const rating = "rating" in workout ? workout.rating : 4.4;

  return (
    <article className="card w-full overflow-hidden rounded-[28px] border border-[#30343d] bg-[#15171d] text-white shadow-none transition duration-300 hover:-translate-y-1 hover:border-[#baff00]/50">
      {/* Workout image */}
      <figure className="h-64 w-full overflow-hidden rounded-none">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>

      {/* Card content */}
      <div className="card-body gap-0 p-6 sm:p-8">
        {/* Category badge */}
        <div>
          <span className="badge h-auto rounded-full border-0 bg-[#baff00] px-4 py-2 text-sm font-extrabold text-black">
            {category.toUpperCase()}
          </span>
        </div>

        {/* Workout title */}
        <h2 className="mt-5 font-[Impact,'Arial_Narrow',sans-serif] text-2xl font-black uppercase leading-tight tracking-wide">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-base text-[#a0a5b1]">
          {description}
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-[#272b34]" />

        {/* Workout statistics */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-base text-[#a0a5b1]">
          <div className="flex items-center gap-2">
            <Clock3 size={20} strokeWidth={2} />
            <span>{duration}{typeof duration === "number" ? " min" : ""}</span>
          </div>

          <div className="flex items-center gap-2">
            <Flame size={20} fill="currentColor" strokeWidth={1.5} />
            <span>{calories as string | number} kcal</span>
          </div>

          <div className="flex items-center gap-2">
            <Star size={21} strokeWidth={1.8} />
            <span>{rating as string | number}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
