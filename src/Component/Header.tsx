import { FC, useState, useEffect } from 'react'
import logo from '../assets/image/Logo.png'
import Add from '../assets/image/AddMovies.png'
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { PlusIcon } from '@heroicons/react/16/solid';
import ThemeToggle from './ThemeToggle';

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const [submenuMovies, setSubmenuMovies] = useState(false);
  const [submenuTVShows, setSubmenuTVShows] = useState(false);
  const [submenuPeople, setSubmenuPeople] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const [user] = useAuthState(auth);
  const Navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Navigate('/');
    }
  }, [user, Navigate])


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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout successful!');
      Navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <header className="navbar bg-[#021C31]  flex justify-between">

      <div>

        <a className="btn btn-ghost relative left-5 md:left-0 text-xl">
          <img className='w-44' src={logo} alt="" />
        </a>

        {/* Mobile View */}

        <div className="flex md:hidden">
          <button className="btn btn-ghost text-white relative right-56" onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-12 left-0 w-full bg-white mt-5 shadow-lg">
              <ul className="menu p-2">
                <li>
                  <a onClick={() => setSubmenuMovies(!submenuMovies)}>Movies</a>
                  {submenuMovies && (
                    <ul className="p-2">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                      <li><a>Item 3</a></li>
                    </ul>
                  )}
                </li>
                <li>
                  <a onClick={() => setSubmenuTVShows(!submenuTVShows)}>TV Shows</a>
                  {submenuTVShows && (
                    <ul className="p-2">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                      <li><a>Item 3</a></li>
                    </ul>
                  )}
                </li>
                <li>
                  <a onClick={() => setSubmenuPeople(!submenuPeople)}>People</a>
                  {submenuPeople && (
                    <ul className="p-2">
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                      <li><a>Item 3</a></li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          )}

        </div>


        {/* Dasktop View  page */}
        <div className="dropdown mx-2 hidden md:flex">
          <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>Movies</label>
          {open && (
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-8">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown mx-2 hidden md:flex">
          <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>TV Shows</label>
          {open && (
            <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-32 mt-8">
              <li><a>Item 4</a></li>
              <li><a>Item 5</a></li>
              <li><a>Item 6</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown mx-2 hidden md:flex">
          <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>People</label>
          {open && (
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-8">
              <li><a>Item 7</a></li>
              <li><a>Item 8</a></li>
              <li><a>Item 9</a></li>
            </ul>
          )}
        </div>
      </div>


      <div >

        {user ?
        <div className='flex gap-3 text-white'>

          <div className="btn btn-ghost btn-circle">
              {/* <PlusIcon className='w-6' /> */}
              <img src={Add} className='w-6' alt="" />
          </div>

          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-black dark:text-white dark:bg-black dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  {username ? username : "Guest"}
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
          </div>
          : <ul className='flex text-white font-semibold mx-0 md:mx-10'>
            <li><Link className='mx-0 md:mx-4' to={'/login'}>Login</Link></li>
            <li><Link className='mx-2 md:mx-4' to={'/register'}>Join</Link></li>
          </ul>
        }
        <div className='flex items-center mx-5 text-white'>
            <ThemeToggle/>
          </div>
      </div>
    </header>
  )
}

export default Header;