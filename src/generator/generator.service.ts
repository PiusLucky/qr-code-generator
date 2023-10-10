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
    const movieUrl = `${
      process.env.FRONTEND_URL
    }/movies?ids=${encodeURIComponent(JSON.stringify(randomMoviesId))}`;

    // Generate a QR code for the URL
    return qr.toDataURL(movieUrl);
  }

  // Get all movies by Ids
  async getMoviesByIds(ids: number[]): Promise<Movie[]> {
    return this.movieService.getMoviesByIds(ids);
  }

  // Function to generate a random list of movies
  // It uses Fisher-Yates shuffle to provide a better randomization of the movies.
  generateRandomMovies(movies: Movie[], count: number) {
    const totalMovies = movies.length;

    if (count >= totalMovies) {
      return movies.slice(); // Return a copy of the original array as there are no duplicates.
    }

    const randomMovies = [...movies];
    let currentIndex = randomMovies.length,
      randomIndex: number,
      temporaryValue: Movie;

    while (currentIndex !== 0 && randomMovies.length > count) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = randomMovies[currentIndex];
      randomMovies[currentIndex] = randomMovies[randomIndex];
      randomMovies[randomIndex] = temporaryValue;
    }

    return randomMovies.slice(0, count);
  }
}
