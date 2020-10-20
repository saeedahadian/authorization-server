import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class AuthorizationExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Check if "authorization" header is provided in the request.
    if (!req.get('authorization')) {
      return res.status(400).json({
        status: 'failure',
        description: 'No token is provided.',
      });
    }

    return res.status(status).json({
      status: 'failure',
      description: 'User is not authorized to access this resource.'
    });
  }
}
