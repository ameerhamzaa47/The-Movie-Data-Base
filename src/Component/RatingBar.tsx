import React from 'react';

interface CircularRatingProps {
  value: number;
}

const CircularRating: React.FC<CircularRatingProps> = ({ value }) => {
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const strokeWidth = 2;

  return (
    <>
      <svg width="44" height="44" className="bg-gray-800 dark:bg-cyan-900 rounded-full absolute top-52 ">
      <circle
        className="fill-none stroke-gray-500"
        cx="22"
        cy="22"
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="fill-none stroke-green-500 dark:stroke-amber-400 transition duration-500"
        cx="22"
        cy="22"
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
    <div className='absolute top-[58%] z-50 ml-2.5'>
    <p className='text-white mb-3 text-xs'>{value}%</p>
    </div>
    </>
  );
};

export default CircularRating;
