import { Trailer } from './IDB';
import img1 from '../assets/DataImage/Movie/poster_2.png'
import img2 from '../assets/DataImage/Movie/poster_7.png'
import img3 from '../assets/DataImage/Movie/poster_14.png'
import img4 from '../assets/DataImage/Movie/poster_17.png'
import img5 from '../assets/DataImage/Movie/poster_12.png'


export const TrailersData: Trailer[] = [
  {
    id: 1,
    movieId: 1,
    title: 'Mary (2024)',
    image:img1,
    videoUrl: 'https://youtu.be/d74vHvsACSs',
    releaseDate: 'Dec 06, 2024',
  },
  {
    id: 2,
    movieId: 2,
    title: 'The Day of the Jackal ',
    image:img2,
    videoUrl: 'https://youtu.be/EUb_04MdnMI',
    releaseDate: 'Nov 07, 2024',
  },
  {
    id: 3,
    movieId: 3,
    title: 'Silo',
    image:img3,
    videoUrl: 'https://youtu.be/8ZYhuvIv1pA',
    releaseDate: 'May 04, 2023',
  },
  {
    id: 4,
    movieId: 4,
    title: 'Day and Night',
    image:img4,
    videoUrl: 'https://youtu.be/DJH6Lf8FBwc',
    releaseDate: 'Aug 30, 2017',
  },
  {
    id: 5,
    movieId: 5,
    title: 'Star Wars: Skeleton Crew',
    image:img5,
    videoUrl: 'https://youtu.be/f19gfOMZTtg',
    releaseDate: 'Nov 15, 2024',
  },
];
