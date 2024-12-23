import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Read the MovieData.json file from the api directory
    const filePath = path.join(process.cwd(), 'api', 'MovieData.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    // Handle different API routes
    if (req.method === 'GET') {
      if (req.url.includes('/api/movies')) {
        res.status(200).json(jsonData.Movies); // Return Movies data
      } else if (req.url.includes('/api/tvshows')) {
        res.status(200).json(jsonData.TVShows); // Return TV Shows data
      } else if (req.url.includes('/api/trailers')) {
        res.status(200).json(jsonData.Trailers); // Return Trailers data
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error reading MovieData.json:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}