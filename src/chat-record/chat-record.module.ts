import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRecord } from './chat-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRecord])],
})
export class ChatRecordModule {}
