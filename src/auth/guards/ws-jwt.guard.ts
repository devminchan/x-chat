import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_CONSTANTS } from '../auth.constants';
import { JwtPayload, UserPrinciple } from '../auth.interfaces';

@Injectable()
export class WsJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const { token } = client.handshake.query;

    const pr = new Promise<JwtPayload>(resolve => {
      jwt.verify(token, JWT_CONSTANTS.secret, (err, payload: JwtPayload) => {
        if (err) {
          throw err;
        }

        resolve(payload);
      });
    });

    try {
      const result = await pr;

      context.switchToWs().getData().user = {
        id: result.id,
      } as UserPrinciple;

      return Boolean(true);
    } catch (e) {
      console.error(e);
      return Boolean(false);
    }
  }
}
