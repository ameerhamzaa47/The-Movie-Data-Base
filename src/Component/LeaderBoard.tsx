import { FC } from 'react'
interface LineProps {
  width1: number;
  width2: number;
  color1?: string;
  color2?: string;
}

const DynamicLines: React.FC<LineProps> = ({ width1, width2}) => {
  return (
    <div className="flex flex-col space-y-2">
      {/* First Line */}
      <div className={`h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400`} style={{ width: `${width1}px` }}></div>

      {/* Second Line */}
      <div className={`h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2`} style={{ width: `${width2}px` }}></div>
    </div>
  );
};


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
            <DynamicLines width1={200} width2={250}/>
            {/* <span className="inline-block w-16 h-2 rounded-full bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 mr-2"></span>430<br/>
            <span className="inline-block w-48 h-2 rounded-full bg-gradient-to-r from-orange-300 via-red-400 to-rose-500 mr-2"></span>560 */}
           </div>
        </div>

        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Shei</p>
            <DynamicLines width1={100} width2={250}/>
            </div>
        </div>

        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/utJwDgfURkMS1RkROvcRSCQMA5H.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Newborn</p>
            <DynamicLines width1={50} width2={150}/>
            </div>
        </div>

        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/4M7aDjBVq8cnHJKzmVuGaXAUXxI.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>Samara</p>
            <DynamicLines width1={300} width2={150}/> 
            </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>NedDennehySuperfan</p>
            <DynamicLines width1={200} width2={150}/>
            </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/fEwOBxzLc0XzrusWoxPtjDwEvgO.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>seventhgear45</p>
            <DynamicLines width1={100} width2={250}/>
            </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/A1pIXQZD86MzfP5pvr37C68YiGv.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>raze464</p>
            <DynamicLines width1={130} width2={280}/>
            </div>
        </div>


        <div className='flex items-center mx-6 md:mx-16 my-2'>
           <img className='rounded-full w-14 h-14' src="https://media.themoviedb.org/t/p/w128_and_h128_face/utJwDgfURkMS1RkROvcRSCQMA5H.jpg" alt="" /> 
           <div className='mx-3 mt-1'>
            <p>chkchkboom</p>
            <DynamicLines width1={120} width2={300}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default LeaderBoard