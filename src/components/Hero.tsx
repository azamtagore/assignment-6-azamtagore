
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
        {/* Optimized Hero Image */}
        <Image
          src="/assets/banner.png"
          alt="Athlete training for the FitLog workout library"
          width={700}
          height={500}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full max-w-xl rounded-2xl object-cover"
        />

        {/* Hero Content */}
        <div className="max-w-2xl">
          <h2 className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#baff00]">
            WORKOUT LIBRARY
          </h2>

          <h1 className="text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-7xl">
            TRAIN WITH INTENT. LOG EVERY SET
          </h1>

          <p className="py-6 leading-7 text-base-content/70">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#workouts"
            className="btn border-none bg-[#baff00] font-bold text-black hover:bg-[#d0ff4d]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
