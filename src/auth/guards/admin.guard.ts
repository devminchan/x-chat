import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrincipleRequest } from '../auth.interfaces';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as PrincipleRequest;

    if (request.user.isAdmin) {
      return Boolean(true);
    } else {
      return Boolean(false);
    }
  }
}
