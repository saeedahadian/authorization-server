import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class AuthenticationExceptionFilter<T> implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    // Check if the request body is empty.
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: 'failure',
        description: 'User credentials are not given.',
      });
    }

    return res.status(401).json({
      status: 'failure',
      description: 'User credentials are not valid.',
      data: req.body,
    });
  }
}
