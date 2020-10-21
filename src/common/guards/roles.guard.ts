import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // If no roles are given, let the request pass.
    if (!roles) {
      return true;
    }

    // If roles are given, check whether the user is authorized.
    const { user } = context.switchToHttp().getRequest();

    roles.forEach(role => {
      if (user.roles.includes(role)) return true;
    });

    return false;
  }
}
