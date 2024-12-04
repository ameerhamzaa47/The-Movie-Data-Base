import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { CheckIcon } from '@heroicons/react/16/solid'

const Register: FC = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any): void => console.log(data);
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
              <input {...register("UserName", { required: 'name is required' })} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter UserName...' />
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Password (4 characters minimum)</label>
              <input {...register("Password", { required: true })} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Password...' />
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Password Confirm</label>
              <input {...register("ConfirmPassword", { required: true })} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Confirm Password' />
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Email</label>
              <input {...register("Email", { required: true })} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Email...' />
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