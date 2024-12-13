import { TVShow } from './IDB';
import img1 from '../assets/DataImage/TV Show/Poster_1.png'
import img2 from '../assets/DataImage/TV Show/Poster_2.png'
import img3 from '../assets/DataImage/TV Show/Poster_3.png'
import img4 from '../assets/DataImage/TV Show/Poster_4.png'
import img5 from '../assets/DataImage/TV Show/Poster_5.png'
import img6 from '../assets/DataImage/TV Show/Poster_6.png'
import img7 from '../assets/DataImage/TV Show/Poster_7.png'
import img8 from '../assets/DataImage/TV Show/Poster_8.png'
import img9 from '../assets/DataImage/TV Show/Poster_9.png'
import img10 from '../assets/DataImage/TV Show/Poster_10.png'
import img11 from '../assets/DataImage/TV Show/Poster_11.png'
import img12 from '../assets/DataImage/TV Show/Poster_12.png'
import img13 from '../assets/DataImage/TV Show/Poster_13.png'
import img14 from '../assets/DataImage/TV Show/Poster_14.png'
import img15 from '../assets/DataImage/TV Show/Poster_15.png'
import img16 from '../assets/DataImage/TV Show/Poster_16.png'
import img17 from '../assets/DataImage/TV Show/Poster_17.png'
import img18 from '../assets/DataImage/TV Show/Poster_18.png'
import img19 from '../assets/DataImage/TV Show/Poster_19.png'
import img20 from '../assets/DataImage/TV Show/Poster_20.png'

export const tvShowsData: TVShow[] = [
  {
    id: 1,
    title: 'GTMAX',
    type: "theater",
    episodeCount: 10,
    imageUrl: img1,
    score: 61,
    overview: "When a notorious gang of bikers recruits her brother for a heist, a former motocross champion must face her deepest fears to keep her family safe.",
    genre: ["Action", "Crime", "Drama"],
    runtime: "1h 40m",
    releaseDate: "Nov 19, 2024",
    videoUrl: 'https://youtu.be/Zs0uKHrVRws',
  },
  {
    id: 2,
    title: 'Suits',
    type: "tv",
    episodeCount: 8,
    imageUrl: img2,
    score: 82,
    overview: "While running from a drug deal gone bad, Mike Ross, a brilliant young college-dropout, slips into a job interview with one of New York City's best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after he recognizes his raw talent and photographic memory.",
    genre: ["Drama"],
    runtime: "1h 45m",
    releaseDate: "Jun 23, 2011",
    videoUrl: 'https://youtu.be/cUnkjEIW2-o'
  },
  {
    id: 3,
    title: 'The Good Doctor',
    type: 'theater',
    episodeCount: 8,
    imageUrl: img3,
    score: 85,
    overview: "Shaun Murphy, a young surgeon with autism and savant syndrome, relocates from a quiet country life to join a prestigious hospital's surgical unit. Unable to personally connect with those around him, Shaun uses his extraordinary medical gifts to save lives and challenge the skepticism of his colleagues.",
    genre: ["Drama"],
    runtime: "1h 25m",
    releaseDate: "Jun 23, 2011",
    videoUrl: 'https://youtu.be/lnY9FWUTY84'
  },
  {
    id: 4,
    title: 'House',
    type: "theater",
    episodeCount: 8,
    imageUrl: img4,
    score: 86,
    overview: "Dr. Gregory House, a drug-addicted, unconventional, misanthropic medical genius, leads a team of diagnosticians at the fictional Princeton–Plainsboro Teaching Hospital in New Jersey.",
    genre: ["Drama", "Mystery", "Comedy"],
    runtime: "1h 35",
    releaseDate: "Nov 16, 2004",
    videoUrl: 'https://youtu.be/MczMB8nU1sY'
  },
  {
    id: 5,
    title: 'Our Little Secret',
    type: "tv",
    episodeCount: 8,
    imageUrl: img5,
    score: 63,
    overview: "After discovering their significant others are siblings, two resentful exes must spend Christmas under one roof — while hiding their romantic history.",
    genre: ["Romance", "Comedy", "Drama"],
    runtime: "1h 41m",
    releaseDate: "Nov 27, 2024",
    videoUrl: 'https://youtu.be/fcc9G9PXTEE'
  },
  {
    id: 6,
    title: 'Young Sheldon',
    type: "tv",
    episodeCount: 8,
    imageUrl: img6,
    score: 81,
    overview: "The early life of child genius Sheldon Cooper, later seen in The Big Bang Theory.",
    genre: ["Comedy", "Family", "Drama"],
    runtime: "1h 43m",
    releaseDate: "Sep 25, 2017",
    videoUrl: 'https://youtu.be/FStMMcj-RiA'
  },
  {
    id: 7,
    title: 'Venom',
    type: "theater",
    episodeCount: 8,
    imageUrl: img7,
    score: 68,
    overview: "Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.",
    genre: ["Science Fiction", "Action"],
    runtime: "1h 52m",
    releaseDate: "Oct 05, 2018",
    videoUrl: 'https://youtu.be/xLCn88bfW1o'
  },
  {
    id: 8,
    title: 'Supernatural',
    type: "theater",
    episodeCount: 8,
    imageUrl: img8,
    score: 83,
    overview: "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way.",
    genre: ["Drama", "Mystery", "Sci-Fi & Fantasy"],
    runtime: "1h 23m",
    releaseDate: "Sep 13, 2005",
    videoUrl: 'https://youtu.be/yy96yJjkvjo'
  },
  {
    id: 9,
    title: 'The Garfield Movie',
    type: "animated",
    episodeCount: 8,
    imageUrl: img9,
    score: 71,
    overview: "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
    genre: ["Animation", "Comedy", "Family", "Adventure", "Action"],
    runtime: "1h 41m",
    releaseDate: "Apr 30, 2024",
    videoUrl: 'https://youtu.be/yk2Ej59DnrE'
  },
  {
    id: 10,
    title: 'Cobra Kai',
    type: "tv",
    episodeCount: 8,
    imageUrl: img10,
    score: 82,
    overview: "This Karate Kid sequel series picks up 30 years after the events of the 1984 All Valley Karate Tournament and finds Johnny Lawrence on the hunt for redemption by reopening the infamous Cobra Kai karate dojo. This reignites his old rivalry with the successful Daniel LaRusso, who has been working to maintain the balance in his life without mentor Mr. Miyagi.",
    genre: ["Action & Adventure", "Drama", "Comedy"],
    runtime: "1h 45m",
    releaseDate: "May 02, 2018",
    videoUrl: 'https://youtu.be/xCwwxNbtK6Y'
  },
  {
    id: 11,
    title: 'The Platform 2',
    type: "theater",
    episodeCount: 8,
    imageUrl: img11,
    score: 56,
    overview: "After a mysterious leader imposes his law in a brutal system of vertical cells, a new arrival battles against a dubious food distribution method.",
    genre: ["Science Fiction", "Horror"],
    runtime: "1h 40m",
    releaseDate: "Oct 04, 2024",
    videoUrl: 'https://youtu.be/UKFMYWNatQM'
  },
  {
    id: 12,
    title: 'Lucifer',
    type: "tv",
    episodeCount: 8,
    imageUrl: img12,
    score: 68,
    overview: "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
    genre: ["Crime", "Sci-Fi & Fantasy"],
    runtime: "1h 53m",
    releaseDate: "Jan 25, 2016",
    videoUrl: 'https://youtu.be/X4bF_quwNtw'
  },
  {
    id: 13,
    title: 'The Mentalist',
    type: 'tv',
    episodeCount: 8,
    imageUrl: img13,
    score: 82,
    overview: "Patrick Jane, a former celebrity psychic medium, uses his razor sharp skills of observation and expertise at 'reading' people to solve serious crimes with the California Bureau of Investigation.",
    genre: ["Crime", "Drama", "Mystery"],
    runtime: "1h 13m",
    releaseDate: "Sep 23, 2008",
    videoUrl: 'https://youtu.be/nn2Q69pSC_M'
  },
  {
    id: 14,
    title: "Don't Move",
    type: 'theater',
    episodeCount: 8,
    imageUrl: img14,
    score: 64,
    overview: "A grieving woman in a secluded forest encounters a killer who injects her with a paralytic drug. As her body shuts down, her fight for survival begins.",
    genre: ["Horror", 'Thriller'],
    runtime: "1h 32m",
    releaseDate: "Oct 25, 2024",
    videoUrl: 'https://youtu.be/q0GpvLLMVQ4'
  },
  {
    id: 15,
    title: 'Sing: Thriller',
    type: 'animated',
    episodeCount: 8,
    imageUrl: img15,
    score: 74,
    overview: "Buster Moon dreams up a star-studded spectacle set to Michael Jackson's 'Thriller' in this animated short featuring characters from the hit 'Sing' films.",
    genre: ['Animation', 'Family', 'Comedy'],
    runtime: "11m",
    releaseDate: "Oct 16, 2024",
    videoUrl: 'https://youtu.be/RiRiTEhiyP4'
  },
  {
    id: 16,
    title: 'Law & Order:',
    type: 'tv',
    episodeCount: 8,
    imageUrl: img16,
    score: 79,
    overview: "In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.",
    genre: ['Crime', 'Drama', 'Mystery'],
    runtime: "1h 36m",
    releaseDate: "Sep 20, 1999",
    videoUrl: 'https://youtu.be/MhGI_1DIhxw'
  },
  {
    id: 17,
    title: 'Pimpinero',
    type: 'tv',
    episodeCount: 8,
    imageUrl: img17,
    score: 72,
    overview: "When Juan, a young gasoline smuggler, is forced to work for a mysterious organization in the desert bordering Colombia and Venezuela, his girlfriend Diana embarks on a journey to uncover the secrets that inhabit this no-man’s-land.",
    genre: ['Action', 'Crime', 'Drama'],
    runtime: "2h 2m",
    releaseDate: "Oct 10, 2024",
    videoUrl: 'https://youtu.be/g8HrGG4jmRQ'
  },
  {
    id: 18,
    title: 'Dan Da Dan',
    type: 'animated',
    episodeCount: 8,
    imageUrl: img18,
    score: 89,
    overview: "In a bet to prove whether ghosts or aliens exist, two high schoolers face terrifying paranormal threats, gain superpowers and maybe even fall in love?!",
    genre: ["Animation", "Action & Adventure", "Comedy", "Sci-Fi & Fantasy"],
    runtime: "1h 46m",
    releaseDate: "Oct 04, 2024",
    videoUrl: 'https://youtu.be/6Kj1hc54nu0'
  },
  {
    id: 19,
    title: 'Bad Boys',
    type: 'theater',
    episodeCount: 8,
    imageUrl: img19,
    score: 75,
    overview: "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
    genre: ['Action', 'Comedy'],
    runtime: "1h 55m",
    releaseDate: "Jun 05, 2024",
    videoUrl: 'https://youtu.be/uWLNl_KQCAU'
  },
  {
    id: 20,
    title: 'Hunting With Tigers',
    type: 'theater',
    episodeCount: 8,
    imageUrl: img20,
    score: 63,
    overview: "Malik, a young Parisian hustler, discovers that his stepfather Serge, a famous bank robber, has been arrested along with his accomplices. During the trial, Iris, one of the accused's lawyers, Chérif, requests Malik to accept a dangerous heist in exchange for Serge and her client's liberty. Malik must convince and reunite Chérif's former partners to accomplish this high-risk stickup.",
    genre: ['Action', 'Thriller'],
    runtime: '1h 49m',
    releaseDate: "Nov 22, 2024",
    videoUrl: 'https://youtu.be/JD8EmYWSbUY'
  },
];
