import React from 'react';

const Hero = () => {
    return (
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      alt="Tailwind CSS hero component"
      src="/assets/banner.png"
    />
    <div>
     <h2 className = "text-eyebrow font-extrabold text-[#baff00]">WORKOUT LIBRARY</h2>
      <h1 className="text-7xl uppercase font-bold">TRAIN WITH INTENT. LOG EVERY SET</h1>
      <p className="py-6">
        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br></br> into today's plan, and watch the week's work add up.
      </p>
      <button className="btn btn-primary text-black  bg-[#baff00]">BROWSE WORKOUTS</button>
    </div>
  </div>
</div>
    );
};

export default Hero;