import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class BasicAuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Check if Basic authorization header is given.
    if (req.get('authorization')?.split(' ')[0] !== 'Basic') {
      return res.status(400).json({
        status: 'failure',
        description: 'Basic token is not provided.',
      });
    }

    return res.status(401).json({
      status: 'failure',
      description: 'User credentials are not valid.',
    });
  }
}
