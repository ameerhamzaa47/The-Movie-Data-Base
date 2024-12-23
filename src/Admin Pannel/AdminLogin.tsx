import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    Email: yup.string().email('Invalid email format').required('Email is required'),
    Password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdminLogin: FC = () => {        

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    useEffect(() => {
            if (localStorage.getItem('admin')){
                navigate('/adminPannel')
            }
          }, [])

    const onSubmit = async (data: any) => {
        const validEmail = 'hamzaataariq12@gmail.com';
        const validPassword = '@Hamza123';
        const adminAuth = { email: validEmail, password: validPassword };
        
        if (data.Email === validEmail && data.Password === validPassword) {
            toast.success('Login successful!');
            navigate('/adminPannel');
            localStorage.setItem('admin', JSON.stringify(adminAuth))
        } else {
            toast.error('Invalid username or password. Please try again.');
        }
    };
    return (
        <>
            <div>
                <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='p-10 flex flex-col items-center'>
                        <h1 className='text-2xl font-semibold dark:text-cyan-400'>Admin Dashboard</h1>
                        <div className='flex flex-col my-2'>
                            <label className='font-semibold'>Email</label>
                            <input
                                {...register("Email")}
                                className='border border-gray-300 dark:text-black p-2 rounded-md h-10 w-96 my-2'
                                placeholder='Enter Email...'
                                type="email"
                            />
                            {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
                        </div>

                        <div className='flex flex-col my-2'>
                            <label className='font-semibold'>Password</label>
                            <input
                                {...register("Password")}
                                className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
                                placeholder='Enter Password...'
                                type="password"
                            />
                            {errors.Password && <p className='text-red-500'>{errors.Password.message}</p>}
                        </div>

                        <button className='bg-zinc-200 w-96 dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin
