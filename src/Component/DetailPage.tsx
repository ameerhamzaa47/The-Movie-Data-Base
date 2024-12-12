import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { moviesData } from '../IDB Data/MovieData';
import { addMoviesToDB, getMovieById, Movie } from '../IDB Data/IDB';
import {ListBulletIcon, HeartIcon, BookmarkIcon, PlayIcon} from '@heroicons/react/16/solid';
import {Tooltip} from 'react-tooltip'

const DetailPage:FC = () => {
   const { id } = useParams<{ id: string }>()
    console.log(id);
    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        // Store data in IndexedDB
        addMoviesToDB(moviesData);
        // Fetch data from IndexedDB
        if(id){
            getMovieById(Number(id)).then((fetchedMovie:any) => {
                setMovies([fetchedMovie]);
              });
        }
    
      }, [id]);
      
// rating bar
interface RatingBarProps {
  value: number; // Percentage value (0-100)
}

const RatingBar: React.FC<RatingBarProps> = ({ value }) => {
  // Ensure the value is clamped between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="flex font-sans my-5 gap-2">
      <div className="relative w-14 h-14">
        {/* Outer Circle (Progress Arc) */}
        <div
          className="w-full h-full rounded-full pt-3"
          style={{
            background: `conic-gradient(
              #21D07A ${clampedValue * 3.6}deg, 
              #204529 ${clampedValue * 3.6}deg
            )`,
          }}
        ></div>

        {/* Inner Circle (White Background) */}
        <div className="absolute inset-[3px] bg-gray-900 rounded-full flex items-center justify-center">
          <span className="text-md font-bold text-white">
            {clampedValue}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-white font-medium text-md w-16">User Score</span>
    </div>
  );
};

  return (
    <>
      {movies.length > 0 && (
        <div className='flex flex-col md:flex-row justify-between relative' style={{ backgroundImage: `url(${movies[0].imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',}}>
            <div className='absolute inset-0 bg-black opacity-80'></div>
            <div className='w-2/3 mx-auto md:w-1/4 md:mx-10 mt-10 md:my-10 relative'>
              <img className='rounded-2xl' src={movies[0].imageUrl} alt="" />
            </div>

            <div className='w-3/4 md:w-2/3 text-white mx-10 my-10 relative'>
              <h1 className='text-3xl font-bold'>{movies[0].title}</h1>
              <p className='text-base sm:w-11/12'>{movies[0].releaseDate} (PK) <span className='font-extrabold text-xl'>.</span> {movies[0].genre.join(', ')} <span className='font-extrabold text-xl'>.</span> {movies[0].runtime} Minutes</p>
              {/* rating & rewiew */}
              <div className='flex items-center'>
              <RatingBar value={movies[0].score} />
              <button className='bg-[#032541] font-bold rounded-full p-3'>Your Vibe <span>3</span> | <span>73</span></button>
              </div>
              {/* button */}
              <button className='bg-[#032541] rounded-full mx-2' data-tooltip-id="my-tooltip" data-tooltip-content="Add to list"><ListBulletIcon className='h-10 w-10 p-2 text-white'/></button>
              <button className='bg-[#032541] rounded-full mx-2' data-tooltip-id="my-tooltip" data-tooltip-content="Mark as favorite"><HeartIcon className='h-10 w-10 p-2 text-white'/></button>
              <button className='bg-[#032541] rounded-full mx-2' data-tooltip-id="my-tooltip" data-tooltip-content="Add to your watchlist"><BookmarkIcon className='h-10 w-10 p-2 text-white'/></button>
              <Tooltip id="my-tooltip" />
              {/* watch button */}
              <div className='flex'>
              <PlayIcon className='h-10 w-10 p-2'/>
              <button className='rounded-full hover:underline hover:text-cyan-400 underline-offset-4'> Watch Trailer</button>
              </div>
              <h1 className='text-xl mt-3'>Overview</h1>
              <p className='text-base w-80 md:w-full text-justify'>{movies[0].overview}</p>
              {/* Team */}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 font-semibold'>
                <div>
                <p className=''>Kelly Marcel</p>
                <p className='font-light'>Director, Screenplay, Story</p>
                </div>

                <div>
                <p className=''>Todd McFarlane</p>
                <p className='font-light'>Characters</p>
                </div>
                
                <div>
                <p className=''>David Michelinie</p>
                <p className='font-light'>Characters</p>
                </div>

                <div>
                <p className=''>Tom Hardy</p>
                <p className='font-light'>Story</p>
                </div>
              </div>
            </div>
        </div>
      )}

      {/* <div className='flex'>
        
        <div className='border border-red-700'>

        </div>

      </div> */}
    </>
  )
}

export default DetailPage;

