import { Injectable } from '@nestjs/common';
import { Movie } from 'src/movie/movie.model';
import { MovieService } from 'src/movie/movie.service';
import * as qr from 'qrcode';

@Injectable()
export class GeneratorService {
  constructor(private movieService: MovieService) {}

  // QR code to scan
  async getMoviesQrCode(): Promise<string> {
    const allMovies = await this.movieService.getAllMovie();

    const randomMovies = this.generateRandomMovies(allMovies, 10);

    const randomMoviesId = randomMovies.map((movies) => movies.id);

    // Create a URL with the movie data
    const movieUrl = `${process.env.FRONTEND_API}?movies=${encodeURIComponent(
      JSON.stringify(randomMoviesId),
    )}`;

    // Generate a QR code for the URL
    return qr.toDataURL(movieUrl);
  }

  // Get all movies by Ids
  async getMoviesByIds(ids: number[]): Promise<Movie[]> {
    return this.movieService.getMoviesByIds(ids);
  }

  // Function to generate a random list of movies
  generateRandomMovies = (movies: Movie[], count: number) => {
    const randomMovies = [];
    const totalMovies = movies.length;

    while (randomMovies.length < count) {
      const randomIndex = Math.floor(Math.random() * totalMovies);
      randomMovies.push(movies[randomIndex]);
    }

    return randomMovies;
  };
}
