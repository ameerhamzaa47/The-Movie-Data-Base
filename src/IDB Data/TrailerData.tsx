import { Trailer } from './IDB';
import img1 from '../assets/DataImage/Movie/poster_2.png'
import img16 from '../assets/DataImage/TV Show/Poster_16.png'
import img7 from '../assets/DataImage/Movie/poster_7.png'
import img14 from '../assets/DataImage/Movie/poster_14.png'
import img19 from '../assets/DataImage/TV Show/Poster_19.png'
import img20 from '../assets/DataImage/TV Show/Poster_20.png'
import img12 from '../assets/DataImage/Movie/poster_12.png'
import img5 from '../assets/DataImage/TV Show/Poster_5.png'



export const TrailersData: Trailer[] = [
  {
    id: 1,
    type: 'movie',
    title: 'Mary (2024)',
    image:img1,
    videoUrl: 'https://youtu.be/d74vHvsACSs',
    releaseDate: 'Dec 06, 2024',
  },
  {
    id: 2,
    type: 'tv',
    title: 'Law & Order:',
    image: img16,
    videoUrl: 'https://youtu.be/MhGI_1DIhxw',
    releaseDate: "Sep 20, 1999",
  },
  {
    id: 3,
    type: 'movie',
    title: 'The Day of Jackal',
    releaseDate: 'Nov 07, 2024',
    image: img7,
    videoUrl: 'https://youtu.be/EUb_04MdnMI',
  },
  {
    id: 4,
    title: 'Silo',
    type: 'movie',
    image:img14,
    videoUrl: 'https://youtu.be/8ZYhuvIv1pA',
    releaseDate: 'May 04, 2023',
  },
  {
    id: 5,
    title: 'Bad Boys',
    type: 'theater',
    image: img19,
    releaseDate: "Jun 05, 2024",
    videoUrl: 'https://youtu.be/uWLNl_KQCAU'
  },
  {
    id: 6,
    title: 'Hunting With Tigers',
    type: 'theater',
    image: img20,
    releaseDate: "Nov 22, 2024",
    videoUrl: 'https://youtu.be/JD8EmYWSbUY'
  },
  {
    id: 7,
    title: 'Star Wars: Skeleton Crew',
    type: 'movie',
    image:img12,
    videoUrl: 'https://youtu.be/f19gfOMZTtg',
    releaseDate: 'Nov 15, 2024',
  },
  {
    id: 8,
    title: 'Our Little Secret',
    type: "tv",
    image: img5,
    releaseDate: "Nov 27, 2024",
    videoUrl: 'https://youtu.be/fcc9G9PXTEE'
  },
];
