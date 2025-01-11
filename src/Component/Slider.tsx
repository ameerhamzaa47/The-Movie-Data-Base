import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSearch } from './searchContext';
import slider1 from '../assets/image/Slider1.png';
import slider2 from '../assets/image/Slider2.png';
import slider3 from '../assets/image/Slider3.png';
import slider4 from '../assets/image/Slider4.png';
import slider5 from '../assets/image/Slider5.png';
import slider6 from '../assets/image/Slider6.png';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

interface Item {
  title: string;
  name?: string;
}

const images = [slider1, slider2, slider3, slider4, slider5, slider6];

const Slider: FC = () => {
  const { setSearchQuery } = useSearch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [allData, setAllData] = useState<{ movies: any[]; tvShows: any[] }>({
    movies: [],
    tvShows: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, tvShowsResponse] = await Promise.all([
          fetch('http://localhost:5000/Movies'),
          fetch('http://localhost:5000/TVShows'),
        ]);

        const movies = await moviesResponse.json();
        const tvShows = await tvShowsResponse.json();

        setAllData({ movies, tvShows });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchClick = () => {
    setSearchQuery(searchInput);
    
    navigate(`/search?query=${searchInput}`);
  };

  const handelEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      navigate(`/search?query=${searchInput}`);
    }
  }

  const handleItemClick = (item: Item) => {
    setSearchQuery(item.title);
    setSearchInput(item.title);
    navigate(`/search?query=${item.title}`);
  };

   useSelector((state: RootState) => state.items);

  return (
    <div
      className="relative w-full h-[350px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <motion.div
        className="flex"
        animate={{
          x: `-${currentIndex * 100}%`,
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="w-full flex-shrink-0 h-full relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <img
              src={image}
              alt={`Slider ${index + 1}`}
              className="w-full h-96 md:h-full object-cover opacity-70"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Text Section */}
      <section className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-center text-white p-4 z-10">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-start">Welcome!</h1>

          <p className="mt-1 font-bold text-xl text-start md:text-center md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-500 shadow-lg">
            Millions of movies, TV shows, and people to discover. Explore now.
          </p>
          <div className="relative mt-5 w-full max-w-lg mx-auto">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handelEnterClick}
              className={`w-full h-14 px-6 ${searchInput.length > 0 ? 'rounded-t-md' : 'rounded-full'} bg-white text-gray-800 placeholder-gray-400 dark:bg-[#121212] dark:text-white dark:placeholder-gray-600 shadow-lg ring-2 ring-transparent focus:ring-teal-500 focus:outline-none`}
              placeholder="Search for a movie, TV show..."
            />
            {/* Dropdown Suggestions */}
            {searchInput.length > 0 && (
  <div className="absolute top-14 left-0 right-0 bg-white border-t border-gray-400 dark:bg-[#1a1a1a] text-gray-800 dark:text-white p-3 rounded-sm shadow-xl transform transition-all duration-300 ease-in-out max-h-56 overflow-y-auto">
    <ul>
      {[...allData.movies, ...allData.tvShows]
        .filter((item) => (item.title || item.name).toLowerCase().includes(searchInput.toLowerCase()))
        .map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item)}
            className="py-2 px-4 hover:bg-teal-100 dark:hover:bg-teal-900 cursor-pointer"
          >
            {item.title || item.name}
          </li>
        ))}
    </ul>
  </div>
)}

            <button
              type="button"
              onClick={handleSearchClick}
              className="absolute right-1 top-1 text-white bg-gradient-to-r from-teal-400 to-cyan-500 w-24 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slider;





// import { FC, useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useSearch } from './searchContext';
// import slider1 from '../assets/image/Slider1.png';
// import slider2 from '../assets/image/Slider2.png';
// import slider3 from '../assets/image/Slider3.png';
// import slider4 from '../assets/image/Slider4.png';
// import slider5 from '../assets/image/Slider5.png';
// import slider6 from '../assets/image/Slider6.png';
// import { useSelector } from 'react-redux';
// import { RootState } from '../Store/store';

// const images = [slider1, slider2, slider3, slider4, slider5, slider6];

// const Slider: FC = () => {
//   const { setSearchQuery } = useSearch();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isHovered) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isHovered]);

//   const handleSearchClick = () => {
//     setSearchQuery(searchInput);
    
//     navigate(`/search?query=${searchInput}`);
//   };

//   const itemsState = useSelector((state: RootState) => state.items);

//   return (
//     <div
//       className="relative w-full h-[350px] overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Carousel Container */}
//       <motion.div
//         className="flex"
//         animate={{
//           x: `-${currentIndex * 100}%`,
//           opacity: 1,
//         }}
//         initial={{ opacity: 0 }}
//         exit={{ opacity: 0 }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       >
//         {images.map((image, index) => (
//           <motion.div
//             key={index}
//             className="w-full flex-shrink-0 h-full relative"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               transition: { duration: 0.5, ease: 'easeInOut' },
//             }}
//             exit={{ opacity: 0, scale: 0.95 }}
//           >
//             <img
//               src={image}
//               alt={`Slider ${index + 1}`}
//               className="w-full h-96 md:h-full object-cover opacity-70"
//             />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Text Section */}
//       <section className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-center text-white p-4 z-10">
//         <div className="relative z-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-white text-start">Welcome!</h1>

//           <p className="mt-1 font-bold text-xl text-start md:text-center md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-500 shadow-lg">
//             Millions of movies, TV shows, and people to discover. Explore now.
//           </p>
//           <div className="relative mt-5 w-full max-w-lg mx-auto">
//             <input
//               type="search"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="mt-3 outline-none w-full h-12 px-5 rounded-full dark:bg-[#021C31] text-black dark:text-white dark:border dark:border-white dark:placeholder-white"
//               placeholder="Search for a movie, TV show..."
//             />
//             {
//               searchInput.length > 0 && (
//                 <div className='absolute top-14 left-0 right-0 bg-white text-black dark:bg-gray-800 p-2 rounded-b-lg mx-2.5 shadow-lg'>
//                   <p>jwj</p>
//                 </div>
//               )
//             }
//             <button
//               type="button"
//               onClick={handleSearchClick}
//               className="text-white bg-gradient-to-r from-teal-400 to-cyan-500 w-24 h-12 rounded-full absolute bottom-0 right-0 transition-all dark:border dark:border-white hover:text-black dark:bg-gradient-to-r dark:from-teal-800 dark:to-cyan-800"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Slider;