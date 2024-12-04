import  { FC } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login: FC = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data: any): void => console.log(data)
  return (
    <>
      <div className='p-10'>
      <h1 className='text-2xl font-semibold'>Login to your account</h1>
      <p className='mt-2 text-justify'>In order to use the editing and rating capabilities of THE CINEMANIA, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. <Link className='text-cyan-500 font-medium hover:underline' to={'/register'}>Click here</Link> to get started.</p>

      <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col my-2'>
              <label className='font-semibold'>Username</label>
              <input {...register("UserName", { required: 'name is required' })} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter UserName...' />
            </div>
            <div className='flex flex-col my-2'>
              <label className='font-semibold'>Password</label>
              <input {...register("Password", { required: true })} className='border border-gray-300 p-2  rounded-md h-10 my-2' placeholder='Enter Password...' />
            </div>
            <div className='flex justify-end'>
              <button className='bg-zinc-200 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>Login</button>
            </div>
      </form>
      </div>
    </>
  )
}

export default Login
