
import { getWorkOuts } from "@/lib/api";
import WorkOutCard from "@/components/WorkOutCard";

export default async function WorkOuts() {
    let workouts;

    try {
        workouts = await getWorkOuts();
    } catch (error) {
        console.error("Workout API error:", error);

        return (
            <section id="workouts" className="px-6 py-16">
                <div className="mx-auto max-w-7xl text-center">
                    <h2 className="text-3xl font-bold">
                        Our Workouts
                    </h2>
                    <p className="mt-4 text-red-500">
                        Unable to load workouts. Please try again later.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="workouts" className="bg-gray-50 px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        Explore Our Workouts
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Find a workout that fits your fitness goals.
                    </p>
                </div>

                {workouts.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No workouts available right now.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {workouts.map((workout) => (
                            <WorkOutCard key={workout.id} workout={workout} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
