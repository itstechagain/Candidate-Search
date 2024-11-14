// server/server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use the PORT environment variable or default to 10000 if not defined
const port = process.env.PORT || 10000;

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
