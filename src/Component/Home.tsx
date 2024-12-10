import { FC } from 'react'
import Slider from './Slider'
import MovieCard from './Movie'
import JoinToday from './JoinToday'
import LeaderBoard from './LeaderBoard'
import Footer from './Footer'


const Home:FC = () => {


  return (
    <div>
      <Slider/>
      <MovieCard/>
      <JoinToday/>
      <LeaderBoard/>
      <Footer/>
     </div>
  )
}

export default Home
