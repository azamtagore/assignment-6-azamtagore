import Hero from "@/components/Hero";
import WorkOuts from "@/components/WorkOuts";
import { AllWorkOuts } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
  const data = await AllWorkOuts();
  console.log(data);
  return (
    <div>
      <Hero />
    <WorkOuts data={data} />
    </div>
  );
}
