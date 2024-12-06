import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import slider1 from '../assets/image/Slider1.png'
import slider2 from '../assets/image/Slider2.png'
import slider3 from '../assets/image/Slider3.png'
import slider4 from '../assets/image/Slider4.png'
import slider5 from '../assets/image/Slider5.png'
import slider6 from '../assets/image/Slider6.png'

const images = [slider1, slider2, slider3, slider4, slider5, slider6]

const Slider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <>
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
                className="w-full h-96 md:h-full  object-cover opacity-70"
              />
            </motion.div>
          ))}
        </motion.div>

{/* text section */}
        <section className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-center text-white p-4 z-10">
          <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-start">Welcome!</h1>

            <p className="mt-1 font-bold text-xl text-start md:text-center md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-500 shadow-lg">
              Millions of movies, TV shows, and people to discover. Explore now.
            </p>
            <div className="relative mt-5 w-full max-w-lg mx-auto">
              <input
                type="search"
                className="mt-3 outline-none w-full h-12 px-5 rounded-full dark:bg-[#021C31] dark:text-white dark:border dark:border-white dark:placeholder-white"
                placeholder="Search for a movie, TV show..."
              />
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-teal-400 to-cyan-500 w-24 h-12 rounded-full absolute bottom-0 right-0 transition-all dark:border dark:border-white hover:text-black dark:bg-gradient-to-r dark:from-teal-800 dark:to-cyan-800"
              >
                Search
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Slider

