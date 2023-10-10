import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async getAllMovie(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  async getMoviesByIds(ids: number[]): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return movies;
  }

  async getMovie(id: number): Promise<Movie | null> {
    return this.prisma.movie.findUnique({ where: { id: Number(id) } });
  }

  async updateMovie(id: number, data: Movie): Promise<Movie> {
    const { title, year, image } = data;
    return this.prisma.movie.update({
      where: { id: Number(id) },
      data: { title, year, image },
    });
  }

  async deleteMovie(id: number): Promise<Movie> {
    return this.prisma.movie.delete({
      where: { id: Number(id) },
    });
  }
}
