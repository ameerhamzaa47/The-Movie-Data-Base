import { FC } from 'react'
import Slider from './Slider'
import MovieCard from './Movie'
import JoinToday from '../Auth/JoinToday'
import LeaderBoard from './LeaderBoard'
import MovieNshow from './MovieNshow'
import Trailer from './Trailer'
import TvShow from './TvShow'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Home: FC = () => {


  return (
    <div>
      {/* <DotLottieReact
      src="https://lottie.host/261770ce-fbad-4377-92c6-1148e5b9e820/gihqo9YpDn.lottie"
      loop
      autoplay
    /> */}
      <Slider />
      <MovieCard />
      <Trailer />
      <TvShow />
      <MovieNshow />
      <JoinToday />
      <LeaderBoard />
    </div>
  )
}

export default Home
