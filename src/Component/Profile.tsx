import { FC, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth/Firebase';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import profileIcon from '../assets/image/Profile.png'
import { useNavigate } from 'react-router-dom';

const Profile:FC = () => {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState<string | null>(null);

    const Navigate= useNavigate();
    if(!user){
        Navigate('/')
    }

    useEffect(() => {
        const fetchUserName = async () => {
          if (user) {
            const userDocRef = doc(getFirestore(), "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              setUsername(userDoc.data()?.username);
            } else {
              console.log("No such document!");
            }
          }
        };
    
        fetchUserName();
      }, [user]);

      const currentMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][new Date().getMonth()];
      const currentYear = new Date().getFullYear();
      
  return (
    <>
    {/* top section */}
      <div className='flex items-center space-x-4 bg-cyan-950' >
        <img className='w-44 h-44 ml-14 my-10 rounded-full' src={user?.photoURL || profileIcon} alt="" />
        <div className='flex justify-end flex-col'>
        <h1 className='font-bold text-4xl text-white'>{username ? username : user?.displayName}</h1>
        <p className='text-white'>Member since {currentMonth} {currentYear}</p>
        </div>
      </div>

      {/* section */}
      
      

    </>
  )
}

export default Profile
