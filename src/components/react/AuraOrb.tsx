import React from "react";

interface AuraOrbProps {
  size?: number;
  active?: boolean;
  processing?: boolean;
  className?: string;
}

const AuraOrb: React.FC<AuraOrbProps> = ({
  size = 20,
  active = false,
  processing = false,
  className = "",
}) => {
  return (
    <>
      <style>
        {`
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
          }
          .animate-grain {
            animation: grain 0.5s steps(3) infinite;
          }
          @keyframes flux {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-flux {
            animation: flux 3s ease infinite;
          }
        `}
      </style>
      <div
        className={`relative flex-shrink-0 select-none rounded-full group flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div
          className={`
             absolute inset-0 rounded-full bg-accent-teal blur-[8px] transition-all duration-700
             ${processing ? "opacity-70 scale-150 animate-pulse" : active ? "opacity-50 scale-125" : "opacity-0 scale-75 group-hover:opacity-30 group-hover:scale-110"}
           `}
        />

        <div
          className={`
            relative h-full w-full overflow-hidden rounded-full border border-white/20 shadow-inner transition-all duration-300 transform-gpu dark:border-white/10
            ${active || processing ? "grayscale-0 opacity-100" : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"}
         `}
        >
          <div
            className={`
              absolute inset-0 bg-gradient-to-br from-accent-teal via-[#2FD3C5] to-teal-700
              bg-[length:200%_200%]
              ${active || processing ? "animate-flux" : ""}
            `}
          />

          <div
            className={`
                absolute inset-[-50%] h-[200%] w-[200%]
                pointer-events-none opacity-40 mix-blend-overlay
                ${active || processing ? "animate-grain" : ""}
              `}
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")',
              filter: "contrast(150%) brightness(100%)",
            }}
          />

          <div
            className={`
              absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/70 mix-blend-overlay
              ${processing ? "animate-spin" : ""}
            `}
          />

          <div className="absolute top-[15%] left-[15%] h-[30%] w-[30%] rounded-full bg-white/60 blur-[3px]" />
        </div>
      </div>
    </>
  );
};

export default AuraOrb;
