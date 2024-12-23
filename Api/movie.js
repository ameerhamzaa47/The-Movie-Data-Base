import { promises as fs } from 'fs';
import path from 'path';

// This handler will serve data from MovieData.json
export default async function handler(req, res) {
  const { method, query } = req;

  try {
    // Define the path to the MovieData.json file
    const filePath = path.join(process.cwd(), 'api', 'movieData.json');
    
    // Read the contents of movieData.json
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);  // Parse the JSON data

    if (method === 'GET') {
      // Handle different routes based on query parameters (for movies, tv shows, trailers)
      if (query.type === 'movies') {
        res.status(200).json(jsonData.Movies);
      } else if (query.type === 'tvshows') {
        res.status(200).json(jsonData.TVShows);
      } else if (query.type === 'trailers') {
        res.status(200).json(jsonData.Trailers);
      } else {
        res.status(400).json({ message: 'Invalid query parameter' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error reading movieData.json:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}