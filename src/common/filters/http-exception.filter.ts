import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === HttpStatus.FORBIDDEN) {
      return res.status(status).json({
        status: 'failure',
        description: 'User is not authorized to access this resource.',
      });
    }

    return res.status(status).json({
      status: 'failure',
      description: 'Something went wrong!',
    });
  }
}
