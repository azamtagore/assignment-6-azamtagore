import Hero from "@/components/Hero";
import WorkOuts from "@/components/WorkOuts";
import { getWorkOuts } from "@/lib/api";
import { Suspense } from "react";

export default async function Home() {
  const data= await getWorkOuts();
  console.log(data);
  return (
    <div>
      <Hero />
      <main>
        <Suspense
          fallback={
            <section className="px-6 py-16 text-center">
              Loading workouts...
            </section>
          }
        >
          <WorkOuts />
        </Suspense>
      </main>
    </div>
  );
}
