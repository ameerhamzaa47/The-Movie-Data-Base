import { FC } from 'react'

const LeaderBoard:FC = () => {     
  return (
    <>
{/* Title */}
   <div className="flex items-center mt-3 p-4 rounded">
      <h1 className="text-xl font-bold">Leaderboard</h1>
      <div className="ml-4 space-y-2">
        <p className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>
          All Time Edits
        </p>
        <p className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>
          Edits This Week
        </p>
      </div>
    </div>

{/* Board */}

    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/tXSHJKY7PqtAHzuRN76wctVNmND.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Creu</p>
            <span className="inline-block w-16 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>430<br/>
            <span className="inline-block w-48 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>560
           </div>
        </div>

        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Shei</p>
            <span className="inline-block w-36 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>640<br/>
            <span className="inline-block w-96 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>4360
           </div>
        </div>

        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/utJwDgfURkMS1RkROvcRSCQMA5H.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Newborn</p>
            <span className="inline-block w-12 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>340<br/>
            <span className="inline-block w-24 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>64,330
           </div>
        </div>

        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/4M7aDjBVq8cnHJKzmVuGaXAUXxI.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Samara</p>
            <span className="inline-block w-20 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>404<br/>
            <span className="inline-block w-48 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>603
           </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>NedDennehySuperfan</p>
            <span className="inline-block w-10 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>140<br/>
            <span className="inline-block w-56 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>260
           </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/fEwOBxzLc0XzrusWoxPtjDwEvgO.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>seventhgear45</p>
            <span className="inline-block w-28 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>240<br/>
            <span className="inline-block w-36 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>360
           </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/A1pIXQZD86MzfP5pvr37C68YiGv.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>raze464</p>
            <span className="inline-block w-72 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>140<br/>
            <span className="inline-block w-96 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>960
           </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/utJwDgfURkMS1RkROvcRSCQMA5H.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>chkchkboom</p>
            <span className="inline-block w-28 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>230<br/>
            <span className="inline-block w-72 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>760
           </div>
        </div>
    </div>
    </>
  )
}

export default LeaderBoard
