import { NestFactory } from '@nestjs/core';
import { movieSeeder } from 'seeders/movieSeeder';
import { GeneratorModule } from './generator/generator.module';
import { Logger } from '@nestjs/common';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(GeneratorModule);
  // Seed the database here
  await movieSeeder();
  app.enableCors({
    origin: env.FRONTEND_URL,
  });
  app.listen(5000, () => {
    Logger.log(`The app has started on PORT 5000`);
  });
}
bootstrap();
