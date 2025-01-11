import { FC, useState, useEffect } from 'react'

interface Item {
  title: string;
}
import logo from '../assets/image/Logo.png'
import Add from '../assets/image/AddMovies.png'
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../Auth/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { PlusIcon } from '@heroicons/react/16/solid';
import ThemeToggle from './ThemeToggle';
import profileIcon from '../assets/image/Profile.png'
import Notification from '../IDB Data/Notification';
import { useSearch } from './searchContext';

const Header: FC = () => {
  const { setSearchQuery } = useSearch();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [submenuMovies, setSubmenuMovies] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [submenuTVShows, setSubmenuTVShows] = useState(false);
  const [submenuPeople, setSubmenuPeople] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [adimnId, setAdminId] = useState<number | null>(null);
  const [allData, setAllData] = useState<{ movies: any[]; tvShows: any[] }>({
    movies: [],
    tvShows: [],
  });

  const [user] = useAuthState(auth);
  const Navigate = useNavigate();

  

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(getFirestore(), "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data()?.username);
          setAdminId(userDoc.data()?.roleId);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, tvShowsResponse] = await Promise.all([
          fetch('http://localhost:5000/Movies'),
          fetch('http://localhost:5000/TVShows'),
        ]);

        const movies = await moviesResponse.json();
        const tvShows = await tvShowsResponse.json();

        setAllData({ movies, tvShows });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEnterClick = (e: any) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      Navigate(`/search?query=${searchInput}`);
    }
  };


  const handleItemClick = (item: Item) => {
    setSearchQuery(item.title);
    setSearchInput(item.title);
    Navigate(`/search?query=${item.title}`);
  };
  

  return (
    <header className="navbar bg-[#021C31] sticky top-0 z-20 flex justify-between">

      <div>

        <Link to={'/'} className="btn btn-ghost relative left-5 md:left-0 text-xl">
          <img className='w-44' src={logo} alt="" />
        </Link>

        {/* Mobile View */}

        <div className="flex md:hidden">
          <button className="btn btn-ghost text-white relative right-56 z-20" onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-12 left-0 w-full bg-white mt-4 dark:bg-gradient-to-r dark:from-teal-700 dark:to-cyan-800 shadow-lg z-30">
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
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 z-20 rounded-box w-32 mt-8">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown mx-2 hidden md:flex">
          <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>TV Shows</label>
          {open && (
            <ul tabIndex={0} className="dropdown-content  menu p-2 z-20 shadow bg-base-100 rounded-box w-32 mt-8">
              <li><a>Item 4</a></li>
              <li><a>Item 5</a></li>
              <li><a>Item 6</a></li>
            </ul>
          )}
        </div>

        <div className="dropdown mx-2 hidden md:flex">
          <label tabIndex={0} className="text-white font-semibold cursor-pointer m-1" onClick={() => setOpen(!open)}>People</label>
          {open && (
            <ul tabIndex={0} className="dropdown-content menu p-2 z-20 shadow bg-base-100 rounded-box w-32 mt-8">
              <li><a>Item 7</a></li>
              <li><a>Item 8</a></li>
              <li><a>Item 9</a></li>
            </ul>
          )}
        </div>
      </div>




      <div >

        {adimnId === 1 ?
            <Link to={'/adminPannel'} tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <img src={Add} className='w-6' alt="" />
            </Link>
          : null
        }

       <Notification/>

        {user ?
          <div className='flex gap-3 text-white'>


            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL || profileIcon} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm text-black  dark:text-white dark:bg-black dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={`/u/${username ? username : user.displayName}`} className="justify-between">
                    {username ? username : user.displayName}
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li className='block md:hidden'><ThemeToggle /></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
          : <ul className='flex text-white font-semibold mx-0 md:mx-10'>
            <li><Link className='mx-0 md:mx-4' to={'/login'}>Login</Link></li>
            <li><Link className='mx-2 md:mx-4' to={'/register'}>Join</Link></li>
          </ul>
        }
        <div className='hidden md:flex items-center mx-5 text-white'>
          <ThemeToggle />
        </div>
        <div className='ml-2 md:-ml-2 flex items-center mr-4 text-white'>
          {!searchOpen ? (
            <i className="fa-solid fa-magnifying-glass text-2xl cursor-pointer text-cyan-500"
              onClick={() => setSearchOpen(!searchOpen)} ></i>
          ) : <i className="fa-solid fa-x text-xl cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}></i>}
          {searchOpen && (
            <>
              <input
                type="search"
                className="absolute top-16 w-full h-12 z-30 px-4 right-0 bg-white text-black"
                placeholder="Search for a movie, TV show..."
                value={searchInput}
                onKeyPress={handleEnterClick}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              {/* Dropdown Suggestions */}
              {searchInput.length > 0 && (
  <div className="absolute top-14 left-0 right-0 bg-white border-t border-gray-400 dark:bg-[#1a1a1a] text-gray-800 dark:text-white p-3 rounded-sm shadow-xl transform transition-all duration-300 ease-in-out max-h-56 overflow-y-auto">
    <ul>
      {[...allData.movies, ...allData.tvShows]
        .filter((item) => (item.title || item.name).toLowerCase().includes(searchInput.toLowerCase()))
        .map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item)}
            className="py-2 px-4 hover:bg-teal-100 dark:hover:bg-teal-900 cursor-pointer"
          >
            {item.title || item.name}
          </li>
        ))}
    </ul>
  </div>
)}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;