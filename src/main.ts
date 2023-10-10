import { NestFactory } from '@nestjs/core';
import { movieSeeder } from 'seeders/movieSeeder';
import { GeneratorModule } from './generator/generator.module';

async function bootstrap() {
  const app = await NestFactory.create(GeneratorModule);
  // Seed the database here
  await movieSeeder();
  await app.listen(3000);
}
bootstrap();
