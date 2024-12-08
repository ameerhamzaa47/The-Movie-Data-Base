import React from 'react';

interface CircularRatingProps {
  value: number; // Value from 0 to 100
}

const CircularRating: React.FC<CircularRatingProps> = ({ value }) => {
  const radius = 17; // Set radius to 17
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const strokeWidth = 2; // Thinner stroke width

  return (
      <svg width="44" height="44" className="bg-cyan-400 rounded-full absolute top-52 ">
      <circle
        className="fill-none stroke-gray-300"
        cx="22"
        cy="22"
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="fill-none stroke-green-500 transition duration-500"
        cx="22"
        cy="22"
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text 
        x="50%" 
        y="50%" 
        textAnchor="middle" 
        dy=".3em" 
        className="text-xs text-white"
      >
        {`${value}%`}
      </text>
    </svg>
  );
};

export default CircularRating;
