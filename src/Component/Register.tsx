import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CheckIcon } from '@heroicons/react/16/solid'
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from './Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  UserName: yup.string().required('Username is required'),
  Password: yup.string()
    .min(4, 'Password must be at least 4 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  ConfirmPassword: yup.string()
    .oneOf([yup.ref('Password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  Email: yup.string().email('Invalid email format').required('Email is required')
});

const Register: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const Navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.Email, data.Password);
      const user = userCredential.user;

      // Add user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: data.UserName,
        email: data.Email,
        password: data.Password,
        createdAt: new Date(),
      });

      Navigate('/login');
      toast.success("Account created successfully. Please log in.");

    } catch (error) {
      console.error("Error signing up:", error);
      toast.error('Email already in use');
    }
  };
  return (
    <>
      <main className='flex flex-col md:flex-row justify-between mx-10 mt-5'>

        <section className='w-full md:w-1/4 shadow-lg'>
          <h1 className='p-4 bg-cyan-600 rounded-t-lg h-14 font-bold text-white'>Benefits of being a member</h1>

          <div className="grid grid-cols-10 gap-2 mt-3 text-justify p-5">
            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Find something to watch on your subscribed streaming services <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>

            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Log the movies and TV shows you have watched <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>

            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Keep track of your favourite movies and TV shows and get recommendations from them <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>

            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Build and maintain a personal watchlist <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>

            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Build custom mixed lists (movies and TV) <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>

            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Take part in movie and TV discussions <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>

            <div className="flex items-start">
              <CheckIcon className='w-5 mt-1' />
            </div>
            <div className="col-span-9 flex items-start">
              <span>Contribute to, and improve the information in our database <hr className='mt-2 border-1 border-gray-300' /></span>
            </div>
          </div>

        </section>

        <section className='w-full md:w-2/3 mr-10 mt-6'>

          <h1 className='text-2xl font-bold font-Poppins text-cyan-600'>Sign up for an account</h1>
          <p className=' text-justify'>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to continue.</p>

          <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Username</label>
              <input {...register("UserName")} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter UserName...' />
              {errors.UserName && <p className='text-red-500'>{errors.UserName.message}</p>}
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Password (4 characters minimum)</label>
              <input type='password' {...register("Password")} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Password...' />
              {errors.Password && <p className='text-red-500'>{errors.Password.message}</p>}
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Password Confirm</label>
              <input type='password' {...register("ConfirmPassword")} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Confirm Password' />
              {errors.ConfirmPassword && <p className='text-red-500'>{errors.ConfirmPassword.message}</p>}
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Email</label>
              <input {...register("Email")} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Email...' />
              {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
            </div>
            <div className='mt-5'>
              <p>By clicking the "Sign up" button below, I certify that I have read and agree to the terms of use and privacy policy.</p>
            </div>
            <div className='flex justify-end'>
              <button className='bg-zinc-200 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>Sign Up</button>
            </div>
          </form>
        </section>

      </main>
    </>
  )
}

export default Register