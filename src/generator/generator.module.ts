import { Module } from '@nestjs/common';
import { GeneratorController } from './generator.controller';
import { MovieService } from 'src/movie/movie.service';
import { PrismaService } from 'src/prisma.service';
import { GeneratorService } from './generator.service';

@Module({
  controllers: [GeneratorController],
  providers: [PrismaService, MovieService, GeneratorService],
})
export class GeneratorModule {}
