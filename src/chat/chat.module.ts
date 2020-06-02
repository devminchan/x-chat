import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRecord } from './chat-record.entity';
import { ChatService } from './chat.service';
import { UserModule } from 'src/user/user.module';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRecord]), UserModule, RoomModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
