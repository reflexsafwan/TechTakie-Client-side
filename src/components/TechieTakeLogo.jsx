import React from "react";

const TechieTakeLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="32" fill="#06b6d4" />
        <path
          d="M20 44 L44 20"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="10" fill="#fff" />
        <text
          x="32"
          y="38"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#06b6d4"
        >
          T
        </text>
      </svg>
      <span className="font-bold text-xl md:text-2xl text-cyan-600">
        TechieTake
      </span>
    </div>
  );
};

export default TechieTakeLogo;
