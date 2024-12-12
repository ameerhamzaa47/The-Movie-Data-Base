import { FC } from 'react'
import Slider from './Slider'
import MovieCard from './Movie'
import JoinToday from './JoinToday'
import LeaderBoard from './LeaderBoard'
import MovieNshow from './MovieNshow'
import Trailer from './Trailer'
import TvShow from './TvShow'


const Home: FC = () => {


  return (
    <div>
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
