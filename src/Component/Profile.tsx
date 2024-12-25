import { FC, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth/Firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import profileIcon from '../assets/image/Profile.png';
import { useNavigate } from 'react-router-dom';

const Profile: FC = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discussion' | 'list' | 'rating' | 'watchlist'>('discussion');
  const [activeSubTab, setActiveSubTab] = useState<'movie' | 'tv' | 'rated' | 'unrated' | 'upcoming' | 'completed'>('movie');

  const Navigate = useNavigate();
  if (!user) {
    Navigate('/');
  }

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(getFirestore(), 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data()?.username);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserName();
  }, [user]);

  const currentMonth =
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  // Tab content for each section
  const renderTabContent = () => {
    switch (activeTab) {
      case 'discussion':
        return (
          <div className="px-5">
            <h1 className="font-bold text-xl text-cyan-700">Social Discussion</h1>
            <p className="mt-2 text-gray-600">Share your thoughts or reply to others.</p>

            {/* Comment Input */}
            <div className="flex items-center mt-4 space-x-4">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <button className="px-4 py-2 bg-cyan-700 text-white font-medium rounded-r-md hover:bg-cyan-800">
                Add Comment
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-5 space-y-3 overflow-auto" style={{ maxHeight: '400px' }}>
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="px-5">
            <h1 className="font-bold text-xl text-cyan-700">Your List</h1>
            <p className="mt-2 text-gray-600">Choose between Movies or TV Shows</p>

            {/* Display content based on selected sub-tab (Movies or TV Shows) */}
            <div className="mt-5">
              {activeSubTab === 'movie' && (
                <div>
                  <h2 className="font-semibold text-lg text-cyan-600">Movies</h2>
                  <p className="text-gray-500">List of movies goes here.</p>
                </div>
              )}
              {activeSubTab === 'tv' && (
                <div>
                  <h2 className="font-semibold text-lg text-cyan-600">TV Shows</h2>
                  <p className="text-gray-500">List of TV shows goes here.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'rating':
        return (
          <div className="px-5">
            <h1 className="font-bold text-xl text-cyan-700">Your Ratings</h1>
            <p className="mt-2 text-gray-600">Choose between Rated or Unrated items</p>

            {/* Display content based on selected sub-tab (Rated or Unrated) */}
            <div className="mt-5">
              {activeSubTab === 'rated' && (
                <div>
                  <h2 className="font-semibold text-lg text-cyan-600">Rated Items</h2>
                  <p className="text-gray-500">List of rated items goes here.</p>
                </div>
              )}
              {activeSubTab === 'unrated' && (
                <div>
                  <h2 className="font-semibold text-lg text-cyan-600">Unrated Items</h2>
                  <p className="text-gray-500">List of unrated items goes here.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'watchlist':
        return (
          <div className="px-5">
            <h1 className="font-bold text-xl text-cyan-700">Watchlist</h1>
            <p className="mt-2 text-gray-600">Choose between Upcoming or Completed items</p>

            {/* Display content based on selected sub-tab (Upcoming or Completed) */}
            <div className="mt-5">
              {activeSubTab === 'upcoming' && (
                <div>
                  <h2 className="font-semibold text-lg text-cyan-600">Upcoming</h2>
                  <p className="text-gray-500">List of upcoming items goes here.</p>
                </div>
              )}
              {activeSubTab === 'completed' && (
                <div>
                  <h2 className="font-semibold text-lg text-cyan-600">Completed</h2>
                  <p className="text-gray-500">List of completed items goes here.</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Top Section */}
      <div className="flex items-center space-x-4 bg-cyan-950 py-10">
        <img className="w-44 h-44 ml-14 rounded-full shadow-lg" src={user?.photoURL || profileIcon} alt="" />
        <div className="flex justify-end flex-col">
          <h1 className="font-bold text-4xl text-white">{username ? username : user?.displayName}</h1>
          <p className="text-white">Member since {currentMonth} {currentYear}</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="max-w-4xl mx-auto mt-10">
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-6 border-b-2 border-gray-300 pb-4">
          {['discussion', 'list', 'rating', 'watchlist'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-semibold text-lg ${
                activeTab === tab
                  ? 'text-cyan-700 border-b-4 border-cyan-700'
                  : 'text-gray-500 hover:text-cyan-700'
              } transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab(tab as 'discussion' | 'list' | 'rating' | 'watchlist')}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Sub Tab Navigation for List, Rating, Watchlist */}
        {activeTab !== 'discussion' && (
          <div className="mt-4 flex justify-center space-x-6">
            {activeTab === 'list' && (
              <>
                <button
                  onClick={() => setActiveSubTab('movie')}
                  className={`px-6 py-2 ${activeSubTab === 'movie' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Movies
                </button>
                <button
                  onClick={() => setActiveSubTab('tv')}
                  className={`px-6 py-2 ${activeSubTab === 'tv' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  TV Shows
                </button>
              </>
            )}
            {activeTab === 'rating' && (
              <>
                <button
                  onClick={() => setActiveSubTab('rated')}
                  className={`px-6 py-2 ${activeSubTab === 'rated' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Rated
                </button>
                <button
                  onClick={() => setActiveSubTab('unrated')}
                  className={`px-6 py-2 ${activeSubTab === 'unrated' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Unrated
                </button>
              </>
            )}
            {activeTab === 'watchlist' && (
              <>
                <button
                  onClick={() => setActiveSubTab('upcoming')}
                  className={`px-6 py-2 ${activeSubTab === 'upcoming' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveSubTab('completed')}
                  className={`px-6 py-2 ${activeSubTab === 'completed' ? 'text-cyan-700' : 'text-gray-500'}`}
                >
                  Completed
                </button>
              </>
            )}
          </div>
        )}

        {/* Tab Content */}
        <div className="mt-5">{renderTabContent()}</div>
      </div>
    </>
  );
};

export default Profile;







// import { FC, useState, useEffect } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../Auth/Firebase';
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import profileIcon from '../assets/image/Profile.png'
// import { useNavigate } from 'react-router-dom';

// const Profile:FC = () => {
//     const [user] = useAuthState(auth);
//     const [username, setUsername] = useState<string | null>(null);
//     const [activeTab, setActiveTab] = useState<'discussion' | 'list' | 'rating' | 'watchlist'>('discussion');

//     const Navigate= useNavigate();
//     if(!user){
//         Navigate('/')
//     }

//     useEffect(() => {
//         const fetchUserName = async () => {
//           if (user) {
//             const userDocRef = doc(getFirestore(), "users", user.uid);
//             const userDoc = await getDoc(userDocRef);
//             if (userDoc.exists()) {
//               setUsername(userDoc.data()?.username);
//             } else {
//               console.log("No such document!");
//             }
//           }
//         };
    
//         fetchUserName();
//       }, [user]);

//       const currentMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][new Date().getMonth()];
//       const currentYear = new Date().getFullYear();

//       // Tab content for each section
//       const renderTabContent = () => {
//         switch (activeTab) {
//           case 'discussion':
//             return (
//               <div className="px-5">
//                 <h1 className="font-bold text-xl text-cyan-700">Social Discussion</h1>
//                 <p className="mt-2 text-gray-600">Share your thoughts or reply to others.</p>
    
//                 {/* Comment Input */}
//                 <div className="flex items-center mt-4 space-x-4">
//                   <input
//                     type="text"
//                     placeholder="Write a comment..."
//                     className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                   />
//                   <button className="px-4 py-2 bg-cyan-700 text-white font-medium rounded-r-md hover:bg-cyan-800">
//                     Add Comment
//                   </button>
//                 </div>
    
//                 {/* Comments Section */}
//                 <div className="mt-5 space-y-3 overflow-auto" style={{ maxHeight: '400px' }}>
//                   <p className="text-gray-500">No comments yet. Be the first to comment!</p>
//                 </div>
//               </div>
//             );
//           case 'list':
//             return (
//               <div className="px-5">
//                 <h1 className="font-bold text-xl text-cyan-700">Your List</h1>
//                 <p className="mt-2 text-gray-600">Here are items you've added to your list.</p>
//                 {/* Placeholder content */}
//                 <div className="mt-5 text-gray-500">No items in your list yet.</div>
//               </div>
//             );
//           case 'rating':
//             return (
//               <div className="px-5">
//                 <h1 className="font-bold text-xl text-cyan-700">Your Ratings</h1>
//                 <p className="mt-2 text-gray-600">Here you can rate your favorite items.</p>
//                 {/* Placeholder content */}
//                 <div className="mt-5 text-gray-500">You have not rated any items yet.</div>
//               </div>
//             );
//           case 'watchlist':
//             return (
//               <div className="px-5">
//                 <h1 className="font-bold text-xl text-cyan-700">Watchlist</h1>
//                 <p className="mt-2 text-gray-600">Items you want to watch will appear here.</p>
//                 {/* Placeholder content */}
//                 <div className="mt-5 text-gray-500">No items in your watchlist yet.</div>
//               </div>
//             );
//           default:
//             return null;
//         }
//       };
      
//   return (
//     <>
//     {/* top section */}
//       <div className='flex items-center space-x-4 bg-cyan-950' >
//         <img className='w-44 h-44 ml-14 my-10 rounded-full' src={user?.photoURL || profileIcon} alt="" />
//         <div className='flex justify-end flex-col'>
//         <h1 className='font-bold text-4xl text-white'>{username ? username : user?.displayName}</h1>
//         <p className='text-white'>Member since {currentMonth} {currentYear}</p>
//         </div>
//       </div>

//       {/* Tab section */}
      
//        {/* Tab Section */}
//       <div className="max-w-4xl mx-auto mt-10">
//         {/* Tab Navigation */}
//         <div className="flex justify-center space-x-6 border-b-2 border-gray-300 pb-4">
//           {['discussion', 'list', 'rating', 'watchlist'].map((tab) => (
//             <button
//               key={tab}
//               className={`px-6 py-3 font-semibold text-lg ${
//                 activeTab === tab
//                   ? 'text-cyan-700 border-b-4 border-cyan-700'
//                   : 'text-gray-500 hover:text-cyan-700'
//               } transition-all duration-300 ease-in-out`}
//               onClick={() => setActiveTab(tab as 'discussion' | 'list' | 'rating' | 'watchlist')}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="mt-5">{renderTabContent()}</div>
//       </div>

//     </>
//   )
// }

// export default Profile