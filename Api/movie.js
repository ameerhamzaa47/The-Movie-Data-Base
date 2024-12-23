import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../public/MovieData.json'));  // Adjust path to where MovieData.json is located in the public folder
const middlewares = jsonServer.defaults();

// Add middlewares (logging, static, CORS, etc.)
server.use(middlewares);

// Define custom routes for Movies, TV Shows, and Trailers
server.get('/api/movies', (req, res) => {
  const db = router.db;  // Access the in-memory database
  const movies = db.get('Movies').value();  // Get movies data
  res.jsonp(movies);
});

server.get('/api/tvshows', (req, res) => {
  const db = router.db;
  const tvShows = db.get('TVShows').value();  // Get TV shows data
  res.jsonp(tvShows);
});

server.get('/api/trailers', (req, res) => {
  const db = router.db;
  const trailers = db.get('Trailers').value();  // Get trailers data
  res.jsonp(trailers);
});

// Serve all routes (default JSON server functionality)
server.use(router);

export default server;