
import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star, ArrowUpRight } from "lucide-react";
import type { WorkOut } from "@/lib/api";
import WorkOutDetailsActions from "@/components/WorkOutDetailsActions";

interface WorkOutCardProps {
  workout: WorkOut;
}

export default function WorkOutCard({ workout }: WorkOutCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#15171d] text-white transition hover:border-[#baff00]/40">
      {/* Workout image */}
      <Link
        href={`/workouts/${workout.id}`}
        className="relative block h-52 overflow-hidden bg-[#22252d]"
      >
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="p-5">
        {/* Muscle group badges */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 2).map((muscle) => (
            <span
              key={muscle}
              className="rounded-md bg-[#baff00]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#baff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/workouts/${workout.id}`}>
          <h2 className="text-xl font-extrabold uppercase tracking-wide hover:text-[#baff00]">
            {workout.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
          {workout.description}
        </p>

        {/* Workout stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
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
            {workout.rating}
          </span>
        </div>

        {/* Details link */}
        <Link
          href={`/workouts/${workout.id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#baff00] hover:text-white"
        >
          View Details <ArrowUpRight size={16} />
        </Link>

        {/* Add / Save actions */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <WorkOutDetailsActions workout={workout} />
        </div>
      </div>
    </article>
  );
}
