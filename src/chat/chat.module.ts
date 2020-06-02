import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRecord } from './chat-record.entity';
import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';
import { RoomModule } from 'src/room/room.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRecord]), UserModule, RoomModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
