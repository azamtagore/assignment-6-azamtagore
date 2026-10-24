
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 bg-neutral p-6 text-white sm:flex-row sm:px-10 sm:py-8">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/logo.png"
          alt="FitLog Logo"
          width={40}
          height={40}
          priority={false}
          className="h-10 w-10 object-contain"
        />

        <h2 className="text-2xl font-semibold tracking-tight">
          FITLOG
        </h2>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-300 sm:text-right">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
};

export default Footer;
