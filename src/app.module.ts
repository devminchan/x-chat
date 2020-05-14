import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ChatRecordModule } from './chat-record/chat-record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    RoomModule,
    ChatRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
