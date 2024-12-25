import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'firebase/storage';
import { Movie } from '../IDB Data/IDB';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Ably from 'ably';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  Runtime: yup.number().required('Runtime is required').positive('Runtime must be a positive number'),
  Date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Must be a valid date in YYYY-MM-DD format').required('Release Date is required'),
  Poster: yup.mixed().required('Image is required'), // Correct this validation for the file upload
  Video: yup.string().matches(/^https:\/\/youtu\.be\/[a-zA-Z0-9_-]+(\?si=[a-zA-Z0-9_-]+)?$/, 'Must be a valid YouTube link').required('Video link is required'),
  overview: yup.string().required('Overview is required'),
  score: yup.number().required('Score is required').min(0, 'Score must be at least 0').max(100, 'Score must be at most 100'),
  genre: yup.string().required('Genre is required'),
  movieUrl: yup.string().required('Movie URL is required'),
});

const AddMovies: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  // Generate Next ID
  const getNextId = async () => {
    const response = await fetch('http://localhost:5000/Movies');
    const movies = await response.json();
    const maxId = movies.length > 0 ? Math.max(...movies.map((movie: Movie) => movie.id)) : 0;
    return maxId + 1;
  }

  const onSubmit = async (data: any) => {
    const nextId = await getNextId();
    const userProvidedDate = data.Date;
  
    // Convert the date string (YYYY-MM-DD) to a Date object
    const dateObj = new Date(userProvidedDate);
  
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',  // 'short' gives "Dec", 'long' would give "December"
      day: '2-digit',  // '2-digit' will give "01"
    });
  
    // Handling file upload and URL creation for poster image
    const posterFile = data.Poster[0];
  
    const formData = new FormData();
    formData.append('file', posterFile); // Append the file
    formData.append('upload_preset', 'Movie Image'); // Your upload preset (see Cloudinary settings)
    
    try {
      // Upload the image to Cloudinary
      const response = await axios.post('https://api.cloudinary.com/v1_1/dlc8zsx7m/image/upload', formData);
      const imageUrl = response.data.secure_url;  // Get the URL of the uploaded image
      
      const genresArray = data.genre.split(',').map((genre: string) => genre.trim());
  
      const newMovie: Movie = {
        id: nextId,
        title: data.title,
        releaseDate: formattedDate,
        imageUrl: imageUrl,
        score: data.score,
        overview: data.overview,
        genre: genresArray,
        runtime: data.Runtime + ' min',
        videoUrl: data.Video,
        movieUrl: data.movieUrl,
      };
  
      try {
        const dbResponse = await fetch('http://localhost:5000/Movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMovie),
        });
  
        if (!dbResponse.ok) {
          throw new Error('Failed to add movie to server');
        }

        toast.success('Movie Added Successfully');

                // Publish a notification to Ably
                const ably = new Ably.Realtime({ key: 'zaHaNQ.19AEng:Nvs1bDlFVvjDoVAgif5PmSGIeRig6LJ95znNpKtRpEo' });  // Replace with your Ably API key
                const channel = ably.channels.get('movies-channel');
                channel.publish('new-movie', `New movie added: ${data.title}`);
        

        navigate('/adminPannel');
      } catch (error) {
        console.error(error);
        toast.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      alert('Failed to upload image to Cloudinary');
    }
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
          <label className='font-semibold'>Genre</label>
          <input
            {...register("genre")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Enter Genres (comma separated)...'
            type="text"
          />
          {errors.genre && <p className='text-red-500'>{errors.genre.message}</p>}
        </div>

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Score</label>
          <input
            {...register("score")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Enter Score...'
            type="number"
          />
          {errors.score && <p className='text-red-500'>{errors.score.message}</p>}
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

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Movie Link</label>
          <input
            {...register("movieUrl")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
            placeholder='Movie Link...'
            type="text"
          />
        </div>

        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Overview</label>
          <textarea
            {...register("overview")}
            className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-20 my-2'
            placeholder='Enter Overview...'
          />
          {errors.overview && <p className='text-red-500'>{errors.overview.message}</p>}
        </div>

        <button type="submit" className='bg-zinc-200 w-full dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovies;







// import { FC } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'firebase/storage';
// import { Movie } from '../IDB Data/IDB';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { toast } from 'react-toastify';

// const schema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   Runtime: yup.number().required('Runtime is required').positive('Runtime must be a positive number'),
//   Date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Must be a valid date in YYYY-MM-DD format').required('Release Date is required'),
//   Poster: yup.mixed().required('Image is required'), // Correct this validation for the file upload
//   Video: yup.string().matches(/^https:\/\/youtu\.be\/[a-zA-Z0-9_-]+(\?si=[a-zA-Z0-9_-]+)?$/, 'Must be a valid YouTube link').required('Video link is required'),
//   overview: yup.string().required('Overview is required'),
//   score: yup.number().required('Score is required').min(0, 'Score must be at least 0').max(100, 'Score must be at most 100'),
//   genre: yup.string().required('Genre is required'),
//   movieUrl: yup.string().required('Movie URL is required'),
// });

// const AddMovies: FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const navigate = useNavigate();

//   // Generate Next ID
//   const getNextId = async () => {
//     const response = await fetch('http://localhost:5000/Movies');
//     const movies = await response.json();
//     const maxId = movies.length > 0 ? Math.max(...movies.map((movie: Movie) => movie.id)) : 0;
//     return maxId + 1;
//   }

//   const onSubmit = async (data: any) => {
//     const nextId = await getNextId();
//     const userProvidedDate = data.Date;
  
//     // Convert the date string (YYYY-MM-DD) to a Date object
//     const dateObj = new Date(userProvidedDate);
  
//     const formattedDate = dateObj.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',  // 'short' gives "Dec", 'long' would give "December"
//       day: '2-digit',  // '2-digit' will give "01"
//     });
  
//     // Handling file upload and URL creation for poster image
//     const posterFile = data.Poster[0];
  
//     const formData = new FormData();
//     formData.append('file', posterFile); // Append the file
//     formData.append('upload_preset', 'Movie Image'); // Your upload preset (see Cloudinary settings)
    
//     try {
//       // Upload the image to Cloudinary
//       const response = await axios.post('https://api.cloudinary.com/v1_1/dlc8zsx7m/image/upload', formData);
//       const imageUrl = response.data.secure_url;  // Get the URL of the uploaded image
      
//       const genresArray = data.genre.split(',').map((genre: string) => genre.trim());
  
//       const newMovie: Movie = {
//         id: nextId,
//         title: data.title,
//         releaseDate: formattedDate,
//         imageUrl: imageUrl,
//         score: data.score,
//         overview: data.overview,
//         genre: genresArray,
//         runtime: data.Runtime + ' min',
//         videoUrl: data.Video,
//         movieUrl: data.movieUrl,
//       };
  
//       try {
//         const dbResponse = await fetch('http://localhost:5000/Movies', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newMovie),
//         });
  
//         if (!dbResponse.ok) {
//           throw new Error('Failed to add movie to server');
//         }
  
//         toast.success('Movie Added Successfully');
//         navigate('/adminPannel');
//       } catch (error) {
//         console.error(error);
//         toast.error('Failed to add movie');
//       }
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       alert('Failed to upload image to Cloudinary');
//     }
//   };
  

//   return (
//     <div className='p-10 flex flex-col items-center'>
//       <h1 className='text-2xl font-semibold dark:text-cyan-400'>Add Movie</h1>
//       <p className='mt-3 text-center w-96 md:w-1/3'>
//         If you want to add TV Show
//         <Link className='text-cyan-500 font-medium hover:underline' to={'/addTVShow'}> Click here</Link>
//       </p>

//       <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Title</label>
//           <input
//             {...register("title")}
//             className='border border-gray-300 dark:text-black p-2 rounded-md h-10 w-96 my-2'
//             placeholder='Enter Title...'
//             type="text"
//           />
//           {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Run Time</label>
//           <input
//             {...register("Runtime")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Runtime...'
//             type="number"
//           />
//           {errors.Runtime && <p className='text-red-500'>{errors.Runtime.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Release Date</label>
//           <input
//             {...register("Date")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Release Date...'
//             type="date"
//           />
//           {errors.Date && <p className='text-red-500'>{errors.Date.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Genre</label>
//           <input
//             {...register("genre")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Genres (comma separated)...'
//             type="text"
//           />
//           {errors.genre && <p className='text-red-500'>{errors.genre.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Score</label>
//           <input
//             {...register("score")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Score...'
//             type="number"
//           />
//           {errors.score && <p className='text-red-500'>{errors.score.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Poster</label>
//           <input
//             {...register("Poster")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Upload Poster...'
//             type="file"
//             required
//           />
//           {errors.Poster && <p className='text-red-500'>{errors.Poster.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>YT Video Link</label>
//           <input
//             {...register("Video")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Movie Video Link...'
//             type="text"
//           />
//           {errors.Video && <p className='text-red-500'>{errors.Video.message}</p>}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Movie Link</label>
//           <input
//             {...register("movieUrl")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Movie Link...'
//             type="text"
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Overview</label>
//           <textarea
//             {...register("overview")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-20 my-2'
//             placeholder='Enter Overview...'
//           />
//           {errors.overview && <p className='text-red-500'>{errors.overview.message}</p>}
//         </div>

//         <button type="submit" className='bg-zinc-200 w-full dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'>
//           Add Movie
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMovies;