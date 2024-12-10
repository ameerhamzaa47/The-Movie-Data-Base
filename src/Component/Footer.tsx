import { FC, useState, useEffect } from 'react'
import footerImg from '../assets/image/Footer.png'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './Firebase'
import { doc, getDoc, getFirestore } from 'firebase/firestore'


const Footer: FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [user] = useAuthState(auth)

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
    return (
        <div className='bg-slate-900 my-10'>


            {/* Mobile View */}

            <div className='block md:hidden'>

            <div className='py-4 flex gap-6 justify-between mx-10'>
                    <img className='w-28 ml-10' src={footerImg} alt="" />
                    <div className='text-cyan-500 p-2 leading-10 w-44 truncate text-center mt-5 font-bold text-xl rounded-lg bg-white'>
                        <Link to={'/register'}>{username ? `Hi, ${username}!` : 'Join'}</Link>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-xl font-semibold text-white px-6 py-4 bg-gray-900 hover:bg-slate-700 transition-colors ease-in-out duration-300">The Basics</div>
                    <div className="collapse-content bg-slate-800 text-md">
                        <div className="flex flex-col px-6 py-4 space-y-3">
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>About TMDB</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Contact Us</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Support Forums</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>API</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>System Status</Link>
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-semibold text-white px-6 py-4 bg-gray-900 hover:bg-slate-700 transition-colors ease-in-out duration-300">Get Involved</div>
                    <div className="collapse-content bg-slate-800 text-md">
                        <div className="flex flex-col px-6 py-4 space-y-3">
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Contribution Bible</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Add New Movie</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Add New TV Show</Link>
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-semibold text-white px-6 py-4 bg-gray-900 hover:bg-slate-700 transition-colors ease-in-out duration-300">Community</div>
                    <div className="collapse-content bg-slate-800 text-md">
                        <div className="flex flex-col px-6 py-4 space-y-3">
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Guidelines</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Discussions</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Leaderboard</Link>
                        </div>
                    </div>
                </div>

                <div className="collapse collapse-plus bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-semibold text-white px-6 py-4 bg-gray-900 hover:bg-slate-700 transition-colors ease-in-out duration-300">Legal</div>
                    <div className="collapse-content bg-slate-800 text-md">
                        <div className="flex flex-col px-6 py-4 space-y-3">
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Terms of Use</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>API Terms of Use</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>Privacy Policy</Link>
                            <Link to={''} className='font-light hover:text-cyan-400 transition-colors ease-in-out duration-300'>DMCA Policy</Link>
                        </div>
                    </div>
                </div>

            </div>

            {/* Dasktop View */}
            <div className='md:grid grid-cols-5 mx-20 p-10 hidden'>
                <div className='my-4'>
                    <img className='w-28 ml-10' src={footerImg} alt="" />
                    <div className='text-cyan-500 p-2 w-44 truncate text-center mt-5 font-bold text-xl rounded-lg bg-white'>
                        <Link to={'/register'}>{username ? `Hi, ${username}!` : 'Join'}</Link>
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='font-bold text-xl underline decoration-cyan-400 underline-offset-4'>The Basics</h1>
                    <div className='flex flex-col text-md'>
                        <Link to={''}>About TMDB</Link>
                        <Link to={''}>Contact Us</Link>
                        <Link to={''}>Support Forums</Link>
                        <Link to={''}>API</Link>
                        <Link to={''}>System Status</Link>
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='font-bold text-xl underline decoration-cyan-400 underline-offset-4'>Get Involved</h1>
                    <div className='flex flex-col text-md'>
                        <Link to={''}>Contribution Bible</Link>
                        <Link to={''}>Add New Movie</Link>
                        <Link to={''}>Add New TV Show</Link>
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='font-bold text-xl underline decoration-cyan-400 underline-offset-4'>Community</h1>
                    <div className='flex flex-col text-md'>
                        <Link to={''}>Guidelines</Link>
                        <Link to={''}>Discussions</Link>
                        <Link to={''}>Leaderboard</Link>
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='font-bold text-xl underline decoration-cyan-400 underline-offset-4'>Legal</h1>
                    <div className='flex flex-col text-md'>
                        <Link to={''}>Terms of Use</Link>
                        <Link to={''}>API Terms of Use</Link>
                        <Link to={''}>Privacy Policy</Link>
                        <Link to={''}>DMCA Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
