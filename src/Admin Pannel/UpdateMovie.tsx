// import { FC, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { Movie } from '../Component/Movie';

// const UpdateMovie: FC = () => {
//   const { id } = useParams();
//   const [movieData, setMovieData] = useState<Movie | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const { register, handleSubmit, setValue } = useForm();

  
  
//   const onSubmit = async (data: any) => {
//     console.log(data);
//     };
  
   
  
  

//   useEffect(() => {
//     async function fetchMovieData() {
//       const response = await fetch(`http://localhost:5000/Movies/${id}`);
//       const data = await response.json();
//       setMovieData(data);

//       setValue('title', data.title);
//       setValue('Runtime', data.runtime);
//       setValue('Date', data.releaseDate);
//       setValue('genre', data.genre.join(', '));
//       setValue('score', data.score);
//       setValue('Video', data.videoUrl);
//       setValue('movieUrl', data.movieUrl);
//       setValue('overview', data.overview);

//       if (data.imageUrl) {
//         setImagePreview(data.imageUrl);
//       }
//     }

//     fetchMovieData();
//   }, [id, setValue]);

//   return (
//     <div className='p-10 flex flex-col items-center'>
//       <h1 className='text-2xl font-semibold dark:text-cyan-400'>Update Movie</h1>
//       <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        
//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Title</label>
//           <input
//             {...register("title")}
//             className='border border-gray-300 dark:text-black p-2 rounded-md h-10 w-96 my-2'
//             placeholder='Enter Title...'
//             type="text"
//             defaultValue={movieData?.title}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Run Time</label>
//           <input
//             {...register("Runtime")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Runtime...'
//             type="number"
//             defaultValue={movieData?.runtime}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Release Date</label>
//           <input
//             {...register("Date")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Release Date...'
//             type="date"
//             defaultValue={movieData?.releaseDate}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Genre</label>
//           <input
//             {...register("genre")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Genres (comma separated)...'
//             type="text"
//             defaultValue={movieData?.genre.join(', ')}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Score</label>
//           <input
//             {...register("score")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Score...'
//             type="number"
//             defaultValue={movieData?.score}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Poster</label>
//           {imagePreview ? (
//             <img className='w-36 h-36' src={imagePreview} alt='Poster Preview' />
//           ) : (
//             <p>No Poster Available</p>
//           )}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Choose Poster Image</label>
//           <input
//             type='file'
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>YT Video Link</label>
//           <input
//             {...register('Video')}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Movie Video Link...'
//             type='text'
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Movie Link</label>
//           <input
//             {...register('movieUrl')}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Movie Link...'
//             type='text'
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Overview</label>
//           <textarea
//             {...register('overview')}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-20 my-2'
//             placeholder='Enter Overview...'
//           />
//         </div>

//         <button
//           type='submit'
//           className='bg-zinc-200 w-full dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'
//         >
//           Update Movie
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;




import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Movie } from '../Component/Movie';

interface UpdateData {
  title: string;
  runtime: number;
  releaseDate: number;
  genre: string[];
  score: number;
  videoUrl: string;
  movieUrl: string;
  overview: string;
  imageUrl?: string;
}

const UpdateMovie: FC = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue } = useForm();

  const CLOUDINARY_UPLOAD_PRESET = 'movieImage';
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlc8zsx7m/image/upload';

  const onSubmit = async (data: any) => {
  let updatedData: UpdateData = {
    title: data.title,
    runtime: data.Runtime,
    releaseDate: data.Date,
    genre: data.genre,
    score: data.score,
    videoUrl: data.Video,
    movieUrl: data.movieUrl,
    overview: data.overview,
  };

  // If a new image is uploaded, upload it to Cloudinary and get the image URL
  if (imageFile) {
    try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Upload image to Cloudinary
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      updatedData.imageUrl = data.secure_url;
    }
    } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    }
  } else {
    updatedData.imageUrl = movieData?.imageUrl;
  }

  // Update Data
  try {
    const response = await fetch(`http://localhost:5000/Movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
    });

    if (response.ok) {
    alert('Movie updated successfully');
    } else {
    alert('Failed to update movie');
    }
  } catch (error) {
    console.error('Error updating movie:', error);
  }
  };

  // Function to handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files ? event.target.files[0] : null;
  if (file) {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
    setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  };

  useEffect(() => {
  async function fetchMovieData() {
    const response = await fetch(`http://localhost:5000/Movies/${id}`);
    const data = await response.json();
    setMovieData(data);

    // Populate form fields with movie data
    setValue('title', data.title);
    setValue('Runtime', data.runtime);
    setValue('Date', data.releaseDate);
    setValue('genre', data.genre);
    setValue('score', data.score);
    setValue('Video', data.videoUrl);
    setValue('movieUrl', data.movieUrl);
    setValue('overview', data.overview);
  }

  fetchMovieData();
  }, [id, setValue]);

  return (
  <div className='p-10 flex flex-col items-center'>
    <h1 className='text-2xl font-semibold dark:text-cyan-400'>Update Movie</h1>
    <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
    
    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Title</label>
      <input
      {...register("title")}
      className='border border-gray-300 dark:text-black p-2 rounded-md h-10 w-96 my-2'
      placeholder='Enter Title...'
      type="text"
      defaultValue={movieData?.title}
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Run Time</label>
      <input
      {...register("Runtime")}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      placeholder='Enter Runtime...'
      type="number"
      defaultValue={movieData?.runtime}
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Release Date</label>
      <input
      {...register("Date")}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      placeholder='Enter Release Date...'
      type="date"
      defaultValue={movieData?.releaseDate}
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Genre</label>
      <input
      {...register("genre")}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      placeholder='Enter Genres (comma separated)...'
      type="text"
      defaultValue={movieData?.genre}
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Score</label>
      <input
      {...register("score")}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      placeholder='Enter Score...'
      type="number"
      defaultValue={movieData?.score}
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Poster</label>
      {/* Display current poster or preview new image */}
      {imagePreview || movieData?.imageUrl ? (
      <img className='w-36 h-36' src={imagePreview || movieData?.imageUrl} alt='Poster Preview' />
      ) : (
      <p>No Poster Available</p>
      )}
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Choose Poster Image</label>
      <input
      type='file'
      onChange={handleImageChange}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>YT Video Link</label>
      <input
      {...register('Video')}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      placeholder='Movie Video Link...'
      type='text'
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Movie Link</label>
      <input
      {...register('movieUrl')}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
      placeholder='Movie Link...'
      type='text'
      />
    </div>

    <div className='flex flex-col my-2'>
      <label className='font-semibold'>Overview</label>
      <textarea
      {...register('overview')}
      className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-20 my-2'
      placeholder='Enter Overview...'
      />
    </div>

    <button
      type='submit'
      className='bg-zinc-200 w-full dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'
    >
      Update Movie
    </button>
    </form>
  </div>
  );
};

export default UpdateMovie;






// import { FC, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { Movie } from '../Component/Movie';

// interface UpdateData {
//     title: string;
//     runtime: number;
//     releaseDate: number;
//     genre: string[];
//     score: number;
//     videoUrl: string;
//     movieUrl: string;
//     overview: string;
//     imageUrl?: string;
// }

// const UpdateMovie: FC = () => {
//   const { id } = useParams();
//   const [movieData, setMovieData] = useState<Movie | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const { register, handleSubmit, setValue } = useForm();

//   const CLOUDINARY_UPLOAD_PRESET = 'movieImage';
//   const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlc8zsx7m/image/upload';

//   const onSubmit = async (data: any) => {
//     let updatedData: UpdateData = {
//       title: data.title,
//       runtime: data.Runtime,
//       releaseDate: data.Date,
//       genre: data.genre,
//       score: data.score,
//       videoUrl: data.Video,
//       movieUrl: data.movieUrl,
//       overview: data.overview,
//     };

//     // If a new image is uploaded, upload it to Cloudinary and get the image URL
//     if (imageFile) {
//       try {
//         const formData = new FormData();
//         formData.append('file', imageFile);
//         formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//         // Upload image to Cloudinary
//         const response = await fetch(CLOUDINARY_URL, {
//           method: 'POST',
//           body: formData,
//         });

//         const data = await response.json();

//         if (data.secure_url) {
//           updatedData.imageUrl = data.secure_url;
//         }
//       } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//       }
//     } else {
//       updatedData.imageUrl = movieData?.imageUrl;
//     }

//     // Update Data
//     try {
//       const response = await fetch(`http://localhost:5000/Movies/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (response.ok) {
//         alert('Movie updated successfully');
//       } else {
//         alert('Failed to update movie');
//       }
//     } catch (error) {
//       console.error('Error updating movie:', error);
//     }
//   };

//   // Function to handle image selection
//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     async function fetchMovieData() {
//       const response = await fetch(`http://localhost:5000/Movies/${id}`);
//       const data = await response.json();
//       setMovieData(data);

//       // Populate form fields with movie data
//       setValue('title', data.title);
//       setValue('Runtime', data.runtime);
//       setValue('Date', data.releaseDate);
//       setValue('genre', data.genre);
//       setValue('score', data.score);
//       setValue('Video', data.videoUrl);
//       setValue('movieUrl', data.movieUrl);
//       setValue('overview', data.overview);
//     }

//     fetchMovieData();
//   }, [id, setValue]);

//   return (
//     <div className='p-10 flex flex-col items-center'>
//       <h1 className='text-2xl font-semibold dark:text-cyan-400'>Update Movie</h1>
//       <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        
//       <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Title</label>
//           <input
//             {...register("title")}
//             className='border border-gray-300 dark:text-black p-2 rounded-md h-10 w-96 my-2'
//             placeholder='Enter Title...'
//             type="text"
//             defaultValue={movieData?.title}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Run Time</label>
//           <input
//             {...register("Runtime")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Runtime...'
//             type="number"
//             defaultValue={movieData?.runtime}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Release Date</label>
//           <input
//             {...register("Date")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Release Date...'
//             type="date"
//             defaultValue={movieData?.releaseDate}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Genre</label>
//           <input
//             {...register("genre")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Genres (comma separated)...'
//             type="text"
//             defaultValue={movieData?.genre}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Score</label>
//           <input
//             {...register("score")}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Enter Score...'
//             type="number"
//             defaultValue={movieData?.score}
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Poster</label>
//           {/* Display current poster or preview new image */}
//           {imagePreview || movieData?.imageUrl ? (
//             <img className='w-36 h-36' src={imagePreview || movieData?.imageUrl} alt='Poster Preview' />
//           ) : (
//             <p>No Poster Available</p>
//           )}
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Choose Poster Image</label>
//           <input
//             type='file'
//             onChange={handleImageChange}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>YT Video Link</label>
//           <input
//             {...register('Video')}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Movie Video Link...'
//             type='text'
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Movie Link</label>
//           <input
//             {...register('movieUrl')}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-10 my-2'
//             placeholder='Movie Link...'
//             type='text'
//           />
//         </div>

//         <div className='flex flex-col my-2'>
//           <label className='font-semibold'>Overview</label>
//           <textarea
//             {...register('overview')}
//             className='border border-gray-300 p-2 w-96 dark:text-black rounded-md h-20 my-2'
//             placeholder='Enter Overview...'
//           />
//         </div>

//         <button
//           type='submit'
//           className='bg-zinc-200 w-full dark:bg-cyan-800 p-2 mt-3 rounded-lg transition-all font-semibold hover:text-white hover:bg-cyan-600 cursor-pointer'
//         >
//           Update Movie
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;