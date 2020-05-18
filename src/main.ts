import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(3000);
}
bootstrap();
