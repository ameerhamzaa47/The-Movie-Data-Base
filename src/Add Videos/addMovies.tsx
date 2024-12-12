import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { addMoviesToDB, getMoviesFromDB } from '../IDB Data/IDB';
import { Movie } from '../IDB Data/IDB';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  Runtime: yup.number().required('Runtime is required').positive('Runtime must be a positive number'),
  Date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Must be a valid date in YYYY-MM-DD format').required('Release Date is required'),
  Poster: yup.mixed().required('Image is required'), // Correct this validation for the file upload
  Video: yup.string().matches(/^https:\/\/youtu\.be\/[a-zA-Z0-9_-]+(\?si=[a-zA-Z0-9_-]+)?$/, 'Must be a valid YouTube link').required('Video link is required'),
});

const AddMovies: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  // Generate Next ID
  const getNextId = async (): Promise<number> => {
    try {
      const movies = await getMoviesFromDB();
      const maxId = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) : 0;  // Find the highest ID
      return maxId + 1;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return 1;
    }
  };

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data); // Debug log

    const nextId = await getNextId();
    const userProvidedDate = data.Date;  // This is the date string (e.g., '2024-12-04')

    // Convert the date string (YYYY-MM-DD) to a Date object
    const dateObj = new Date(userProvidedDate);

    // Format the date to "Dec 01, 2024"
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',  // 'short' gives "Dec", 'long' would give "December"
      day: '2-digit',  // '2-digit' will give "01"
    });

    console.log("Formatted Date:", formattedDate);  // Log the formatted date (e.g., "Dec 01, 2024")

    // Handling file upload and URL creation for poster image
    const posterFile = data.Poster[0];

    // Save the file itself in IndexedDB (you can use FileReader to convert it to a data URL if necessary)
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageUrl = reader.result as string; // This is the data URL of the image.

      const newMovie: Movie = {
        id: nextId,
        title: data.title,
        releaseDate: formattedDate,
        imageUrl: imageUrl,
        score: 0,
        overview: "Movie overview here",
        genre: ["Drama"],
        runtime: Number(data.Runtime),
        videoUrl: data.Video,
      };

      // Store the movie in IndexedDB
      try {
        await addMoviesToDB([newMovie]);
        alert('Movie Added Successfully');
        navigate('/');
      } catch (error) {
        console.error('Error adding movie to IndexedDB', error);
        alert('Failed to add movie');
      }
    };

    reader.readAsDataURL(posterFile);
  };

  return (
    <div className='p-10 flex flex-col items-center'>
      <h1 className='text-2xl font-semibold dark:text-cyan-400'>Add Movie</h1>
      <p className='mt-3 text-center w-96 md:w-1/3'>
        If you want to add TV Show
        <Link className='text-cyan-500 font-medium hover:underline' to={'/addTVShow'}> Click here</Link>
      </p>

      <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Title</label>
          <input
            {...register("title")}
            className='border border-gray-300 dark:text-black p-2 rounded-md h-10 w-96 my-2'
            placeholder='Enter Title...'
            type="text"
          />
          {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        </div>

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Run Time</label>
          <input
            {...register("Runtime")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Enter Runtime...'
            type="number"
          />
          {errors.Runtime && <p className='text-red-500'>{errors.Runtime.message}</p>}
        </div>

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Release Date</label>
          <input
            {...register("Date")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Enter Release Date...'
            type="date"
          />
          {errors.Date && <p className='text-red-500'>{errors.Date.message}</p>}
        </div>

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Poster</label>
          <input
            {...register("Poster")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Upload Poster...'
            type="file"
            required
          />
          {errors.Poster && <p className='text-red-500'>{errors.Poster.message}</p>}
        </div>

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>YT Video Link</label>
          <input
            {...register("Video")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Movie Video Link...'
            type="text"
          />
          {errors.Video && <p className='text-red-500'>{errors.Video.message}</p>}
        </div>

        <button type="submit" className='bg-zinc-200 w-full dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovies;