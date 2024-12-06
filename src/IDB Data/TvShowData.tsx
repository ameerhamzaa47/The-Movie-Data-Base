import { TVShow } from './IDB';
import img from '../assets/image/Favicon.png';

export const tvShowsData: TVShow[] = [
  {
    id: 1,
    title: 'Black Doves',
    season: 1,
    episodeCount: 10,
    imageUrl: img,
    score: 83,
    overview: "When a spy posing as a politician's wife learns her lover has been murdered, an old assassin friend joins her on a quest for truth — and vengeance.",
    genre: ["Mystery", "Crime", "Action", "Adventure"],
    runtime: 120,
  },
  {
    id: 2,
    title: 'Another TV Show',
    season: 1,
    episodeCount: 8,
    imageUrl: img,
    score: 78,
    overview: "A thrilling TV show with unexpected twists.",
    genre: ["Drama", "Thriller"],
    runtime: 45,
  },
];
