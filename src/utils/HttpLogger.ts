import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpLogger implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: Function) {
    const logDesc = `${req.method} ${req.originalUrl} from ${req.ip}`;
    this.logger.log(`[REQUEST] ${logDesc}`);

    if (req.method !== 'GET') {
      this.logger.log(req.body);
    }

    next();
  }
}
