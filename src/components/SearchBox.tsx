import React from 'react';

const SearchBox = () => {
    return (
<div className="mb-6 flex items-center justify-between gap-4">
  <h2 className="text-xl font-extrabold text-white">
    Explore Workouts
  </h2>

  <div className="flex items-center gap-3">
    <label
      htmlFor="workout-sort"
      className="whitespace-nowrap text-sm text-gray-400"
    >
      Sort By
    </label>

    <div className="relative">
      <select
        id="workout-sort"
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value as SortOption)
        }
        className="appearance-none rounded-lg border border-white/10 bg-[#15171d] py-2.5 pl-3 pr-10 text-sm font-semibold text-white outline-none transition hover:border-[#baff00]/50 focus:border-[#baff00]"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#baff00]"
      />
    </div>
  </div>
</div>

<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {sortedWorkouts.map((workout) => (
    <WorkOutCard key={workout.id} workout={workout} />
  ))}
</div>
    );
};

export default SearchBox;