import { FC } from 'react'
import joinBg from '../assets/image/Join.jpg'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'

const JoinToday:FC = () => {
    const [user] = useAuthState(auth)
  return (
    <>
    {
        user ? 
        null
    :<div className='relative p-10'>
    <div className='absolute inset-0 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${joinBg})` }}></div>
    <div className='absolute inset-0 bg-black opacity-50'></div>
    <div className='relative'>
      <h1 className='text-white text-3xl font-bold'>Join Today</h1>
      <p className='text-white'>Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch next—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, Zee5, Sun Nxt, and MUBI.</p>
      <div className='mt-4 h-10'>
      <Link className='bg-violet-500 py-2 rounded-md text-white p-4 px-3' to={'/register'}>Sign Up</Link>
      </div>
    </div>
  </div>
    }
    </>
  )
}

export default JoinToday
