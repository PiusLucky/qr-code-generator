import { PrismaClient } from '@prisma/client';
import { moviesData } from './helpers/movies';
import { Logger } from '@nestjs/common';

// Create an instance of the Prisma Client for seeding
const prisma = new PrismaClient();

export async function movieSeeder() {
  try {
    // Check if there are any existing movies in the database
    const existingMovies = await prisma.movie.findFirst();

    if (!existingMovies) {
      const movieRecords = moviesData.map((movie) => ({
        title: movie.Title,
        year: movie.Year,
        image: movie.Images[0],
      }));

      await prisma.movie.createMany({
        data: movieRecords,
      });

      Logger.log('Movies seeded successfully.');
    } else {
      Logger.log('Movies already exist in the database. Skipping seeding.');
    }
  } catch (error) {
    Logger.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
