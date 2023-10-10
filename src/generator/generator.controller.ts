import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { GeneratorService } from './generator.service';
import { successResponse } from 'src/utils/responses';

@Controller('api/v1/movies')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get()
  async getMoviesQrCode(@Res() response: Response) {
    const result = await this.generatorService.getMoviesQrCode();
    return successResponse(response, 200, 'QR generated successfully', result);
  }

  @Get('byIds/:ids')
  async getMoviesByIds(@Param('ids') ids: string, @Res() response: Response) {
    const idArray = ids.split(',').map((id) => parseInt(id, 10));
    const movies = await this.generatorService.getMoviesByIds(idArray);
    return successResponse(
      response,
      200,
      'Movies retrieved successfully',
      movies,
    );
  }
}
