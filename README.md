# The Movie Database (TMDB)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Movie Database (TMDB) is a web application that allows users to browse, search, and manage a collection of movies and TV shows. Users can add movies to their watchlist, mark favorites, and leave comments and reviews.

## Features
- Browse and search for movies and TV shows
- View detailed information about movies and TV shows
- Add movies and TV shows to watchlist and favorites
- Leave comments and reviews
- Admin panel for managing movies and TV shows
- User authentication and profile management

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/the-movie-database.git
  cd the-movie-database
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Set up environment variables:
  Create a `.env` file in the root directory and add the following:
  ```
  VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
  ```

4. Start the development server:
  ```bash
  npm run both
  ```

## Usage
Once the development server is running, you can access the application at `http://localhost:3000`.

### Admin Panel
To access the admin panel, navigate to `http://localhost:3000/adminPannel`. Here, you can add, update, and delete movies and TV shows.

### User Authentication
Users can register, log in, and manage their profiles. Authentication is handled using Firebase.

## Project Structure
The project structure is as follows:
```
/src
  ├── Admin Pannel
  │   ├── addMovies.tsx
  │   ├── addTvShow.tsx
  │   ├── Admin.tsx
  │   ├── UpdateMovie.tsx
  │   └── UpdateTVShow.tsx
  ├── Auth
  │   ├── Firebase.tsx
  │   ├── Forget_Password.tsx
  │   ├── Login.tsx
  │   └── Register.tsx
  ├── Component
  │   ├── Discussion.tsx
  │   ├── Footer.tsx
  │   ├── Header.tsx
  │   ├── Home.tsx
  │   ├── Layout.tsx
  │   ├── Movie.tsx
  │   ├── PaymentPage.tsx
  │   ├── Profile.tsx
  │   ├── Protected.tsx
  │   ├── RatingBar.tsx
  │   ├── ThemeToggle.tsx
  │   ├── Trailer.tsx
  │   └── NotFoundPage.tsx
  ├── Context
  │   └── ThemeProvider.tsx
  ├── Details Page
  │   ├── MDetailPage.tsx
  │   └── TvDetailPage.tsx
  ├── IDB Data
  │   ├── IDB.tsx
  │   └── MovieData.json
  ├── Reducer
  │   ├── CommentsSlice.tsx
  │   ├── movieSlice.tsx
  │   └── TvShowSlice.tsx
  ├── Store
  │   └── store.tsx
  ├── App.css
  ├── App.tsx
  ├── index.css
  ├── main.tsx
  └── vite-env.d.ts
```

## API Endpoints
The project uses a JSON server to serve movie and TV show data. The API endpoints are as follows:

- `GET /Movies` - Retrieve all movies
- `GET /Movies/:id` - Retrieve a specific movie by ID
- `POST /Movies` - Add a new movie
- `PUT /Movies/:id` - Update an existing movie
- `DELETE /Movies/:id` - Delete a movie

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.