import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { RoomJoinInfoModule } from './room-join-info/room-join-info.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { HttpLogger } from './utils/HttpLogger';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    RoomModule,
    RoomJoinInfoModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLogger)
      .exclude('/') // exclude for health check request
      .forRoutes('/*');
  }
}
