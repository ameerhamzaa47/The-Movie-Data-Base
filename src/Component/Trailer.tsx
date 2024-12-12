import { FC, useEffect, useState } from 'react'
import {addTrailersToDB, getTrailersFromDB} from '../IDB Data/IDB';
import type { Trailer } from '../IDB Data/IDB';
import { TrailersData } from '../IDB Data/TrailerData';
import Slider from 'react-slick';

const Trailer:FC = () => {
    const [backgroundImage, setBackgroundImage] = useState('https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg');
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const getYouTubeVideoId = (url: string): string => {
        const match = url.match(
          /(?:youtube\.com(?:\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|\/v\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : "";
      };

  const handleVideoClick = (videoUrl: string) => {
    console.log("Video URL before formatting:", videoUrl);
  
    //embed URL
    const youtubeEmbedUrl = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")
      ? `https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`
      : videoUrl;
  
    console.log("Formatted Video URL:", youtubeEmbedUrl);
    setSelectedVideo(youtubeEmbedUrl);
  };
  
  const handleMouseEnter = (imageUrl:any) => {
    setBackgroundImage(imageUrl);
  };

  const handleMouseLeave = () => {
    setBackgroundImage('https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg');
  };

  useEffect(() => {
    // Store data in IndexedDB
    addTrailersToDB(TrailersData);

    getTrailersFromDB().then((storedTrailers: Trailer[]) => {
      setTrailers(storedTrailers);
    });
  }, []);

  const TrailersliderSettings ={
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          slidesToShow: 1,
          spaceBetween: 5,
        },
      },
    ],
    draggable: true,
  }

  const [activeTab, setActiveTab] = useState<string>("Popular");
  const tabs = ["Popular", "Streaming", "On TV", "For Rent", "In Theaters"];

  return (
    <>
     {/* Trailer Slider */}

     <div  className="relative bg-cover bg-center  w-full h-96" style={{ backgroundImage: `url(${backgroundImage})` }}>
        
        <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Title */}
          <div className="flex flex-col md:flex-row md:space-x-4 py-2 md:p-4 z-10 relative">
        <h2 className="text-white font-bold text-xl">Latest Trailers</h2>
        <div className="flex md:space-x-4 border-2 border-teal-700 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full font-medium ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
  
        </div>
      </div>
      {/* Trailer */}
        <div className=" w-full h-96 px-6 overflow-hidden z-10">
  
        <Slider {...TrailersliderSettings}>
    {trailers.map((trailer) => (
      <div className="md:px-2" key={trailer.id} onMouseEnter={() => handleMouseEnter(trailer.image)} onMouseLeave={handleMouseLeave}>
        <div className="movie-card w-96 px-10 md:px-0 h-96 rounded-xl flex flex-col justify-between">
          <img
            src={trailer.image}
            alt={trailer.title}
            className="w-full h-56 object-cover cursor-pointer rounded-t-xl hover:scale-105 transition-all"
          />
          <i onClick={() => handleVideoClick(trailer.videoUrl)} className="fa-solid fa-play absolute hover:opacity-50 transition-all text-white dark:text-cyan-500 text-7xl mt-20 ml-40 cursor-pointer"></i>
          <div className="p-4">
            <h3 className="text-lg font-semibold mt-1 md:mt-2 text-white absolute top-56">{trailer.title}</h3>
            <p className="text-sm text-white  absolute top-64">{trailer.releaseDate}</p>
          </div>
        </div>
      </div>
    ))}
  </Slider>
  
  {selectedVideo && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
                onClick={() => setSelectedVideo(null)}
              >
                <div
                  className="bg-white dark:bg-gray-600 p-4 w-full mx-64 rounded-xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-64 md:h-96">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedVideo}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Trailer"
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
        </div> 
    </>
  )
}

export default Trailer