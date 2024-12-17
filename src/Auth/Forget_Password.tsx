import { FC, useState } from 'react'
import { auth } from './Firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Forget_Password:FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
          toast.error('Please enter a valid email.');
          return;
        }
    
        setLoading(true);
        
        try {
          await sendPasswordResetEmail(auth, email);
          toast.success('Password reset email sent successfully!');
          navigate('/login');
        } catch (error:unknown) {
          toast.error('Error sending password reset email. Please try again.');
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
    <div className="auth-container p-10 flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400">Forget Password</h2>
      <form className="auth-form mt-5 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex flex-col my-2">
          <label htmlFor="email" className="font-semibold text-gray-700 dark:text-gray-300">Enter Your Email</label>
          <input type="email" id="email" placeholder="Email" onChange={handleEmailChange} className="auth-input border border-gray-300 p-2 rounded-md h-10 my-2 dark:text-black" />
        </div>
        <button type="submit" disabled={loading} className="auth-button bg-cyan-600 w-full text-white p-2 mt-3 rounded-lg transition-all hover:bg-cyan-700">
        {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
    </>
  )
}

export default Forget_Password
