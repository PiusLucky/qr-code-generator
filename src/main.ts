import { NestFactory } from '@nestjs/core';
import { movieSeeder } from 'seeders/movieSeeder';
import { GeneratorModule } from './generator/generator.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GeneratorModule);
  // Seed the database here
  await movieSeeder();
  app.listen(3000, () => {
    Logger.log(`The app has started on PORT 3000`);
  });
}
bootstrap();
