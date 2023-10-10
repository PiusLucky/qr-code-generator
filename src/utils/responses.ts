import { Response } from 'express';

export function successResponse<T>(
  response: Response,
  statusCode: number,
  message: string,
  data: T,
) {
  return response.status(statusCode).json({
    status: statusCode,
    message,
    result: data,
  });
}
