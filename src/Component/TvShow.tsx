import { FC, useState, useEffect } from 'react'
import Slider from 'react-slick';
import Sliderbg from '../assets/image/Slider Bg.png'
// import { tvShowsData } from '../IDB Data/TvShowData';
// import {addTVShowsToDB, getTVShowsFromDB, TVShow  } from '../IDB Data/IDB';
import { TVShow } from '../IDB Data/IDB';
import CircularRating from './RatingBar';
import { Link } from 'react-router-dom';

const TvShow:FC = () => {

  const [activeTab, setActiveTab] = useState<string>("All");
  const tabs = ["All", "Popular", "On TV", "Short", "Theaters", "Animated"];
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [filteredShows, setFilteredShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  
  useEffect(() => {
     const fetchAndStoreMovies = async () => {
              try {
                const response = await fetch('http://localhost:5000/TVShows');
                const tvShowsData: TVShow[] = await response.json();
                setTVShows(tvShowsData);
              } catch (error) {
                console.error('Error fetching and storing movies:', error);
              }
            };
        
            fetchAndStoreMovies();
  }, []);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      switch (activeTab) {
        case 'Popular':
          setFilteredShows(tvShows.filter((tv) => tv.score > 80));
          break;
        case 'On TV':
          setFilteredShows(tvShows.filter((tv) => tv.type === 'tv'));
          break;
        case 'Animated':
          setFilteredShows(tvShows.filter((tv) => tv.type === 'animated'));
          break;
        case 'Short':
          setFilteredShows(tvShows.filter((tv) => tv.runtime < '1h'));
          break;
        case 'Theaters':
          setFilteredShows(tvShows.filter((tv) => tv.type === 'theater'));
          break;
        case 'All':
        default:
          setFilteredShows(tvShows);
          break;
      }
      setLoading(false);
    }, 800);
  }, [activeTab, tvShows]);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          spaceBetween: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          spaceBetween: 5,
        },
      },
    ],
    draggable: true,
  };
  return (
    <>
      {/* TV Show Slider */}
      
         {/* title */}
         <div className="flex md:items-center flex-col md:flex-row px-1 md:space-x-4 py-2 md:p-4 z-10 relative">
      <h2 className="text-black font-bold text-xl px-2 dark:text-white">TV Show</h2>
      <div className="flex w-auto md:w-96 md:mx-4 my-4 text-sm font-semibold md:gap-1 border border-slate-800 dark:border-teal-400 rounded-full md:p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-2 rounded-full font-medium ${
              activeTab === tab
                ? "bg-gray-900 text-teal-400"
                : "text-slate-800 dark:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

{/* Tv Show */}
      <div className="relative w-full h-96">

      <div className='absolute inset-0 top-44 z-0'>
        <img src={Sliderbg} className='h-44 w-full' alt="" />
      </div>

      <div className="relative w-full h-96 px-6 overflow-hidden z-10">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-16 h-16 border-4 border-solid border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredShows.length > 0 ? (
            <Slider {...sliderSettings}>
              {filteredShows.map((tv) => (
                <div className="px-2" key={tv.id}>
                  <div className="tv-card w-48 px-4 md:px-0 h-96 rounded-xl flex flex-col justify-between">
                    <Link to={`/Tvdetail/${tv.id}`}>
                      <img
                        src={tv.imageUrl}
                        alt={tv.title}
                        className="w-full h-56 object-cover rounded-t-xl"
                      />
                    </Link>
                    <div className="p-4">
                      <CircularRating value={tv.score} />
                      <h3 className="text-lg font-semibold mt-1 md:mt-2 absolute top-64">{tv.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-white absolute top-72">{tv.releaseDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No TV shows available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TvShow



// import { FC, useState, useEffect } from 'react'
// import Slider from 'react-slick';
// import Sliderbg from '../assets/image/Slider Bg.png'
// import { tvShowsData } from '../IDB Data/TvShowData';
// import {addTVShowsToDB, getTVShowsFromDB, TVShow  } from '../IDB Data/IDB';
// import CircularRating from './RatingBar';
// import { Link } from 'react-router-dom';

// const TvShow:FC = () => {

//   const [activeTab, setActiveTab] = useState<string>("Popular");
//   const tabs = ["All", "Popular", "On TV", "Short", "Theaters", "Animated"];
//   const [tvShows, setTVShows] = useState<TVShow[]>([]);

  
//   useEffect(() => {
//     // Store data in IndexedDB
//     addTVShowsToDB(tvShowsData);

//     // Fetch data from IndexedDB
//     getTVShowsFromDB().then((storedTVShows: TVShow[]) => {
//       setTVShows(storedTVShows);
//     });

//   }, []);


//   const sliderSettings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           spaceBetween: 5,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           spaceBetween: 5,
//         },
//       },
//     ],
//     draggable: true,
//   };
//   return (
//     <>
//       {/* TV Show Slider */}
      
//          {/* title */}
//          <div className="flex md:items-center flex-col md:flex-row px-1 md:space-x-4 py-2 md:p-4 z-10 relative">
//       <h2 className="text-black font-bold text-xl px-2 dark:text-white">TV Show</h2>
//       <div className="flex w-96 md:mx-4 my-4 text-sm font-semibold md:gap-1 border border-slate-800 dark:border-teal-400 rounded-full md:p-1">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`px-2 py-2 rounded-full font-medium ${
//               activeTab === tab
//                 ? "bg-gray-900 text-teal-400"
//                 : "text-slate-800 dark:text-white"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//     </div>

// {/* Tv Show */}
//       <div className="relative w-full h-96">

//       <div className='absolute inset-0 top-44 z-0'>
//         <img src={Sliderbg} className='h-44 w-full' alt="" />
//       </div>

//       <div className="relative w-full h-96 px-6 overflow-hidden z-10">
//         {tvShows.length > 0 ? (
//           <Slider {...sliderSettings}>
//             {tvShows.map((tv) => (
//               <div className="px-2" key={tv.id}>
//                 <div className="tv-card w-48 px-4 md:px-0 h-96 rounded-xl flex flex-col justify-between">
//                 <Link to={`/Tvdetail/${tv.id}`}><img
//                     src={tv.imageUrl}
//                     alt={tv.title}
//                     className="w-full h-56 object-cover rounded-t-xl"
//                   /></Link>
//                   <div className="p-4">
//                     <CircularRating value={tv.score} />
//                     <h3 className="text-lg font-semibold mt-1 md:mt-2 absolute top-64">{tv.title}</h3>
//                     <p className="text-sm text-gray-600 dark:text-white absolute top-72">{tv.releaseDate}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           <p>No movies available</p>
//         )}
//       </div>
//       </div>
//     </>
//   )
// }

// export default TvShow