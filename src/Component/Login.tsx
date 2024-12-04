import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  Email: yup.string().email('Invalid email format').required('Email is required'),
  Password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});



const Login: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  

  const onSubmit = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, data.Email, data.Password);
      toast.success('Login successful!');
      navigate('/');

    } catch (error) {
      toast.error('Invalid username or password. Please try again.');
    }
  };

  return (
    <>
      <div className='p-10'>
        <h1 className='text-2xl font-semibold'>Login to your account</h1>
        <p className='mt-2 text-justify'>
          In order to use the editing and rating capabilities of THE CINEMANIA, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple.
          <Link className='text-cyan-500 font-medium hover:underline' to={'/register'}> Click here</Link> to get started.
        </p>

        <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col my-2'>
            <label className='font-semibold'>Email</label>
            <input
              {...register("Email")}
              className='border border-gray-300 p-2 rounded-md h-10 my-2'
              placeholder='Enter Email...'
              type="email"
            />
            {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
          </div>

          <div className='flex flex-col my-2'>
            <label className='font-semibold'>Password</label>
            <input
              {...register("Password")}
              className='border border-gray-300 p-2 rounded-md h-10 my-2'
              placeholder='Enter Password...'
              type="password"
            />
            {errors.Password && <p className='text-red-500'>{errors.Password.message}</p>}
          </div>

          <div className='flex justify-end'>
            <button className='bg-zinc-200 dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>
              Login
            </button>
          </div>
        </form>
      </div>
      </>
  );
};

export default Login;



// import { FC } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { auth } from './Firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { toast } from 'react-toastify';

// const Login: FC = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data: any) => {
//     try {
//       await signInWithEmailAndPassword(auth, data.Email, data.Password);
//       toast.success('Login successful!');
//       navigate('/');

//     } catch (error) {
//       toast.error('Invalid username or password. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div className='p-10'>
//         <h1 className='text-2xl font-semibold'>Login to your account</h1>
//         <p className='mt-2 text-justify'>
//           In order to use the editing and rating capabilities of THE CINEMANIA, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple.
//           <Link className='text-cyan-500 font-medium hover:underline' to={'/register'}>Click here</Link> to get started.
//         </p>

//         <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
//           <div className='flex flex-col my-2'>
//             <label className='font-semibold'>Email</label>
//             <input
//               {...register("Email", { required: 'Email is required' })}
//               className='border border-gray-300 p-2 rounded-md h-10 my-2'
//               placeholder='Enter Email...'
//               type="email"
//             />
//           </div>

//           <div className='flex flex-col my-2'>
//             <label className='font-semibold'>Password</label>
//             <input
//               {...register("Password", { required: true })}
//               className='border border-gray-300 p-2 rounded-md h-10 my-2'
//               placeholder='Enter Password...'
//               type="password"
//             />
//           </div>

//           <div className='flex justify-end'>
//             <button className='bg-zinc-200 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
