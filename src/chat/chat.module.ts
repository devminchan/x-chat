import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRecord } from './chat-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRecord])],
  providers: [ChatGateway],
})
export class ChatModule {}
